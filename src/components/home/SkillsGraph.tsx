"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent
} from "react";
import * as d3 from "d3";
import type { D3DragEvent, D3ZoomEvent } from "d3";
import { Maximize2, Settings } from "lucide-react";
import {
  buildSkillsGraphData,
  skillsGraphStructure,
  SkillGraphLink,
  SkillGraphNode
} from "@/lib/skills-graph-data";
import { cn } from "@/lib/utils";

type ForceNode = SkillGraphNode & d3.SimulationNodeDatum;
type ForceLink = d3.SimulationLinkDatum<ForceNode> & SkillGraphLink;

const COLORS = {
  background: "#1e1e1e",
  text: "#dcddde",
  panel: "rgba(45, 45, 45, 0.95)",
  border: "#4a4a4a",
  link: "#4a4a4a",
  linkHighlight: "#818cf8",
  nodeSkillFill: "#2d2d2d",
  nodeSkillStroke: "#6366f1",
  nodeCategoryFill: "#3730a3",
  nodeCategoryStroke: "#818cf8",
  nodeSpecialFill: "#7c2d12",
  nodeSpecialStroke: "#fb923c"
} as const;

const radiusByType: Record<ForceNode["type"], number> = {
  category: 22,
  skill: 14,
  special: 18
};

export interface SkillsGraphProps {
  className?: string;
}

export default function SkillsGraph({ className }: SkillsGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const simulationRef = useRef<d3.Simulation<ForceNode, ForceLink> | null>(
    null
  );
  const zoomBehaviourRef =
    useRef<d3.ZoomBehavior<SVGSVGElement, undefined> | null>(null);
  const nodesRef = useRef<ForceNode[]>([]);
  const physicsRef = useRef({
    linkDistance: 110,
    chargeStrength: -320,
    collisionPadding: 10
  });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [physics, setPhysics] = useState({
    linkDistance: 110,
    chargeStrength: -320,
    collisionPadding: 10
  });

  useEffect(() => {
    physicsRef.current = physics;
  }, [physics]);

  const data = useMemo(() => buildSkillsGraphData(skillsGraphStructure), []);

  const handlePhysicsChange =
    (key: keyof typeof physics) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setPhysics((prev) => ({ ...prev, [key]: value }));
    };

  const handleFitToView = () => {
    if (!svgRef.current || !zoomBehaviourRef.current) return;
    if (!dimensions.width || !dimensions.height) return;

    const nodes = nodesRef.current.filter(
      (node) => typeof node.x === "number" && typeof node.y === "number"
    );

    if (nodes.length === 0) return;

    const minX = Math.min(...nodes.map((node) => node.x ?? 0));
    const maxX = Math.max(...nodes.map((node) => node.x ?? 0));
    const minY = Math.min(...nodes.map((node) => node.y ?? 0));
    const maxY = Math.max(...nodes.map((node) => node.y ?? 0));

    const padding = 80;
    const contentWidth = Math.max(maxX - minX, 1);
    const contentHeight = Math.max(maxY - minY, 1);

    const [minScale, maxScale] = zoomBehaviourRef.current.scaleExtent();

    const scale = Math.min(
      maxScale,
      Math.max(
        minScale,
        Math.min(
          (dimensions.width - padding) / contentWidth,
          (dimensions.height - padding) / contentHeight
        )
      )
    );

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const transform = d3.zoomIdentity
      .translate(dimensions.width / 2, dimensions.height / 2)
      .scale(scale)
      .translate(-centerX, -centerY);

    const svgSelection = d3.select<SVGSVGElement, undefined>(svgRef.current);
    zoomBehaviourRef.current.transform(svgSelection, transform);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.floor(width),
          height: Math.floor(height)
        });
      }
    });

    observer.observe(container);

    setDimensions({
      width: Math.floor(container.clientWidth),
      height: Math.floor(container.clientHeight)
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    if (!svgRef.current || !gRef.current) return;

    simulationRef.current?.stop();

  const svg = d3.select<SVGSVGElement, undefined>(svgRef.current);
  const g = d3.select<SVGGElement, undefined>(gRef.current);

    svg.attr("width", dimensions.width).attr("height", dimensions.height);

    g.selectAll("*").remove();
    g.attr("transform", null);

    const existingTransform = zoomBehaviourRef.current
      ? d3.zoomTransform(svgRef.current)
      : d3.zoomIdentity;

    const zoom = d3
      .zoom<SVGSVGElement, undefined>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event: D3ZoomEvent<SVGSVGElement, undefined>) => {
        g.attr("transform", event.transform.toString());
      });

  svg.call(zoom);
  zoom.transform(svg, existingTransform);
    zoomBehaviourRef.current = zoom;

    const nodes: ForceNode[] = data.nodes.map((node) => ({ ...node }));
    const links: ForceLink[] = data.links.map((link) => ({ ...link }));

    nodesRef.current = nodes;
    const categoryAssignments = data.categoryAssignments;
    const nodeTypeById = new Map(nodes.map((node) => [node.id, node.type]));

    const categoryIds = nodes
      .filter((node) => node.type === "category")
      .map((node) => node.id);

    const preferredCategoryRatios: Record<string, number> = {
      "Design Software": 0.22,
      Programming: 0.5,
      "Libraries and Tools": 0.65,
      Simulation: 0.78
    };

    const assignedCategories = new Set<string>();
    const categoryPositions = new Map<string, number>();

    Object.entries(preferredCategoryRatios).forEach(([categoryId, ratio]) => {
      if (categoryIds.includes(categoryId)) {
        categoryPositions.set(categoryId, ratio * dimensions.width);
        assignedCategories.add(categoryId);
      }
    });

    const remainingCategories = categoryIds.filter(
      (categoryId) => !assignedCategories.has(categoryId)
    );

    if (remainingCategories.length > 0) {
      const spacing = 1 / (remainingCategories.length + 1);
      remainingCategories.forEach((categoryId, index) => {
        categoryPositions.set(
          categoryId,
          (index + 1) * spacing * dimensions.width
        );
      });
    }

    const getCategoryPosition = (categoryId: string) =>
      categoryPositions.get(categoryId) ?? dimensions.width / 2;

    const resolveId = (
      endpoint: ForceLink["source"] | ForceLink["target"]
    ): string => {
      if (typeof endpoint === "string") return endpoint;
      if (typeof endpoint === "number") return String(endpoint);
      return (endpoint as ForceNode).id;
    };

    const specialToCategories = new Map<string, Set<string>>();
    links.forEach((link) => {
      const sourceId = resolveId(link.source);
      const targetId = resolveId(link.target);
      const sourceType = nodeTypeById.get(sourceId);
      const targetType = nodeTypeById.get(targetId);
      const sourceCategory = categoryAssignments[sourceId];
      const targetCategory = categoryAssignments[targetId];

      if (sourceType === "special" && targetCategory) {
        const set = specialToCategories.get(sourceId) ?? new Set<string>();
        set.add(targetCategory);
        specialToCategories.set(sourceId, set);
      }

      if (targetType === "special" && sourceCategory) {
        const set = specialToCategories.get(targetId) ?? new Set<string>();
        set.add(sourceCategory);
        specialToCategories.set(targetId, set);
      }
    });

    const horizontalForce = d3
      .forceX<ForceNode>((node) => {
        if (node.type === "category") {
          return getCategoryPosition(node.id);
        }

        if (node.type === "special") {
          const categories = specialToCategories.get(node.id);
          if (categories && categories.size > 0) {
            const entries = Array.from(categories);
            const total = entries.reduce(
              (sum, categoryId) => sum + getCategoryPosition(categoryId),
              0
            );
            return total / entries.length;
          }
          return dimensions.width / 2;
        }

        const primaryCategory = categoryAssignments[node.id];
        if (primaryCategory) {
          return getCategoryPosition(primaryCategory);
        }

        return dimensions.width / 2;
      })
      .strength((node) => {
        if (node.type === "category") return 0.6;
        if (node.type === "special") return 0.25;
        const primaryCategory = categoryAssignments[node.id];
        if (primaryCategory && categoryPositions.has(primaryCategory)) {
          return 0.2;
        }
        return 0.08;
      });

    const verticalForce = d3
      .forceY<ForceNode>(() => dimensions.height / 2)
      .strength((node) => (node.type === "category" ? 0.35 : 0.12));

    const resolveX = (
      endpoint: ForceLink["source"] | ForceLink["target"]
    ): number => {
      if (typeof endpoint === "string" || typeof endpoint === "number") {
        return 0;
      }

      return (endpoint as ForceNode).x ?? 0;
    };

    const resolveY = (
      endpoint: ForceLink["source"] | ForceLink["target"]
    ): number => {
      if (typeof endpoint === "string" || typeof endpoint === "number") {
        return 0;
      }

      return (endpoint as ForceNode).y ?? 0;
    };

    const connectionCount = new Map<string, number>();
    nodes.forEach((node) => connectionCount.set(node.id, 0));
    links.forEach((link) => {
      const sourceId = resolveId(link.source);
      const targetId = resolveId(link.target);
      connectionCount.set(sourceId, (connectionCount.get(sourceId) ?? 0) + 1);
      connectionCount.set(targetId, (connectionCount.get(targetId) ?? 0) + 1);
    });

    nodes.forEach((node) => {
      const connections = connectionCount.get(node.id) ?? 1;
      const baseRadius = radiusByType[node.type];
      node.radius = baseRadius + Math.sqrt(connections) * 1.8;
    });

    const linkSelection = g
      .append("g")
      .attr("stroke", COLORS.link)
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .selectAll<SVGLineElement, ForceLink>("line")
      .data(links)
      .join("line");

    const nodeSelection = g
      .append("g")
      .selectAll<SVGGElement, ForceNode>("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "grab");

    nodeSelection
      .append("circle")
      .attr("r", (d: ForceNode) => d.radius ?? radiusByType[d.type])
      .attr("fill", (d: ForceNode) => {
        if (d.type === "category") return COLORS.nodeCategoryFill;
        if (d.type === "special") return COLORS.nodeSpecialFill;
        return COLORS.nodeSkillFill;
      })
      .attr("stroke", (d: ForceNode) => {
        if (d.type === "category") return COLORS.nodeCategoryStroke;
        if (d.type === "special") return COLORS.nodeSpecialStroke;
        return COLORS.nodeSkillStroke;
      })
      .attr("stroke-width", (d: ForceNode) => (d.type === "skill" ? 2 : 3));

    nodeSelection
      .append("text")
      .text((d: ForceNode) => d.id)
      .attr("dy", (d: ForceNode) => (d.radius ?? radiusByType[d.type]) + 14)
      .attr("fill", COLORS.text)
      .attr("font-size", (d: ForceNode) => (d.type === "category" ? 14 : 12))
      .attr("font-weight", (d: ForceNode) =>
        d.type === "category" ? "bold" : "normal"
      )
      .attr("text-anchor", "middle")
      .style("pointer-events", "none");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<ForceNode, ForceLink>(links)
          .id((d: ForceNode) => d.id)
          .distance(physicsRef.current.linkDistance)
      )
      .force(
        "charge",
        d3.forceManyBody().strength(physicsRef.current.chargeStrength)
      )
      .force("horizontal", horizontalForce)
      .force("vertical", verticalForce)
      .force(
        "collision",
        d3
          .forceCollide<ForceNode>()
          .radius(
            (d: ForceNode) =>
              (d.radius ?? 18) + physicsRef.current.collisionPadding
          )
      );

    simulationRef.current = simulation;

    const dragBehaviour = d3
      .drag<SVGGElement, ForceNode, ForceNode>()
      .on("start", (event: D3DragEvent<SVGGElement, ForceNode, ForceNode>, d: ForceNode) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event: D3DragEvent<SVGGElement, ForceNode, ForceNode>, d: ForceNode) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event: D3DragEvent<SVGGElement, ForceNode, ForceNode>, d: ForceNode) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

  nodeSelection.call(dragBehaviour);

    nodeSelection.on("mouseenter", function (
      event: PointerEvent,
      hoveredNode: ForceNode
    ) {
      const connected = new Set<string>([hoveredNode.id]);

      linkSelection.each(function (linkDatum: ForceLink) {
        const sourceId = resolveId(linkDatum.source);
        const targetId = resolveId(linkDatum.target);

        if (sourceId === hoveredNode.id || targetId === hoveredNode.id) {
          connected.add(sourceId);
          connected.add(targetId);
          d3.select(this)
            .attr("stroke", COLORS.linkHighlight)
            .attr("stroke-opacity", 0.9)
            .attr("stroke-width", 2.5);
        } else {
          d3.select(this).attr("stroke-opacity", 0.15);
        }
      });

      nodeSelection.style("opacity", (nodeDatum: ForceNode) =>
        connected.has(nodeDatum.id) ? 1 : 0.3
      );
    });

    nodeSelection.on("mouseleave", () => {
      linkSelection
        .attr("stroke", COLORS.link)
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1.5);

      nodeSelection.style("opacity", 1);
    });

    simulation.on("tick", () => {
      linkSelection
        .attr("x1", (d: ForceLink) => resolveX(d.source))
        .attr("y1", (d: ForceLink) => resolveY(d.source))
        .attr("x2", (d: ForceLink) => resolveX(d.target))
        .attr("y2", (d: ForceLink) => resolveY(d.target));

      nodeSelection.attr("transform", (d: ForceNode) =>
        `translate(${d.x ?? 0},${d.y ?? 0})`
      );
    });

    return () => {
      svg.on(".zoom", null);
      simulation.stop();
      zoomBehaviourRef.current = null;
    };
  }, [data, dimensions]);

  useEffect(() => {
    const simulation = simulationRef.current;
    if (!simulation) return;

    const linkForce = simulation.force("link") as
      | d3.ForceLink<ForceNode, ForceLink>
      | undefined;
    const chargeForce = simulation.force("charge") as
      | d3.ForceManyBody<ForceNode>
      | undefined;

    if (linkForce) {
      linkForce.distance(physics.linkDistance);
    }

    if (chargeForce) {
      chargeForce.strength(physics.chargeStrength);
    }

    simulation.force(
      "collision",
      d3
        .forceCollide<ForceNode>()
        .radius((d: ForceNode) => (d.radius ?? 18) + physics.collisionPadding)
    );

    simulation.alpha(0.6).restart();
  }, [physics]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-xl border border-slate-800 bg-[#1e1e1e]",
        className
      )}
    >
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleFitToView}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-200 shadow-md transition hover:border-indigo-400 hover:text-indigo-300"
          aria-label="Fit graph to view"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setSettingsOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-200 shadow-md transition hover:border-indigo-400 hover:text-indigo-300"
          aria-label="Toggle physics settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {settingsOpen && (
        <div className="absolute right-20 top-4 z-20 max-h-64 w-64 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900/90 p-4 text-slate-200 shadow-xl backdrop-blur">
          <h3 className="text-sm font-semibold text-indigo-300">
            Graph Physics
          </h3>
          <div className="mt-4 space-y-4 text-xs">
            <label className="block space-y-1">
              <span className="flex items-center justify-between">
                <span>Link Distance</span>
                <span className="font-mono text-indigo-200">
                  {physics.linkDistance}
                </span>
              </span>
              <input
                type="range"
                min={60}
                max={200}
                value={physics.linkDistance}
                onChange={handlePhysicsChange("linkDistance")}
                className="w-full accent-indigo-400"
              />
            </label>
            <label className="block space-y-1">
              <span className="flex items-center justify-between">
                <span>Charge Strength</span>
                <span className="font-mono text-indigo-200">
                  {physics.chargeStrength}
                </span>
              </span>
              <input
                type="range"
                min={-600}
                max={-80}
                step={10}
                value={physics.chargeStrength}
                onChange={handlePhysicsChange("chargeStrength")}
                className="w-full accent-indigo-400"
              />
            </label>
            <label className="block space-y-1">
              <span className="flex items-center justify-between">
                <span>Collision Padding</span>
                <span className="font-mono text-indigo-200">
                  {physics.collisionPadding}
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={40}
                value={physics.collisionPadding}
                onChange={handlePhysicsChange("collisionPadding")}
                className="w-full accent-indigo-400"
              />
            </label>
          </div>
        </div>
      )}

      <svg ref={svgRef} className="h-full w-full">
        <g ref={gRef} />
      </svg>

      <div className="pointer-events-none absolute left-4 top-4 z-10 w-48 rounded-lg border border-slate-700 bg-slate-800/90 p-4 text-slate-300 backdrop-blur">
        <h3 className="text-sm font-semibold text-indigo-300">Controls</h3>
        <ul className="mt-2 space-y-1 text-xs">
          <li>🖱️ Drag to pan</li>
          <li>🔍 Scroll to zoom</li>
          <li>✋ Drag nodes to reposition</li>
          <li>👆 Hover to highlight connections</li>
        </ul>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 z-10 w-52 rounded-lg border border-slate-700 bg-slate-800/90 p-4 text-slate-300 backdrop-blur">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
          Legend
        </h3>
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-indigo-400 bg-indigo-900" />
            <span>Categories</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-indigo-500 bg-slate-800" />
            <span>Skills</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-orange-300 bg-orange-900" />
            <span>Multi-domain Skills</span>
          </div>
        </div>
      </div>
    </div>
  );
}

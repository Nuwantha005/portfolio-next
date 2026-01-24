export type SkillNodeType = "category" | "skill" | "special";

export interface SkillNodeDefinition {
  id: string;
  type?: Exclude<SkillNodeType, "category">;
  children?: SkillEntry[];
  connections?: string[];
}

export type SkillEntry = string | SkillNodeDefinition;

export interface SkillCategoryDefinition {
  id: string;
  skills: SkillEntry[];
}

export interface SpecialNodeDefinition {
  id: string;
  connections: string[];
  children?: SkillEntry[];
}

export interface GraphLinkDefinition {
  from: string;
  to: string;
}

export interface SkillsGraphStructure {
  categories: SkillCategoryDefinition[];
  special?: SpecialNodeDefinition[];
  crossConnections?: GraphLinkDefinition[];
}

export interface SkillGraphNode {
  id: string;
  type: SkillNodeType;
  radius?: number;
}

export interface SkillGraphLink {
  source: string;
  target: string;
}

export interface SkillsGraphData {
  nodes: SkillGraphNode[];
  links: SkillGraphLink[];
  categoryAssignments: Record<string, string>;
}

export const skillsGraphStructure: SkillsGraphStructure = {
  categories: [
    {
      id: "Programming",
      skills: [
        "Python",
        "Java",
        "JavaFX",
        "C++",
        "Javascript",
        "Processing",
        "Arduino",
        "CSS"
      ]
    },
    {
      id: "CAD",
      skills: ["SolidWorks", "AutoCAD"]
    },
    {
      id: "Simulation",
      skills: [
        {
          id: "ANSYS",
          children: ["Mechanical", "Fluent"]
        },
        "MATLAB",
        "COMSOL Multiphysics",
        {
          id: "OpenFOAM",
          type: "special",
          connections: [
            "Libraries and Tools",
            "C++"
          ]
        }
      ]
    },
    {
      id: "Libraries and Tools",
      skills: ["Jupyter Notebooks", "Numpy", "OpenCV", "MatplotLib"]
    }
  ],
  special: [
    {
      id: "OpenCascade",
      connections: ["CAD", "Libraries and Tools", "C++"]
    }
  ],
  crossConnections: [
    { from: "Python", to: "Jupyter Notebooks" },
    { from: "Python", to: "Numpy" },
    { from: "Python", to: "OpenCV" },
    { from: "Python", to: "MatplotLib" },
    { from: "Java", to: "JavaFX" }
  ]
};

function addNode(
  id: string,
  type: SkillNodeType,
  map: Map<string, SkillGraphNode>
) {
  const trimmed = id.trim();
  if (!trimmed) return;
  const existing = map.get(trimmed);
  if (!existing) {
    map.set(trimmed, { id: trimmed, type });
    return;
  }

  if (existing.type === "skill" && type !== "skill") {
    existing.type = type;
  }
}

function normalizeEntry(entry: SkillEntry): SkillNodeDefinition {
  if (typeof entry === "string") {
    return { id: entry };
  }
  return entry;
}

function processEntry(
  entry: SkillEntry,
  parentId: string,
  map: Map<string, SkillGraphNode>,
  links: SkillGraphLink[],
  visited: Set<string>,
  rootCategory: string | null,
  categoryAssignments: Map<string, string>
) {
  const normalized = normalizeEntry(entry);
  const nodeType: SkillNodeType = normalized.type ?? "skill";

  addNode(normalized.id, nodeType, map);
  links.push({ source: parentId, target: normalized.id });

  if (rootCategory) {
    categoryAssignments.set(normalized.id, rootCategory);
  }

  normalized.connections?.forEach((target) => {
    const targetType = map.get(target)?.type ?? "skill";
    addNode(target, targetType, map);
    links.push({ source: normalized.id, target });
  });

  if (normalized.children && !visited.has(normalized.id)) {
    visited.add(normalized.id);
    normalized.children.forEach((child) =>
      processEntry(
        child,
        normalized.id,
        map,
        links,
        visited,
        rootCategory,
        categoryAssignments
      )
    );
    visited.delete(normalized.id);
  }
}

export function buildSkillsGraphData(
  structure: SkillsGraphStructure = skillsGraphStructure
) {
  const nodeMap = new Map<string, SkillGraphNode>();
  const links: SkillGraphLink[] = [];
  const visitStack = new Set<string>();
  const categoryAssignments = new Map<string, string>();

  structure.categories.forEach((category) => {
    addNode(category.id, "category", nodeMap);
    categoryAssignments.set(category.id, category.id);
    category.skills.forEach((skill) =>
      processEntry(
        skill,
        category.id,
        nodeMap,
        links,
        visitStack,
        category.id,
        categoryAssignments
      )
    );
  });

  structure.special?.forEach((specialNode) => {
    addNode(specialNode.id, "special", nodeMap);
    specialNode.connections.forEach((target) => {
      const targetType = nodeMap.get(target)?.type ?? "skill";
      addNode(target, targetType, nodeMap);
      links.push({ source: specialNode.id, target });
    });

    specialNode.children?.forEach((child) =>
      processEntry(
        child,
        specialNode.id,
        nodeMap,
        links,
        visitStack,
        null,
        categoryAssignments
      )
    );
  });

  structure.crossConnections?.forEach(({ from, to }) => {
    const sourceType = nodeMap.get(from)?.type ?? "skill";
    const targetType = nodeMap.get(to)?.type ?? "skill";
    addNode(from, sourceType, nodeMap);
    addNode(to, targetType, nodeMap);
    links.push({ source: from, target: to });
  });

  return {
    nodes: Array.from(nodeMap.values()),
    links,
    categoryAssignments: Object.fromEntries(categoryAssignments)
  };
}

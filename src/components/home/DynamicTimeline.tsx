"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Types
interface TimelineEntry {
  id: number;
  type: "education" | "internship" | "work" | "award" | "project";
  date: string;
  title: string;
  description: string;
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
  pathX: number;
  pathY: number;
  side: "left" | "right";
  mode?: "mobile-left" | "mobile-alternating" | "desktop";
  lineX?: number;
  centerX?: number;
}

interface TimelineConfig {
  cardWidth: number;
  cardGapX: number;
  rowGap: number;
  mobileBreakpoint: number;
  tabletBreakpoint: number;
  paddingX: number;
  paddingY: number;
  verticalGap: number;
}

// Your actual timeline data
const timelineData: TimelineEntry[] = [
  {
    id: 1,
    type: "education",
    date: "2007",
    title: "Started Primary Education",
    description:
      "My primary education was carried out at Liyanwadaa Ananda Samarakoon College. I studied there until grade 5 and faced the grade 5 scholarship examination.",
  },
  {
    id: 2,
    type: "education",
    date: "2011",
    title: "Started Secondary Education",
    description:
      "After passing the grade 5 scholarship examination, I enrolled in Lumbini College Colombo 5. I studied five years there and passed out O/L examination with 8A grades and one C grade.",
  },
  {
    id: 3,
    type: "education",
    date: "2017",
    title: "Enrolled in JavaSE course at ATARI City Campus",
    description:
      "After completing my O/L examination, I got the chance to enrol in a course conducted by ATARI City Campus, where I learnt about developing software solutions using Java and MySQL server.",
  },
  {
    id: 4,
    type: "education",
    date: "2018",
    title: "Started Education in Thurstan College",
    description:
      "After the G.C.E. O/L examination, I entered Thurstan College, Colombo 7 for my A/L education. I studied there for roughly 2 years and passed G.C.E. A/L examination with 3 A grades.",
  },
  {
    id: 5,
    type: "education",
    date: "2021",
    title: "Enrolled University of Moratuwa",
    description:
      "After the G.C.E. A/L Examination, I attained a B.Sc. Engineering Degree in University of Moratuwa. I was selected to Department of Mechanical Engineering.",
  },
  {
    id: 6,
    type: "internship",
    date: "Dec 2024",
    title: "Internship at Turbogen Consultancy Pvt. Ltd.",
    description:
      "Began a six-month internship at Turbogen Consultancy Pvt. Ltd., contributing to projects and gaining industry experience through mid-2025.",
  },
  {
    id: 7,
    type: "education",
    date: "2026",
    title: "Graduation",
    description:
      "I'm expected to graduate around April 2026 according to current academic plans for upcoming years.",
  },
];

// Configuration
const CONFIG: TimelineConfig = {
  cardWidth: 280,
  cardGapX: 40,
  rowGap: 80,
  mobileBreakpoint: 620,
  tabletBreakpoint: 768,
  paddingX: 20,
  paddingY: 40,
  verticalGap: 40,
};

// Type badge colors
const getTypeStyles = (
  type: TimelineEntry["type"]
): { bg: string; border: string; text: string } => {
  switch (type) {
    case "education":
      return {
        bg: "bg-gradient-to-r from-emerald-500 to-teal-500",
        border: "border-emerald-500/50",
        text: "text-emerald-400",
      };
    case "internship":
      return {
        bg: "bg-gradient-to-r from-amber-500 to-orange-500",
        border: "border-amber-500/50",
        text: "text-amber-400",
      };
    case "work":
      return {
        bg: "bg-gradient-to-r from-indigo-500 to-purple-500",
        border: "border-indigo-500/50",
        text: "text-indigo-400",
      };
    case "award":
      return {
        bg: "bg-gradient-to-r from-rose-500 to-pink-500",
        border: "border-rose-500/50",
        text: "text-rose-400",
      };
    case "project":
      return {
        bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
        border: "border-cyan-500/50",
        text: "text-cyan-400",
      };
    default:
      return {
        bg: "bg-gradient-to-r from-slate-500 to-gray-500",
        border: "border-slate-500/50",
        text: "text-slate-400",
      };
  }
};

// Timeline Card Component
const TimelineCard: React.FC<{
  entry: TimelineEntry;
  position: Position;
  index: number;
  isVisible: boolean;
}> = ({ entry, position, index, isVisible }) => {
  const typeStyles = getTypeStyles(entry.type);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        absolute backdrop-blur-md 
        bg-slate-800/80 dark:bg-slate-900/80
        border ${typeStyles.border}
        rounded-xl p-4 shadow-lg
        transition-all duration-300 ease-out
        ${isHovered ? "z-50 shadow-2xl shadow-indigo-500/20 scale-[1.02]" : "z-30"}
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{
        left: position.x,
        top: position.y,
        width: isHovered ? Math.max(position.width, 320) : position.width,
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <span
          className={`
            ${typeStyles.bg} text-white
            text-[10px] font-bold px-2 py-1 rounded-full
            uppercase tracking-wider shadow-sm
          `}
        >
          {entry.type}
        </span>
        <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
          {entry.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-foreground mb-2 leading-tight">
        {entry.title}
      </h3>

      {/* Description - expands on hover */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
        `}
        style={{
          maxHeight: isHovered ? "500px" : "80px",
        }}
      >
        <p className={`text-sm text-muted-foreground leading-relaxed ${!isHovered ? "line-clamp-3" : ""}`}>
          {entry.description}
        </p>
      </div>

      {/* Expand indicator */}
      <div
        className={`
          flex items-center justify-center mt-2 text-xs text-muted-foreground/50
          transition-all duration-300
          ${isHovered ? "opacity-0 h-0" : "opacity-100 h-4"}
        `}
      >
        <span className="text-[10px]">hover to expand</span>
      </div>
    </div>
  );
};

// Connector Dot Component
const ConnectorDot: React.FC<{
  x: number;
  y: number;
  delay: number;
  isVisible: boolean;
}> = ({ x, y, delay, isVisible }) => (
  <div
    className={`
      absolute w-4 h-4 rounded-full z-20
      bg-indigo-500 border-2 border-background
      shadow-lg shadow-indigo-500/50
      transition-all duration-500
      ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
    `}
    style={{
      left: x - 8,
      top: y - 8,
      transitionDelay: `${delay}ms`,
    }}
  >
    {/* Pulse ring */}
    <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-30" />
  </div>
);

// Connector Line Component
const ConnectorLine: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
  isVisible: boolean;
  isHorizontal?: boolean;
}> = ({ from, to, delay, isVisible, isHorizontal = true }) => {
  const width = isHorizontal ? Math.abs(to.x - from.x) : 2;
  const height = isHorizontal ? 2 : Math.abs(to.y - from.y);
  const left = Math.min(from.x, to.x);
  const top = Math.min(from.y, to.y);

  return (
    <div
      className={`
        absolute bg-gradient-to-r from-indigo-500/50 to-purple-500/50
        z-10 rounded-full
        transition-all duration-500
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
      style={{
        left,
        top,
        width: isVisible ? width : 0,
        height,
        transitionDelay: `${delay}ms`,
      }}
    />
  );
};

// Main Dynamic Timeline Component
const DynamicTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardHeights, setCardHeights] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Measure card heights
  const measureCards = useCallback(() => {
    if (!contentRef.current) return;

    const tempContainer = document.createElement("div");
    tempContainer.style.cssText =
      "position:absolute;visibility:hidden;width:280px;";
    document.body.appendChild(tempContainer);

    const heights = timelineData.map((entry) => {
      const tempCard = document.createElement("div");
      tempCard.className = "p-4";
      tempCard.innerHTML = `
        <div class="flex justify-between items-start mb-2">
          <span class="text-[10px] font-bold px-2 py-1">${entry.type}</span>
          <span class="text-xs">${entry.date}</span>
        </div>
        <h3 class="text-base font-bold mb-2">${entry.title}</h3>
        <p class="text-sm leading-relaxed">${entry.description}</p>
      `;
      tempContainer.appendChild(tempCard);
      const height = tempCard.offsetHeight;
      tempContainer.removeChild(tempCard);
      return Math.max(height, 120);
    });

    document.body.removeChild(tempContainer);
    setCardHeights(heights);
  }, []);

  // Calculate positions based on layout mode
  const positions: Position[] = useMemo(() => {
    if (!containerWidth || cardHeights.length === 0) return [];

    const isMobile = containerWidth < CONFIG.mobileBreakpoint;
    const isTablet =
      containerWidth >= CONFIG.mobileBreakpoint &&
      containerWidth < CONFIG.tabletBreakpoint;

    const result: Position[] = [];
    let currentY = CONFIG.paddingY;

    if (isMobile) {
      // Small mobile: Line left, cards right
      const lineX = 30;

      timelineData.forEach((_, i) => {
        const cardHeight = cardHeights[i] || 120;
        const cardWidth = containerWidth - 80;

        result.push({
          x: lineX + 30,
          y: currentY,
          width: cardWidth,
          height: cardHeight,
          pathX: lineX,
          pathY: currentY + 20,
          side: "right",
          mode: "mobile-left",
          lineX,
        });

        currentY += cardHeight + CONFIG.verticalGap;
      });
    } else if (isTablet) {
      // Tablet: Alternating sides with center line
      const centerX = containerWidth / 2;
      const cardWidth = Math.min(CONFIG.cardWidth, containerWidth / 2 - 40);

      timelineData.forEach((_, i) => {
        const isLeft = i % 2 === 0;
        const cardHeight = cardHeights[i] || 120;
        const gapFromCenter = 25;

        const x = isLeft
          ? centerX - cardWidth - gapFromCenter
          : centerX + gapFromCenter;

        result.push({
          x,
          y: currentY,
          width: cardWidth,
          height: cardHeight,
          pathX: centerX,
          pathY: currentY + 20,
          side: isLeft ? "left" : "right",
          mode: "mobile-alternating",
          centerX,
        });

        currentY += cardHeight + CONFIG.verticalGap;
      });
    } else {
      // Desktop: Snake/Zigzag layout
      let cols = Math.floor(
        (containerWidth - CONFIG.paddingX * 2 + CONFIG.cardGapX) /
          (CONFIG.cardWidth + CONFIG.cardGapX)
      );
      cols = Math.max(1, Math.min(cols, 4));

      const totalGridWidth =
        cols * CONFIG.cardWidth + (cols - 1) * CONFIG.cardGapX;
      const startX = (containerWidth - totalGridWidth) / 2;

      let colIndex = 0;
      let direction = 1;
      let rowMaxHeight = 0;

      timelineData.forEach((_, i) => {
        const cardHeight = cardHeights[i] || 120;
        if (cardHeight > rowMaxHeight) rowMaxHeight = cardHeight;

        const visualCol = direction === 1 ? colIndex : cols - 1 - colIndex;
        const x = startX + visualCol * (CONFIG.cardWidth + CONFIG.cardGapX);

        result.push({
          x,
          y: currentY + 35,
          width: CONFIG.cardWidth,
          height: cardHeight,
          pathX: x + CONFIG.cardWidth / 2,
          pathY: currentY,
          side: x < containerWidth / 2 ? "left" : "right",
          mode: "desktop",
        });

        colIndex++;
        if (colIndex >= cols) {
          colIndex = 0;
          direction *= -1;
          currentY += rowMaxHeight + CONFIG.rowGap;
          rowMaxHeight = 0;
        }
      });
    }

    return result;
  }, [containerWidth, cardHeights]);

  // Generate SVG path
  const svgPath = useMemo(() => {
    if (positions.length === 0) return "";

    const isMobile = containerWidth < CONFIG.mobileBreakpoint;
    const isTablet =
      containerWidth >= CONFIG.mobileBreakpoint &&
      containerWidth < CONFIG.tabletBreakpoint;

    if (isMobile || isTablet) {
      // Straight vertical line
      const x = isMobile ? 30 : containerWidth / 2;
      const startY = CONFIG.paddingY;
      const endY = Math.max(...positions.map((p) => p.pathY)) + 40;
      return `M ${x} ${startY} L ${x} ${endY}`;
    }

    // Desktop: Snake path with curves
    const pathPoints = positions.map((p) => ({ x: p.pathX, y: p.pathY }));

    if (pathPoints.length === 0) return "";
    if (pathPoints.length === 1) {
      return `M ${pathPoints[0].x} ${pathPoints[0].y} L ${pathPoints[0].x} ${pathPoints[0].y + 60}`;
    }

    // Check if it's essentially a single column (all X values are very close)
    const xValues = pathPoints.map(p => p.x);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const isSingleColumn = (maxX - minX) < 20;

    if (isSingleColumn) {
      // Single column desktop - draw a straight vertical line through all points
      const avgX = xValues.reduce((a, b) => a + b, 0) / xValues.length;
      const startY = Math.min(...pathPoints.map(p => p.y)) - 20;
      const endY = Math.max(...pathPoints.map(p => p.y)) + 60;
      return `M ${avgX} ${startY} L ${avgX} ${endY}`;
    }

    let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;

    for (let i = 0; i < pathPoints.length - 1; i++) {
      const curr = pathPoints[i];
      const next = pathPoints[i + 1];

      const sameRow = Math.abs(curr.y - next.y) < 10;

      if (sameRow) {
        // Same row - straight horizontal line
        d += ` L ${next.x} ${next.y}`;
      } else {
        // Different row - need to create a U-turn
        // Determine which side the current point is on to decide bulge direction
        const isRightSide = curr.x > containerWidth / 2;
        const bulgeDir = isRightSide ? 1 : -1;
        const controlX = curr.x + (80 * bulgeDir);
        
        // Gemini's approach: both control points have same X, different Y
        d += ` C ${controlX} ${curr.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
      }
    }

    // Extend path down from last point
    const last = pathPoints[pathPoints.length - 1];
    d += ` L ${last.x} ${last.y + 60}`;

    return d;
  }, [positions, containerWidth]);

  // Container height
  const containerHeight = useMemo(() => {
    if (positions.length === 0) return 400;
    const maxY = Math.max(...positions.map((p) => p.y + p.height));
    return maxY + 100;
  }, [positions]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measure
    handleResize();
    measureCards();

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleResize();
        measureCards();
      }, 100);
    };

    window.addEventListener("resize", debouncedResize);

    // Trigger visibility after mount
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [measureCards]);

  const isMobile = containerWidth < CONFIG.mobileBreakpoint;
  const isTablet =
    containerWidth >= CONFIG.mobileBreakpoint &&
    containerWidth < CONFIG.tabletBreakpoint;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      {/* SVG Path Layer - only render when we have valid dimensions */}
      {containerWidth > 0 && (
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={containerWidth}
          height={containerHeight}
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient
              id="dynamic-timeline-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="1" />
              <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="1" />
            </linearGradient>
            <filter id="dynamic-timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {svgPath && (
            <path
              d={svgPath}
              fill="none"
              stroke="url(#dynamic-timeline-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#dynamic-timeline-glow)"
              className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </svg>
      )}

      {/* Content Layer */}
      <div ref={contentRef} className="relative w-full h-full">
        {/* Connector dots and lines */}
        {positions.map((pos, i) => (
          <React.Fragment key={`connector-${i}`}>
            <ConnectorDot
              x={pos.pathX}
              y={pos.pathY}
              delay={i * 80}
              isVisible={isVisible}
            />

            {/* Connector line from dot to card */}
            {pos.mode === "mobile-left" && (
              <ConnectorLine
                from={{ x: pos.lineX! + 8, y: pos.pathY }}
                to={{ x: pos.x, y: pos.pathY }}
                delay={i * 80 + 50}
                isVisible={isVisible}
                isHorizontal
              />
            )}

            {pos.mode === "mobile-alternating" && (
              <ConnectorLine
                from={{
                  x:
                    pos.side === "left"
                      ? pos.x + pos.width
                      : pos.centerX! + 8,
                  y: pos.pathY,
                }}
                to={{
                  x: pos.side === "left" ? pos.centerX! - 8 : pos.x,
                  y: pos.pathY,
                }}
                delay={i * 80 + 50}
                isVisible={isVisible}
                isHorizontal
              />
            )}

            {pos.mode === "desktop" && (
              <ConnectorLine
                from={{ x: pos.pathX, y: pos.pathY + 8 }}
                to={{ x: pos.pathX, y: pos.y }}
                delay={i * 80 + 50}
                isVisible={isVisible}
                isHorizontal={false}
              />
            )}
          </React.Fragment>
        ))}

        {/* Timeline Cards */}
        {positions.map((pos, i) => (
          <TimelineCard
            key={timelineData[i].id}
            entry={timelineData[i]}
            position={pos}
            index={i}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* Layout mode indicator (can be removed in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs font-mono text-muted-foreground z-50">
          {isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"} •{" "}
          {containerWidth}px
        </div>
      )}
    </div>
  );
};

export default DynamicTimeline;

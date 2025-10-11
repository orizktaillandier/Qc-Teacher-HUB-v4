import React from 'react';

// Parse and render visual math components
export const renderMathVisual = (visualCode: string): React.ReactNode => {
  const [type, ...params] = visualCode.split(':');

  switch(type) {
    case 'angle':
      return <AngleVisual params={params.join(':')} />;
    case 'triangle':
      return <TriangleVisual params={params.join(':')} />;
    case 'triangle-sides':
      return <TriangleSidesVisual params={params.join(':')} />;
    case 'fraction':
      return <FractionVisual params={params.join(':')} />;
    case 'numberline':
      return <NumberLineVisual params={params.join(':')} />;
    case 'grid':
      return <GridVisual params={params.join(':')} />;
    case 'clock':
      return <ClockVisual params={params.join(':')} />;
    case 'shape':
      return <ShapeVisual params={params.join(':')} />;
    case 'graph':
      return <BarGraphVisual params={params.join(':')} />;
    default:
      return null;
  }
};

// Angle visualization: angle:degrees:size
const AngleVisual = ({ params }: { params: string }) => {
  const [degrees = '45', size = '100'] = params.split(':');
  const angleNum = parseInt(degrees);

  // Draw from center (0,0) with enough line length to be visible
  const lineLength = 80;

  // Calculate angle line endpoint from origin
  const rad = (angleNum * Math.PI) / 180;
  const angleX = lineLength * Math.cos(rad);
  const angleY = -lineLength * Math.sin(rad); // Negative for correct orientation

  // Arc parameters
  const arcRadius = 30;
  const arcEndX = arcRadius * Math.cos(rad);
  const arcEndY = -arcRadius * Math.sin(rad);
  const largeArcFlag = angleNum > 180 ? 1 : 0;

  // Calculate the actual bounds of the drawing
  const padding = 15;
  const minX = Math.min(0, angleX) - padding;
  const maxX = Math.max(lineLength, angleX) + padding;
  const minY = Math.min(0, angleY) - padding;
  const maxY = Math.max(0, angleY) + padding;

  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  return (
    <svg
      viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Horizontal reference line from origin */}
      <line
        x1="0"
        y1="0"
        x2={lineLength}
        y2="0"
        stroke="black"
        strokeWidth="2"
      />
      {/* Angled line from origin */}
      <line
        x1="0"
        y1="0"
        x2={angleX}
        y2={angleY}
        stroke="black"
        strokeWidth="2"
      />
      {/* Arc showing angle */}
      {angleNum > 0 && angleNum < 360 && (
        <path
          d={`M ${arcRadius} 0 A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke="blue"
          strokeWidth="1.5"
        />
      )}
      {/* Angle label - positioned at midpoint of arc */}
      <text
        x={(arcRadius * 1.8) * Math.cos((angleNum / 2) * Math.PI / 180)}
        y={-(arcRadius * 1.8) * Math.sin((angleNum / 2) * Math.PI / 180)}
        fontSize="18"
        fill="blue"
        fontWeight="bold"
        textAnchor="middle"
      >
        ?
      </text>
      {/* Center point at origin */}
      <circle cx="0" cy="0" r="3" fill="black" />
    </svg>
  );
};

// Triangle visualization with angles: triangle:angleA:angleB:angleC
const TriangleVisual = ({ params }: { params: string }) => {
  const [angleA = '60', angleB = '60', angleC = '60'] = params.split(':');

  // Check which angles are known vs unknown (check for 'x' as well since that might be what's passed)
  const isAngleAKnown = angleA !== '?' && angleA !== 'x' && angleA !== '' && !isNaN(parseInt(angleA));
  const isAngleBKnown = angleB !== '?' && angleB !== 'x' && angleB !== '' && !isNaN(parseInt(angleB));
  const isAngleCKnown = angleC !== '?' && angleC !== 'x' && angleC !== '' && !isNaN(parseInt(angleC));

  // Parse known angles and calculate unknown ones for drawing
  const a1 = isAngleAKnown ? parseInt(angleA) : 60; // Default for drawing if unknown
  const a2 = isAngleBKnown ? parseInt(angleB) : 60; // Default for drawing if unknown
  const a3 = isAngleCKnown ? parseInt(angleC) : (180 - a1 - a2);

  // Ensure we have valid angles for drawing
  const drawAngle1 = isAngleAKnown ? a1 : (180 - a2 - a3);
  const drawAngle2 = isAngleBKnown ? a2 : (180 - a1 - a3);
  const drawAngle3 = isAngleCKnown ? a3 : (180 - a1 - a2);

  // Create triangle using angles
  const baseLength = 100;
  const padding = 35; // Increased padding to account for labels outside triangle

  // Calculate the third vertex position using angles
  const angle1Rad = (drawAngle1 * Math.PI) / 180;

  // Third vertex relative to base
  const height = baseLength * Math.sin(angle1Rad);
  const xOffset = baseLength * Math.cos(angle1Rad);

  // Calculate viewBox to fit triangle with labels
  const labelSpace = 25; // Extra space for labels outside triangle
  const minX = Math.min(0, xOffset) - padding - labelSpace;
  const maxX = Math.max(baseLength, xOffset) + padding + labelSpace;
  const minY = -height - padding - labelSpace; // Extra space for top label
  const maxY = padding + labelSpace; // Extra space for bottom labels

  const viewWidth = maxX - minX;
  const viewHeight = maxY - minY;

  // Position angle labels with offset to avoid overlap
  const labelOffset = 15;

  return (
    <svg viewBox={`${minX} ${minY} ${viewWidth} ${viewHeight}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <polygon
        points={`0,0 ${baseLength},0 ${xOffset},${-height}`}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      {/* Angle A - bottom left - positioned outside */}
      <text
        x={-20}
        y={15}
        fontSize="14"
        fill="blue"
        fontWeight="bold"
        textAnchor="middle"
      >
        {isAngleAKnown ? `${angleA}°` : '?'}
      </text>

      {/* Angle B - bottom right - positioned outside */}
      <text
        x={baseLength + 20}
        y={15}
        fontSize="14"
        fill="blue"
        fontWeight="bold"
        textAnchor="middle"
      >
        {isAngleBKnown ? `${angleB}°` : '?'}
      </text>

      {/* Angle C - top - positioned above the vertex */}
      <text
        x={xOffset}
        y={-height - 15}
        fontSize="14"
        fill="blue"
        fontWeight="bold"
        textAnchor="middle"
      >
        {isAngleCKnown ? `${angleC}°` : '?'}
      </text>
    </svg>
  );
};

// Triangle visualization with sides: triangle-sides:a:b:c:type
const TriangleSidesVisual = ({ params }: { params: string }) => {
  const [a = '3', b = '4', c = '5', type = 'right'] = params.split(':');

  // Fixed viewBox for consistency
  const width = 120;
  const height = 100;
  const padding = 15;

  // Triangle vertices (ensure they stay within bounds)
  const bottomY = height - padding;
  const topY = padding;
  const leftX = padding;
  const rightX = width - padding;
  const centerX = width / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <polygon
        points={`${leftX},${bottomY} ${rightX},${bottomY} ${centerX},${topY}`}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      {/* Side labels positioned inside viewBox */}
      <text x={leftX - 10} y={(bottomY + topY) / 2} fontSize="11" textAnchor="end">{a}</text>
      <text x={rightX + 10} y={(bottomY + topY) / 2} fontSize="11" textAnchor="start">{b}</text>
      <text x={centerX} y={bottomY + 12} fontSize="11" textAnchor="middle">{c}</text>
      {type === 'right' && (
        <rect x={centerX - 4} y={bottomY - 10} width="8" height="8" fill="none" stroke="black" strokeWidth="1" />
      )}
    </svg>
  );
};

// Fraction visualization: fraction:numerator:denominator:filled
const FractionVisual = ({ params }: { params: string }) => {
  const [num = '1', den = '4', filled = '1'] = params.split(':');
  const numerator = parseInt(num);
  const denominator = Math.min(parseInt(den), 12); // Cap at 12 for readability
  const filledParts = Math.min(parseInt(filled), denominator);

  // Fixed dimensions
  const size = 120;
  const center = size / 2;
  const radius = size * 0.4; // Increased from 0.35

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Circle background */}
      <circle cx={center} cy={center} r={radius} fill="white" stroke="black" strokeWidth="2" />

      {/* Pie slices */}
      {Array.from({ length: denominator }).map((_, i) => {
        const startAngle = (360 / denominator) * i - 90; // Start from top
        const endAngle = (360 / denominator) * (i + 1) - 90;
        const rad1 = (startAngle * Math.PI) / 180;
        const rad2 = (endAngle * Math.PI) / 180;

        const x1 = center + radius * Math.cos(rad1);
        const y1 = center + radius * Math.sin(rad1);
        const x2 = center + radius * Math.cos(rad2);
        const y2 = center + radius * Math.sin(rad2);

        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        return (
          <path
            key={i}
            d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
            fill={i < filledParts ? '#4A7FE6' : 'white'}
            stroke="black"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Fraction text */}
      <text x={center} y={center + 5} fontSize="16" textAnchor="middle" fontWeight="bold" fill="black">
        {numerator}/{denominator}
      </text>
    </svg>
  );
};

// Number line visualization: numberline:min:max:mark1,mark2,mark3
const NumberLineVisual = ({ params }: { params: string }) => {
  const [min = '0', max = '10', marks = ''] = params.split(':');
  const minNum = parseInt(min);
  const maxNum = parseInt(max);
  const markPoints = marks ? marks.split(',').map(Number) : [];

  // Fixed dimensions for consistent rendering
  const width = 280;
  const height = 80;
  const lineY = height / 2;
  const lineStartX = 20;
  const lineEndX = width - 20;
  const lineLength = lineEndX - lineStartX;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Main line */}
      <line x1={lineStartX} y1={lineY} x2={lineEndX} y2={lineY} stroke="black" strokeWidth="2" />

      {/* Arrow ends */}
      <polygon points={`${lineStartX-5},${lineY} ${lineStartX},${lineY-3} ${lineStartX},${lineY+3}`} fill="black" />
      <polygon points={`${lineEndX+5},${lineY} ${lineEndX},${lineY-3} ${lineEndX},${lineY+3}`} fill="black" />

      {/* Tick marks and numbers */}
      {Array.from({ length: Math.min(maxNum - minNum + 1, 21) }).map((_, i) => {
        const x = lineStartX + (lineLength / (maxNum - minNum)) * i;
        const value = minNum + i;
        return (
          <g key={i}>
            <line x1={x} y1={lineY - 5} x2={x} y2={lineY + 5} stroke="black" strokeWidth="1" />
            <text x={x} y={lineY + 20} fontSize="10" textAnchor="middle">{value}</text>
          </g>
        );
      })}

      {/* Marked points */}
      {markPoints.filter(p => p >= minNum && p <= maxNum).map((point, i) => {
        const x = lineStartX + (lineLength / (maxNum - minNum)) * (point - minNum);
        return (
          <circle key={i} cx={x} cy={lineY} r="4" fill="red" />
        );
      })}
    </svg>
  );
};

// Grid for area/multiplication: grid:rows:cols:filled
const GridVisual = ({ params }: { params: string }) => {
  const [rows = '3', cols = '4', filled = '0'] = params.split(':');
  const rowNum = Math.min(parseInt(rows), 5); // Cap at 5 rows
  const colNum = Math.min(parseInt(cols), 5); // Cap at 5 columns
  const filledNum = parseInt(filled);

  // Fixed cell size for consistency
  const cellSize = 24; // Increased from 20
  const gap = 2;
  const padding = 10;
  const viewWidth = colNum * (cellSize + gap) + padding * 2;
  const viewHeight = rowNum * (cellSize + gap) + padding * 2;

  return (
    <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {Array.from({ length: rowNum }).map((_, row) =>
        Array.from({ length: colNum }).map((_, col) => {
          const index = row * colNum + col;
          return (
            <rect
              key={`${row}-${col}`}
              x={col * (cellSize + gap) + padding}
              y={row * (cellSize + gap) + padding}
              width={cellSize}
              height={cellSize}
              fill={index < filledNum ? '#4A7FE6' : 'white'}
              stroke="black"
              strokeWidth="1"
            />
          );
        })
      )}
    </svg>
  );
};

// Clock visualization: clock:hour:minute
const ClockVisual = ({ params }: { params: string }) => {
  const [hour = '3', minute = '15'] = params.split(':');
  const h = parseInt(hour);
  const m = parseInt(minute);

  // Fixed size and center
  const size = 120;
  const center = size / 2;
  const clockRadius = size * 0.45; // Increased from 0.4

  const hourAngle = (h % 12) * 30 + (m / 60) * 30 - 90;
  const minuteAngle = m * 6 - 90;

  // Ensure hands stay within clock face
  const hourHandLength = clockRadius * 0.5;
  const minuteHandLength = clockRadius * 0.7;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Clock face */}
      <circle cx={center} cy={center} r={clockRadius} fill="white" stroke="black" strokeWidth="2" />

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x1 = center + (clockRadius - 5) * Math.cos(angle);
        const y1 = center + (clockRadius - 5) * Math.sin(angle);
        const x2 = center + (clockRadius - 2) * Math.cos(angle);
        const y2 = center + (clockRadius - 2) * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="1.5" />
        );
      })}

      {/* Hour hand */}
      <line
        x1={center}
        y1={center}
        x2={center + hourHandLength * Math.cos(hourAngle * Math.PI / 180)}
        y2={center + hourHandLength * Math.sin(hourAngle * Math.PI / 180)}
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={center}
        y1={center}
        x2={center + minuteHandLength * Math.cos(minuteAngle * Math.PI / 180)}
        y2={center + minuteHandLength * Math.sin(minuteAngle * Math.PI / 180)}
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={center} cy={center} r="3" fill="black" />
    </svg>
  );
};

// Basic shapes: shape:type:size (square/rectangle/circle/pentagon/hexagon)
const ShapeVisual = ({ params }: { params: string }) => {
  const [type = 'square'] = params.split(':');

  // Fixed size for consistent rendering
  const size = 100;
  const center = size / 2;
  const radius = size * 0.4; // Increased from 0.35
  const padding = size * 0.08; // Reduced padding

  const shapes: Record<string, React.ReactNode> = {
    square: (
      <rect
        x={padding}
        y={padding}
        width={size - 2 * padding}
        height={size - 2 * padding}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    ),
    rectangle: (
      <rect
        x={padding}
        y={size * 0.25}
        width={size - 2 * padding}
        height={size * 0.5}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    ),
    circle: (
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    ),
    pentagon: (
      <polygon
        points={Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 72 - 90) * Math.PI / 180;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return `${x},${y}`;
        }).join(' ')}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    ),
    hexagon: (
      <polygon
        points={Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60) * Math.PI / 180;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return `${x},${y}`;
        }).join(' ')}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    )
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {shapes[type] || shapes.square}
    </svg>
  );
};

// Bar graph: graph:values (comma separated)
const BarGraphVisual = ({ params }: { params: string }) => {
  const values = params.split(',').map(Number).slice(0, 5); // Max 5 bars
  const max = Math.max(...values, 1); // Ensure max is at least 1

  // Fixed dimensions
  const width = 200;
  const height = 150;
  const padding = 20;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const barWidth = Math.min(25, (graphWidth - 20) / values.length - 5);
  const barGap = 5;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Y axis */}
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" strokeWidth="2" />
      {/* X axis */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" strokeWidth="2" />

      {/* Y axis labels */}
      <text x={padding - 5} y={padding} fontSize="10" textAnchor="end">{max}</text>
      <text x={padding - 5} y={height - padding + 3} fontSize="10" textAnchor="end">0</text>

      {/* Bars */}
      {values.map((value, i) => {
        const barHeight = (value / max) * (graphHeight - 10);
        const x = padding + 10 + i * (barWidth + barGap);
        const y = height - padding - barHeight;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#4A7FE6"
              stroke="black"
              strokeWidth="1"
            />
            <text x={x + barWidth / 2} y={height - padding + 12} fontSize="10" textAnchor="middle">
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// Parse question text and extract visual codes
export const parseQuestionWithVisuals = (text: string): { questionText: string; visuals: React.ReactNode[] } => {
  // Pattern to match [visual:type:params]
  const visualPattern = /\[visual:(.*?)\]/g;
  const visuals: React.ReactNode[] = [];
  let cleanText = text;
  let match;
  let matchIndex = 0;

  while ((match = visualPattern.exec(text)) !== null) {
    // Extract the visual component
    const visualCode = match[1];
    visuals.push(
      <div key={matchIndex} style={{ width: '100%', height: '100%' }}>
        {renderMathVisual(visualCode)}
      </div>
    );
    matchIndex++;
  }

  // Remove visual codes from text
  cleanText = text.replace(visualPattern, '').trim();

  return { questionText: cleanText, visuals };
};
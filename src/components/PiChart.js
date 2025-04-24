import React from "react";

const PieChart = ({ data }) => {
  const size = 200;
  const radius = size / 2;
  const colors = ["#D32F2F", "#FBC02D", "#CFD8DC", "#388E3C"]; // Match order to your legend
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  const renderSlices = () => {
    if (data.length === 1) {
      return (
        <circle
          key={data[0].name}
          cx={radius}
          cy={radius}
          r={radius}
          fill={colors[0]}
        />
      );
    }

    cumulativePercent = 0;

    return data.map((slice, index) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      const slicePercent = slice.value / total;
      cumulativePercent += slicePercent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slicePercent > 0.5 ? 1 : 0;

      const pathData = [
        `M ${startX * radius + radius} ${startY * radius + radius}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX * radius + radius} ${
          endY * radius + radius
        }`,
        `L ${radius} ${radius}`,
      ].join(" ");

      return (
        <path
          key={slice.name || index}
          d={pathData}
          fill={colors[index % colors.length]}
        />
      );
    });
  };

  return (
    <div className="flex items-center space-x-8">
      <svg
        className="w-52 h-52"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderSlices()}
        <circle cx={radius} cy={radius} r={radius * 0.6} fill="white" />
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dy="0.3em"
          fontSize="18"
          fontWeight="bold"
        >
          {total}
        </text>
        <text
          x={radius}
          y={radius + 20}
          textAnchor="middle"
          fontSize="10"
          fill="#555"
        >
          Total
        </text>
      </svg>

      {/* Legend */}
      <div className="space-y-2 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-gray-700">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const RADIAN = Math.PI / 180;

// Custom label % đơn giản
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#444"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart = ({ data, totalAmount }) => {
  return (
    <div className="relative w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {/* Gradient sáng hơn cho slices */}
            <linearGradient id="gradPurple" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="gradRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            {/* Glow sáng hơn */}
            <filter id="pieGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#a855f7" floodOpacity="0.5"/>
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#3b82f6" floodOpacity="0.3"/>
            </filter>
          </defs>

          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={65}
            paddingAngle={1}
            labelLine={false}
            label={renderCustomizedLabel}
            filter="url(#pieGlow)"
          >
            {data.map((entry, index) => {
              const fills = ["url(#gradPurple)", "url(#gradRed)", "url(#gradGreen)"];
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={fills[index % fills.length]}

                />
              );
            })}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "13px",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      {/* Total ở giữa donut */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-xs text-gray-500 -translate-y-2">Total</p>
        <p className="text-xl font-bold text-gray-800 -translate-y-2">
          {totalAmount?.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CustomPieChart;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Tooltip tùy chỉnh
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border text-sm">
        <p className="font-semibold text-purple-700">{item.title || item.source}</p>
        <p className="text-gray-500">
          {item.date
            ? new Date(item.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </p>
        <p className="text-green-600 font-bold">${item.amount}</p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({
  data,
  dataKey = "amount",
  barRadius = [8, 8, 0, 0],
}) => {
  const colors = ["url(#barGradientPurple)", "url(#barGradientBlue)"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        {/* Trục */}
        <XAxis
          dataKey="date"
          stroke="#6b7280"
          tickFormatter={(date) =>
            date ? new Date(date).toLocaleDateString("en-GB") : "N/A"
          }
        />
        <YAxis stroke="#6b7280" />
        <Tooltip content={<CustomTooltip />} />

        {/* Gradient + Glow */}
        <defs>
          {/* Gradient tím */}
          <linearGradient id="barGradientPurple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>

          {/* Gradient xanh */}
          <linearGradient id="barGradientBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3bd1f6ff" />
            <stop offset="100%" stopColor="#1e90afff" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="6"
              floodColor="#8b5cf6"
              floodOpacity="0.6"
            />
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="8"
              floodColor="#3bdaf6ff"
              floodOpacity="0.4"
            />
          </filter>
        </defs>

        {/* Bar với màu xen kẽ */}
        <Bar dataKey={dataKey} radius={barRadius} filter="url(#barGlow)">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;

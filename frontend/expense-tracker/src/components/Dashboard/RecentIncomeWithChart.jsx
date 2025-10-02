import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    if (!data) return [];
    return data.map((item) => ({
      name: item?.source || item?.title || "Unknown",
      amount: item?.amount || 0,
    }));
  };

  useEffect(() => {
    const result = prepareChartData();
    setChartData(result);
  }, [data]);

  return (
    <div className="card p-4 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        dataKey="amount"
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;

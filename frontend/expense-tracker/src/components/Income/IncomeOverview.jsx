import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";


const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-6 rounded-xl shadow bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-medium">Income Overview</h5>
          <p className="text-sm text-gray-500">
            Track your earnings over time and analyze your income
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-2 py-1 rounded bg-gray-400 text-sm text-white hover:bg-gray-500 transition-colors"
          onClick={onAddIncome}
        >
          <LuPlus className="text-base" />
          Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;

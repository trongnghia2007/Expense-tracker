import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";


const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-6 rounded-xl shadow bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-medium">Expense Overview</h5>
          <p className="text-sm text-gray-500">
            Track your spending trends over time and analyze your expenses
          </p>
        </div>

        <button
            className="flex items-center gap-2 px-2 py-1 rounded bg-gray-400 text-sm text-white hover:bg-gray-500 transition-colors"
            onClick={onAddExpense}
        >
            <LuPlus className="text-base" />
            Add Expense
        </button>
      </div>


      <div className="w-full h-64">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  )
}

export default ExpenseOverview
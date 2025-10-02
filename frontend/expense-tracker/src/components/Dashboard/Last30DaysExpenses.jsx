import React, { useState, useEffect } from "react";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";


const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card p-4 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold mb-5">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} barColor="#875CF5" />
    </div>
  );
};

export default Last30DaysExpenses;

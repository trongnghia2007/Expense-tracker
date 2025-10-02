import React from "react";
import moment from "moment";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card p-6 rounded-xl shadow bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-medium">Expenses</h5>
        <button
          className="flex items-center gap-2 px-2 py-1 rounded bg-gray-400 text-sm text-white hover:bg-gray-500 transition-colors"
          onClick={onDownload}
        >
          <LuDownload className="text-base" />
          Download
        </button>
      </div>

      {/* Transaction List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category || expense.source}  // thường expense sẽ có category
            icon={expense.icon}
            date={moment(expense.date).format("MMM D, YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;

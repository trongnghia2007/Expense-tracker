import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card p-4 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Income</h5>
        <button
          onClick={onSeeMore}
          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-lg transition"
        >
          <span>See All</span>
          <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 3)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source || item.title}
            icon={item.icon}
            date={new Date(item.date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;

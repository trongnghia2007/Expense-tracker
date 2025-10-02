import React from "react";
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  type,         // "income" hoặc "expense"
  date,
  amount,
  icon,         // nhận icon từ data
  hideDeleteBtn,
  onDelete
}) => {
  // Chọn icon hiển thị
  const getIcon = () => {
    if (icon && icon !== "") return <span className="text-lg">{icon}</span>;
    if (type === "income") return <LuTrendingUp className="w-6 h-6" />;
    if (type === "expense") return <LuTrendingDown className="w-6 h-6" />;
    return <LuUtensils className="w-6 h-6" />;
  };

  // Chọn màu cho số tiền
  const amountColor = type === "income" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-gray-500 bg-gray-100 rounded-full">
        {getIcon()}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Amount */}
      <div className={`text-xs ml-auto font-semibold px-3 py-1 rounded-[10px] ${amountColor}`}>
        {type === "expense" ? `- $${amount}` : `+ $${amount}`}
      </div>

      {/* Delete button */}
      {!hideDeleteBtn && (
        <button className="ml-4 text-red-500 hover:text-red-700 transition-colors" onClick={onDelete}>
          <LuTrash2 />
        </button>
      )}
    </div>
  );
};

export default TransactionInfoCard;

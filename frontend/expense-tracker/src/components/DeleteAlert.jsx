import React from "react";

const DeleteAlert = ({ content, onDelete, onClose }) => {
  return (
    <div className="flex flex-col gap-4 bg-white ">
      {/* Nội dung cảnh báo */}
      <p className="text-gray-700 text-center">{content}</p>

      {/* Các nút hành động */}
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;

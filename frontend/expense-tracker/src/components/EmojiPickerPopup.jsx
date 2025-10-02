import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-4 relative">
      {/* Nút chọn icon */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center border rounded bg-gray-100">
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <LuImage className="text-gray-400 text-2xl" />
          )}
        </div>
        <p className="text-sm">{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {/* Popup Emoji */}
      {isOpen && (
        <div className="absolute z-50 right-10 bg-white shadow-lg rounded-lg p-2">
          {/* Nút đóng */}
          <button
            className="absolute -top-3 -right-3 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <LuX size={18} />
          </button>

          <EmojiPicker
            onEmojiClick={(emoji) => {
              onSelect(emoji.emoji); // lấy ký tự emoji
              setIsOpen(false); // tự đóng popup sau khi chọn
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;

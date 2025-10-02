import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";


const AddIncomeForm = ({ onAddIncome, onClose }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income.source || !income.amount) return;
    onAddIncome(income);
    setIncome({ source: "", amount: "", date: "", icon: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Emoji Picker thay cho input icon */}
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(emoji) => handleChange("icon", emoji)}
      />
      
      <Input
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
        value={income.source}
        onChange={(val) => handleChange("source", val)}
      />
      <Input
        label="Amount"
        placeholder="0"
        type="number"
        value={income.amount}
        onChange={(val) => handleChange("amount", val)}
      />
      <Input
        label="Date"
        type="date"
        value={income.date}
        onChange={(val) => handleChange("date", val)}
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;

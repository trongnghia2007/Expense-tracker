import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";


const AddExpenseForm = ({onAddExpense , onClose}) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.category || !expense.amount) return;
    onAddExpense(expense);
    setExpense({ category: "", amount: "", date: "", icon: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Emoji Picker thay cho input icon */}
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(emoji) => handleChange("icon", emoji)}
      />
      
      <Input
        label="Expense category"
        placeholder="Rent, clothes, etc"
        type="text"
        value={expense.category}
        onChange={(val) => handleChange("category", val)}
      />
      <Input
        label="Amount"
        placeholder="0"
        type="number"
        value={expense.amount}
        onChange={(val) => handleChange("amount", val)}
      />
      <Input
        label="Date"
        type="date"
        value={expense.date}
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

export default AddExpenseForm
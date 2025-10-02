import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="text-[13px] text-slate-800">{label}</label>}

      <div className="flex items-center w-full gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 border border-slate-200">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full bg-transparent outline-none placeholder-gray-400"
        />

        {type === "password" && (
          <div className="flex-shrink-0 cursor-pointer">
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

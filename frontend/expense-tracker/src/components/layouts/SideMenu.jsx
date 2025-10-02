import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


const SideMenu = ({ activeMenu, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  console.log("🔍 Current user from context:", user);
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path === "/logout") {
      handleLogout();
      return;
    }
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    onClose?.();
  };

  return (
    <div className="flex flex-col w-52 bg-gray-50 border-r h-screen p-4 gap-4">
      {/* --- Avatar + Tên User --- */}
      <div className="flex flex-col items-center justify-center gap-3">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover bg-slate-400"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-400 flex items-center justify-center text-white text-2xl font-bold">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-6 text-center">
          {user?.fullName || ""}
        </h5>
      </div>

      {/* --- Menu items --- */}
      <div className="flex flex-col mt-4 gap-2">
      {SIDE_MENU_DATA.map((item) => {
        const isActive = activeMenu === item.label;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-gray-200 text-gray-800"
            }`}
          >
            <item.icon className="text-lg" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
    </div>
  );
};

export default SideMenu;

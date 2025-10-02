import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center p-4 z-30 border-b border-gray-300 bg-gray-100 sticky top-0">
      <button
        className="text-2xl"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      <h2 className="ml-3 text-xl font-semibold">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white mt-3 z-50">
            <SideMenu activeMenu={activeMenu} onClose={() => setOpenSideMenu(false)} />
        </div>
      )}
    </div>
  );
};

export default Navbar;

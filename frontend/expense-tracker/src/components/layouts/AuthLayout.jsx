import React from 'react'
import CARD_2 from '../../assets/images/card2.png'
import { LuTrendingUpDown } from "react-icons/lu";


const AuthLayout = ({children}) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>
    
    <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-ing bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
      <div className="w-36 h-36 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
      <div className="w-36 h-44 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-[100px]" />
      <div className="w-36 h-36 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

      <div className="grid grid-cols-l z-20">
        <StatsInfoCard
          icon={<LuTrendingUpDown />}
          label="Track Your Income & Expenses"
          value="2025,00"
          color="bg-primary"
        />
      </div>

      <img src={CARD_2} className="w-[88%] max-w-full rounded-[20px] mx-auto absolute bottom-10 left-1/2 transform -translate-x-1/2 shadow-lg shadow-blue-400/15"/>
    </div>

    </div>
  );
};

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="w-[100%] flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white rounded-full drop-shadow-xl bg-purple-500`}>
        {icon}
      </div>

      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">${value}</span>
      </div>
    </div>
  );
};


import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | income | expense

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const incomeRes = await axios.get(
          `${BASE_URL}${API_PATHS.INCOME.GET_ALL_INCOME}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const expenseRes = await axios.get(
          `${BASE_URL}${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const incomeData = incomeRes.data || [];
        const expenseData = expenseRes.data || [];

        const allTransactions = [...incomeData, ...expenseData].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setTransactions(allTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) =>
          filter === "income"
            ? !t.category
            : t.category
        );

  if (loading)
    return (
      <p className="text-gray-500 ml-4 mt-4 animate-pulse">
        Loading transactions...
      </p>
    );

  return (
    <DashboardLayout activeMenu="Dashboard">
    <div className="card p-6 rounded-2xl bg-gradient-to-b from-white via-gray-50 to-gray-100 mt-4 ml-4 mr-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Transactions</h2>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6">
        {["all", "income", "expense"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
              filter === f
                ? f === "income"
                  ? "bg-green-100 text-green-800 shadow-lg"
                  : f === "expense"
                  ? "bg-red-100 text-red-800 shadow-lg"
                  : "bg-gray-200 text-gray-800 shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredTransactions.map((t) => {
            const isExpense = !!t.category;
            return (
              <div
                key={t._id}
                className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl ${
                  isExpense
                    ? "bg-red-50 hover:bg-red-100"
                    : "bg-green-50 hover:bg-green-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{t.icon || "💵"}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {isExpense ? t.category : t.source}
                    </p>
                    <p className="text-sm text-gray-500">
                      {moment(t.date).format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold text-lg ${
                      isExpense ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    ${t.amount}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isExpense
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {isExpense ? "Expense" : "Income"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default Transaction;

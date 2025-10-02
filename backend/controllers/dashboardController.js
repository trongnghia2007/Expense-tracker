const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check valid Id
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userObjectId = new Types.ObjectId(String(userId));

    // Total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("totalIncome", {
      totalIncome,
      userId,
      isValid: isValidObjectId(userId),
    });


    // Total expense
    const totalExpense = await Expense.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);


    // Get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
        userId,
        date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }, // <-- phải có dấu trừ "-"
    }).sort({ date: -1 });

    // Get total income for the last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
    );


    // Get expense transactions from the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
        userId, // filter by the current user
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, 
    }).sort({ date: -1 }); // sort newest first

    // Get total expenses in the last 30 days
    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
        (sum, transaction) => sum + transaction.amount, 
        0 
    );


    // Fetch the last 5 transactions including both income and expenses
    const lastTransactions = [
    // Get last 5 income transactions
    ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(), // convert Mongo document to plain JS object
        type: "income",    
    })),
    // Get last 5 expense transactions
    ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(),
        type: "expense",  
    })),
    ].sort((a, b) => b.date - a.date) // sort by date descending (latest first)
    

    // Final response 
    return res.json({
        // Total balance = total income - total expenses
        totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

        // Total income & expenses
        totalIncome: totalIncome[0]?.total || 0,
        totalExpenses: totalExpense[0]?.total || 0,

        // Last 30 days expenses
        last30DaysExpenses: {
            total: expensesLast30Days,
            transactions: last30DaysExpenseTransactions,
        },

        // Last 60 days income
        last60DaysIncome: {
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransactions,
        },

        // Last 5 recent transactions (income + expense)
        recentTransactions: lastTransactions,
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

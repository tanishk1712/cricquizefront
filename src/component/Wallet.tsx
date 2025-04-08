import React, { useState } from "react";
import { 
  Wallet, 
  PlusCircle, 
  MinusCircle, 
  RefreshCw, 
  Clock, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp,
  ChevronRight,
  X,
  CreditCard,
} from "lucide-react";

type Transaction = {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  category?: string;
};

const WalletScreen: React.FC = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "credit",
      amount: 1000,
      description: "Initial deposit",
      timestamp: "2025-04-01 10:30 AM",
      category: "Deposit"
    }
  ]);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [showSpendingChart, setShowSpendingChart] = useState(false);
  const [activeTab, setActiveTab] = useState<'transactions' | 'cards' | 'insights'>('transactions');
  const [isLoading, setIsLoading] = useState(false);

//   const categories = ["Groceries", "Entertainment", "Transport", "Food", "Shopping", "Deposit", "Withdrawal", "Transfer"];
  const savedCards = [
    { id: 1, type: "Visa", last4: "4242", expiry: "05/27", color: "bg-blue-500" },
    { id: 2, type: "Mastercard", last4: "8752", expiry: "11/26", color: "bg-purple-500" }
  ];

  // Monthly spending data
  const monthlySpending = [
    { month: "Jan", amount: 350 },
    { month: "Feb", amount: 420 },
    { month: "Mar", amount: 280 },
    { month: "Apr", amount: getTotalDebits() }
  ];

  function getTotalDebits() {
    return transactions
      .filter(tx => tx.type === 'debit')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Add funds
  const addFunds = () => {
    if (!fundAmount || isNaN(Number(fundAmount)) || Number(fundAmount) <= 0) return;
    
    const amount = Number(fundAmount);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setBalance(balance + amount);
      const newTransaction = {
        id: Date.now(),
        type: "credit" as const,
        amount,
        description: "Added funds",
        timestamp: new Date().toLocaleString(),
        category: "Deposit"
      };
      
      setTransactions([newTransaction, ...transactions]);
      setShowAddFundsModal(false);
      setFundAmount("");
      setIsLoading(false);
    }, 800);
  };

  // Withdraw funds
  const withdrawFunds = () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount)) || Number(withdrawAmount) <= 0) return;
    
    const amount = Number(withdrawAmount);
    if (balance >= amount) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setBalance(balance - amount);
        const newTransaction = {
          id: Date.now(),
          type: "debit" as const,
          amount,
          description: "Withdrawal",
          timestamp: new Date().toLocaleString(),
          category: "Withdrawal"
        };
        
        setTransactions([newTransaction, ...transactions]);
        setShowWithdrawModal(false);
        setWithdrawAmount("");
        setIsLoading(false);
      }, 800);
    }
  };

  // Send money
  const sendMoney = () => {
    if (!sendAmount || isNaN(Number(sendAmount)) || Number(sendAmount) <= 0 || !recipient) return;
    
    const amount = Number(sendAmount);
    if (balance >= amount) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setBalance(balance - amount);
        const newTransaction = {
          id: Date.now(),
          type: "debit" as const,
          amount,
          description: `Sent to ${recipient}`,
          timestamp: new Date().toLocaleString(),
          category: "Transfer"
        };
        
        setTransactions([newTransaction, ...transactions]);
        setShowSendModal(false);
        setSendAmount("");
        setRecipient("");
        setIsLoading(false);
      }, 800);
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  function sendAmount2(value: string) {
    setSendAmount(value);
  }

  return (
    <div className="w-full  bg-white text-black rounded-lg shadow-lg overflow-hidden">
      {/* Header with balance card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Wallet className="h-6 w-6 mr-2" /> My Wallet
        </h2>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
          <p className="text-sm mb-1">Current Balance</p>
          <p className="text-3xl font-bold mb-2">{formatCurrency(balance)}</p>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Updated just now
            </span>
            <button 
              onClick={() => setShowSpendingChart(!showSpendingChart)}
              className="flex items-center text-blue-200 hover:text-white transition"
            >
              <TrendingUp className="h-3 w-3 mr-1" /> 
              {showSpendingChart ? "Hide" : "View"} Insights
            </button>
          </div>
        </div>
        
        {/* Spending Chart (conditionally shown) */}
        {showSpendingChart && (
          <div className="mt-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
            <h3 className="text-sm font-medium mb-3">Monthly Spending</h3>
            <div className="flex h-32 items-end space-x-2">
              {monthlySpending.map((data) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-white bg-opacity-40 rounded-t"
                    style={{ height: `${(data.amount / 500) * 100}px` }}
                  ></div>
                  <p className="text-xs mt-1">{data.month}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-1 p-3 bg-gray-50">
        <button 
          onClick={() => setShowAddFundsModal(true)} 
          className="flex flex-col items-center p-3 bg-white rounded hover:bg-gray-50 transition"
        >
          <div className="bg-green-100 p-2 rounded-full mb-1">
            <PlusCircle className="h-5 w-5 text-green-600" />
          </div>
          <span className="text-xs">Add</span>
        </button>
        {/* <button 
          onClick={() => setShowSendModal(true)} 
          className="flex flex-col items-center p-3 bg-white rounded hover:bg-gray-50 transition"
        >
          <div className="bg-blue-100 p-2 rounded-full mb-1">
            <Send className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-xs">Send</span>
        </button> */}
        <button 
          onClick={() => setShowWithdrawModal(true)} 
          className="flex flex-col items-center p-3 bg-white rounded hover:bg-gray-50 transition"
        >
          <div className="bg-red-100 p-2 rounded-full mb-1">
            <MinusCircle className="h-5 w-5 text-red-600" />
          </div>
          <span className="text-xs">Withdraw</span>
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('transactions')} 
          className={`flex-1 py-3 text-center text-sm ${activeTab === 'transactions' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
        >
          Transactions
        </button>
        <button 
          onClick={() => setActiveTab('cards')} 
          className={`flex-1 py-3 text-center text-sm ${activeTab === 'cards' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
        >
          Cards
        </button>
        <button 
          onClick={() => setActiveTab('insights')} 
          className={`flex-1 py-3 text-center text-sm ${activeTab === 'insights' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
        >
          Insights
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'transactions' && (
          <>
            {/* Filter Options */}
            <div className="flex justify-between mb-3">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setFilterType('all')} 
                  className={`px-3 py-1 text-xs rounded-full ${filterType === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterType('credit')} 
                  className={`px-3 py-1 text-xs rounded-full ${filterType === 'credit' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}
                >
                  Income
                </button>
                <button 
                  onClick={() => setFilterType('debit')} 
                  className={`px-3 py-1 text-xs rounded-full ${filterType === 'debit' ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}
                >
                  Expense
                </button>
              </div>
              <button className="flex items-center text-xs text-gray-500">
                <Filter className="h-3 w-3 mr-1" /> Filter
              </button>
            </div>
            
            {/* Transactions List */}
            <div className="h-64 overflow-y-auto">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No transactions found.</p>
                </div>
              ) : (
                filteredTransactions.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="flex items-center p-3 mb-2 bg-white border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className={`${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'} p-2 rounded-full mr-3`}>
                      {tx.type === 'credit' ? 
                        <ArrowDownLeft className={`h-5 w-5 ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`} /> :
                        <ArrowUpRight className={`h-5 w-5 ${tx.type === 'debit' ? 'text-green-600' : 'text-red-600'}`} />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{tx.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{tx.timestamp}</span>
                        {tx.category && <span className="bg-gray-100 px-2 rounded-full">{tx.category}</span>}
                      </div>
                    </div>
                    <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
        
        {activeTab === 'cards' && (
          <div className="h-64 overflow-y-auto">
            <h3 className="text-lg font-medium mb-3">Linked Cards</h3>
            {savedCards.map(card => (
              <div key={card.id} className={`${card.color} text-white p-4 rounded-lg mb-3 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -mt-6 -mr-6"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-10 rounded-full -mb-4 -ml-4"></div>
                <div className="flex justify-between items-center mb-6">
                  <CreditCard className="h-6 w-6" />
                  <span className="font-medium">{card.type}</span>
                </div>
                <p className="text-lg tracking-wider mb-2">•••• •••• •••• {card.last4}</p>
                <div className="flex justify-between text-sm">
                  <span>Exp: {card.expiry}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
            <button className="w-full py-3 border border-dashed rounded-lg text-center text-blue-600 mt-2">
              + Add New Card
            </button>
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div className="h-64 overflow-y-auto">
            <h3 className="text-lg font-medium mb-3">Spending Analysis</h3>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm mb-2">Spending by Category</p>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Food</span>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Transport</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Entertainment</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Others</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Smart Tips</h4>
              <p className="text-sm text-gray-700 mb-2">
                Based on your spending habits, you could save approximately ₹1,200 per month by reducing food delivery expenses.
              </p>
              <button className="text-blue-600 text-sm flex items-center">
                View detailed report <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Funds Modal */}
      {showAddFundsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Funds</h3>
              <button onClick={() => setShowAddFundsModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount (₹)</label>
              <input
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              <button 
                onClick={() => setFundAmount("500")}
                className="px-4 py-1 border rounded-full text-sm hover:bg-gray-50"
              >
                ₹500
              </button>
              <button 
                onClick={() => setFundAmount("1000")}
                className="px-4 py-1 border rounded-full text-sm hover:bg-gray-50"
              >
                ₹1,000
              </button>
              <button 
                onClick={() => setFundAmount("2000")}
                className="px-4 py-1 border rounded-full text-sm hover:bg-gray-50"
              >
                ₹2,000
              </button>
              <button 
                onClick={() => setFundAmount("5000")}
                className="px-4 py-1 border rounded-full text-sm hover:bg-gray-50"
              >
                ₹5,000
              </button>
            </div>
            <button
              onClick={addFunds}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <>Add Funds</>
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Withdraw Funds</h3>
              <button onClick={() => setShowWithdrawModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount (₹)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                max={balance}
              />
              <p className="text-sm text-gray-500 mt-1">Available: {formatCurrency(balance)}</p>
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              <button 
                onClick={() => setWithdrawAmount("200")}
                className="px-4 py-1 border rounded-full text-sm hover:bg-gray-50"
                disabled={200 > balance}
              >
                ₹200
              </button>
              <button 
                onClick={() => setWithdrawAmount("500")}
                className="px-4 py-1 border rounded-full text-sm hover:bg-gray-50"
                disabled={500 > balance}
              >
                ₹500
              </button>
              <button 
                onClick={() => setWithdrawAmount("1000")}
                className="px-4 py-1 border rounded-full text-sm hover:bg-gray-50"
                disabled={1000 > balance}
              >
                ₹1,000
              </button>
            </div>
            <button
              onClick={withdrawFunds}
              disabled={isLoading || !withdrawAmount || Number(withdrawAmount) > balance}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <>Withdraw Funds</>
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Send Money Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Send Money</h3>
              <button onClick={() => setShowSendModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Recipient</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name or phone number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount (₹)</label>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => sendAmount2(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
                max={balance}
              />
              <p className="text-sm text-gray-500 mt-1">Available: {formatCurrency(balance)}</p>
            </div>
            <button
              onClick={sendMoney}
              disabled={isLoading || !sendAmount || Number(sendAmount) > balance || !recipient}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <>Send Money</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletScreen;
import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Wallet, Activity, DollarSign, Bitcoin, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { transactions, balances, totalNetWorth } from '../data/transactions';
import { 
  formatCurrency, 
  formatCrypto, 
  formatDate, 
  formatDateShort,
  getCategoryColor, 
  getSourceIcon,
  calculateTotalByCategory,
  calculateSpendingBySource,
  getRecentTransactions 
} from '../utils/calculations';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [selectedSource, setSelectedSource] = useState('all');

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];
    
    // Filter by source
    if (selectedSource !== 'all') {
      filtered = filtered.filter(tx => tx.source === selectedSource);
    }
    
    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Filter by time
    const days = timeFilter === '7d' ? 7 : timeFilter === '30d' ? 30 : 365;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return filtered.filter(tx => new Date(tx.date) >= cutoffDate);
  }, [timeFilter, selectedSource]);

  // Calculate stats
  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter(tx => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    const expenses = filteredTransactions
      .filter(tx => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    
    const cryptoTrades = filteredTransactions
      .filter(tx => tx.category === 'crypto-trade' || tx.category === 'crypto-purchase')
      .length;

    return { income, expenses, cryptoTrades, netChange: income - expenses };
  }, [filteredTransactions]);

  // Category breakdown for pie chart
  const categoryData = useMemo(() => {
    const totals = calculateTotalByCategory(filteredTransactions.filter(tx => tx.amount < 0));
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [filteredTransactions]);

  // Daily spending for line chart
  const dailyData = useMemo(() => {
    const daily = {};
    filteredTransactions.forEach(tx => {
      const date = formatDateShort(tx.date);
      if (!daily[date]) {
        daily[date] = { date, income: 0, expenses: 0 };
      }
      if (tx.amount > 0) {
        daily[date].income += tx.amount;
      } else {
        daily[date].expenses += Math.abs(tx.amount);
      }
    });
    return Object.values(daily).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredTransactions]);

  const COLORS = ['#8b5cf6', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Financial Dashboard</h1>
          <p className="text-purple-200">Consolidated view of all your accounts</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 p-3 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-semibold">Total</span>
            </div>
            <h3 className="text-white text-2xl font-bold">{formatCurrency(totalNetWorth)}</h3>
            <p className="text-purple-200 text-sm mt-2">Net Worth</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-purple-200">Capital One</span>
            </div>
            <h3 className="text-white text-2xl font-bold">{formatCurrency(balances.capitalOne.total)}</h3>
            <p className="text-purple-200 text-sm mt-2">Bank Balance</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500 p-3 rounded-lg">
                <Bitcoin className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-purple-200">Coinbase</span>
            </div>
            <h3 className="text-white text-2xl font-bold">{formatCurrency(balances.coinbase.total)}</h3>
            <p className="text-purple-200 text-sm mt-2">Crypto Portfolio</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-500 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white text-2xl font-bold">{filteredTransactions.length}</h3>
            <p className="text-purple-200 text-sm mt-2">Recent Transactions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFilter('7d')}
                className={`px-4 py-2 rounded-lg transition ${
                  timeFilter === '7d' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeFilter('30d')}
                className={`px-4 py-2 rounded-lg transition ${
                  timeFilter === '30d' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeFilter('1y')}
                className={`px-4 py-2 rounded-lg transition ${
                  timeFilter === '1y' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                1 Year
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSource('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedSource === 'all' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                All Sources
              </button>
              <button
                onClick={() => setSelectedSource('Coinbase')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedSource === 'Coinbase' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                Coinbase
              </button>
              <button
                onClick={() => setSelectedSource('Capital One')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedSource === 'Capital One' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                Capital One
              </button>
              <button
                onClick={() => setSelectedSource('Bitcoin Well')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedSource === 'Bitcoin Well' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/5 text-purple-200 hover:bg-white/10'
                }`}
              >
                Bitcoin Well
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-xl p-6 border border-green-400/30">
            <div className="flex items-center gap-3 mb-2">
              <ArrowUpRight className="w-5 h-5 text-green-400" />
              <span className="text-green-200 text-sm">Income</span>
            </div>
            <p className="text-white text-3xl font-bold">{formatCurrency(stats.income)}</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-lg rounded-xl p-6 border border-red-400/30">
            <div className="flex items-center gap-3 mb-2">
              <ArrowDownRight className="w-5 h-5 text-red-400" />
              <span className="text-red-200 text-sm">Expenses</span>
            </div>
            <p className="text-white text-3xl font-bold">{formatCurrency(stats.expenses)}</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-blue-400/30">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-blue-200 text-sm">Net Change</span>
            </div>
            <p className={`text-3xl font-bold ${stats.netChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(stats.netChange)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30">
            <div className="flex items-center gap-3 mb-2">
              <Bitcoin className="w-5 h-5 text-purple-400" />
              <span className="text-purple-200 text-sm">Crypto Trades</span>
            </div>
            <p className="text-white text-3xl font-bold">{stats.cryptoTrades}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Activity Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-white text-xl font-semibold mb-6">Daily Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-white text-xl font-semibold mb-6">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #ffffff20',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h3 className="text-white text-xl font-semibold">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-purple-200 font-medium">Date</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Source</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Description</th>
                  <th className="text-left p-4 text-purple-200 font-medium">Category</th>
                  <th className="text-right p-4 text-purple-200 font-medium">Amount</th>
                  <th className="text-center p-4 text-purple-200 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.slice(0, 20).map((tx, idx) => (
                  <tr key={tx.id} className="border-t border-white/10 hover:bg-white/5 transition">
                    <td className="p-4 text-purple-100 text-sm">{formatDate(tx.date)}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-2 text-purple-100 text-sm">
                        <span className="text-lg">{getSourceIcon(tx.source)}</span>
                        {tx.source}
                      </span>
                    </td>
                    <td className="p-4 text-white">{tx.description}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tx.category)}`}>
                        {tx.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className={`p-4 text-right font-semibold ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crypto Holdings */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white text-xl font-semibold mb-6">Crypto Holdings (Coinbase)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(balances.coinbase.assets).map(([symbol, data]) => (
              <div key={symbol} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-purple-200 text-sm mb-1">{symbol}</div>
                <div className="text-white text-xl font-bold mb-1">{formatCurrency(data.value)}</div>
                <div className="text-purple-300 text-xs">{formatCrypto(data.amount, symbol)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

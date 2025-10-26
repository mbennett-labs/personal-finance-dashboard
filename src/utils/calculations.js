// Utility functions for financial calculations

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(amount));
};

export const formatCrypto = (amount, symbol) => {
  const decimals = amount < 1 ? 8 : amount < 100 ? 4 : 2;
  return `${amount.toFixed(decimals)} ${symbol}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const getCategoryColor = (category) => {
  const colors = {
    'income': 'text-green-600 bg-green-50',
    'deposit': 'text-blue-600 bg-blue-50',
    'crypto-trade': 'text-purple-600 bg-purple-50',
    'crypto-purchase': 'text-orange-600 bg-orange-50',
    'crypto-transfer': 'text-indigo-600 bg-indigo-50',
    'transfer': 'text-gray-600 bg-gray-50',
    'payment': 'text-red-600 bg-red-50',
    'purchase': 'text-red-600 bg-red-50'
  };
  return colors[category] || 'text-gray-600 bg-gray-50';
};

export const getSourceIcon = (source) => {
  const icons = {
    'Coinbase': '₿',
    'Capital One': '$',
    'Bitcoin Well': '฿'
  };
  return icons[source] || '💰';
};

export const calculateTotalByCategory = (transactions) => {
  const totals = {};
  transactions.forEach(tx => {
    if (!totals[tx.category]) {
      totals[tx.category] = 0;
    }
    totals[tx.category] += Math.abs(tx.amount);
  });
  return totals;
};

export const calculateSpendingBySource = (transactions) => {
  const totals = {};
  transactions.forEach(tx => {
    if (tx.amount < 0) { // Only spending
      if (!totals[tx.source]) {
        totals[tx.source] = 0;
      }
      totals[tx.source] += Math.abs(tx.amount);
    }
  });
  return totals;
};

export const getRecentTransactions = (transactions, days = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate >= cutoffDate;
  });
};

export const groupTransactionsByDate = (transactions) => {
  const grouped = {};
  
  transactions.forEach(tx => {
    const date = formatDateShort(tx.date);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(tx);
  });
  
  return grouped;
};

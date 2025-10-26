// Consolidated transaction data from all sources
// Sources: Coinbase, Capital One, Bitcoin Well

export const transactions = [
  // Bitcoin Well Transactions
  {
    id: 'btcwell-001',
    date: '2025-10-22',
    source: 'Bitcoin Well',
    type: 'buy',
    description: 'Settling BTC - Bank Transfer',
    amount: -1500.00,
    currency: 'USD',
    cryptoAmount: 0.01300439,
    cryptoCurrency: 'BTC',
    status: 'pending',
    category: 'crypto-purchase'
  },
  {
    id: 'btcwell-002',
    date: '2025-09-02',
    source: 'Bitcoin Well',
    type: 'buy',
    description: 'Bought BTC',
    amount: -102.18,
    currency: 'USD',
    cryptoAmount: 0.00090001,
    cryptoCurrency: 'BTC',
    status: 'completed',
    category: 'crypto-purchase'
  },

  // Coinbase Transactions (Most recent first)
  {
    id: 'cb-001',
    date: '2025-10-26T09:45:41',
    source: 'Coinbase',
    type: 'buy',
    description: 'LINK-USDC Buy',
    amount: -1677.79,
    currency: 'USDC',
    cryptoAmount: 90.37,
    cryptoCurrency: 'LINK',
    status: 'completed',
    category: 'crypto-trade'
  },
  {
    id: 'cb-002',
    date: '2025-10-26T09:43:26',
    source: 'Coinbase',
    type: 'buy',
    description: 'PUMP-USDC Buy',
    amount: -562.28,
    currency: 'USDC',
    cryptoAmount: 119977,
    cryptoCurrency: 'PUMP',
    status: 'completed',
    category: 'crypto-trade'
  },
  {
    id: 'cb-003',
    date: '2025-10-26T09:41:32',
    source: 'Coinbase',
    type: 'buy',
    description: 'PENGU-USDC Buy',
    amount: -749.58,
    currency: 'USDC',
    cryptoAmount: 33270,
    cryptoCurrency: 'PENGU',
    status: 'completed',
    category: 'crypto-trade'
  },
  {
    id: 'cb-004',
    date: '2025-10-26T09:40:51',
    source: 'Coinbase',
    type: 'deposit',
    description: 'Deposited funds from CAPITAL ONE',
    amount: 3000.00,
    currency: 'USDC',
    status: 'completed',
    category: 'deposit'
  },
  {
    id: 'cb-005',
    date: '2025-10-26T08:41:08',
    source: 'Coinbase',
    type: 'buy',
    description: 'ETH-USD Buy',
    amount: -2999.46,
    currency: 'USD',
    cryptoAmount: 0.730735,
    cryptoCurrency: 'ETH',
    status: 'completed',
    category: 'crypto-trade'
  },
  {
    id: 'cb-006',
    date: '2025-10-24T17:42:35',
    source: 'Coinbase',
    type: 'deposit',
    description: 'Deposited funds from CAPITAL ONE',
    amount: 3000.00,
    currency: 'USD',
    status: 'completed',
    category: 'deposit'
  },
  {
    id: 'cb-007',
    date: '2025-10-23T13:39:50',
    source: 'Coinbase',
    type: 'buy',
    description: 'SOL-USDC Buy',
    amount: -687.48,
    currency: 'USDC',
    cryptoAmount: 3.53569867,
    cryptoCurrency: 'SOL',
    status: 'completed',
    category: 'crypto-trade'
  },
  {
    id: 'cb-008',
    date: '2025-10-23T13:39:12',
    source: 'Coinbase',
    type: 'buy',
    description: 'SOL-USDC Buy',
    amount: -691.66,
    currency: 'USDC',
    cryptoAmount: 3.536993,
    cryptoCurrency: 'SOL',
    status: 'completed',
    category: 'crypto-trade'
  },
  {
    id: 'cb-009',
    date: '2025-10-23T13:38:18',
    source: 'Coinbase',
    type: 'buy',
    description: 'SOL-USDC Buy',
    amount: -1366.65,
    currency: 'USDC',
    cryptoAmount: 7.04396971,
    cryptoCurrency: 'SOL',
    status: 'completed',
    category: 'crypto-trade'
  },
  {
    id: 'cb-010',
    date: '2025-10-22T12:16:34',
    source: 'Coinbase',
    type: 'deposit',
    description: 'Deposited funds from CAPITAL ONE',
    amount: 2750.00,
    currency: 'USD',
    status: 'completed',
    category: 'deposit'
  },

  // Capital One Transactions
  {
    id: 'c1-001',
    date: '2025-10-25',
    source: 'Capital One',
    type: 'income',
    description: 'Zelle Money Received - Susan Davis',
    amount: 3000.00,
    currency: 'USD',
    balance: 7810.19,
    status: 'completed',
    category: 'income'
  },
  {
    id: 'c1-002',
    date: '2025-10-23',
    source: 'Capital One',
    type: 'income',
    description: 'Zelle Money Received - Susan Davis',
    amount: 3000.00,
    currency: 'USD',
    balance: 4810.19,
    status: 'completed',
    category: 'income'
  },
  {
    id: 'c1-003',
    date: '2025-10-23',
    source: 'Capital One',
    type: 'transfer',
    description: 'CYBRID-BITCOIN W Transfer',
    amount: -1500.00,
    currency: 'USD',
    balance: 1810.19,
    status: 'completed',
    category: 'crypto-transfer'
  },
  {
    id: 'c1-004',
    date: '2025-10-22',
    source: 'Capital One',
    type: 'transfer',
    description: 'COINBASE INC. Transfer',
    amount: -2750.00,
    currency: 'USD',
    balance: 3310.19,
    status: 'pending',
    category: 'crypto-transfer'
  },
  {
    id: 'c1-005',
    date: '2025-10-22',
    source: 'Capital One',
    type: 'income',
    description: 'Zelle Money Received - Susan Davis',
    amount: 3000.00,
    currency: 'USD',
    balance: 6060.19,
    status: 'completed',
    category: 'income'
  },
  {
    id: 'c1-006',
    date: '2025-10-22',
    source: 'Capital One',
    type: 'transfer',
    description: 'BARCLAYCARD US Transfer',
    amount: -29.00,
    currency: 'USD',
    balance: 3060.19,
    status: 'pending',
    category: 'payment'
  },
  {
    id: 'c1-007',
    date: '2025-10-21',
    source: 'Capital One',
    type: 'income',
    description: 'VENMO Instant Transfer',
    amount: 171.94,
    currency: 'USD',
    balance: 3089.19,
    status: 'completed',
    category: 'income'
  },
  {
    id: 'c1-008',
    date: '2025-10-21',
    source: 'Capital One',
    type: 'transfer',
    description: 'Uphold HQ Inc Transfer',
    amount: -50.00,
    currency: 'USD',
    balance: 2917.25,
    status: 'pending',
    category: 'crypto-transfer'
  },
  {
    id: 'c1-009',
    date: '2025-10-21',
    source: 'Capital One',
    type: 'transfer',
    description: 'CAPITAL ONE Transfer',
    amount: -25.00,
    currency: 'USD',
    balance: 2967.25,
    status: 'pending',
    category: 'transfer'
  },
  {
    id: 'c1-010',
    date: '2025-10-21',
    source: 'Capital One',
    type: 'transfer',
    description: 'CAPITAL ONE Transfer',
    amount: -25.00,
    currency: 'USD',
    balance: 2992.25,
    status: 'pending',
    category: 'transfer'
  },
  {
    id: 'c1-011',
    date: '2025-10-21',
    source: 'Capital One',
    type: 'income',
    description: 'Zelle Money Received - Susan Davis',
    amount: 3000.00,
    currency: 'USD',
    balance: 3017.25,
    status: 'completed',
    category: 'income'
  },
  {
    id: 'c1-012',
    date: '2025-10-19',
    source: 'Capital One',
    type: 'purchase',
    description: 'WESTERN UNION Purchase',
    amount: -27.99,
    currency: 'USD',
    status: 'completed',
    category: 'payment'
  }
];

// Current balances
export const balances = {
  coinbase: {
    total: 8762.09,
    usd: 5725.82,
    assets: {
      LINK: { amount: 90.37, value: 1668.00 },
      PUMP: { amount: 119977, value: 556.15 },
      PENGU: { amount: 33270, value: 740.61 },
      ETH: { amount: 0.731746, value: 2968.19 },
      SOL: { amount: 14.1166, value: 2725.72 }
    }
  },
  capitalOne: {
    total: 7810.19,
    currency: 'USD'
  },
  bitcoinWell: {
    btc: 0.01390440,
    pending: 0.01300439,
    completed: 0.00090001,
    totalValue: 1602.18
  }
};

export const totalNetWorth = 18174.46; // Approximate total across all accounts

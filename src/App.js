import React from 'react';

const StockTicker = ({ 
  ticker, 
  companyName, 
  currentPrice, 
  priceChange, 
  percentChange,
  chartData = []
}) => {
  const isPositive = priceChange >= 0;
  
  // Generate simple line chart path
  const generateChartPath = (data) => {
    if (data.length === 0) return '';
    
    const width = 500;
    const height = 180;
    const padding = 10;
    
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };
  
  const chartPath = generateChartPath(chartData);
  
  // Determine background color based on price change
  let bgColorClass;
  if (priceChange > 0) {
    bgColorClass = 'bg-green-900'; // Dark green for positive
  } else if (priceChange < 0) {
    bgColorClass = 'bg-red-900'; // Dark red for negative
  } else {
    bgColorClass = 'bg-gray-600'; // Gray for no change
  }
  
  return (
    <div className={`${bgColorClass} rounded-lg p-6 w-full max-w-md text-white`}>
      {/* Header with ticker and company name */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-1">{ticker}</h2>
        <p className="text-sm opacity-90 truncate">{companyName}</p>
      </div>
      
      {/* Price information */}
      <div className="mb-6">
        <div className="text-5xl font-bold mb-2">
          {currentPrice.toFixed(2)}
        </div>
        <div className="text-lg text-white">
          {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{percentChange.toFixed(2)}%)
        </div>
      </div>
      
      {/* Chart */}
      {chartData.length > 0 && (
        <div className="mt-4">
          <svg viewBox="0 0 500 180" className="w-full h-32">
            {/* X-axis line */}
            <line
              x1="10"
              y1="170"
              x2="490"
              y2="170"
              stroke="white"
              strokeWidth="2"
              opacity="0.3"
            />
            {/* Price line chart */}
            <path
              d={chartPath}
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

// Demo with multiple examples
const App = () => {
  // Generate sample chart data that trends upward
  const generateChartData = (basePrice, trend = 0.02) => {
    const data = [];
    let price = basePrice;
    for (let i = 0; i < 50; i++) {
      price = price + (Math.random() - 0.4) * 2 + trend;
      data.push(price);
    }
    return data;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Stock Ticker Tiles</h1>
        
        <div className="grid grid-cols-2 gap-6">
          <StockTicker
            ticker="AAPL"
            companyName="Apple Inc."
            currentPrice={252.29}
            priceChange={4.84}
            percentChange={1.96}
            chartData={generateChartData(247, 0.15)}
          />
          
          <StockTicker
            ticker="GOOGL"
            companyName="Alphabet Inc."
            currentPrice={187.52}
            priceChange={-2.34}
            percentChange={-1.23}
            chartData={generateChartData(190, -0.08)}
          />
          
          <StockTicker
            ticker="MSFT"
            companyName="Microsoft Corporation"
            currentPrice={428.67}
            priceChange={8.92}
            percentChange={2.13}
            chartData={generateChartData(420, 0.25)}
          />
          
          <StockTicker
            ticker="TICKER"
            companyName="Some Really Loooooooooooong Company Name That Should Be Truncated With Ellipsis"
            currentPrice={156.78}
            priceChange={3.45}
            percentChange={2.25}
            chartData={generateChartData(153, 0.1)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
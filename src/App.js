import React from 'react';

// Component for market indices like S&P 500
const IndexTicker = ({ 
  indexName, 
  currentPrice, 
  priceChange, 
  percentChange,
  chartData = []
}) => {
  const isPositive = priceChange >= 0;
  
  // Generate simple line chart path for index
  const generateChartPath = (data) => {
    if (data.length === 0) return { path: '', startY: 170 };
    
    const width = 1000; // Wider for index tiles
    const height = 180;
    const padding = 10;
    
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return { x, y };
    });
    
    const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const startY = points[0].y;
    
    return { path, startY };
  };
  
  const { path: chartPath, startY: chartStartY } = generateChartPath(chartData);
  
  // Determine background color based on price change
  let bgColorClass;
  if (priceChange > 0) {
    bgColorClass = 'bg-green-900';
  } else if (priceChange < 0) {
    bgColorClass = 'bg-red-900';
  } else {
    bgColorClass = 'bg-gray-600';
  }
  
  return (
    <div className={`${bgColorClass} rounded-lg p-6 w-full text-white`}>
      {/* Header with index name */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-1">{indexName}</h2>
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
          <svg viewBox="0 0 1000 180" className="w-full h-32">
            {/* X-axis line - positioned at opening price level */}
            <line
              x1="10"
              y1={chartStartY}
              x2="990"
              y2={chartStartY}
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

// Component for individual stock tickers
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
    if (data.length === 0) return { path: '', startY: 170 };
    
    const width = 500;
    const height = 180;
    const padding = 10;
    
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return { x, y };
    });
    
    const path = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const startY = points[0].y;
    
    return { path, startY };
  };
  
  const { path: chartPath, startY: chartStartY } = generateChartPath(chartData);
  
  // Determine background color based on price change
  let bgColorClass;
  if (priceChange > 0) {
    bgColorClass = 'bg-green-900';
  } else if (priceChange < 0) {
    bgColorClass = 'bg-red-900';
  } else {
    bgColorClass = 'bg-gray-600';
  }
  
  return (
    <div className={`${bgColorClass} rounded-lg p-6 w-full text-white`}>
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
            {/* X-axis line - positioned at opening price level */}
            <line
              x1="10"
              y1={chartStartY}
              x2="490"
              y2={chartStartY}
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
      price = price + (Math.random() - 0.5) * 2 + trend;
      data.push(price);
    }
    return data;
  };
  
  // Generate chart data that returns to starting price (for no change scenario)
  const generateNoChangeChartData = (basePrice) => {
    const data = [];
    const points = 50;
    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1);
      const fluctuation = Math.sin(progress * Math.PI * 2) * 2;
      data.push(basePrice + fluctuation);
    }
    return data;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Stock Ticker Tiles</h1>
        
        <div className="grid grid-cols-2 gap-6">
          {/* S&P 500 Index - spans 2 columns */}
          <div className="col-span-2">
            <IndexTicker
              indexName="S&P 500"
              currentPrice={5815.26}
              priceChange={23.47}
              percentChange={0.41}
              chartData={generateChartData(5790, 0.5)}
            />
          </div>
          
          {/* Individual stock tickers */}
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
            chartData={generateChartData(190, -0.25)}
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
            priceChange={0}
            percentChange={0}
            chartData={generateNoChangeChartData(156.78)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
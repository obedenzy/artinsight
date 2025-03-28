import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Props {
  data: {
    dates: string[];
    values: number[];
  };
}

export function MarketTrendChart({ data }: Props) {
  const chartData = data.dates.map((date, index) => ({
    date,
    value: data.values[index]
  }));

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          stroke="#6b7280"
          tick={{ fill: '#6b7280' }}
        />
        <YAxis
          stroke="#6b7280"
          tick={{ fill: '#6b7280' }}
          tickFormatter={formatValue}
        />
        <Tooltip
          formatter={(value: number) => [formatValue(value), 'Market Value']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '0.5rem'
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#059669"
          strokeWidth={2}
          dot={{
            fill: '#059669',
            stroke: '#059669',
            strokeWidth: 2,
            r: 4
          }}
          activeDot={{
            fill: '#059669',
            stroke: '#059669',
            strokeWidth: 2,
            r: 6
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

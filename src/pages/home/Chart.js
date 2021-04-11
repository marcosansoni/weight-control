import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Color } from '../../theme/ColorSchema';

const TooltipContainer = styled.div`
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 0.25em 0.625em rgba(0,0,0,.15);
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 14px;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
  padding-right: 16px;
`;

const Weight = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme[Color.TEXT_DARK]};
`;

const data = [
  {
    name: '11/04/2021',
    weight: 85.9,
  },
  {
    name: '10/04/2021',
    weight: 85.8,
  },
];

const Chart = () => {
  const theme = useTheme();
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="name" tickMargin={10} color="red" />
        <YAxis
          domain={[
            (dataMin) => Math.floor(dataMin - 2),
            (dataMax) => Math.floor(dataMax + 2),
          ]}
          interval={0}
          tickMargin={10}
          label={{ value: 'Weight', angle: -90, position: 'insideLeft' }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          content={(tooltip) => (
            <TooltipContainer>
              <Title>{tooltip.label}</Title>
              <Weight>{tooltip?.payload?.[0]?.value}</Weight>
            </TooltipContainer>
          )}
        />
        <Brush />
        <Line
          type="monotone"
          dataKey="weight"
          stroke={theme[Color.PRIMARY]}
          strokeWidth={3}
          dot={{ stroke: theme[Color.PRIMARY_DARK], strokeWidth: 2, r: 4 }}
          activeDot={{ stroke: theme[Color.PRIMARY_DARK], strokeWidth: 3, r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;

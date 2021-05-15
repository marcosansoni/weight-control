import {
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
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Color } from '../../../theme/ColorSchema';
import rangeWeightSelector from '../../../store/state/home/selectors/rangeWeightSelector';

const TooltipContainer = styled.div`
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 0.25em 0.625em rgba(0, 0, 0, .15);
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

const Container = styled.div`
  height: 100%;
`;

const Label = styled.div`
  display: flex;
  font-weight: 600;
  height: 100%;
  width: 100%;
`;

const Chart = (props) => {
  const {
    startDate,
    endDate,
    showLabel,
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const filteredWeights = useSelector(rangeWeightSelector(startDate, endDate));

  const chartData = filteredWeights.reverse()
    .map((w) => (
      {
        name: moment(w.date)
          .format('DD/MM/YYYY'),
        weight: Number(w.weight),
      }
    ));

  const customLabel = ({
    // eslint-disable-next-line react/prop-types
    x,
    y,
    value,
    index,
  }) => (
    <g>
      <foreignObject
        x={index === chartData.length - 1 ? x - 42 : x + 8}
        y={y}
        width={48}
        height={32}
      >
        <Label>
          {Number(value)
            .toFixed(1)}
        </Label>
      </foreignObject>
    </g>
  );

  return (
    <Container>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
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
              (dataMin) => Math.floor(Number(dataMin) - 2),
              (dataMax) => Math.floor(Number(dataMax) + 2),
            ]}
            interval={0}
            tickMargin={10}
            label={{
              value: t('home.weights'),
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            content={(tooltip) => (
              <TooltipContainer>
                <Title>{tooltip.label}</Title>
                <Weight>{`${tooltip?.payload?.[0]?.value} kg`}</Weight>
              </TooltipContainer>
            )}
          />
          <Line
            label={showLabel && customLabel}
            type="monotone"
            dataKey="weight"
            stroke={theme[Color.PRIMARY]}
            strokeWidth={3}
            dot={{
              stroke: theme[Color.PRIMARY_DARK],
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              stroke: theme[Color.PRIMARY_DARK],
              strokeWidth: 3,
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

Chart.propTypes = {
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  showLabel: PropTypes.bool,
};

Chart.defaultProps = {
  startDate: undefined,
  endDate: undefined,
  showLabel: false,
};

export default Chart;

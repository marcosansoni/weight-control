import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Title from '../../components/Title';
import { Color } from '../../theme/ColorSchema';
import Card from '../../components/Card';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import WeightFilter from './fragments/WeightFilter';
import Chart from './fragments/Chart';
import WeightRow from './fragments/WeightRow';
import WeightDetailsDialog from './fragments/WeightDetailsDialog';
import WeightAddDialog from './fragments/WeightAddDialog';
import getHomeActionCreator, { GET_HOME } from '../../store/state/home/actionCreator/getHomeActionCreator';
import Header from '../../components/Header';
import postWeightActionCreator from '../../store/state/home/actionCreator/postWeightActionCreator';
import { useHomeNotification } from '../../store/state/home/selectors/homeNotificationSelector';
import PlusIcon from '../../assets/icons/PlusIcon';
import MediaQuerySelector from '../../constants/responsive/MediaQuerySelector';
import { useFetchType } from '../../store/state/common/selectors/fetchSelector';
import HomeSkeleton from './fragments/HomeSkeleton';
import resetHomeErrorActionCreator
  from '../../store/state/home/actionCreator/resetHomeErrorActionCreator';
import useSnackbar from '../../utils/useSnackbar';
import dailyWeightSelector from '../../store/state/home/selectors/dailyWeightSelector';
import sortedWeightSelector from '../../store/state/home/selectors/sortedWeightSelector';

const Container = styled.div`
  background-color: ${(p) => p.theme[Color.BACKGROUND]};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -24px;
  padding-bottom: 16px;
`;

const Left = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  height: 100%;

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    display: none;
  }
`;

const Right = styled.div`
  width: 40%;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    width: 100%;
    padding-left: 0;
  }
`;

const MobileTitle = styled.div`
  display: none;

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    display: block;
  }
`;

const ContainerWeightFilterDesktop = styled.div`
  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    display: none;
  }
`;

const WeightContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const Clickable = styled.span`
  margin-left: 4px;
  cursor: pointer;
  color: ${(p) => p.theme[Color.PRIMARY]};
`;

const ContainerIcon = styled.div`
  height: 24px;
  width: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;

  :hover {
    background-color: ${(p) => p.theme[Color.BORDER]};
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const orderedWeight = useSelector(sortedWeightSelector);
  const todayWeight = useSelector(dailyWeightSelector(moment()));
  const { t } = useTranslation();
  const notification = useHomeNotification();

  const [openedAdd, setOpenedAdd] = useState(false);

  const [openedDetails, setOpenedDetails] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [defaultDate, setDefaultDate] = useState(null);

  const [startDateFilter, setStartDateFilter] = useState(moment()
    .subtract(1, 'week'));
  const [endDateFilter, setEndDateFilter] = useState(moment());
  const [showLabel, setShowLabel] = useState(true);

  const fetching = useFetchType(GET_HOME);

  const handleOpenSnackbar = () => setOpenedAdd(false);
  const renderSnackbar = useSnackbar(notification, resetHomeErrorActionCreator, handleOpenSnackbar);

  useLayoutEffect(() => {
    dispatch(getHomeActionCreator());
  }, []);

  const renderAddWeightWelcome = () => (
    <>
      <span>{t('home.noWeightToday')}</span>
      <Clickable onClick={() => setOpenedAdd(true)}>{t('home.addTodayWeight')}</Clickable>
    </>
  );

  const handleAddWeight = (date, weight, note) => {
    dispatch(postWeightActionCreator(date, weight, note));
    setDefaultDate(null);
  };

  const handleOpenDetails = (id) => {
    setSelectedId(id);
    setOpenedDetails(true);
  };

  const handleCloseAdd = () => {
    setOpenedAdd(false);
    setDefaultDate(null);
  };

  const handleOpenAddNextWeek = () => {
    setDefaultDate(moment()
      .subtract(1, 'week'));
    setOpenedAdd(true);
  };

  if (fetching) {
    return (<HomeSkeleton />);
  }

  return (
    <Container>
      {renderSnackbar()}
      <WeightDetailsDialog
        open={openedDetails}
        onClose={() => setOpenedDetails(false)}
        id={selectedId}
      />
      <WeightAddDialog
        defaultDate={defaultDate}
        open={openedAdd}
        onClose={handleCloseAdd}
        onPrimary={(date, weight, note) => handleAddWeight(date, weight, note)}
      />
      <Header />
      <div style={{ height: 48 }} />
      <Title
        title={t('home.welcomeUser')}
        subtitle={todayWeight ? t('home.weightToday') : renderAddWeightWelcome()}
      />
      <CardContainer>
        <Card
          title={'Today\'s weight'}
          value={todayWeight}
          icon={(<CalendarIcon />)}
          placeholder={(
            <ContainerIcon onClick={() => setOpenedAdd(true)}>
              <PlusIcon size={16} />
            </ContainerIcon>
          )}
        />
        <Card
          title="Last week"
          // value={lastWeekWeight}
          icon={(<CalendarIcon />)}
          placeholder={(
            <ContainerIcon onClick={handleOpenAddNextWeek}>
              <PlusIcon size={16} />
            </ContainerIcon>
          )}
        />
      </CardContainer>
      <ContainerWeightFilterDesktop>
        <WeightFilter
          startDate={startDateFilter}
          onChangeStartDate={setStartDateFilter}
          endDate={endDateFilter}
          onChangeEndDate={setEndDateFilter}
          showLabel={showLabel}
          onChangeLabelVisibility={setShowLabel}
        />
      </ContainerWeightFilterDesktop>
      <WeightContainer>
        <Left>
          <Chart startDate={startDateFilter} endDate={endDateFilter} showLabel={showLabel} />
        </Left>
        <Right>
          <MobileTitle>
            <WeightFilter
              startDate={startDateFilter}
              onChangeStartDate={setStartDateFilter}
              endDate={endDateFilter}
              onChangeEndDate={setEndDateFilter}
            />
          </MobileTitle>
          <PerfectScrollbar>
            {orderedWeight
              .filter((w) => (
                moment(w.date)
                  .diff(startDateFilter, 'days') >= 0
                && moment(w.date)
                  .diff(endDateFilter, 'days') <= 0
              ))
              .map((w) => (
                <WeightRow
                  date={moment(w.date)
                    .format('DD/MM/YYYY')}
                  value={Number(w.weight)
                    .toFixed(1)}
                  key={w.id}
                  note={w.note}
                  onClick={() => handleOpenDetails(w.id)}
                />
              ))}
          </PerfectScrollbar>
        </Right>
      </WeightContainer>
    </Container>
  );
};

export default Home;

/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, {
  useEffect, useLayoutEffect, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Slide, Snackbar } from '@material-ui/core';
import Title from '../components/Title';
import { Color } from '../theme/ColorSchema';
import Card from '../components/Card';
import CalendarIcon from '../assets/icons/CalendarIcon';
import WeightFilter from './home/WeightFilter';
import Chart from './home/Chart';
import WeightRow from './home/WeightRow';
import WeightDetailsDialog from './home/WeightDetailsDialog';
import WeightAddDialog from './home/WeightAddDialog';
import getHomeActionCreator, { GET_HOME } from '../store/state/home/actionCreator/getHomeActionCreator';
import useOrderedWeights from './useOrderedWeights';
import Header from '../components/Header';
import postWeightActionCreator from '../store/state/home/actionCreator/postWeightActionCreator';
import postWeightErrorActionCreator
  from '../store/state/home/actionCreator/postWeightErrorActionCreator';
import { useHomeError } from '../store/state/home/selectors/homeErrorSelector';
import PlusIcon from '../assets/icons/PlusIcon';
import MediaQuerySelector from '../constants/responsive/MediaQuerySelector';
import { useFetchType } from '../store/state/common/selectors/fetchSelector';
import HomeSkeleton from './home/HomeSkeleton';

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

  ${MediaQuerySelector.MEDIUM_AND_SMALL}{
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

  ${MediaQuerySelector.MEDIUM_AND_SMALL}{
    width: 100%;
    padding-left: 0;
  }
`;

const MobileTitle = styled.div`
  display: none;
  
  ${MediaQuerySelector.MEDIUM_AND_SMALL}{
   display: block;
  }
`;

const ContainerWeightFilterDesktop = styled.div`
  ${MediaQuerySelector.MEDIUM_AND_SMALL}{
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
  
  :hover{
    background-color: ${(p) => p.theme[Color.BORDER]};
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const orderedWeight = useOrderedWeights();
  const { t } = useTranslation();
  const homeError = useHomeError();

  const [openedAdd, setOpenedAdd] = useState(false);

  const [openedDetails, setOpenedDetails] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  const [defaultDate, setDefaultDate] = useState();

  const [startDateFilter, setStartDateFilter] = useState(moment().subtract(1, 'week'));
  const [endDateFilter, setEndDateFilter] = useState(moment());
  const [showLabel, setShowLabel] = useState(true);

  const fetching = useFetchType(GET_HOME);

  const todayWeight = useMemo(() => (
    orderedWeight.find((w) => moment()
      .diff(moment(w.date), 'day') === 0)?.weight),
  [JSON.stringify(orderedWeight)]);

  const lastWeekWeight = useMemo(() => (
    orderedWeight.find((w) => moment()
      .diff(moment(w.date), 'day') === 7)?.weight),
  [JSON.stringify(orderedWeight)]);

  useEffect(() => {
    if (homeError?.length) {
      setSnackbarOpen(true);
      setOpenedAdd(false);
      setSnackbarMessage(homeError[0]?.message);
    }
  }, [homeError]);

  useLayoutEffect(() => {
    dispatch(getHomeActionCreator());
  }, []);

  useEffect(() => () => {
    dispatch(postWeightErrorActionCreator([]));
    setDefaultDate(null);
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(postWeightErrorActionCreator([]));
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
    setDefaultDate(moment().subtract(1, 'week'));
    setOpenedAdd(true);
  };

  if (fetching) {
    return (<HomeSkeleton />);
  }

  return (
    <Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        onClose={() => handleSnackbarClose()}
        TransitionComponent={(p) => (<Slide {...p} direction="up" />)}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
      <WeightDetailsDialog
        open={openedDetails}
        onClose={() => setOpenedDetails(false)}
        onOpenSnackbar={() => setSnackbarOpen(true)}
        onChangeSnackbarMessage={setSnackbarMessage}
        id={selectedId}
      />
      <WeightAddDialog
        defaultDate={defaultDate}
        open={openedAdd}
        onClose={handleCloseAdd}
        onPrimary={(date, weight, note) => handleAddWeight(date, weight, note)}
        onOpenSnackbar={() => setSnackbarOpen(true)}
        onChangeSnackbarMessage={setSnackbarMessage}
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
          value={lastWeekWeight}
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
                moment(w.date).diff(startDateFilter, 'days') >= 0
                && moment(w.date).diff(endDateFilter, 'days') <= 0
              ))
              .map((w) => (
                <WeightRow
                  date={moment(w.date).format('DD/MM/YYYY')}
                  value={Number(w.weight).toFixed(1)}
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

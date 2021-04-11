import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import Routes from './Routes';
import { useSession } from '../store/state/common/selectors/sessionSelector';
import Login from '../pages/Login';
import Home from '../pages/Home';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: relative;
`;

const Routing = () => {
  const session = useSession();

  console.log(session);

  return (
    <Page>
      <BrowserRouter>
        {!session.isValid && (<Redirect to={Routes.AUTHENTICATION.LOGIN} />)}
        {/* <Route exact path={Routes.AUTHENTICATION.LOGOUT}> */}
        {/*  <Logout /> */}
        {/* </Route> */}
        {/* <Route exact path={Routes.AUTHENTICATION.LOGIN}> */}
        {/*  <Login /> */}
        {/* </Route> */}
        {/* <Route exact path={Routes.AUTHENTICATION.REGISTER}> */}
        {/*  <Register /> */}
        {/* </Route> */}
        <Route path={Routes.AUTHENTICATION.LOGIN} exact>
          <Login />
        </Route>
        {/* <Route path={Routes.AUTHENTICATION.REGISTER} exact> */}
        {/*  <Register /> */}
        {/* </Route> */}
        {/* <FantaleagueRouter /> */}
        {/* <HomeRouter /> */}
        <Route path={Routes.HOME}>
          <Home />
        </Route>
        {/* <Route exact path={Routes.REAL_WORLD.HOME}> */}
        {/*  <div>Real World still in progress</div> */}
        {/* </Route> */}
      </BrowserRouter>
      {/* <ErrorManager /> */}
    </Page>
  );
};

export default Routing;

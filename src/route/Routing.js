import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import Routes from './Routes';
import { useSession } from '../store/state/common/selectors/sessionSelector';
import Login from '../pages/Login';
import Home from '../pages/home/Home';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: relative;
`;

const Routing = () => {
  const session = useSession();

  return (
    <Page>
      <BrowserRouter>
        {!session.isValid && (<Redirect to={Routes.AUTHENTICATION.LOGIN} />)}
        <Route path={Routes.AUTHENTICATION.LOGIN} exact>
          <Login />
        </Route>
        <Route path={Routes.HOME} exact>
          <Home />
        </Route>
      </BrowserRouter>
    </Page>
  );
};

export default Routing;

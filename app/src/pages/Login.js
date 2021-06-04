/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { Slide, Snackbar, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingButton from '@material-ui/lab/LoadingButton';
import MediaQuerySelector from '../constants/responsive/MediaQuerySelector';
import { Color } from '../theme/ColorSchema';
import { useLoginError } from '../store/state/authentication/login/selectors/loginErrorSelector';
import { useFetchType } from '../store/state/common/selectors/fetchSelector';
import postLoginActionCreator, { POST_LOGIN } from '../store/state/authentication/login/actionCreator/postLoginActionCreator';
import postLoginErrorActionCreator
  from '../store/state/authentication/login/actionCreator/postLoginErrorActionCreator';
import Routes from '../route/Routes';
import { useSession } from '../store/state/common/selectors/sessionSelector';
import logo from '../assets/images/logo.svg';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 128px);
  margin: 64px;
  box-shadow: 0 0.25em 0.625em rgba(0,0,0,.15);
  border-radius: 8px;
  padding: 64px;
  display: flex;
  background-color: ${(p) => p.theme[Color.BACKGROUND]};

  ${MediaQuerySelector.MEDIUM} {
    padding: 48px;
    width: auto;
    min-width: 480px;
    height: auto;
    flex-direction: column;
  }

  ${MediaQuerySelector.SMALL} {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
    padding: 24px 24px 64px;
    flex-direction: column;
    height: 100%;
    margin: 0;
    justify-content: center;
  }
`;

const Left = styled.div`
  width: 60%;
  margin-right: 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${MediaQuerySelector.LARGE} {
    width: 55%;
    margin-right: 5%;
  }

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    width: 100%;
    margin-right: 0;
    height: auto;
  }
`;

const Right = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${MediaQuerySelector.LARGE} {
    width: 40%;
  }

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    width: 100%;
    height: auto;
  }
`;

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme[Color.PRIMARY_DARK]};
`;

const ContainerImage = styled.div`
  //max-height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 128px;
  
  ${MediaQuerySelector.LARGE} {
    height: 96px;
  }

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    height: 96px;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${(p) => p.theme[Color.PRIMARY_DARK]};
  font-size: 48px;
  margin-bottom: 24px;
  margin-top: 24px;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;

  ${MediaQuerySelector.LARGE} {
    font-size: 42px;
  }

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    font-size: 32px;
    padding-bottom: 16px;
  }
`;

const TitleForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${(p) => p.theme[Color.PRIMARY_DARK]};
  font-size: 28px;
  margin-bottom: 24px;
  font-weight: 550;
  text-transform: capitalize;

  ${MediaQuerySelector.MEDIUM_AND_SMALL} {
    display: none;
  }
`;

const ContainerInput = styled.div`
  height: 92px
`;

const Description = styled.div`
  margin-top: 8px;
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 14px;
  color: ${(p) => p.theme[Color.SUBTITLE]};
  cursor: pointer;
  text-decoration: unset;

  :hover {
    color: ${(p) => p.theme[Color.TEXT_LIGHT]};
  }
`;

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = (t) => Yup.object({
  email: Yup.string(t('login.errors.email.default'))
    .email(t('login.errors.email.valid'))
    .required(t('login.errors.email.required')),
  password: Yup.string(t('login.errors.password.default')).required(t('login.errors.password.required')),
});

const Login = () => {
  const dispatch = useDispatch();

  const loginError = useLoginError();
  const fetching = useFetchType(POST_LOGIN);
  const session = useSession();
  const history = useHistory();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  const { t } = useTranslation();

  const validationSchemaFormik = useMemo(() => validationSchema(t), []);

  useEffect(() => {
    if (loginError?.length) {
      setSnackbarOpen(true);
      setSnackbarMessage(loginError[0]?.message);
    }
  }, [loginError]);

  // Clean errors associated at login when unmount
  useEffect(() => () => {
    if (loginError.length) dispatch(postLoginErrorActionCreator([]));
  }, []);

  // Redirect after successful login
  useEffect(() => {
    if (session.isValid) history.push(Routes.HOME);
  }, [session]);

  const handleSubmit = (formik) => {
    const { email, password } = formik;
    dispatch(postLoginActionCreator(email, password));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(postLoginErrorActionCreator([]));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemaFormik}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Page>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={snackbarOpen}
            onClose={() => handleSnackbarClose()}
            TransitionComponent={(p) => (<Slide {...p} direction="up" />)}
            message={snackbarMessage}
            autoHideDuration={3000}
          />
          <Container>
            <Left>
              <ContainerImage>
                <Image src={logo} alt="Logo" />
              </ContainerImage>
              <Title>{t('common.brand')}</Title>
            </Left>
            <Right>
              <TitleForm>{t('login.title')}</TitleForm>
              <ContainerInput>
                <TextField
                  disabled={fetching}
                  fullWidth
                  label={t('login.placeholder.email')}
                  name="email"
                  variant="outlined"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </ContainerInput>
              <ContainerInput>
                <TextField
                  disabled={fetching}
                  fullWidth
                  type="password"
                  label={t('login.placeholder.password')}
                  name="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </ContainerInput>
              <LoadingButton
                pending={fetching}
                variant="contained"
                color="primary"
                fullWidth
                onClick={formik.handleSubmit}
              >
                {t('login.primary')}
              </LoadingButton>
              <Link style={{ textDecoration: 'unset' }} to={Routes.AUTHENTICATION.REGISTER}>
                <Description>{t('login.notYetUser')}</Description>
              </Link>
            </Right>
          </Container>
        </Page>
      )}
    </Formik>
  );
};

export default Login;

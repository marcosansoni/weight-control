import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import LogoutIcon from '../assets/icons/LogoutIcon';
import logoutActionCreator
  from '../store/state/authentication/logout/actionCreator/logoutActionCreator';
import logo from '../assets/images/logo.svg';
import MediaQuerySelector from '../constants/responsive/MediaQuerySelector';

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  padding: 12px 32px;
  display: flex;
  justify-content: space-between;
  height: 56px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  height: 44px;
  width: 44px;
  
  ${MediaQuerySelector.SMALL}{
    height: 32px;
    width: 32px;
  }
`;

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutActionCreator());

  return (
    <Container>
      <Image src={logo} alt="logo" />
      <Right>
        <ContainerIcon onClick={handleLogout}>
          <LogoutIcon size={24} />
        </ContainerIcon>
      </Right>
    </Container>
  );
};

export default Header;

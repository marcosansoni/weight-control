import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import LogoutIcon from '../assets/icons/LogoutIcon';
import logoutActionCreator
  from '../store/state/authentication/logout/actionCreator/logoutActionCreator';
import logo from '../assets/images/logo.png';
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

// const Logo = styled.div`
// `;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerIcon = styled.div`
  cursor: pointer;
`;

const Image = styled.img`
  height: 48px;
  width: 48px;
  
  ${MediaQuerySelector.SMALL}{
    height: 38px;
    width: 38px;
  }
`;

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutActionCreator());

  return (
    <Container>
      {/* <Logo> */}
      <Image src={logo} alt="logo" />
      {/*  <div>Weight Control</div> */}
      {/* </Logo> */}
      <Right>
        <ContainerIcon onClick={handleLogout}>
          <LogoutIcon size={24} />
        </ContainerIcon>
      </Right>
    </Container>
  );
};

export default Header;

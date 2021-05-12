import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Color } from '../theme/ColorSchema';
import LogoutIcon from '../assets/icons/LogoutIcon';
import logoutActionCreator
  from '../store/state/authentication/logout/actionCreator/logoutActionCreator';

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

const Logo = styled.div`
  font-weight: 700;
  font-size: 24px;
  background-color: ${(p) => p.theme[Color.TEXT_DARK]};
  width: fit-content;
  color: ${(p) => p.theme[Color.BACKGROUND]};
  padding: 0 4px;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerIcon = styled.div`
  cursor: pointer;
`;

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutActionCreator());

  return (
    <Container>
      <Logo>
        Weight Control
      </Logo>
      <Right>
        <ContainerIcon onClick={handleLogout}>
          <LogoutIcon size={24} />
        </ContainerIcon>
      </Right>
    </Container>
  );
};

export default Header;

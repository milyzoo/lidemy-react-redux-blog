import React, { useState } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import SearchBox from "../Search";
import Toggler from "../Toggler";
import { Link, useHistory } from "react-router-dom";
import { setAuthToken } from "../../utils";
import { setUser, selectUser } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 50px;
  max-width: 1500px;
  height: 100px;
  box-sizing: border-box;

  ${MEDIA_QUERY_SM} {
    padding: 0 30px;
  }
`;

const Brand = styled(Link)`
  font-size: 32px;
  font-weight: 900;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const MenuTopLine = styled.span`
  top: 0;
`;

const MenuMiddleLine = styled.span`
  top: 8px;
`;

const MenuBottomLine = styled.span`
  bottom: 0;
`;

const HamburgerMenu = styled.div`
  position: relative;
  margin-left: 25px;
  width: 28px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;

  span {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
    transition: 0.3s;
  }

  &:hover {
    ${MenuTopLine} {
      top: -2px;
    }

    ${MenuBottomLine} {
      bottom: -2px;
    }
  }

  ${MEDIA_QUERY_SM} {
    margin-left: 20px;
  }
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: #0051c3;
  transition: 0.5s;
  z-index: 100;
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(100%)"};

  ${MEDIA_QUERY_SM} {
    width: 100%;
    box-shadow: none;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 45px;
  right: 45px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -5px;
    width: 40px;
    height: 3px;
    border-radius: 10px;
    background: rgba(239, 242, 245, 0.8);
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const NavbarList = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(Link)`
  position: relative;
  width: fit-content;
  text-decoration: none;
  font-size: 24px;
  color: #eff2f5;

  & + & {
    margin-top: 40px;
  }

  &::after {
    position: absolute;
    bottom: -5px;
    left: 50%;
    content: "";
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.7);
    transition: 0.5s;
  }

  &:hover::after {
    left: 0;
    width: 100%;
  }

  ${MEDIA_QUERY_SM} {
    & + & {
      margin-top: 30px;
    }
  }
`;

const NavLogout = styled.div`
  position: relative;
  margin-top: 40px;
  width: fit-content;
  text-decoration: none;
  font-size: 24px;
  color: #eff2f5;
  cursor: pointer;

  &::after {
    position: absolute;
    bottom: -5px;
    left: 50%;
    content: "";
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.7);
    transition: 0.3s;
  }

  &:hover::after {
    left: 0;
    width: 100%;
  }

  ${MEDIA_QUERY_SM} {
    margin-top: 30px;
    font-size: 30px;
  }
`;

const NavbarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    setIsMenuOpen(!isMenuOpen);
    setAuthToken("");
    dispatch(setUser(null));
    history.push("/");
  };

  return (
    <HeaderContainer>
      <Brand to="/" replace>
        Blog
      </Brand>
      <HeaderRight>
        <SearchBox />
        <HamburgerMenu onClick={handleMenuClick}>
          <MenuTopLine></MenuTopLine>
          <MenuMiddleLine></MenuMiddleLine>
          <MenuBottomLine></MenuBottomLine>
        </HamburgerMenu>
      </HeaderRight>
      <NavbarContainer $isOpen={isMenuOpen}>
        <CloseButton onClick={handleMenuClick} />
        <NavbarList>
          <NavItem onClick={handleMenuClick} to="/" replace>
            ??????
          </NavItem>
          <NavItem onClick={handleMenuClick} to="/articles" replace>
            ????????????
          </NavItem>
          {user && (
            <>
            <NavItem onClick={handleMenuClick} to="/add-article" replace>
              ????????????
            </NavItem>
            <NavItem onClick={handleMenuClick} to="/management-articles" replace>
              ????????????
            </NavItem>
            </>
          )}
          {!user && (
            <NavItem onClick={handleMenuClick} to="/login" replace>
              ????????????
            </NavItem>
          )}
          {user && <NavLogout onClick={handleLogout}>??????</NavLogout>}
          <Toggler />
        </NavbarList>
      </NavbarContainer>
      <NavbarBackground $isOpen={isMenuOpen} onClick={handleMenuClick} />
    </HeaderContainer>
  );
}

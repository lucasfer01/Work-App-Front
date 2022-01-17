import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./data";
import SubMenu from "./Submenu";
import { IconContext } from "react-icons/lib";
import Boton from '../Boton/Boton'
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
// import { FaPowerOff } from "react-icons/fa";


const Buton = styled(Boton)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const Nav = styled.div`
  background: #003874;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Center = styled.div`
  flex: 5;
  text-align: center;
  margin-left: 0%;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  color: white;
  letter-spacing: 5px;
`;

const SidebarNav = styled.nav`
  background: #003874;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Center>
            <Link to="/">
              <Logo>WORKINLING.</Logo>
            </Link>
          </Center>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData().map((item, index) => {
              if(item.path){return (
                <SubMenu item={item} key={index}/>
              )}
              else {return (
                <Buton key = {item} onClick={handleLogout}>{item.icon}<SidebarLabel>{item.title}</SidebarLabel></Buton>
              )}
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;

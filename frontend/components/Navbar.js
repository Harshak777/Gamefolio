import Router from 'next/router';
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const TopNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  console.log("log"+props.login)

  const logoutUser = () => {
    localStorage.clear();
    Router.push("/");
  }

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/" style={{color:"white"}}>Gamefolio</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/contest/" style={{color:"white"}}>Contest</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/" style={{color:"white"}}>Dashboard</NavLink>
            </NavItem>
          </Nav>
          <Nav>
          <NavItem>
            { props.login === '' && <NavLink href="/login" style={{color:"white"}}>Login/Signup</NavLink>}
            { 
            props.login != '' 
            && 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {props.login}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink onClick={logoutUser} style={{color:"white"}}>Logout</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/profile" style={{color:"white"}}>profile</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            }
          </NavItem>
          </Nav>
          </Collapse>
      </Navbar>
    </div>
 )
};

export default TopNavbar;
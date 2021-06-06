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

  console.log("log", props)

  const logoutUser = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/" style={{color:"white"}}>Gamefolio</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/contest/" style={{color:"white"}}>Contest</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/dashboard/" style={{color:"white"}}>Dashboard</NavLink>
            </NavItem>
          </Nav>
          <Nav>
          <NavItem>

            { (props.login == '' || props.login == null) && <NavLink href="/login" style={{color:"white"}}>Login/Signup</NavLink>}
            { 
            (props.login != '' && props.login != null)
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
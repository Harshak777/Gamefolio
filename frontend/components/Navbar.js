import Link from 'next/link';
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
  NavbarText
} from 'reactstrap';
const TopNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [islogin, setIslogin] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
          <Link href="/login">
            <NavbarText style={{color:"white"}}>Login/Signup</NavbarText>
          </Link>
          </Collapse>
      </Navbar>
      </div>

 )
};

export default TopNavbar;
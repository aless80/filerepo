import React from "react";
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
  DropdownItem
} from "reactstrap";
//import { Auth } from 'aws-amplify';

export default class NavBar extends React.Component {
  state = {
    isOpen: false
  };
  /*componentDidMount() {
    console.log('Auth:', Auth)
    console.log('Auth._getUserData:', Auth.user.username)
  }*/
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">AWS React File Repository</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Upload</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/projects">Project View</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Links
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="https://aws-amplify.github.io/docs/js/authentication">
                  AWS Amplify Authentication
                </DropdownItem>
                <DropdownItem href="https://aws-amplify.github.io/docs/ios/api">
                  AWS Amplify API
                </DropdownItem>
                <DropdownItem href="https://aws-amplify.github.io/docs/js/storage">
                  AWS Amplify Storage
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

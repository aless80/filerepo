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
                <DropdownItem href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwin9ZnQwK3kAhUNkMMKHSyBAcQQFjAAegQIERAC&url=https%3A%2F%2Faws.amazon.com%2Fconsole%2F&usg=AOvVaw3L5ZM1L-1k3SwMWi6qm9p5" target="_blank">
                  AWS Management Console
                </DropdownItem>

                <DropdownItem
                  href="https://aws-amplify.github.io/docs/js/authentication"
                  target="_blank"
                >
                  AWS Amplify Authentication docs
                </DropdownItem>
                <DropdownItem
                  href="https://aws-amplify.github.io/docs/ios/api"
                  target="_blank"
                >
                  AWS Amplify API docs
                </DropdownItem>
                <DropdownItem
                  href="https://aws-amplify.github.io/docs/js/storage"
                  target="_blank"
                >
                  AWS Amplify Storage docs
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

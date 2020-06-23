
import React from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import ButtonsComponent from '../Buttons';
import {
    Button,
    UncontrolledCollapse,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

class DropDown extends React.Component {
    state = {
        collapseClasses: "",
        collapseOpen: false
    };

    onExiting = () => {
        this.setState({
            collapseClasses: "collapsing-out"
        });
    };

    onExited = () => {
        this.setState({
            collapseClasses: ""
        });
    };

    render() {
        return (
            <>
            {
                sessionStorage.getItem('is_company') === "true"?
                    <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <i className="ni ni-collection d-lg-none mr-1" />
                                <span className="nav-link-inner--text" /*style={{ color: "#5e72e4" }}*/>Navigate</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem to="/company-messages" tag={Link}>
                                    Messages
                      </DropdownItem>
                                <DropdownItem to="/company-programs" tag={Link}>
                                    Programs
                      </DropdownItem>
                                <DropdownItem to="/company-selected-programs" tag={Link}>
                                    Hired programs
                      </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    : <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <i className="ni ni-collection d-lg-none mr-1" />
                                <span className="nav-link-inner--text" /*style={{ color: "#5e72e4" }}*/>Navigate</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem to="/user-messages" tag={Link}>
                                    My Messages
                      </DropdownItem>
                                <DropdownItem to="/programs" tag={Link}>
                                    Programs
                      </DropdownItem>
                                <DropdownItem to="/selected-programs" tag={Link}>
                                    Hired programs
                      </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
            }
            </>
        );
    }
}

export default DropDown;

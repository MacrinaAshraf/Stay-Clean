
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
                       
                           
                           
                                <Link to="/company-messages" tag={Link} style={{color:'orange',paddingRight:'20px'}}>
                                    Messages
                      </Link>
                                <Link to="/company-programs" tag={Link} style={{color:'orange',paddingRight:'20px'}}>
                                    Programs
                      </Link>
                                <Link to="/company-selected-programs" tag={Link} style={{color:'orange',paddingRight:'20px'}}>
                                    Hired programs
                      </Link>
                      
                             
                                {/* <span  style={{color:'orange',marginLeft:'20px'}}>welcome user</span> */}
                         
                    </Nav>
                    : 

<Nav className="navbar-nav-hover align-items-lg-center" navbar>
                       
                           
                           
<Link to="/user-messages" tag={Link} style={{color:'orange',paddingRight:'20px'}}>
    Messages
</Link>
<Link to="/programs" tag={Link} style={{color:'orange',paddingRight:'20px'}}>
    Programs
</Link>
<Link to="/selected-programs" tag={Link} style={{color:'orange',paddingRight:'20px'}}>
    Hired programs
</Link>
</Nav>

            }
            </>
        );
    }
}

export default DropDown;

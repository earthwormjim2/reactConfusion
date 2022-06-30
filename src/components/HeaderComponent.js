import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

// Note that BootStrap 5 and latest reactstrap don't support jumbotron, so made a local "jumbotron_local in this the added associated entry in CSS"

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);

        this.state = {
            isNavOpen: false,
        }

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }


    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" vertical="false">
                    <div className='container'>
                        <div className="row">
                            <div className="col-sm-12 col-md-1">
                                <NavbarToggler onClick={this.toggleNav} vertical="false" />
                                <NavbarBrand className="mr-auto" href='/'>
                                    <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
                                </NavbarBrand>
                            </div>
                            <div className="col">
                                <Collapse isOpen={this.state.isNavOpen} navbar={true}>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/home">
                                                <span className="fa fa-home fa-lg"> </span> Home
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/aboutus">
                                                <span className="fa fa-info fa-lg"> </span> About Us
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/menu">
                                                <span className="fa fa-list fa-lg"> </span> Menu
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/contactus">
                                                <span className="fa fa-address-card fa-lg"> </span> Contact Us
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </Navbar>

                <div className="jumbotron_local rounded p-5">
                    <div className='container'>
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1> Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmaking createions will tickle your culinary sense. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Header;
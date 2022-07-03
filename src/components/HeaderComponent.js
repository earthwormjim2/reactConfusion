import React, { Component } from "react";
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Input, Form,
    FormGroup, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';

// Note that BootStrap 5 and latest reactstrap don't support jumbotron, so made a local "jumbotron_local in this the added associated entry in CSS"

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        }

    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + "\nPassword: " + this.username.value + "\nRemember me: " + this.remember.checked);
        event.preventDefault();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
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
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Button outline onClick={this.toggleModal}>
                                                <span className="fa fa-sign-in fa-lg ">Login</span>
                                            </Button>
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
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody >
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="remember" name="remember" 
                                        innerRef={(input) => this.remember = input}/>
                                    Remember Me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary" className="bg-primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
export default Header;
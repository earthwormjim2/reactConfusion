import React, { Component } from "react";
import { Navbar, NavbarBrand } from 'reactstrap';
// Note that BootStrap 5 and latest reactstrap don't support jumbotron, so made a local "jumbotron_local in this and in CSS"

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar dark >
                    <div className='container'>
                        <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
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
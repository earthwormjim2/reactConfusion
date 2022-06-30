import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
// import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Routes, Route } from 'react-router-dom';




class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
 //     this.onDishSelect = this.onDishSelect.bind(this);
    }


    render() {
        function HomePage() {
            return (
                <Home />
            );
        }


        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/" index element={<HomePage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/menu' element={<Menu dishes={this.state.dishes} />} />
                    <Route path='*' element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;

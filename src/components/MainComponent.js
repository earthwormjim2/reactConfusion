import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
// import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import { Routes, Route } from 'react-router-dom';




class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            selectedDish: null
        };
 //     this.onDishSelect = this.onDishSelect.bind(this);
    }


    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }


        // note current react requires component => element and wrap Component names
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/" index element={<HomePage />} />
                    <Route path='/home' element={<HomePage dishes={this.state.dishes} />} />
                    <Route path='/menu' element={<Menu dishes={this.state.dishes} />} />
                    <Route exact path="/contactus" element={<Contact />} />
                    <Route path='*' element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;

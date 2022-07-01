import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import { Routes, Route, useParams } from 'react-router-dom';




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

        function DishWithId(props) {
            let { dishId } = useParams();
            return (
                <DishDetail dish={props.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
                    comments={props.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))} />
            );
        };

        // react router v6 requires component => element and wrap Component names, see: https://reactrouter.com/docs/en/v6/components/route 
        // Also, using React Hooks to pass parameters, current supported method in React Router 6, see: https://reactrouter.com/docs/en/v6/hooks/use-params
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/" index element={<HomePage />} />
                    <Route path='/home' element={<HomePage dishes={this.state.dishes} />} />
                    <Route path='/aboutus' element={<About leaders={this.state.leaders} />} />
                    <Route path='/menu' element={<Menu dishes={this.state.dishes} />}/>
                    <Route path='/menu/:dishId' element={<DishWithId dishes={this.state.dishes} comments={this.state.comments} />} />
                    <Route path="/contactus" element={<Contact />} />
                    <Route path='*' element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;

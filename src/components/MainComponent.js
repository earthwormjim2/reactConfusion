import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';


import { Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchComments, fetchDishes, fetchPromos, resetFeedbackForm, updateFeedbackForm } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments, 
        promotions: state.promotions,
        leaders: state.leaders,
        feedback: state.feedback
        }
}
    
const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(resetFeedbackForm()) } ,
    updateFeedbackForm: (field, value) => { dispatch(updateFeedbackForm(field, value))},
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) }

});

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        function DishWithId(props) {
            let { dishId } = useParams();
            return (
                <DishDetail dish={props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
                    isLoading={props.dishes.isLoading}
                    errMess={props.dishes.dishesErrMess}
                    comments={props.comments.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))}
                    commentsErrMess={props.comments.comments.ErrMess}
                    addComment={ props.addComment} />
            );
        };

        // react router v6 requires component => element and wrap Component names, see: https://reactrouter.com/docs/en/v6/components/route 
        // Also, using React Hooks to pass parameters, current supported method in React Router 6, see: https://reactrouter.com/docs/en/v6/hooks/use-params
        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/" index element={<HomePage />} />
                    <Route path='/home' element={<HomePage dishes={this.props.dishes} />} />
                    <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
                    <Route path='/menu' element={<Menu dishes={this.props.dishes} />}/>
                    <Route path='/menu/:dishId' element=
                        {<DishWithId dishes={this.props.dishes} comments={this.props.comments} addComment={this.props.addComment} />} />
                    <Route path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}
                        updateFeedbackForm={this.props.updateFeedbackForm} />} />
                    <Route path='*' element={<HomePage />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); // connect uses mapState and mapDispatch to add props to Main component

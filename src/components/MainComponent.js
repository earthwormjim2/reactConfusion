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
import { postComment, fetchComments, fetchDishes, fetchPromos, resetFeedbackForm, updateFeedbackForm, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
    postComment: (dishId, rating, author, comment) => { dispatch(postComment(dishId, rating, author, comment)) },
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(resetFeedbackForm()) },
    updateFeedbackForm: (field, value) => { dispatch(updateFeedbackForm(field, value)) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) =>
        { dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)) }
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

const RoutedTransitionGroup = withRouter(CSSTransition);
    
class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
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
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
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
                    postComment={props.postComment} />
            );
        };

        // react router v6 requires component => element and wrap Component names, see: https://reactrouter.com/docs/en/v6/components/route 
        // Also, using React Hooks to pass parameters, current supported method in React Router 6, see: https://reactrouter.com/docs/en/v6/hooks/use-params
        // Finally, using "RoutedTransition Group" to wraps CSSTransitionGroup... which adds props.router.location to the wrapped component,
        // as Router no longer passes props.location by default.
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <RoutedTransitionGroup key={this.props.router.location.key} classNames="page" timeout={300}> 
                        <Routes location={this.props.router.location} >
                            <Route path="/" index element={<HomePage />} />
                            <Route path='/home' element={<HomePage dishes={this.props.dishes} leaders={this.props.leaders} />} />
                            <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
                            <Route path='/menu' element={<Menu dishes={this.props.dishes} />} />
                            <Route path='/menu/:dishId' element=
                                {<DishWithId dishes={this.props.dishes} comments={this.props.comments}
                                    addComment={this.props.addComment} postComment={this.props.postComment} />} />
                            <Route path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                updateFeedbackForm={this.props.updateFeedbackForm}
                                postFeedback={this.props.postFeedback} />} />
                            <Route path='*' element={<HomePage />} />
                        </Routes>
                    </RoutedTransitionGroup>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); // connect uses mapState and mapDispatch to add props to Main component

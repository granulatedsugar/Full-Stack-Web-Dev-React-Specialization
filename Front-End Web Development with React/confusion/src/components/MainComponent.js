//container component for my application so that it contains everything related to the state of my application
import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


//obtain state from redux-store
//define const mapStateToProps

//mapStateToProps: map redux store state into props that
//will become available to my component

//this state is the state from redux store
//properties(dishes, comments, promotions, leaders) 
//that become available to my component as props
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}


//You can think of dispatching actions as "triggering an event" in the application. 
//Something happened, and we want the store to know about it. 
//Reducers(postComment) act like event listeners, and when they hear an action they are interested in, 
//they update the state in response.

//sends actions to the store to trigger a state change
//the addComment function call will return the action object
//for adding a comment
//which is then given as parameter to the dispatch function
//this can be used to the Main Component.
//we will supply this as a parameter to the connect in the bottom
//so as the addComment becomes available in the Main component
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  //I dipsatch the thunk fetchDishes to make it available into the Main component
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});


//subclass Main - javascript Component
//required whenever we define a class component
class Main extends Component { //es6 class which you are extending to create the App

  constructor(props) {
    super(props);
 
  }

  //make use of the lifecycle method 
  //whatever we include in this method
  //will be executed after the component is mounted
  //into the view of my application
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  //render method contain react elements to create how the page will look on the browser
  render() {

    const HomePage = () => {
      return(
        //pass dish, promotion, leader as props to the HomeComponent so there we make use of these 
        <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading} 
          dishErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading} 
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading} 
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    //match, location, history but i use only match
    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
         isLoading={this.props.dishes.dishesLoading} 
         ErrMess={this.props.dishes.errMess}
         comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
         ErrMess={this.props.comments.errMess}
         postComment={this.props.postComment} />
      );
    }

    // About Page Props
    const AboutPage = () => {
      return(
        <About
        leader={this.props.leaders.leaders}
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMess} />
      );
    }

    const ContactPage = () => {
      return(
        <Contact 
        resetFeedbackForm={this.props.resetFeedbackForm}

        postFeedback={this.props.postFeedback}
        />
      );
    }

    return (
      //css className defined in the App.css file instead of class. This is because it might be confused with the ES6 class reserved keyword
      <div>
        <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page"  timeout={300}>
              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={ContactPage} />
                <Route exact path="/aboutus" component={AboutPage} />
                <Redirect to="/home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

//relate my component to ReactRouter using withRouter -> this is because we need to use the location, history, match
//patameters of the routing. also it re-renders after location changes propagate out from the <Router> component. withRouter as +this.props.location.pathname, match.params etc.

//The connect() function connects a React component Main to a Redux store.
//connect accepts four different parameters, all optional. By convention, they are called:

//mapStateToProps?: Function -any time the store is updated, mapStateToProps will be called, The results of mapStateToProps must be a plain object, which will be merged into the wrapped componentâ€™s props.
//mapDispatchToProps?: Function | Object
//mergeProps?: Function
//options?: Object



//mapStateToProps: provides its connected component Main with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
//so properties become available through props

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


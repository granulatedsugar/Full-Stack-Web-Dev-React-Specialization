import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

//as this is a thung i make use of the (dispatch)
export const postComment= (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    console.log("omg"+newComment.dishId);
    newComment.date=new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    //then part that we handle response
    .then(response => {
        if (response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response =response;
            throw error;
        }
    }, error => {
        //server doesnt even respond
        var errmess = new Error(error.message);
        throw errmess;
    })
    //incoming parameter of next then
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))//only when i get the success of the post from the server i add the comment to the redux store
    .catch(error => {console.log('Post comments ', error.message)
                    alert('Your comment could not be posted\nError: '+error.message);});

} 

//create this as a thunk. it will return a function
//dispatch actions to the store
export const fetchDishes = () => (dispatch) => {
    
    dispatch(dishesLoading(true));
    //full url of location
    //dishees: Error 404: Not Found
    return fetch(baseUrl + 'dishes')
    //handle response from server
        .then(response => {
            if (response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response =response;
                throw error;
            }
        }, error => {
            //server doesnt even respond
            var errmess = new Error(error.message);
            throw errmess;
        })
        //incoming parameter of next then
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
    //after 2s delay is going to add the dishes =push dishes to the state of ourstore
    /*to simulate the server communication before having a server
    setTimeout(() => {
        dispatch(addDishes(DISHES))
    }, 2000); */
}
/**Affect only the Dishes part of the state*/
//returns an action
//based on how we implement the dishes reducer
//we will interpret what this action will do
//intuitively this is going to inform
//that the dishes are goinh to be loaded
//so the user has to wait for them
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

//a function that returns an action object
//this will be shown to the dishes reducer
export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {
    
   
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response =response;
                throw error;
            }
        }, error => {
            //server doesnt even respond
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));

}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response =response;
                throw error;
            }
        }, error => {
            //server doesnt even respond - Failed to fetch
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));

}
 
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

//Assignment 4
export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response =response;
                throw error;
            }
        }, error => {
            //server doesnt even respond - Failed to fetch
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));


}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

//as this is a thunk i make use of the (dispatch)
export const postFeedback= (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
 
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message:message
    }
    newFeedback.date=new Date().toISOString();
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    //then part that we handle response
    .then(response => {
        if (response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response =response;
            throw error;
        }
    }, error => {
        //server doesnt even respond
        var errmess = new Error(error.message);
        throw errmess;
    })
    //incoming parameter of next then
    .then(response => response.json())
    .then(response => { alert('Thank you for your feedback! '+JSON.stringify(response))
        dispatch(addFeedback(response))})//only when i get the success of the post from the server i add the feedback to the redux store
    .catch(error => {console.log('Post feedback ', error.message)
                    alert('Your feedback could not be posted\nError: '+error.message);});

} 

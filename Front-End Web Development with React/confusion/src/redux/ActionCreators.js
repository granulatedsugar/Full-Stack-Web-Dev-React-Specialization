import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const addComment = (comment) => ({
   type: ActionTypes.ADD_COMMENT,
   // Data that needs to be sent in
   payload: comment
});


// Post comment (Thunk function of a function)
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
   
   const newComment =  {
         dishId: dishId,
         rating: rating,
         author: author,
         comment: comment
   };
   newComment.date = new Date().toISOString();

   // POST message to the server
   return fetch(baseUrl + 'comments',  {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
         'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
   })
      // Server  will process
      .then(response => {
         if (response.ok) {
            return response;
         }
         else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
         }
      },
      error => {
         throw error;
      })
      // Callback function
      .then(response => response.json())
      .then(response => dispatch(addComment(response)))
      .catch(error => { console.log('Post comments', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);});
};

// Fetch Dishes
// Thunk returns a function
export const fetchDishes = () => (dispatch) => {
   dispatch(dishesLoading(true));

   // Fetch from server
   // Promise handling
   return fetch(baseUrl + 'dishes')
      .then(response => {
         if (response.ok) {
            return response;
         }
         else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
         }
      },
      error => {
         var errmess = new Error(error.message);
         throw errmess;
      })
      // Callback function
      .then(response => response.json())
      .then(dishes => dispatch(addDishes(dishes)))
      .catch(error => dispatch(dishesFailed(error.message)));
}

// Regular  functions
export const dishesLoading = () => ({
   type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
   type: ActionTypes.DISHES_FAILED,
   payload: errmess
});

export const addDishes = (dishes) => ({
   type: ActionTypes.ADD_DISHES,
   payload: dishes
});

// Fetch Comments
// Thunk returns a function
export const fetchComments = () => (dispatch) => {

   // Fetch from server
   // Handle promise
   return fetch(baseUrl + 'comments')
      .then(response => {
         if (response.ok) {
            return response;
         }
         else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
         }
      },
      error => {
         var errmess = new Error(error.message);
         throw errmess;
      })
      // Callback function
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

// Fetch Promos
// Thunk returns a function
export const fetchPromos = () => (dispatch) => {
   dispatch(promosLoading(true));

   // Fetch from server
   // Handle promise
   return fetch(baseUrl + 'promotions')
      .then(response => {
         if (response.ok) {
            return response;
         }
         else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
         }
      },
      error => {
         var errmess = new Error(error.message);
         throw errmess;
      })
      // Callback function
      .then(response => response.json())
      .then(promos => dispatch(addPromos(promos)))
      .catch(error => dispatch(promosFailed(error.message)));
}

// Regular  functions
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

// Fetch Leaders
// Thunk returns a function
export const fetchLeaders = () => (dispatch) => {
   dispatch(leadersLoading(true));

   // Fetch from server
   // Handle promise
   return fetch(baseUrl + 'leaders')
      .then(response => {
         if (response.ok) {
            return response;
         }
         else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
         }
      },
      error => {
         var errmess = new Error(error.message);
         throw errmess;
      })
      // Callback function
      .then(response => response.json())
      .then(leaders => dispatch(addLeaders(leaders)))
      .catch(error => dispatch(leadersFailed(error.message)));
}

// Regular  functions
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
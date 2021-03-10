import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';


export const addComment = (dishId, rating, author, comment) => ({
   type: ActionTypes.ADD_COMMENT,
   // Data that needs to be sent in
   payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
   } 
});


// Thunk returns a function
export const fetchDishes = () => (dispatch) => {
   dispatch(dishesLoading(true));

   setTimeout(() => {
      dispatch(addDishes(DISHES));
   }, 2000);
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
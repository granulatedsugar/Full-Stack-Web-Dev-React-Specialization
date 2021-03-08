import * as ActionTypes from './ActionTypes';

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
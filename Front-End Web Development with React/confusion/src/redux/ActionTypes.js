/** Standard Approach to create redux actions
 * we will export multiple constants, each of which is
 * a string constant that specifies that corresponding 
 * action. And when you define it like this, 
 * you can import these action types into 
 * the reducer functions and then use that 
 * to do the matching in the switch statement
 * that is used there. 
 */


 export const ADD_COMMENT = 'ADD_COMMENT';
 export const DISHES_LOADING = 'DISHES_LOADING';//dishes info are being fetched from a server
 export const DISHES_FAILED = 'DISHES_FAILED';//you fail to fetch them from sever
 export const ADD_DISHES = 'ADD_DISHES';//add dishes to the store
 export const ADD_COMMENTS = 'ADD_COMMENTS';
 export const COMMENTS_FAILED = 'COMMENTS_FAILED';
 export const PROMOS_LOADING = 'PROMOS_LOADING';
 export const ADD_PROMOS = 'ADD_PROMOS';
 export const PROMOS_FAILED = 'PROMOS_FAILED';
 export const LEADERS_LOADING = 'LEADERS_LOADING';//leaders info are being fetched from a server
 export const LEADERS_FAILED = 'LEADERS_FAILED';//you fail to fetch them from sever
 export const ADD_LEADERS = 'ADD_LEADERS';//add leaders to the store
 export const ADD_FEEDBACK = 'ADD_FEEDBACK';
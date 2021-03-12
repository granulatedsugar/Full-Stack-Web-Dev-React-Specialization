import * as ActionTypes from './ActionTypes';
//reducer is supposed to take state and action
//and return new state to the store.
export const Leaders = (state = {
    isLoading: true,
    errMess: null,
    leaders: []
}, action) =>  {

    switch(action.type){

        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess:null, leaders: action.payload}

        //when we receive an action leaders_loading
        case ActionTypes.LEADERS_LOADING:
            //...take the current values of state and whatever else I set after comma will be passed as modificators
            return {...state, isLoading: true, errMess:null, leaders: []}

        case ActionTypes.LEADERS_FAILED:
            //i already failed to load the leaders so isloading i set false
            //By convention, we put that information in a field called payload why it failed
            return {...state, isLoading: false, errMess:action.payload, leaders: []}

        //cannot modify state here as it is immutable
        //the default return is leaders. 
        //If we dont modify it then we return the same
        default:
            return state;
    }
}   
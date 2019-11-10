import * as actionCreators from '../actions/actionCreators'

const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case actionCreators.CREATE_TODO_LIST_SUCCESS:
            return state;
        case actionCreators.CREATE_TODO_LIST_ERROR:
            return state;
        case actionCreators.UPDATE_LIST_NAME_SUCCESS:
            return state;
        case actionCreators.UPDATE_LIST_NAME_ERROR:
            return state;
        case actionCreators.UPDATE_LIST_OWNER_SUCCESS:
            return state;
        case actionCreators.UPDATE_LIST_OWNER_ERROR:
            return state;
        case actionCreators.DELETE_LIST_SUCCESS:
            return state;
        case actionCreators.DELETE_LIST_ERROR:
            return state;    
        default:
            return state;
    }
};

export default todoListReducer;
const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case 'CREATE_TODO_LIST':
            return state;
            // break;
        case 'CREATE_TODO_LIST_ERROR':
            return state;
            // break;  
        default:
            return state;
            break;
    }
};

export default todoListReducer;
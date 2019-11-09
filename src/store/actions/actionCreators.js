// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CREATE_TODO_LIST_SUCCESS = 'CREATE_TODO_LIST_SUCCESS';
export const CREATE_TODO_LIST_ERROR = 'CREATE_TODO_LIST_ERROR';
export const UPDATE_LIST_NAME_SUCCESS = 'UPDATE_LIST_NAME_SUCCESS';
export const UPDATE_LIST_NAME_ERROR = 'UPDATE_LIST_NAME_ERROR';
export const UPDATE_LIST_OWNER_SUCCESS = 'UPDATE_LIST_OWNER_SUCCESS';
export const UPDATE_LIST_OWNER_ERROR = 'UPDATE_LIST_OWNER_ERROR';
// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return {
        type: 'REGISTER_SUCCESS'
    }
};
export function registerError(error) {
    return {
        type: 'REGISTER_ERROR',
        error
    }
};
export function loginSuccess() {
    return {
        type: 'LOGIN_SUCCESS'
    }
};
export function loginError(error) {
    return {
        type: 'LOGIN_ERROR',
        error
    }
};
export function logoutSuccess() {
    return {
        type: 'LOGOUT_SUCCESS'
    }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoListSuccess() {
    return {
        type: 'CREATE_TODO_LIST_SUCCESS'
    }
}
export function createTodoListError(error) {
    return {
        type: 'CREATE_TODO_LIST_ERROR',
        error
    }
}
export function updateListNameSuccess(todoList) {
    return {
        type: 'UPDATE_LIST_NAME_SUCCESS',
        todoList
    }
}
export function updateListNameError(error) {
    return {
        type: 'UPDATE_LIST_NAME_ERROR',
        error
    }
}
export function updateListOwnerSuccess(todoList){
    return{
        type: 'UPDATE_LIST_OWNER_SUCCESS',
        todoList
    }
}
export function updateListOwnerError(error){
    return{
        type: 'UPDATE_LIST_OWNER_ERROR',
        error
    }
}
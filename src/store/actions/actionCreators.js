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
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_ERROR = 'DELETE_LIST_ERROR';
export const SUBMIT_ITEM_SUCCESS = 'SUBMIT_ITEM_SUCCESS';
export const SUBMIT_ITEM_ERROR = 'SUBMIT_ITEM_ERROR';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_ERROR = 'EDIT_ITEM_ERROR';
export const MOVE_ITEM_UP_SUCCESS = 'MOVE_ITEM_UP_SUCCESS'
export const MOVE_ITEM_UP_ERROR = 'MOVE_ITEM_UP_ERROR'
export const MOVE_ITEM_DOWN_SUCCESS = 'MOVE_ITEM_DOWN_SUCCESS'
export const MOVE_ITEM_DOWN_ERROR = 'MOVE_ITEM_DOWN_ERROR'
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export const SORT_ITEMS_SUCCESS = 'SORT_ITEMS_SUCCESS';
export const SORT_ITEMS_ERROR = 'SORT_ITEMS_ERROR'; 
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
export function deleteListSuccess(todoList){
    return{
        type: 'DELETE_LIST_SUCCESS',
        todoList
    }
}
export function deleteListError(error){
    return{
        type: 'DELETE_LIST_ERROR',
        error
    }
}
export function submitItemSuccess(todoList){
    return{
        type: 'SUBMIT_ITEM_SUCCESS',
        todoList
    }
}
export function submitItemError(error){
    return{
        type: 'SUBMIT_ITEM_ERROR',
        error
    }
}
export function editItemSuccess(todoList){
    return{
        type: 'EDIT_ITEM_SUCCESS',
        todoList
    }
}
export function editItemError(error){
    return{
        type: 'EDIT_ITEM_ERROR',
        error
    }
}
export function moveItemUpSuccess(todoList){
    return{
        type: 'MOVE_ITEM_UP_SUCCESS',
        todoList
    }
}
export function moveItemUpError(error){
    return{
        type: 'MOVE_ITEM_UP_ERROR',
        error
    }
}
export function moveItemDownSuccess(todoList){
    return{
        type: 'MOVE_ITEM_DOWN_SUCCESS',
        todoList
    }
}
export function moveItemDownError(error){
    return{
        type: 'MOVE_ITEM_DOWN_ERROR',
        error
    }
}
export function deleteItemSuccess(todoList){
    return{
        type: 'DELETE_ITEM_SUCCESS',
        todoList
    }
}
export function deleteItemError(error){
    return{
        type: 'DELETE_ITEM_ERROR',
        error
    }
}
export function sortItemsSuccess(todoList){
    return{
        type: 'SORT_ITEMS_SUCCESS',
        todoList
    }
}
export function sortItemsError(error){
    return{
        type: 'SORT_ITEMS_ERROR',
        error
    }
}
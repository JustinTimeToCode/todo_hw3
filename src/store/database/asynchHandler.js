import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const newListHandler = (firebase) => (dispatch, getState, { getFirestore }) => {

  const firestore = getFirestore();
  firestore.collection('todoLists').add({
    name: 'New List',
    owner: 'Unknown',
    items: []
  }).then((doc)=>{
    dispatch(actionCreators.createTodoListSuccess(doc))
    console.log(doc);
    console.log(getState());
    return doc;
  }).catch((err) =>{
    dispatch(actionCreators.createTodoListError(err))
  });

}

export const editListNameHandler = (doc, newName) => (dispatch, getState, { getFirestore }) =>{
  const firestore = getFirestore();
  console.log(doc.id);
  firestore.collection('todoLists').doc(doc.id).update({
    name: newName
  }).then((res) =>{
    console.log(res)
    dispatch(actionCreators.updateListNameSuccess(res))
  }).catch(err =>{
    dispatch(actionCreators.updateListNameError(err))
  })

}

export const editListOwnerHandler = (doc, newOwner) => (dispatch, getState, { getFirestore }) =>{
  const firestore = getFirestore();
  console.log(doc);
  firestore.collection('todoLists').doc(doc.id).update({
    owner: newOwner
  }).then(res =>{
    console.log(res);
    dispatch(actionCreators.updateListOwnerSuccess(res));
  }).catch(err =>{
    console.log(err);
    dispatch(actionCreators.updateListOwnerError(err));
  })
}

export const deleteListHandler = (doc) => (dispatch, getState, { getFirestore }) =>{
  const firestore = getFirestore();
  firestore
  .collection('todoLists')
  .doc(doc.id)
  .delete()
  .then(res =>{
    console.log(res)
    dispatch(actionCreators.deleteListSuccess(res))
  })
  .catch(err =>{
    console.log(err)
    dispatch(actionCreators.deleteListError(err))
  })
}

export const submitNewItemHandler = (doc, item) => (dispatch, getState, { getFirestore }) =>{
  //doc == todoList
  const firestore = getFirestore();
  console.log(doc);
  console.log(item);
  let todoList = doc;
  
  todoList.items.push(item);
    firestore.collection('todoLists').doc(doc.id).update({
      items: todoList.items
    }).then(res => {
      console.log(res)
      dispatch(actionCreators.submitItemSuccess(res))
    }).catch(err => {
      console.log(err)
      dispatch(actionCreators.submitItemError(err))
    })
  
}

export const editItemHandler = (doc, item) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  console.log(doc);
  console.log(item);
  let todoList = doc;
  
  
  todoList.items[item.key] = item;
    firestore.collection('todoLists').doc(doc.id).update({
      items: todoList.items
    }).then(res => {
      console.log(res)
      dispatch(actionCreators.submitItemSuccess(res))
    }).catch(err => {
      console.log(err)
      dispatch(actionCreators.submitItemError(err))
    })
}

export const moveUpHandler = (todoList, todoItem) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  let { items } = todoList
  let index = items.indexOf(todoItem);

  if (index !== 0) {
      [items[index], items[index - 1]] = 
      [items[index - 1], items[index]];
      
      firestore.collection('todoLists').doc(todoList.id).update({
        items
      }).then(res => {
        console.log(res);
        dispatch(actionCreators.moveItemUpSuccess(res))
      }).catch(err => {
        console.log(err)
        dispatch(actionCreators.moveItemUpError(err))
      })
  }
}

export const moveDownHandler = (todoList, todoItem) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  let { items } = todoList
  let index = items.indexOf(todoItem);

  if (index !== items.length - 1 ) {
      [items[index], items[index + 1]] = 
      [items[index + 1], items[index]];
      
      firestore.collection('todoLists').doc(todoList.id).update({
        items
      }).then(res => {
        console.log(res);
        dispatch(actionCreators.moveItemDownSuccess(res))
      }).catch(err => {
        console.log(err)
        dispatch(actionCreators.moveItemDownError(err))
      })
  } 
}

export const deleteListItemHandler = (doc, item) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  let todoList = doc;
  let index = todoList.items.indexOf(item);
  todoList.items.splice(index, 1);

  firestore.collection('todoLists').doc(doc.id).update({
    items: todoList.items
  }).then(res => {
    console.log(res);
    dispatch(actionCreators.deleteItemSuccess(res));
  }).catch(err => {
    console.log(err)
    dispatch(actionCreators.deleteItemError(err))
  })
}

export const sortingHandler = (todoList, items) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('todoLists').doc(todoList.id).update({
    items
  }).then(res => {
    console.log(res);
    dispatch(actionCreators.sortItemsSuccess(res));
  }).catch(err => {
    console.log(err);
    dispatch(actionCreators.sortItemsError(err));
  })
  
}
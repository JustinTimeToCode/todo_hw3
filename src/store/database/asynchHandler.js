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
    dispatch(actionCreators.createTodoListSuccess)
    console.log(doc);
    console.log(getState());
    return doc;
  }).catch((err) =>{
    dispatch(actionCreators.createTodoListError)
  });

}

export const editListNameHandler = (doc, newName) => (dispatch, getState, { getFirestore }) =>{
  const firestore = getFirestore();
  console.log(doc.id);
  firestore.collection('todoLists').doc(doc.id).update({
    name: newName
  }).then((doc) =>{
    console.log(doc)
    dispatch(actionCreators.updateListNameSuccess)
  }).catch(err =>{
    dispatch(actionCreators.updateListNameError, err)
  })

}

export const editListOwnerHandler = (doc, newOwner) => (dispatch, getState, { getFirestore }) =>{
  const firestore = getFirestore();
  console.log(doc);
  firestore.collection('todoLists').doc(doc.id).update({
    owner: newOwner
  }).then(res =>{
    console.log(res);
    dispatch(actionCreators.updateListOwnerSuccess);
  }).catch(err =>{
    console.log(err);
    dispatch(actionCreators.updateListOwnerError, err);
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
  })
  .catch(err =>{
    console.log(err)
  })
}
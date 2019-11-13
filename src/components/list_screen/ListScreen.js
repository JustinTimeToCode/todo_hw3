import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import ListTrash from './ListTrash.js'
import Modal from './Modal.js'
import { firestoreConnect } from 'react-redux-firebase';
import {editListNameHandler, editListOwnerHandler, deleteListHandler} from '../../store/database/asynchHandler'
import ListHeader from './ListHeader'

const ItemSortingCriteria = {

}

class ListScreen extends Component {
    
    constructor(props){
        super(props);

        this.listNameRef = React.createRef();
        this.listOwnerRef = React.createRef();
        // this.modalRef = React.createRef();
    }
    
    state = {
        name: '',
        owner: '',
        sortingCriteria: ''
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleNameChange = (e) => {
        this.props.updateListName(this.props.todoList, this.listNameRef.current.value);
    }

    handleOwnerChange = (e) => {
        this.props.updateListOwner(this.props.todoList, this.listOwnerRef.current.value);
    }

    handleDeleteList = (e) => {
        this.props.deleteList(this.props.todoList);
        return <Redirect to="/"/>
        
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/login" />;
        }
        if (todoList) {
            return (
                <div className="container white">
                    <ListTrash deleteList={this.handleDeleteList}/>
                    <Modal deleteList={this.handleDeleteList} todoList={this.props.todoList}/>
                    <h5 className="grey-text text-darken-3">Todo List</h5>
                    <div className="input-field">
                        <label htmlFor="email">Name</label>
                        <input className="active" ref={this.listNameRef} type="text" name="name" id="name" onChange={this.handleNameChange} value={todoList.name} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Owner</label>
                        <input className="active" ref={this.listOwnerRef} type="text" name="owner" id="owner" onChange={this.handleOwnerChange} value={todoList.owner} />
                    </div>
                    <ListHeader/>
                    <ItemsList todoList={todoList} />
                </div>
            )
        } else {
            return (
                // <div className="container">
                //     <strong>Loading List Data...</strong>
                // </div>
                <span>Loading List...</span>
            )    
        }

        
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) {
    todoList.id = id;    
  }
    console.log(state)
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
    updateListName: (doc, newName) => dispatch(editListNameHandler(doc, newName)),
    updateListOwner: (doc, newOwner) => dispatch(editListOwnerHandler(doc, newOwner)),
    deleteList: (doc) => dispatch(deleteListHandler(doc))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);
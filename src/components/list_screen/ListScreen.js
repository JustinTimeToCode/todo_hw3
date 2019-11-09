import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import {editListNameHandler, editListOwnerHandler} from '../../store/database/asynchHandler'

class ListScreen extends Component {
    
    constructor(props){
        super(props);

        this.listNameRef = React.createRef();
        this.listOwnerRef = React.createRef();
    }
    
    state = {
        name: '',
        owner: '',
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

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" ref={this.listNameRef} type="text" name="name" id="name" onChange={this.handleNameChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" ref={this.listOwnerRef} type="text" name="owner" id="owner" onChange={this.handleOwnerChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
//   const list = '';
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;
    console.log(state)
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
    updateListName: (doc, newName) => dispatch(editListNameHandler(doc, newName)),
    updateListOwner: (doc, newOwner) => dispatch(editListOwnerHandler(doc, newOwner))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);
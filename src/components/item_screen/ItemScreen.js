import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'

export class ItemScreen extends Component {
    render() {
        const {auth, todoItem} = this.props;
        if(!auth.uid){
            return <Redirect to="/login"/>
        }
        if (todoItem) {
            return(
                <div>
                    <span>{todoItem.description}</span>
                    <span>{todoItem.assigned_to}</span>
                    <span>{todoItem.due_date}</span>
                    <span>{todoItem.completed}</span>
                </div>
            )
        } else {
            return (
                <span> Loading Item... </span>
            )
        }

        
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id, index } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    let todoItem;
    if (todoList) {
      todoList.id = id;
      todoItem = todoList.items[index];    
    }
    
    console.log(todoItem)
    console.log(state);
    console.log(ownProps);

    return {
        todoList,
        todoItem,
        auth: state.firebase.auth
    }

    
}

const mapDispatchToProps = {
    
}

export default compose(
    connect(mapStateToProps,
        mapDispatchToProps),
        firestoreConnect([
            { collection: 'todoLists' }
        ])
)(ItemScreen)

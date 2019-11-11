import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import moment from 'moment'

export class ItemScreen extends Component {
    render() {
        const {auth, todoItem} = this.props;
        if(!auth.uid){
            return <Redirect to="/login"/>
        }
        if (todoItem) {
            return(
                <div className="dashboard container">
                    <span>{todoItem.description}</span> <br/>
                    <span>{todoItem.assigned_to}</span><br/>
                    <span>{todoItem.due_date}</span><br/>
                    <span>{`${todoItem.completed}`}</span>
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
    let itemIndex; 
    let todoItem;
    let newItem = {
        description: 'New List Item',
        assigned_to: 'Non-binary Doe',
        due_date: moment(new Date().getDate()).calendar(),
        completed: false

    }
    if (todoList) {
      todoList.id = id;
      itemIndex = index ? parseInt(index, 10) : todoList.items.length;
      todoItem = index ? todoList.items[itemIndex] : newItem;    
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

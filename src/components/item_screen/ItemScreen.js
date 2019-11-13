import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import { editOrSubmitNewItemHandler } from '../../store/database/asynchHandler'
import moment from 'moment'

export class ItemScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            listToEdit: this.props.todoList,
            itemToEdit: this.props.todoItem
        }
    }

    


    render() {
        const { auth, todoItem } = this.props;
        if(!auth.uid){
            return <Redirect to="/login"/>
        }
        if (todoItem) {
            console.log(this.props.todoList)
            console.log(this.props.todoItem)
            return(
                <div className="container white">
                    <span>{todoItem.description}</span> <br/>
                    <span>{todoItem.assigned_to}</span><br/>
                    <span>{todoItem.due_date}</span><br/>
                    <span>{`${todoItem.completed}`}</span>

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
                                    <label htmlFor="first_name">First Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name" type="text" className="validate"/>
                                    <label htmlFor="last_name">Last Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="disabled" type="text" className="validate"/>
                                    <label htmlFor="disabled">Disabled</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" type="email" className="validate"/>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                        </form>
                    </div>
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

const mapDispatchToProps = (dispatch)=> ({
    submitItem: (todoList, item) => dispatch(editOrSubmitNewItemHandler(todoList, item))
})

export default compose(
    connect(mapStateToProps,
        mapDispatchToProps),
        firestoreConnect([
            { collection: 'todoLists' }
        ])
)(ItemScreen)

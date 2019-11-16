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

const M = window.M;
const ItemSortingCriteria = {

}

class ListScreen extends Component {
    
    constructor(props){
        super(props);

        this.listNameRef = React.createRef();
        this.listOwnerRef = React.createRef();
        // this.modalRef = React.createRef();
        this.state = {
            listToEdit: this.props.todoList,
            name: '',
            owner: '',
            sortingCriteria: ''
        }
    }
    
    componentDidMount(){
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            opacity: 1,

        });
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleNameChange = (e) => {
        this.handleChange(e);
        this.props.updateListName(this.props.todoList, this.listNameRef.current.value);
        console.log(`Name: ${this.props.todoList.name}`);
        console.log(this.state.name);
        // console.log(this.props.todoList);
    }

    handleOwnerChange = (e) => {
        this.handleChange(e);
        this.props.updateListOwner(this.props.todoList, this.listOwnerRef.current.value);
        console.log(`Owner: ${this.props.todoList.owner}`);
        console.log(this.state.owner);
        // console.log(this.props.todoList);
    }

    handleDeleteList = (e) => {
        this.props.deleteList(this.props.todoList);
        this.props.history.push('/');
        
    }

    moveItemUp = (e, todoItem) =>{
        e.stopPropagation();
        let index = this.state.listToEdit.items.indexOf(todoItem);
        let listToEdit = this.state.listToEdit;
        let { items } = this.state.listToEdit
        
        if (index !== 0) {
            [items[index], items[index - 1]] = 
            [items[index - 1], items[index]];
            
            this.setState({listToEdit}); 
        }

        // this.disableButtons();
    }

    moveItemDown = (e, todoItem) =>{
        e.stopPropagation();
        let index = this.state.listToEdit.items.indexOf(todoItem);
        let listToEdit = this.state.listToEdit;

        if (index !== this.state.listToEdit.items.length - 1) {
            // [listItems[index], listItems[index + 1]] = 
            // [listItems[index + 1], listItems[index]]

            this.setState({listToEdit});
        }

        // this.disableButtons();
        
    }

    deleteItem = (e, todoItem) =>{
        e.stopPropagation();
        let listToEdit = this.state.listToEdit;
        // let index = this.state.listItems.indexOf(todoItem);
        // let listItems = this.state.listItems;
        // listItems.splice(index, 1);
        this.setState({listToEdit});

        // this.disableButtons();
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
                    <ListTrash/>
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
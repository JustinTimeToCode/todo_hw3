import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import ListTrash from './ListTrash.js'
import Modal from './Modal.js'
import { firestoreConnect } from 'react-redux-firebase';
import {editListNameHandler, editListOwnerHandler, deleteListHandler , updateTimestampHandler} from '../../store/database/asynchHandler'
import ListHeader from './ListHeader'

class ListScreen extends Component {
    
    constructor(props){
        super(props);

        this.listNameRef = React.createRef();
        this.listOwnerRef = React.createRef();
        // this.modalRef = React.createRef();
        this.state = {
            name: '',
            owner: ''
        }
    }

    componentDidMount(){
        if(this.props.todoList){
            this.props.updateTimestamp(this.props.todoList)
        }
    }
    
    componentDidUpdate(){
        if(this.props.todoList){
            this.props.updateTimestamp(this.props.todoList)
        }
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

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/login" />;
        }
        if (todoList) {
            return (
                <div className=" white">
                    <ListTrash/>
                    <Modal deleteList={this.handleDeleteList} todoList={this.props.todoList}/>
                    <h5 className="grey-text text-darken-3">Todo List</h5>
                    <div className="input-field">
                        <label className="active" htmlFor="name">Name</label>
                        <input value={todoList.name} className="active" ref={this.listNameRef} type="text" name="name" id="name" onChange={this.handleNameChange} />
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="owner">Owner</label>
                        <input value={todoList.owner} className="active" ref={this.listOwnerRef} type="text" name="owner" id="owner" onChange={this.handleOwnerChange} />
                    </div>
                    <ListHeader todoList={this.props.todoList}/>
                    <ItemsList todoList={todoList} />
                </div>
            )
        } else {
            return (
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            )    
        }

        
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  let items;
  if (todoList) {
    todoList.id = id;
    items = todoList.items;    
  }
  
  return {
    todoList,
    items,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
    updateListName: (doc, newName) => dispatch(editListNameHandler(doc, newName)),
    updateListOwner: (doc, newOwner) => dispatch(editListOwnerHandler(doc, newOwner)),
    deleteList: (doc) => dispatch(deleteListHandler(doc)),
    updateTimestamp: (todoList) => (dispatch(updateTimestampHandler(todoList)))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);
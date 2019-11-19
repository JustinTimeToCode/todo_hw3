import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect} from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import { submitNewItemHandler, editItemHandler } from '../../store/database/asynchHandler'
const M = window.M;

export class ItemScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // listToEdit: props.todoList,
            // itemToEdit: props.todoItem
            description: this.props.todoList ? this.props.todoList.description : '',
            assigned_to: this.props.todoList ? this.props.todoList.assigned_to : '',
            due_date:  this.props.todoList ? this.props.todoList.due_date : '',
            completed:  this.props.todoList ? this.props.todoList.completed : false
        }

        this.descriptionInput = React.createRef();
        this.assignedToInput = React.createRef();
        this.dueDatePicker = React.createRef();
        this.completedCheckbox = React.createRef();
    }

    handleChange = (e) => {
        
        if(e.target.id === "completed"){
            this.setState({
                completed: e.target.checked
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }

    componentDidMount(){
        M.updateTextFields();
        if(this.props.match.params.index && this.props.todoItem){
            let description = this.descriptionInput.current;
            let assignedTo = this.assignedToInput.current;
            let dueDate = this.dueDatePicker.current;
            let completedCheckbox = this.completedCheckbox.current;

            description.value = this.props.todoItem.description;
            assignedTo.value = this.props.todoItem.assigned_to;
            dueDate.value = this.props.todoItem.due_date;
            completedCheckbox.checked = this.props.todoItem.completed;

            this.setState({
                description: this.props.todoItem.description,
                assigned_to: this.props.todoItem.assigned_to,
                due_date: this.props.todoItem.due_date,
                completed: this.props.todoItem.completed
            })
        }
    }

    componentDidUpdate(){
        M.updateTextFields();
        if(this.props.match.params.index && this.props.todoItem){
            let description = this.descriptionInput.current;
            let assignedTo = this.assignedToInput.current;
            let dueDate = this.dueDatePicker.current;
            let completedCheckbox = this.completedCheckbox.current;

            description.value = this.state.description;
            assignedTo.value = this.state.assigned_to;
            dueDate.value = this.state.due_date;
            completedCheckbox.checked = this.state.completed;

        }
    }

    handleSubmitItem = (e) => {
        e.preventDefault();

        console.log(this.props.todoList);
        console.log(this.props.todoItem);
        let itemToEdit;
        
        if(this.props.match.params.index){
            
           itemToEdit = {
                key: this.props.todoItem.key,
                description: this.descriptionInput.current.value,
                due_date: this.dueDatePicker.current.value,
                assigned_to: this.assignedToInput.current.value,
                completed: this.completedCheckbox.current.checked
           }
           this.props.editItem(this.props.todoList, itemToEdit);
        } else {
            itemToEdit = {
                key: Math.floor((Math.random() * 999999999) + this.props.todoList.items.length),
                description: this.descriptionInput.current.value,
                due_date: this.dueDatePicker.current.value,
                assigned_to: this.assignedToInput.current.value,
                completed: this.completedCheckbox.current.checked
            }
            this.props.submitItem(this.props.todoList, itemToEdit);
        }
        
        this.props.history.goBack();
    }

    handleCancelItem = (e) => {
        e.preventDefault();

        this.props.history.goBack();
    }

    render() {
        const { auth, todoItem } = this.props;
        const { index } = this.props.match.params
        if(!auth.uid){
            return <Redirect to="/login"/>
        }
        if (todoItem || !index) {
            console.log(this.props.todoList)
            console.log(this.props.todoItem)

            return(
                <div className="container white">

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s8">
                                    <input onChange={this.handleChange} value={this.state.description} ref={this.descriptionInput} id="description" type="text" className="validate valid"/>
                                    <label className="active" htmlFor="description">Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <input onChange={this.handleChange} value={this.state.assigned_to} ref={this.assignedToInput} id="assigned_to" type="text" className="validate valid"/>
                                    <label className="active" htmlFor="assigned_to">Assigned To</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <input onChange={this.handleChange} value={this.state.due_date} ref={this.dueDatePicker} id="due_date" type="date" className="datepicker"/>
                                    <label htmlFor="due_date">Due Date</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s8">
                                    <p>
                                        <label htmlFor="completed">
                                            <input ref={this.completedCheckbox} id="completed" type="checkbox"/>
                                            <span>Completed</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                            <div className="right">
                                <button class="btn waves-effect waves-light" type="submit" onClick={this.handleSubmitItem}>
                                    Submit
                                    <i class="material-icons right">send</i>
                                </button>
                                <button class="btn waves-effect waves-light" onClick={this.handleCancelItem}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
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
    const { id, index } = ownProps.match.params;
    
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    let itemIndex; 
    let todoItem;
    // let newItem = {
    //     description: '',
    //     assigned_to: '',
    //     due_date: moment(new Date().getDate()).calendar(),
    //     completed: false

    // }
    if (todoList) {
      todoList.id = id;
      itemIndex = index ? parseInt(index, 10) : todoList.items.length;
      todoItem = index ? todoList.items[todoList.items.findIndex(x => x.key === itemIndex)] : null;

    }

    console.log(index);

    return {
        todoList,
        todoItem,
        auth: state.firebase.auth
    }

    
}

const mapDispatchToProps = (dispatch)=> ({
    submitItem: (todoList, item) => dispatch(submitNewItemHandler(todoList, item)),
    editItem: (todoList, item) => dispatch(editItemHandler(todoList, item))
})

export default compose(
    connect(mapStateToProps,
        mapDispatchToProps),
        firestoreConnect([
            { collection: 'todoLists' }
        ])
)(ItemScreen)

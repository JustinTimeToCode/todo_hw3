import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { moveUpHandler, moveDownHandler, deleteListItemHandler } from '../../store/database/asynchHandler'
const M = window.M;

class ItemCard extends React.Component {

    componentDidMount(){
        let elems = document.querySelectorAll('.fixed-action-btn');
        let instances = M.FloatingActionButton.init(
            elems, {
            direction: 'left'
        });
        M.updateTextFields();
    }

    handleMoveItemUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        
        this.props.moveItemUp(this.props.todoList, this.props.item);
    }

    handleMoveItemDown = (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.moveItemDown(this.props.todoList, this.props.item);
    }

    handleDeleteItem = (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.deleteItem(this.props.todoList, this.props.item);
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card todo-list-link pink-lighten-3 hoverable">
                <div className="card-content grey-text text-darken-3">
                    <div className="row">
                        <div className="col s3">
                            <span className="card-title">{item.description}</span>
                            <span className="card-title">{item.assigned_to}</span>    
                        </div>
                        <div className="col s3">
                            <span className="card-title">{item.due_date}</span>    
                        </div>
                        <div className="col s3">
                            <span className={item.completed ? "green-text card-title" : "red-text card-title"}>{item.completed ? 'Completed' : 'Pending'}</span>    
                        </div>
                        <div className="col s3 valign-wrapper">
                            <div className="fixed-action-btn horizontal direction-left" style={{position: 'absolute', right: '24px', display: 'inline-block'}}>
                                <a href="#!" className="btn-floating btn-large red">
                                    <i className="large material-icons">mode_edit</i>
                                </a>
                                <ul>
                                    <li><button onClick={this.handleMoveItemUp} className="btn-floating red"><i className="material-icons">arrow_upward</i></button></li>
                                    <li><button onClick={this.handleMoveItemDown} className="btn-floating red"><i className="material-icons">arrow_downward</i></button></li>
                                    <li><button onClick={this.handleDeleteItem} className="btn-floating red"><i className="material-icons">close</i></button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
//   const { id } = ownProps.match.params;
//   const { todoLists } = state.firestore.data;
//   const todoList = todoLists ? todoLists[id] : null;
//   let items;
//   if (todoList) {
//     todoList.id = id;
//     items = todoList.items;    
//   }

const {todoList, todoItems, item} = ownProps
  
  return {
    todoList,
    todoItems,
    item,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
    moveItemUp: (todoList, todoItem) => dispatch(moveUpHandler(todoList, todoItem)),
    moveItemDown: (todoList, todoItem) => dispatch(moveDownHandler(todoList, todoItem)),
    deleteItem: (todoList, todoItem) => dispatch(deleteListItemHandler(todoList, todoItem))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemCard);
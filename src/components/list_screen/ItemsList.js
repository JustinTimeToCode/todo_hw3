import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
class ItemsList extends Component {
        
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
              
            {items && items.map(function(item) {
                    item.id = item.key;
                    console.log(`Item id: ${item.id}`);
                    return (
                        <Link to={`${todoList.id}/item/${item.id}`}>
                            <ItemCard todoList={todoList} item={item} todoItems={items} key={item.id}/>
                        </Link>
                    );})
            }
                <div>
                    <Link to = {`${todoList.id}/item/`} className = 'card z-depth-0 todo-list-link pink-lighten-3'>
                        <h3 className="black-text center-align"> <strong> + </strong></h3>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    const { items } = todoList; 
    
    return {
        todoList,
        items,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);
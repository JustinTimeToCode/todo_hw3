import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
              
            {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={`${todoList.id}/item/${item.id}`}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                    );})
            }
            <div onClick = {this.props.goListItem} className = 'list_item_add_card'>
                    <strong> + </strong>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    const { items } = todoList; 
    console.log(todoList);
    console.log(state);
    console.log(ownProps);
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
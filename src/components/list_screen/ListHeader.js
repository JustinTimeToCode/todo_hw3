import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { sortingHandler } from '../../store/database/asynchHandler';

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};
export class ListHeader extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            currentSortCriteria: ItemSortCriteria.SORT_BY_TASK_INCREASING
        }
    }

    generateItemsInSortedOrder = (criteria) => {
        let newItems = Object.assign([], this.props.todoList.items);
        newItems.sort(function (a, b) {
          if (criteria === ItemSortCriteria.SORT_BY_TASK_INCREASING)
            return a.description.localeCompare(b.description);
          else if (criteria === ItemSortCriteria.SORT_BY_TASK_DECREASING)
            return b.description.localeCompare(a.description);
          else if (criteria === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
            return a.due_date.localeCompare(b.due_date);
          else if (criteria === ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
            return b.due_date.localeCompare(a.due_date);
          else if (criteria === ItemSortCriteria.SORT_BY_STATUS_INCREASING)
            return ("" + a.completed).localeCompare("" + b.completed);
          else
            return ("" + b.completed).localeCompare("" + a.completed);
        });
        return newItems;
    }

    handleSortByTask = () => {
        let oldSortingCriteria = this.state.currentSortCriteria;
        let newSortingCriteria = ItemSortCriteria.SORT_BY_TASK_INCREASING;
        if (oldSortingCriteria === ItemSortCriteria.SORT_BY_TASK_INCREASING) {
            newSortingCriteria = ItemSortCriteria.SORT_BY_TASK_DECREASING;
        }
        this.handleSort(newSortingCriteria);
        this.setState({
            currentSortCriteria: newSortingCriteria
        });
    }

    handleSortByDueDate = () => {
        let oldSortingCriteria = this.state.currentSortCriteria;
        let newSortingCriteria = ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING;
        if (oldSortingCriteria === ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING) {
            newSortingCriteria = ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING;
        }
        this.handleSort(newSortingCriteria);
        this.setState({
            currentSortCriteria: newSortingCriteria
        });
    }

    handleSortByStatus = () => {
        let oldSortingCriteria = this.state.currentSortCriteria;
        let newSortingCriteria = ItemSortCriteria.SORT_BY_STATUS_INCREASING;
        if (oldSortingCriteria === ItemSortCriteria.SORT_BY_STATUS_INCREASING) {
            newSortingCriteria = ItemSortCriteria.SORT_BY_STATUS_DECREASING;
        }
        this.handleSort(newSortingCriteria);
        this.setState({
            currentSortCriteria: newSortingCriteria
        });
    }


    handleSort = (criteria) => {
        
        let sortedItems = this.generateItemsInSortedOrder(criteria);
        this.props.sort(this.props.todoList, sortedItems);
    }
    
    render() {
        return (
            <nav>
                
                    <div className="row nav-wrapper blue darken-3 valign-wrapper">
                        <div className="col s3">
                            <h5 onClick={this.handleSortByTask} className="center-align">Task</h5>
                        </div>
                        <div className="col s3">
                            <h5 onClick={this.handleSortByDueDate} className="left-align">Due Date</h5>
                        </div>
                        <div className="col s3">
                            <h5 onClick={this.handleSortByStatus} className="left-align">Status</h5>
                        </div>
                        <div className="col s3">
                        
                        </div>
                    </div>
                
            </nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    sort: (todoList, items) => dispatch(sortingHandler(todoList, items))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ListHeader);

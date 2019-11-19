import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { newListHandler } from '../../store/database/asynchHandler';

class HomeScreen extends Component {

    handleNewList(){

        let doc = this.props.createNewList();
        console.log(doc);
        if(doc){
            console.log(doc)
            // return <Redirect to={`/todoList/${doc.id}`}/>
            this.props.history.push(`/todoList/${doc.getId()}`)
        }
        
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s6">
                        <TodoListLinks />
                    </div>

                    <div className="col s6">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button black-text" onClick={this.handleNewList.bind(this)}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params
    
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => ({
    createNewList: () => dispatch(newListHandler())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['lastUpdated', 'desc'] },
    ]),
)(HomeScreen);
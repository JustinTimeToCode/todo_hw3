import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

export class ItemScreen extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const { items } = todoLists
    
}

const mapDispatchToProps = {
    
}

export default compose(
    connect(mapStateToProps,
        mapDispatchToProps),
        firestoreConnect([
            { collection: 'todoLists' }
        ])(ItemScreen)
)

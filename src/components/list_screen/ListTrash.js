import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ListTrash extends Component {
    render() {
        return (
            <div onClick={this.props.deleteList} id="list_trash">
                    <a data-target="modal" className="waves-effect waves-light btn modal-trigger" href="#!">
                        <i className="large material-icons">delete</i>
                    </a>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTrash)

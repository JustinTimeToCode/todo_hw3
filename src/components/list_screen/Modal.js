import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Modal extends Component {
    render() {
        return (
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Delete list?</h4>
                    <p><strong>Are you sure you want to delete this list?</strong></p>
                    <p>The list will not be retrievable.</p>
                </div>
                <div class="modal-footer">
                    <button href="#!" onClick={this.props.deleteList} className="waves-effect waves-green btn-flat">Yes</button>
                    <button className="modal-close waves-effect waves-green btn-flat">No</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

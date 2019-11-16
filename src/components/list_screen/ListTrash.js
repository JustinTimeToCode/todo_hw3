import React, { Component } from 'react'
import { connect } from 'react-redux'
const M = window.M;
export class ListTrash extends Component {

    componentDidMount(){
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            
        });
    }


    render() {
        return (
            <div id="list_trash">
                    <button data-target="modal1" className="waves-effect waves-light btn modal-trigger">
                        <i className="large material-icons">delete</i>
                    </button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
})

const mapDispatchToProps = ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ListTrash)

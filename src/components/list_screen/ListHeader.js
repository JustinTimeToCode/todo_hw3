import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ListHeader extends Component {
    render() {
        return (
            <nav>
                
                    <div className="row nav-wrapper teal lighten-3 valign-wrapper">
                        <div className="col s4">
                            <h5 className="center-align">Task</h5>
                        </div>
                        <div className="col s4">
                            <h5 className="left-align">Due Date</h5>
                        </div>
                        <div className="col s4">
                            <h5 className="left-align">Completed</h5>
                        </div>
                    </div>
                
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader)

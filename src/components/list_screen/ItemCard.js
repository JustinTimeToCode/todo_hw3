import React from 'react';
const M = window.M;

class ItemCard extends React.Component {

    componentDidMount(){
        let elems = document.querySelectorAll('.fixed-action-btn');
        let instances = M.FloatingActionButton.init(
            elems, {
            direction: 'left',
            hoverEnabled: true
        });
        M.updateTextFields();
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
                            <span className="card-title">{item.completed ? 'Completed' : 'Pending'}</span>    
                        </div>
                        <div class="col s3 fixed-action-button" style={{position: 'relative'}}>
                            <a href="#!" class="btn-floating btn-large red">
                                <i class="large material-icons">mode_edit</i>
                            </a>
                            <ul>
                                <li><a href="#!" class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                                <li><a href="#!" class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                                <li><a href="#!" class="btn-floating green"><i class="material-icons">publish</i></a></li>
                                <li><a href="#!" class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;
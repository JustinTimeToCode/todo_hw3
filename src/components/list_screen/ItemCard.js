import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card todo-list-link pink-lighten-3 hoverable">
                <div className="card-content grey-text text-darken-3">
                    <div className="row">
                        <div className="col s4">
                            <span className="card-title">{item.description}</span>
                            <span className="card-title">{item.assigned_to}</span>    
                        </div>
                        <div className="col s4">
                            <span className="card-title">{item.due_date}</span>    
                        </div>
                        <div className="col s4">
                            <span className="card-title">{item.completed ? 'Completed' : 'Pending'}</span>    
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;
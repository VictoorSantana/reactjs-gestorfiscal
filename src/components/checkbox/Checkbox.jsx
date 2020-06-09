import React, { Component } from 'react';

class Checkbox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span id={this.props.id}>
                <button type="button" 
                        className={`btn btn-${ this.props.marcado ? ('success'):('danger') }`} 
                        onClick={this.props.marcar(true)}> 
                            {
                                this.props.marcado ? (
                                    <i className="far fa-thumbs-up"></i>
                                ): (
                                    <i className="far fa-thumbs-down"></i>
                                )
                            }                                                    
                </button>
            </span>
        );
    }
}

export default Checkbox;
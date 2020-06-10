import React, { Component } from 'react';

class CheckboxAtivo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span id={this.props.id}>
                <button type="button" 
                        className={`btn btn-${ this.props.marcado ? ('success'):('secondary') }`} 
                        onClick={this.props.marcar(true)}> 
                            {
                                this.props.marcado ? (
                                   <> Ativo <i className="fas fa-check"></i> </>
                                ): (
                                   <> Inativo <i className="fas fa-exclamation"></i> </>
                                )
                            }                                                    
                </button>
            </span>
        );
    }
}

export default CheckboxAtivo;
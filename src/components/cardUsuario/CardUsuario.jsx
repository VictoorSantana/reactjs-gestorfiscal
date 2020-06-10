import React, { Component } from 'react';

class CardUsuario extends Component {

    constructor(props) {
        super(props);
        this.state = { };        
    }

    render() {
        return (
            <div className="shadow bg-white px-1 py-4 m-2 rounded position-relative" style={{width: '300px'}}>                
                    <div className="d-flex justify-content-center align-items-center" style={{height: '120px'}}>
                        <button type="button" className="btn btn-link position-absolute" style={{top: '5px', right:'5px'}}> <i className="fas fa-edit"></i> </button>
                        <img src={this.props.usuario.img} className="bg-secondary rounded-circle" style={{width: '90px', height: '90px'}} alt="imagem do usuário."/>
                    </div>
                    <div>
                        <p className="text-center font-weight-bold mb-0 text-nowrap lay-reticencias" style={{maxWidth: '292px'}}>{ this.props.usuario.name }</p>
                        <p className="text-center text-secondary lay-reticencias" style={{maxWidth: '292px'}}>{ this.props.usuario.email }</p>
                    </div>
                    <div className="text-center">
                        <span className={`border lay-cursor-default ${this.props.usuario.status_label == 'Ativo'? ('border-primary text-primary'): ('border-secondary text-secondary') } rounded-pill px-2 py-1`}>{ this.props.usuario.status_label }</span>
                    </div>                
            </div>
        );
    }
}

export default CardUsuario;
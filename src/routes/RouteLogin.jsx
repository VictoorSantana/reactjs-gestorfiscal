import React, { Component } from 'react';
import FormFast from '../helpers/formfast';

import LoginSpinner from '../components/loadSpinner/LoadSpinner';
import ServiceLogin from '../services/service_login';
import { updateUser } from '../actions/userActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LOCAL_STORAGE_VAR } from '../helpers/globalvar';

import schemaCredenciais from '../schemas/schemaCredenciais';

class RouteLogin extends Component {


    constructor(props) {
      super(props);
      this.state = {
        alerta: {    
          ativo: false,      
          tipo: 'danger', //warning, danger
          msg: 'Nenhum dos campos aqui devem ficar vazios',
          destacado: 'Atenção usuário!'
        },
        travar: false
      };

      this.onUpdateUser = this.onUpdateUser.bind(this);
    }

    handleAlertFechar = () => {
      this.setState({alerta: {    
        ativo: false,      
      }});
    }

    onUpdateUser(user) {
      this.props.onUpdateUser(user);
    }

    handleSubmit= async e => {
        e.preventDefault();

        this.setState({ travar: true });

        const data = FormFast.getObject(e.target);      
        
        schemaCredenciais.isValid(data)
        .then( async valid => {
            if(valid) {
              const result = await ServiceLogin.postLogin(data);
                
                switch(result.status) {
                  case 401: //Senha errada
                    this.setState({ travar: false });
                    this.setState({alerta: {    
                      ativo: true,      
                      tipo: 'warning', //warning, danger
                      msg: result.data.message,
                      destacado: 'Barbaridade!'
                    }});
                    break;
                  case 200:              
                    localStorage.setItem(LOCAL_STORAGE_VAR, result.data.access_token);
                    this.onUpdateUser(result.data.user);                    
                    this.props.history.push('/user');
                    break;

                  default:
                    this.setState({alerta: {    
                      ativo: true,      
                      tipo: 'danger', //warning, danger
                      msg: 'Parece que o servidor está indisponível. Atualize a página e tente novamente.',
                      destacado: 'Meu Deus!'
                    }});
                    break;
                } 
            } else {
              this.setState({alerta: {    
                ativo: true,      
                tipo: 'danger', //warning, danger
                msg: 'Todos os campos abaixo devem ser preenchidos e válidos. Tente novamente.',
                destacado: 'Atenção usuário!'
              }});
              this.setState({ travar: false });
              
            }           
        });                                
    }

    render() {
        return (
          <div className="lay-painel py-5 bg-dark">

          <div className="m-auto d-block bg-white lay-shadow2 rounded p-3 border-primary bounce-in-top" style={{width: "350px", borderTop: "1rem solid"}}>
            <h4 className="text-center m-0"> Bem-Vindo ! </h4>
            <p className="text-center text-muted mb-5"> Faça seu login para continuar. </p>
            
            {
              this.state.travar ? (
                <LoginSpinner w="318" h="146" msg="Procurando seu acesso..."></LoginSpinner>
              ): (
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"> <i className="fas fa-at"></i> </div>
                        </div>
                        <input type="text" name="email" required className="form-control" placeholder="Email" disabled={this.state.travar ? ("true"): ""}></input>
                    </div>                    
                  </div>
                  <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"> <i className="fas fa-key"></i> </div>
                        </div>
                        <input type="password" name="password" required className="form-control" placeholder="Senha" disabled={this.state.travar ? ("true"): ""}></input>
                      </div>                    
                  </div>
                  <div className="form-group mb-1 d-flex justify-content-start">
                    <button type="button" className="btn btn-secondary w-50 mr-1" onClick={(e) => this.props.history.push('/cadastro')}>Cadastrar</button>
                    <button type="submit" className="btn btn-primary w-50" disabled={this.state.travar ? ("true"): ""}>Entrar</button>                    
                  </div>
                </form>
              )
            }
            
    
          </div>
          
          {this.state.alerta.ativo ? (
            <div className="lay-log overflow-hidden">
              <div className={`alert alert-${this.state.alerta.tipo} alert-dismissible fade show slide-in-right`} role="alert">
                <strong>{this.state.alerta.destacado}</strong> {this.state.alerta.msg}
                <button type="button" className="close" aria-label="Close" onClick={e => this.handleAlertFechar()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          ): ('')}
          
    
        </div>
        
        );
    }
}


const mapStateToProps = (state) => {
  return {
      user: state.user    
  }
};

const mapActionToProps = (dispatch) => {
  return bindActionCreators ({
      onUpdateUser: updateUser
  }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(RouteLogin);
import React, { Component } from 'react';
import FormFast from '../helpers/formfast';

import LoginSpinner from '../components/loadSpinner/LoadSpinner';
import ServiceLogin from '../services/service_login';
import { updateUser } from '../actions/userActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LOCAL_STORAGE_VAR } from '../helpers/globalvar';
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

        const data = FormFast.getObject(e.target);
        
        this.setState({ travar: true });

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
            console.log(result.data);         
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
        
                
    }



    render() {
        return (
          <div className="lay-painel py-5 bg-dark">

          <div className="m-auto d-block bg-white shadow rounded p-3 border-primary slide-in-fwd-top" style={{width: "350px", borderTop: "1rem solid"}}>
            <h4 className="text-center m-0"> Bem Vindo ! </h4>
            <p className="text-center text-muted mb-5"> Faça login </p>
            
            {
              this.state.travar ? (
                <LoginSpinner w="318" h="146" msg="Procurando seu acesso..."></LoginSpinner>
              ): (
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input type="text" name="email" required className="form-control" placeholder="Email" disabled={this.state.travar ? ("true"): ""}></input>
                  </div>
                  <div className="form-group">
                    <input type="password" name="password" required className="form-control" placeholder="Senha" disabled={this.state.travar ? ("true"): ""}></input>
                  </div>
                  <div className="form-group mb-1">
                    <button type="submit" className="btn btn-primary btn-block" disabled={this.state.travar ? ("true"): ""}>Entrar</button>
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
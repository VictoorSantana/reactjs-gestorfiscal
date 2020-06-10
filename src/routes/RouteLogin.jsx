import React, { Component } from 'react';

/*HELPERS */
import Mensagens from '../helpers/mensagens';
import { LOCAL_STORAGE_VAR } from '../helpers/globalvar';
/* */

/* COMPONENTES */
import LoginSpinner from '../components/loadSpinner/LoadSpinner';
import ServiceLogin from '../services/service_login';
/* */

/* REDUX */
import { updateUser } from '../actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
/* */

/* SCHEMA VALIDACAO */
import schemaCredenciais from '../schemas/schemaCredenciais';

class RouteLogin extends Component {


    constructor(props) {
      super(props);
      this.state = {

        email: '',
        password: '',

        alerta: {    
          ativo: false,      
          tipo: '', //warning, danger
          msg: '',
          destaque: ''
        },
        travar: false
      };
      
    }

    handleAlertFechar = () => {
      this.setState({alerta: {    
        ativo: false,      
      }});
    }   

    handleTravar = (flag) => {
      this.setState({ travar: flag });
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }

    setUsuario = (usuario, token) => {      
      this.props.onUpdateUser(usuario);
      localStorage.setItem(LOCAL_STORAGE_VAR, token);
      this.props.history.push('/user');
    }

    handleRetorno = async (status) => {
      console.log(Mensagens.interno(status));
      this.setState({alerta: Mensagens.interno(status)});
    }

    handleSubmit= async e => {
        e.preventDefault();
                
        this.handleTravar(true);

        const data = {
          email: this.state.email,
          password: this.state.password
        };              
        
        schemaCredenciais.isValid(data)
        .then(async valid => {

            if(valid) {
              const resposta = await ServiceLogin.postLogin(data);

              if(Mensagens.ok(resposta.status)) {
                const usuario = resposta.data.user.data;
                const token = resposta.data.access_token;

                this.setUsuario(usuario, token);                
              } else {                
                this.handleRetorno(5);
                this.handleTravar(false);
              }                
                
            } else {
              this.handleRetorno(4);
              this.handleTravar(false);          
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
                        <input  type="text"
                                name="email" 
                                required 
                                onChange={this.handleChange} 
                                className="form-control" 
                                placeholder="Entre com seu e-mail." 
                                disabled={this.state.travar ? ("true"): ""}></input>
                    </div>                    
                  </div>
                  <div className="form-group">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"> <i className="fas fa-key"></i> </div>
                        </div>
                        <input  type="password"
                                name="password" 
                                required 
                                onChange={this.handleChange} 
                                className="form-control" 
                                placeholder="Entre com sua senha." 
                                disabled={this.state.travar ? ("true"): ""}></input>
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
                <strong>{this.state.alerta.destaque}</strong> {this.state.alerta.msg}
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
import React, { Component } from 'react';

import Mascara from '../helpers/mascara';
import Filtar from '../helpers/filtrar';
import Mensagens from '../helpers/mensagens'; 
import FormFast from '../helpers/formfast';

import ServiceCadastro from '../services/service_cadastro'; 

import LoadSpinner from '../components/loadSpinner/LoadSpinner';

import Checkbox from '../components/checkbox/Checkbox';
import Tutorial from '../components/tutorial/Tutorial';

class RouteCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmacao: '', 
            termo: false,   
            
            travar: false,

            alerta: {
                ativo: false,      
                tipo: 'danger', //warning, danger
                msg: 'Nenhum dos campos aqui devem ficar vazios',
                destaque: 'Atenção usuário!'
            },

            tutorialCheckbox: false
        };
    }

    senhaIgual = () => {
        return (this.state.password === this.state.confirmacao);
    }

    handleCarregar = (flag) => {
        this.setState({ travar: flag });
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
    }

    handleTermo = () => {                       
        if(this.state.termo) {
            this.setState({ termo: false });
        }else {
            this.setState({ termo: true });
        }        
    }

    handleCancelarCadastro = () => {
        this.props.history.push('/');
    }
    
    handleRetorno = (resposta) => {
        if(!FormFast.estaVazio(resposta.data)) {            
            this.setState({alerta: Mensagens.naoGenerico(resposta.data.message, 'warning')});            
        } else {
            this.setState({alerta: Mensagens.tratar(resposta.status)});
        }                
    }

    handleRetornoInterno = (status) => {
        this.setState({alerta: Mensagens.interno(status)});
    }

    handleAlertFechar = () => {
        this.setState({alerta: {ativo: false}});
    }

    displayTutorial = () => {
        this.setState({ tutorialCheckbox: true});

        setTimeout(() => this.setState({tutorialCheckbox: false}), 1500);
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.handleCarregar(true);
        
        const data = {
            name: Filtar.letras(this.state.name),
            email: this.state.email,
            phone: Filtar.numero(this.state.phone),
            password: this.state.password,
            roles: ['ROLE_ROOT'],
        };
        
        if(this.senhaIgual()) {
            if(this.state.termo) {

                const result = await ServiceCadastro.register(data);                
                this.handleRetorno(result);             

                if(Mensagens.ok(result.status)) {
                    setTimeout(() => this.props.history.push('/'), 2000);
                }                

            } else {
                this.handleRetornoInterno(1);                            
                this.displayTutorial();
            }
        } else {
            this.handleRetornoInterno(3);             
        }

        this.handleCarregar(false);
        
    }  
    

    render() {

        const { name, email, phone, password, confirmacao  } = this.state;

        return (
            <>
            <div className="container py-3">
                <h3 className="mb-0">Cadastrar usuário.</h3>
                <small className="form-text text-muted"> Ao enviar este formulário, você voltará a página de 'login', e te enviaremos um e-mail de confirmação. </small>
                <hr></hr>

                
                    {
                        !this.state.travar ? (
                            <form onSubmit={this.handleSubmit} autoComplete="off">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="d-block">E-mail</label>
                                            <input  className="form-control"
                                                    onChange={this.handleChange}
                                                    name="email"
                                                    type="email"
                                                    required
                                                    minLength="5"
                                                    autoComplete="off"/>
                                        </div>
                                    </div> 
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="d-block">Senha</label>
                                            <input  className="form-control"
                                                    onChange={this.handleChange}
                                                    name="password"
                                                    type="password"
                                                    required
                                                    minLength="5"
                                                    autoComplete="off"/>
                                        </div>
                                    </div> 
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="d-block">Confirme a senha</label>
                                            <input  className="form-control"
                                                    onChange={this.handleChange}
                                                    name="confirmacao"
                                                    type="password"
                                                    required
                                                    minLength="5"
                                                    autoComplete="off"/>
                                        </div>
                                    </div>  
                                </div> 
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="d-block">Nome completo</label>
                                            <input  className="form-control"
                                                    onChange={this.handleChange}
                                                    name="name"
                                                    type="text"
                                                    onKeyUp={(e) => Mascara.letras(e)}
                                                    required
                                                    minLength="5"
                                                    autoComplete="off"/>
                                        </div>
                                    </div> 
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label className="d-block">Contato</label>
                                            <input  className="form-control"
                                                    onChange={this.handleChange}
                                                    name="phone"
                                                    type="text"
                                                    onKeyUp={(e) => Mascara.celular(e)}
                                                    required
                                                    autoComplete="off"/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">                                            
                                            <Checkbox marcar={() =>  this.handleTermo} marcado={this.state.termo} id="cadastro_checkbox"></Checkbox>
                                            <label className="ml-1"> Eu li e aceito o termo de compromisso.</label>
                                        </div>
                                    </div>
                                </div>
            
                                <div className="form-group">
                                    <button type="button" className="btn btn-secondary mr-1" style={{width: '110px'}} onClick={this.handleCancelarCadastro}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary" style={{width: '110px'}}>Enviar</button>
                                </div>
                            </form>
                        ): (
                            <div className="d-flex justify-content-center">
                                <LoadSpinner w="350" h="350" msg="Registrando novo usuário."></LoadSpinner>
                            </div>
                        )
                    }                
            </div>

            {this.state.alerta.ativo ? (
            <div className="lay-log overflow-hidden">
              <div className={`alert alert-${this.state.alerta.tipo} alert-dismissible fade show shadow slide-in-right`} role="alert">
                <strong>{this.state.alerta.destaque}</strong> <br/> {this.state.alerta.msg}
                <button type="button" className="close" aria-label="Close" onClick={e => this.handleAlertFechar()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            ): ('')}

            
            {
                this.state.tutorialCheckbox ? (
                    <Tutorial   data={this.state.tutorial} 
                                camada="3"
                                em="cadastro_checkbox"
                                texto="Clique aqui para aceitar!"></Tutorial>
                ): ('')
            }
            </>
        );
    }
}

export default RouteCadastro;
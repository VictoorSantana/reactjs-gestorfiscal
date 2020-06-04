import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

import ServiceCadastro from '../services/service_cadastro'

import FormFast from '../helpers/formfast';
import Mensagens from '../helpers/mensagens';

class RouteCadastro extends Component {    

    constructor(props) {
        super(props);
        this.state = {
            alerta: {    
                ativo: false,      
                tipo: 'danger', //warning, danger
                msg: '',
                destacado: ''
            },
            modalTermoAberto: false
         };

      }

    handleModalTermos = (flag) => {
        this.setState({modalTermoAberto: flag});
    }

    handleSubmitCadastro = async (e) => {
        e.preventDefault();
        let object = FormFast.getObject(e.target);

        object["roles"] = [
            "ROLE_ROOT"
        ];        

        console.log(object);

        if(object.termo !== 'on') {
            this.setState({
                alerta: Mensagens.interno(1)
            });
        } else {
            if(object.password == object.checkpassword) {    

                delete object['checkpassword'];
                delete object['termo'];          
                const result = await ServiceCadastro.registrer(object);

                if(Mensagens.ok(result.status)) {
                    console.log(result);
                    this.setState({
                        alerta: Mensagens.tratar(result.status)
                    });  

                    setTimeout(() => this.props.history.push('/'), 2500);                    
                } else {                                        
                    this.setState({
                        alerta: Mensagens.tratar(result.status)
                    });  
                    console.log(result);                
                }

            } else {
                this.setState({
                    alerta: Mensagens.interno(3)
                });
            }
        }        
    }


    handleAlertFechar = () => {
        this.setState({alerta: {    
            ativo: false,      
          }});
    }

    render() {        
        return (
            <div className="container py-3">
                <h3 className="mb-0">Cadastro</h3>
                <small className="form-text text-muted"> Ao enviar este formulário, você voltará a página de 'login', e te enviaremos um e-mail de confirmação. </small>
                <hr></hr>

                <form onSubmit={this.handleSubmitCadastro}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control" autoComplete="off" required placeholder="Digite seu e-mail"></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="password">Senha</label>
                            <input type="password" name="password" className="form-control" autoComplete="off" required placeholder="Digite sua senha"></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="checkpassword">Confirme a senha</label>
                            <input type="password" name="checkpassword" className="form-control" autoComplete="off" required placeholder="Confirme sua senha"></input>
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Nome completo</label>
                            <input type="text" className="name" name="name" className="form-control" autoComplete="off" required placeholder="Entre com seu nome completo"></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="phone">Telefone</label>
                            <input type="text" name="phone" className="form-control" autoComplete="off" required placeholder="Seu numero de telefone"></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="termo"></input>
                        <label className="form-check-label" htmlFor="termo">
                            Li e aceito o <span className="btn btn-link p-0 m-0" onClick={(e) => this.handleModalTermos(true)}>termo de compromisso.</span>
                        </label>
                        </div>
                    </div>
                    <hr/>
                    <button type="button" className="btn btn-secondary mr-1" style={{width: "115px"}} onClick={(e) => this.props.history.push('/')}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" style={{width: "115px"}}>Enviar</button>
                </form>




                <Modal
                    show={this.state.modalTermoAberto}
                    onHide={() => this.handleModalTermos(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="termos-de-compromisso"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="termos-de-compromisso">
                        Termo de compromisso
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                    </Modal.Body>
                </Modal>


                {this.state.alerta.ativo ? (
                    <div className="lay-log overflow-hidden">
                        <div className={`alert alert-${this.state.alerta.tipo} alert-dismissible fade show shadow slide-in-right`} role="alert">
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

export default RouteCadastro;
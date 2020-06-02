import React, { Component } from 'react';
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginSpinner from '../loadSpinner/LoadSpinner';
import { LOCAL_STORAGE_VAR } from '../../helpers/globalvar';

import Rotas from '../../helpers/rotas';

import { updateUser } from '../../actions/userActions';
import { addAlerta, removeAlerta } from '../../actions/alertaActions';

import ServiceLogin from '../../services/service_login';

class topNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
          alerta: {    
            ativo: false,      
            tipo: 'danger', //warning, danger
            msg: 'Nenhum dos campos aqui devem ficar vazios',
            destacado: 'Atenção usuário!'
          },
          travar: false,
          menubar: false
        };
        
    }

    componentDidMount = async () => {        
        const acesso = await ServiceLogin.whoami();
        this.props.onUpdateUser(acesso);             
        /*
        this.props.onAddAlerta(
            {id: 1, tipo: 'danger', destaque: 'novo!',msg: 'test'}
        );   
        */            
    }

    getRotas = () => {
        return Rotas;
    }
    handleMenuBar = (abrir) => {
        this.setState({menubar: abrir});
    }

    handleLogOut = () => {
        localStorage.removeItem(LOCAL_STORAGE_VAR);
        window.location.reload();        
    }

    handleSubItem = (e) => {    
        const subItemDiv = e.target.parentElement;        
        if(subItemDiv.classList.contains('lay-off')) {
            subItemDiv.classList.remove('lay-off');
        }else {
            subItemDiv.classList.add('lay-off');
        }     
    }
    render() {
        return (
            <React.Fragment>
                <div className="w-100 bg-primary p-2 position-fixed" style={{"left": 0, "top":0, "zIndex":3}}>
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-end">
                                <button type="button" className="btn btn-primary" onClick={(e) => this.handleMenuBar(true)}> <i className="fas fa-bars"></i> </button>
                                <h4 className="ml-3 h5 text-white"> { this.props.titulo } </h4>
                            </div>                            

                            <div className="m-0">
                            <DropdownButton
                            as={ButtonGroup}
                            id={'navbar-dropdown'}
                            drop={'left'}
                            variant="primary"
                            style={{zIndex: 3}}
                            title={<i className="fas fa-cogs"></i>}
                            >                                
                                <Dropdown.Item eventKey="2" tag="a" href="/configuracoes">Configurações</Dropdown.Item>                                
                                <Dropdown.Item eventKey="3">Perfil</Dropdown.Item>                                
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4" onClick={this.handleLogOut}>Sair</Dropdown.Item>
                            </DropdownButton>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={`lay-menu ${ !this.state.menubar ? ('lay-menu-off'): ('') } p-1 bg-dark lay-shadow2`}>

                    {
                        this.props.user == undefined ? (
                            <LoginSpinner w="376" h="90" msg="Procurando seu acesso..."></LoginSpinner>
                        ) : (
                            <div className="position-relative p-2">
                                <button type="button" className="btn btn-primary position-absolute px-3" onClick={(e) => this.handleMenuBar(false)} style={{right:"1rem" ,top:"1rem"}}> <i className="fas fa-caret-left"></i> </button>
                                <div className="d-flex justify-content-start align-items-center">
                                    {
                                        this.props.user.img ? (<img src={this.props.user.img} className="shadow rounded" style={{width: "90px", height:"90px"}} alt="user"></img>) : ('')
                                    }                            
                                    <div className=" ml-2">
                                        <h5 className="text-white mb-0 lay-reticencias" style={{maxWidth: "200px"}}> {this.props.user.name ? (this.props.user.name) : ('Não logado!')} </h5>
                                        <p className="text-secondary mb-0 lay-reticencias" style={{maxWidth: "200px"}}>{this.props.user.name ? ('Usuário padrão') : ('Acesso inválido.')}</p>
                                        <p className="text-secondary">{this.props.user.name ? (<i className="fas fa-signal text-success"></i>) : (<i className="fas fa-exclamation-triangle text-danger"></i>)} </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    

                    <hr className="my-1"></hr>
                    <div className="p-2 overflow-auto" style={{height: "calc(100vh - 125px)"}}>                        
                    {
                        Rotas.Rotas.map((item) =>
                            <div key={item.id} className="lay-off overflow-hidden lay-transition-height" style={{maxHeight: "500px"}}>
                                <label 
                                    className="btn btn-dark m-0 py-2 d-flex justify-content-between text-secondary align-items-center"
                                    style={{cursor: "pointer"}} 
                                    onClick={(e) => this.handleSubItem(e)}> {item.titulo} <i className="fas fa-caret-down"></i> </label>

                                <div className="d-flex flex-column rounded" style={{backgroundColor:"#31373c"}}>
                                    {
                                        item.subItem.map((subItem) =>      
                                            <Link to={subItem.link} key={subItem.id} className="pl-5 py-2 text-secondary text-left">{subItem.titulo}</Link>                                                                                                                   
                                        )
                                    }                                 
                                </div>
                            </div>
                        )
                    }
                    </div>             
                </div>

                <div className="lay-log overflow-hidden">
                    {
                        this.props.alerta !== undefined ? (
                            this.props.alerta.map((item) =>
                            <div key={item.id} className={`alert alert-${item.tipo} alert-dismissible fade show shadow slide-in-right`} role="alert">
                                <strong>{item.destaque}</strong> {item.msg}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={(e) => this.props.onRemoveAlerta(item)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                        )
                        ) : ('')
                        
                    }                        
                </div>  
                <div style={{paddingTop: "64px"}}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user, 
        alerta: state.alerta  
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators ({
        onUpdateUser: updateUser,
        onAddAlerta: addAlerta,
        onRemoveAlerta: removeAlerta
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(topNavbar);
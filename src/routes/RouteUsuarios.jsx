import React, { Component } from 'react';

/* Componentes */
import TopNavbar from '../components/topNavbar/topNavbar';
import CheckboxAtivo from '../components/checkbox_ativo/CheckboxAtivo';
import CardUsuario from '../components/cardUsuario/CardUsuario';
import { Tabs, Tab  } from 'react-bootstrap';

/* Componentes */

/* Helpers */
import Filtrar from '../helpers/filtrar';
import Mensagens from '../helpers/mensagens';
/* Helpers */

/* Services */
import ServiceUsuarios from '../services/service_usuarios';
/* Services */

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlerta } from '../actions/alertaActions';
/* Redux */

class RouteUsuarios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabAberta: 'visual',
            usuariosData: [],
            metaPaginas: {},
            
            filtro: '',
            totalPaginas: 0,
            porPagina: 3,
            pagina: 1,


            status: false,
            email: '',
            name: '',
        }
        
    }

    componentDidMount = async () => {
        this.getListaUsuarios(
            this.state.filtro,
            this.state.porPagina,
            this.state.pagina
        );
    }

    handleTrocarTab = (flag) => {
        this.setState({tabAberta: flag}); //visual ou editar
    }

    handleStatus = () => {                       
        if(this.state.status) {
            this.setState({ status: false });
        }else {
            this.setState({ status: true });
        }        
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }

    getListaUsuarios = async (filtro, porPagina, pagina) => {
        const resposta = await ServiceUsuarios.index(
            filtro,
            porPagina,
            pagina
        );                

        if(Mensagens.ok(resposta.status)) { 

            this.setState({
                usuariosData: resposta.data.data, 
                metaPaginas: resposta.data.meta.pagination 
            });            

        } else {            
            this.props.onAddAlerta(Mensagens.tratar(resposta.status));
        } 
    }

    handleResetar = () => {
        this.setState({
            status: false,
            email: '',
            name: '',
        });
        this.handleTrocarTab('visual');
    }

    handleAvancarPaginas = (qt, flag) => {
               
        if(flag === 1) { //anterior   
            if(this.state.pagina >= qt) {
                this.handleSelecionarPagina(this.state.pagina - qt);
            } else {
                this.handleSelecionarPagina(1);
            }                                 
        } else { //proxima     
            if((this.state.metaPaginas.total_pages - this.state.pagina) >= qt) {
                this.handleSelecionarPagina(this.state.pagina + qt);
            } else {
                this.handleSelecionarPagina(this.state.metaPaginas.total_pages);
            }
        }
    }

    handlePaginas = (flag) => {            
        if(flag === 1) { //anterior                        
            this.handleSelecionarPagina(this.state.pagina - 1);
        } else { //proxima            
            this.handleSelecionarPagina(this.state.pagina + 1);
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const envio = {
            email: this.state.email,
            name: Filtrar.letras(this.state.name),
            status: this.state.status,
            webhook_input: null,
            webhook_output: null,
            roles: ['ROLE_ROOT']
        };        

        const resposta = await ServiceUsuarios.store(envio);

        if(Mensagens.ok(resposta.status)) {
            this.handleResetar();
        }
        this.handleRetorno(resposta);

    }

    handleRetorno = async (resposta) => {
        console.log(resposta.data);
        if(!Filtrar.estaVazio(resposta.data.message)) {
            this.props.onAddAlerta(Mensagens.naoGenerico(resposta.data.message, 'warning'));                      
        } else {
            this.props.onAddAlerta(Mensagens.tratar(resposta.status));            
        }                
    }

    handleSelecionarPagina = (flag) => {        
        this.getListaUsuarios(
            this.state.filtro,
            this.state.porPagina, 
            flag);
        
        this.setState({ pagina:  flag});
    }

    handleChangePorPagina = (event) => { 
        const valor = event.target.value;     
        this.getListaUsuarios(
            this.state.filtro,
            valor,
            this.state.pagina
        );

        this.setState({ porPagina: valor });
    }

    renderPaginas() {
        let result = [];                        
        const de = this.state.metaPaginas.current_page;
        const ate =  this.state.metaPaginas.total_pages;

        for(let i = de; i <= ate; i++) { 
            if(i <= de + 3) {
                result.push(
                    i ==  this.state.metaPaginas.current_page ? (
                        <li className="page-item active" key={i} onClick={(e) => this.handleSelecionarPagina(i)}>
                            <p className="page-link lay-cursor-default">{ i } <span className="sr-only">(current)</span></p>
                        </li>
                    ): (
                        <li className="page-item" key={i} onClick={(e) => this.handleSelecionarPagina(i)}>
                            <span className="page-link lay-cursor-default">{ i }</span>
                        </li>
                    )                                   
                ); 
            } else {                
                break;
            }     
                                  
        }                         
        return result;
     }


    render() {

        const { email, name } = this.state;

        return (
            <div className="lay-painel">
                <TopNavbar titulo="Gestor Fiscal">
                    <div className="container">
                        <h3 className="mb-0"> Usuários - Cadastrados </h3>
                        <small className="form-text text-muted">Vivamus at libero vitae leo sodales ullamcorper ut quis dui. Nullam laoreet dignissim dolor vel volutpat. Vivamus sit amet erat sit amet felis aliquam porta.</small>                        
                        <hr/>


                        <Tabs
                        id="RoutePapeisContratos-TAB"
                        activeKey={this.state.tabAberta}
                        onSelect={(flag) => this.handleTrocarTab(flag)}
                        >
                            <Tab eventKey="visual" title="Visualizar">

                                <div className="d-flex justify-content-between">
                                    <div className="form-group mr-1">
                                        <label className="d-block">Filtro</label>
                                        <input type="text" placeholder="Filtro" className="form-control" disabled/>
                                    </div>                            
                                    <div className="form-group">
                                        <label className="d-block">Em tela</label>
                                        <select name="porPagina" 
                                                className="form-control"
                                                value={this.state.porPagina} 
                                                onChange={this.handleChangePorPagina}>
                                            <option value="3">Mostrar 3</option>
                                            <option value="5">Mostrar 5</option>
                                            <option value="10">Mostrar 10</option>
                                            <option value="15">Mostrar 15</option>
                                        </select>
                                    </div>                            
                                </div>

                                <div className="d-flex justify-content-center flex-wrap">                     
                                    {                            
                                        !Filtrar.estaVazio(this.state.usuariosData) ? (
                                            this.state.usuariosData.map((usuario) =>

                                                <CardUsuario usuario={usuario} key={usuario.uuid}></CardUsuario>

                                            )
                                        ): ('')                            
                                    }                                                                    
                                </div>

                                <hr/>
                                {
                                    !Filtrar.estaVazio(this.state.metaPaginas) ? (
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className={`page-item ${ !this.state.metaPaginas.links.previous ? ('disabled'): ('')} `} onClick={(e) => !this.state.metaPaginas.links.previous ? (''): (this.handleAvancarPaginas(5, 1))}>
                                                    <span className="page-link lay-cursor-default"><i className="fas fa-angle-double-left"></i></span>
                                                </li>    
                                                <li className={`page-item ${ !this.state.metaPaginas.links.previous ? ('disabled'): ('')} `} onClick={(e) => !this.state.metaPaginas.links.previous ? (''): (this.handlePaginas(1))}>
                                                    <span className="page-link lay-cursor-default"><i className="fas fa-angle-left"></i></span>
                                                </li>                                                        
                                                {
                                                    this.renderPaginas()
                                                }                                                                                                                             
                                                <li className={`page-item ${ !this.state.metaPaginas.links.next ? ('disabled'): ('')} `} onClick={(e) => !this.state.metaPaginas.links.next ? (''): (this.handlePaginas(2))}>
                                                    <span className="page-link lay-cursor-default"><i className="fas fa-angle-right"></i></span>
                                                </li>
                                                <li className={`page-item ${ !this.state.metaPaginas.links.next ? ('disabled'): ('')} `} onClick={(e) => !this.state.metaPaginas.links.next ? (''): (this.handleAvancarPaginas(3,2))}>
                                                    <span className="page-link lay-cursor-default"><i className="fas fa-angle-double-right"></i></span>
                                                </li>
                                            </ul>
                                        </nav>
                                    ): ('')
                                } 

                            </Tab>
                            <Tab eventKey="editar" title="Adicionar\Editar">                                
                                <form  onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="d-block">Nome</label>
                                                <input  type="text" 
                                                        name="name" 
                                                        className="form-control"
                                                        value={this.state.name}
                                                        onChange={this.handleChange}
                                                        required
                                                        autoComplete="off"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="d-block">E-mail</label>
                                                <input  type="text"
                                                        name="email" 
                                                        className="form-control"
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                        required
                                                        autoComplete="off"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="d-block">Status</label>                                            
                                                <CheckboxAtivo marcar={() =>  this.handleStatus} marcado={this.state.status}></CheckboxAtivo>                                           
                                            </div>
                                        </div>                                    
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-secondary mr-1" onClick={this.handleResetar}>Cancelar</button>
                                                <button type="submit" className="btn btn-primary">Adicionar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                            </Tab>
                        </Tabs>
                        
                        

                    </div>

                    
                </TopNavbar>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {        
        alerta: state.alerta  
    }
};

const mapActionToProps = (dispatch) => {
    return bindActionCreators ({        
        onAddAlerta: addAlerta
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(RouteUsuarios);
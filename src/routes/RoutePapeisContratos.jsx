import React, { Component } from 'react';

/* Componentes */
import TopNavbar from '../components/topNavbar/topNavbar';
import LoginSpinner from '../components/loadSpinner/LoadSpinner';
/* Componentes */

/* Bootstrap */
import { Tabs, Tab  } from 'react-bootstrap';
/* Bootstrap */

/* Services */
import ServicePapeis from '../services/service_papeis';
/* Services */

/* Helpers */
import FormFast from '../helpers/formfast';
import Mensagens from '../helpers/mensagens';
/* Helpers */

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlerta, removeAlerta } from '../actions/alertaActions';
/* Redux */

class RoutePapeisContratos extends Component {

    constructor(props) {
        super(props);                   
        this.state = {
            tabAberta: 'visual',
            pagina: 1,
            travarFiltro: false,
            papeisIndex: [],    
            metaPaginas: {},    
    
            id: 0,
            name: '',
            display_name: '',
            description: ''        
        };
    }

    
    

    handleTrocarTab = (flag) => {
        this.setState({tabAberta: flag});
    }

    componentDidMount = async () => {
        this.getPapeisIndex(1);
    }

    getPapeisIndex = async (page) => {             
        const result = await ServicePapeis.index(page);        
        if(result.status == 200) {
            this.setState({papeisIndex: result.data.data, metaPaginas: result.data.meta.pagination });            
        } else {            
            this.props.onAddAlerta(Mensagens.tratar(result.status));
        }        
    }

     handleEditarPapel = (id) => {
        
     }  

     handleSubmitPapeis = async (e) => {
        e.preventDefault(); 

        const data = {
            name: this.state.name,
            display_name: this.state.display_name,
            description: this.state.description,
        };
        
        const result = await ServicePapeis.store(data);        
        
        if(result.status == 200) {
            this.props.onAddAlerta(Mensagens.interno(1));
        } else {            
            this.props.onAddAlerta(Mensagens.tratar(result.status));
        }                
     }

     changeHandler = e => {
        this.setState({[e.target.name]: e.target.value });
    }

     handlePaginas = async (flag) => {        
        if(flag == 1) { //anterior
            this.getPapeisIndex(this.state.metaPaginas.current_page - 1);
        } else { //proxima
            this.getPapeisIndex(this.state.metaPaginas.current_page + 1);
        }        
     }

     renderPaginas() {
        let result = [];                
        for(let i = 1; i <= 2; i++) {            
            result.push(
                i ==  this.state.metaPaginas.current_page ? (
                    <li className="page-item active" key={i} onClick={(e) => this.getPapeisIndex(i)}>
                        <p className="page-link lay-cursor-default">{ i } <span className="sr-only">(current)</span></p>
                    </li>
                ): (
                    <li className="page-item" key={i} onClick={(e) => this.getPapeisIndex(i)}>
                        <span className="page-link lay-cursor-default">{ i }</span>
                    </li>
                )                                   
            );                       
        }                         
        return result;
     }

    render() {
        let {id,name,display_name,description} = this.state;

        return (
            <div className="lay-painel">
                <TopNavbar titulo="Gestor Fiscal">
                    <div className="container">
                        <h3 className="mb-0"> Papeis - Contratos </h3>
                        <small className="form-text text-muted">Vivamus at libero vitae leo sodales ullamcorper ut quis dui. Nullam laoreet dignissim dolor vel volutpat. Vivamus sit amet erat sit amet felis aliquam porta.</small>                        
                        <hr/>
                        <Tabs
                        id="RoutePapeisContratos-TAB"
                        activeKey={this.state.tabAberta}
                        onSelect={(flag) => this.handleTrocarTab(flag)}
                        >
                            <Tab eventKey="visual" title="Visualizar">
                                
                                {
                                    !this.state.travarFiltro ? (
                                        <>
                                    <div>  
                                        {         
                                                  
                                            !FormFast.estaVazio(this.state.papeisIndex) ? (
                                                this.state.papeisIndex.map((data) =>

                                                <div key={data.id} onClick={(e) => this.handleEditarPapel(data.id)} className="bg-white my-1 py-1 px-3 rounded border-left border-bottom d-flex justify-content-between">
                                                    <div>
                                                        <p className="mb-0 font-weight-bold"> {data.name} </p>
                                                        <small className="text-muted">Descrição: { data.description }</small>                                                                                
                                                    </div>
                                                    <button type="button" className="btn btn-link m-0 p-0"> <i className="fas fa-edit"></i> </button>
                                                </div>                                                                                                
                                            ) 
                                            ):(
                                                <p className="font-weight-bold">Nenhum registro encontrado.</p>
                                            )                                                                                                                                                                                                                                        
                                        }                     
                                    </div>                    

                                        <hr/>
                                        {
                                            !FormFast.estaVazio(this.state.metaPaginas) ? (
                                                <nav aria-label="Page navigation example">
                                                    <ul className="pagination">
                                                        <li className={`page-item ${ !this.state.metaPaginas.links.previous ? ('disabled'): ('')} `} onClick={(e) => !this.state.metaPaginas.links.previous ? (''): (this.handlePaginas(1))}>
                                                            <span className="page-link lay-cursor-default">Ant.</span>
                                                        </li>                                                        
                                                        {
                                                            this.renderPaginas()
                                                        }                                                                                                                             
                                                        <li className={`page-item ${ !this.state.metaPaginas.links.next ? ('disabled'): ('')} `} onClick={(e) => !this.state.metaPaginas.links.next ? (''): (this.handlePaginas(2))}>
                                                            <span className="page-link lay-cursor-default">Prox.</span>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            ): ('')
                                        }                                        
                                        </>
                                    ):(
                                        <div className="d-flex justify-content-center">
                                            <LoginSpinner w="350" h="350" msg="Buscando papeis registros..."></LoginSpinner>
                                        </div>
                                    )
                                }
                                

                            </Tab>
                            <Tab eventKey="editar" title="Alterar/Adicionar">
                                <>
                                <form onSubmit={this.handleSubmitPapeis} className="mt-1">                                    
                                    <input type="text" className="d-none" name="id" value={id} onChange={this.changeHandler}></input>


                                    <div className="row align-items-end">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="name" className="d-block">Nome</label>
                                                <input type="text" name="name" value={name} onChange={this.changeHandler} required className="form-control"/>
                                            </div>                                            
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="display_name" className="d-block">Apelido</label>
                                                <input type="text" name="display_name" value={display_name} onChange={this.changeHandler} required className="form-control"/>
                                            </div>                                            
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="description" className="d-block">Descrição</label>
                                                <input type="text" name="description" value={description} onChange={this.changeHandler} required className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-secondary mr-1">Cancelar</button>
                                                <button type="submit" className="btn btn-primary">Adicionar</button>
                                            </div>                                            
                                        </div>
                                    </div>
                                </form>  
                                </>
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
        onAddAlerta: addAlerta,
        onRemoveAlerta: removeAlerta
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(RoutePapeisContratos);
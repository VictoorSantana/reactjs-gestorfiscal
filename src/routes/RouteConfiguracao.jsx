import React, { Component } from 'react';

import TopNavbar from '../components/topNavbar/topNavbar'

class RouteConfiguracao extends Component {


    constructor(props) {
        super(props);

        this.state = { 
            tema: ''
        };
        
    }
    handleTemaChange = (event) => {
        this.setState({tema: event.target.value});
        localStorage.setItem('tema', event.target.value);
    }

    render() {
        const {tema} = this.state;

        return (
            <div className="lay-painel">
                <TopNavbar titulo="Gestor Fiscal">
                    <div className="container">
                        <h3> Configurações </h3>
                        <hr/>
                        <form>
                            <div className="d-flex justify-content-start">
                                <div className="form-group">
                                    <label htmlFor="tema" className="d-block">Tema</label>
                                    <select name="tema" className="form-control" disabled="true" value={this.state.tema} onChange={(e) => this.handleTemaChange(e)} style={{width:"200px"}}>
                                        <option value="Orgamec">Orgamec</option>
                                        <option value="Fresca">Fresca</option>
                                        <option value="Herbie">Herbie</option>
                                    </select>
                                    <small className="form-text text-muted">* Você tem que atualizar a página para ver a mudança.</small>
                                </div>
                            </div>                           
                        </form>
                    </div>            
                </TopNavbar>
            </div>
        );
    }
}

export default RouteConfiguracao;

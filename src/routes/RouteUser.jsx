import React, { Component } from 'react';
import TopNavbar from '../components/topNavbar/topNavbar'

class RouteUser extends Component {
    render() {
        return (
            <div className="lay-painel">
                <TopNavbar titulo="Gestor Fiscal">
                    <div className="container">
                        <h3> Usuário </h3>
                        <hr/>
                    </div>            
                </TopNavbar>
            </div>
        );
    }
}

export default RouteUser;
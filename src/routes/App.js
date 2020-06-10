import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


/* Rotas */
import RouteLogin from './RouteLogin';
import RouteCadastro from './RouteCadastro';
import RouteUser from './RouteUser'
import RouteConfiguracao from './RouteConfiguracao';
import RoutePapeisContratos from './RoutePapeisContratos';
import RouteUsuarios from './RouteUsuarios';

/*****/

/* Helpers */
import Credenciais from '../helpers/credenciais';

/*****/

const PrivateRoute = ({ component: Component, ... rest }) => (
  <Route 
  { ... rest}
  render={props => 
      Credenciais.temToken() ? (
          <Component { ... props} />
      ): (
          <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
      )
  }
  />
);

const Routes = () => (
  <BrowserRouter>
        <Switch>
            <Route exact path="/" component={(props) => <RouteLogin  {...props}></RouteLogin>}></Route>
            <Route exact path="/cadastro" component={(props) => <RouteCadastro  {...props}></RouteCadastro>}></Route>

            <PrivateRoute path="/user" component={(props) => <RouteUser {...props}></RouteUser>}></PrivateRoute>
            <PrivateRoute path="/PapeisContratos" component={(props) => <RoutePapeisContratos {...props}></RoutePapeisContratos>}></PrivateRoute>
            <PrivateRoute path="/configuracoes" component={(props) => <RouteConfiguracao {...props}></RouteConfiguracao>}></PrivateRoute>
            <PrivateRoute path="/usuarios" component={(props) => <RouteUsuarios {...props}></RouteUsuarios>}></PrivateRoute>
        </Switch>
  </BrowserRouter>
);

export default Routes;

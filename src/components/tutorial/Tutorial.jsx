import React, { Component } from 'react';

class Tutorial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            referencia: {}
        };
    }

    componentDidMount() {                
        this.setState({
            referencia: document.getElementById(this.props.em).getBoundingClientRect()
        });        
    }

    render() {
        const resultado = {
            fontSize: '1rem', 
            left: (this.state.referencia.left + 5) + 'px', 
            top: (this.state.referencia.top - 45) + 'px',
            zIndex: this.props.camada,
        };

        return (
            <span   className="badge badge-dark p-2 position-fixed shadow shake-vertical" 
                    style={resultado}> <i className="fas fa-arrow-down"></i> {this.props.texto}</span>
        );
    }
}

export default Tutorial;
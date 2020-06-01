import React, { Component } from 'react';

class LoadSpinner extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="text-center" style={{width: this.props.w + "px",height: this.props.h + "px"}}>
              <div className="spinner-border text-primary" role="status" >
                <span className="sr-only">Loading...</span>
              </div>
                <p className="text-secondary">{this.props.msg}</p>
            </div>
        );
    }
}

export default LoadSpinner;
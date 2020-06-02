import React, { Component } from 'react';

class LoadSpinner extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-content-center flex-wrap" style={{width: this.props.w + "px",height: this.props.h + "px"}}>
                <div className="text-center slide-in-fwd-top">
                    <div className="spinner-border text-primary" role="status" >
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="text-secondary"> {this.props.msg}</p>
                </div>              
            </div>
        );
    }
}

export default LoadSpinner;
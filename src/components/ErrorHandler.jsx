import React, { Component } from 'react';


export default class ErrorHandler extends Component {

constructor(props){
  super(props);
  this.state = {hasError : false};
}
  static getDerivedStateFromError(state){
    //this.setState('hasError': 'true');
    console.log(" Error occured "+ state);
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo){
    console.log("Error occured in " + error + " with errorInfo"+errorInfo);
  }
  render() {
    if(this.state.hasError){
      return <p>  Error Occured! Plese try agin with different file!</p>
    }
    return this.props.children;
  }
}

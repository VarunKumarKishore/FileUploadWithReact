import React, { Component } from 'react';

export default class MyComponent extends Component {
  render() {

    const footerStyle = {
      'width': '100%',
      'height': '80px',
      'align-items': 'center',
      'text-align': 'center'
    };


    return (
      <div className='footerStyle'>
        <section>
          <p>Footer Component</p>
        </section>
      </div>
    );
  }
}

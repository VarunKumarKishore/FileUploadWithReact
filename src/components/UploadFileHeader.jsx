import React, { Component } from 'react';


export default class MyComponent extends Component {

  render() {
    const headerStyle = {
      'width': '100%',
      'height': '80px',
      'align-items': 'center',
      'text-align': 'center'
    };

    return (
      <div className='headerStyle'>
        <section>
          <p>Header Component</p>
        </section>
      </div>
    );
  }
}

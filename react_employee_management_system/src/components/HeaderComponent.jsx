import React, { Component } from 'react';

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div><a href="https://fartow.se" className="navbar-brand px-5">Employee Managment App</a></div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
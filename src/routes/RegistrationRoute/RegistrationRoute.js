import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import "../../components/App/App.css"

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className="login-grid">
        <div className="login-grid-item side-div"></div>
        <div className="login-grid-item login-content">
          <h2>Login</h2>
          <LoginForm
            className="LoginForm"
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
        <div className="login-grid-item side-div"></div>
      </section>
    );
  }
}

export default LoginRoute

import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import "../../components/App/App.css"

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className="registration-grid">
        <div className="registration-grid-item side-div"></div>
          <div className="registration-grid-item registration-content">
          <p>
            Practice learning a language with the spaced repetition revision technique.
          </p>
          <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
        </div>
        <div className="registration-grid-item side-div"></div>
      </section>
    );
  }
}

export default RegistrationRoute

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'
import '../App/App.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span>
          {this.context.user.name}
        </span>
        <nav className="header-menu-link">
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className="header-menu-link">
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="header header-grid">
        <div className="logo-box">
          <h1>
            <Link to='/' id="logo">
              Spaced Repetition
          </Link>
          </h1>
        </div>
        <div className="header-menu-box">
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
          <Link to='/learn'>
              Learn
          </Link>
        </div>
      </header>
    );
  }
}

export default Header

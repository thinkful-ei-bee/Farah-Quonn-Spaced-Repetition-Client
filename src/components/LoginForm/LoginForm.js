import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor='login-username-input' className="form-label">
            Username
          </Label>
          <Input
            className="form-input"
            ref={this.firstInput}
            id='login-username-input'
            name='username'
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <Label htmlFor='login-password-input' className="form-label">
            Password
          </Label>
          <Input
            className="form-input"
            id='login-password-input'
            name='password'
            type='password'
            placeholder="Enter Password"
            required
          />
        </div>
        <Button type='submit' className="btn">
          Login
        </Button>
      </form>
    )
  }
}

export default LoginForm

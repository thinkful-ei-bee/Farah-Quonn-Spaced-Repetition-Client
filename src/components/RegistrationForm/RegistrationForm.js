import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import "../../components/App/App.css"


class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
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
      className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor='registration-name-input' className="registration-label">
            Enter your name<Required />
          </Label>
          <Input
            className="registration-input"
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <Label htmlFor='registration-username-input' className="registration-label">
            Choose a username<Required />
          </Label>
          <Input
            className="registration-input"
            id='registration-username-input'
            name='username'
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <Label htmlFor='registration-password-input' className="registration-label">
            Choose a password<Required />
          </Label>
          <Input
            className="registration-input"
            id='registration-password-input'
            name='password'
            type='password'
            placeholder="Enter Password"
            required
          />
        </div>
        <footer>
          <Button type='submit' className="btn">
            Sign up
          </Button>
          {' '}<br></br>
          <Link to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm

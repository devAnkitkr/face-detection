import React from 'react'

class Signin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg=== 'success')
                {  this.props.loadUser(data.user[0])
                    this.props.onRouteChange('home')
                }
                else{
                    console.log('wrong email and passwordd')
                }
                
            })
            .catch(console.log)
    }


    render() {
        const { onRouteChange } = this.props
        return (
            <div className="d-flex justify-content-center flex-column align-items-center text-light" style={{ "height": "100vh" }}>
                <h3>Sign in</h3>
                <form className="form-signin mx-auto border p-4 text-center shadow p-3 mb-5 bg-white rounded">
                    <div className="form-label-group">
                        <input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder="Email address" required autoFocus
                            onChange={this.onEmailChange}
                        />
                        <label>Email address</label>
                    </div>

                    <div className="form-label-group">
                        <input
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password" required
                            onChange={this.onPasswordChange}
                        />
                        <label>Password</label>
                    </div>

                    <button

                        onClick={this.onSubmitSignIn}
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit">
                        Sign in
                    </button>

                    <span
                        onClick={() => onRouteChange('Register')}
                        className="btn-link" style={{ 'cursor': 'pointer' }}><u>Register</u></span>

                </form>
            </div>
        )
    }

}

export default Signin

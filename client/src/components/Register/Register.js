import React from 'react'

class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }
    onNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }
    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    onSubmitSignIn = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
                else{
                    console.log('false')
                }
            })
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <div className="d-flex flex-column justify-content-center align-items-center text-center text-light" style={{ "height": "100vh" }}>
                <h3>Register</h3>
                <form className="form-register mx-auto border p-4 text-center shadow p-3 mb-5 bg-white rounded">
                    <div className="form-label-group">
                        <label>Name</label>

                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="name" required autoFocus
                            onChange={this.onNameChange}

                        />
                    </div>
                    <div className="form-label-group">
                        <label>Email address</label>

                        <input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder="Email address" required autoFocus
                            onChange={this.onEmailChange}

                        />
                    </div>

                    <div className="form-label-group">
                        <label>Password</label>

                        <input
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password" required
                            onChange={this.onPasswordChange}
                        />
                    </div>

                    <button
                        onClick={this.onSubmitSignIn}
                        className="btn btn-lg btn-primary btn-block text-uppercase mt-4"
                        type="submit"
                    >Register</button>


                </form>
            </div>
        )

    }

}

export default Register

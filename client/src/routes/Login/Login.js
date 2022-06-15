import React, { Component } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            email: '',
            password: '',
            message: '',
            msgcode: 0
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/login", this.state)
            .then(res => {
                //console.log(res);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('refresh', 3);
                this.setState({ msgcode: 1 });
            })
            .catch(err => {
                //console.log(err);
                if (err.response.status === 401) {
                    this.setState({ message: 'Email ou mot de passe incorrect' })
                }
                if (err.response.status === 400) {
                    this.setState({ message: 'Vérifiez vos informations' })
                }
            })
    }

    render() {
        const { email, password, message, msgcode } = this.state;

        if (msgcode)
            return (<Navigate to="/todos"/>);

        return (
          <div>
            <a href='http://localhost:5000/'><p className='return'>Retour à l'acceuil</p></a>
            <nav>
                <h1 className='title'>Se connecter</h1>
            </nav>

            <form className='formulaire' onSubmit={this.submitHandler}>
                <label className='inp' >Email</label>
                <input type='email' value={email} name='email' onChange={this.changeHandler}></input>
        
                <label className='inp' >Mot de passe</label>
                <input type='password' value={password} name='password' onChange={this.changeHandler}></input>
        
                <button type='submit'>Valider</button>
                <p>{message}</p>
            </form>
          </div>
        )
    }
}

export default Login
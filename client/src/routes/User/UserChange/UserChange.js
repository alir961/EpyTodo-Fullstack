import React, { Component } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router';

export default class UserChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            name: '',
            email: '',
            password: '',
            msgcode: 0
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        const userid = localStorage.getItem('userid');
        const token = localStorage.getItem('token');
        console.log(userid);
        e.preventDefault();
        axios
            .put("http://localhost:3000/users/" + userid, this.state, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                console.log(res);
                this.setState({ msgcode: 1 });
            })
            .catch(err => {
                console.log(err);
            })
    }

    refreshButt = e => {
        localStorage.setItem('urefresh', 3);
    }

    render() {
        const { firstname, name, email, password, msgcode } = this.state;
        const token = localStorage.getItem('token');

        if (token === '')
            return (<p>Vous devez être connecté pour accéder à votre compte.</p>)

        if (msgcode) {
            localStorage.setItem('urefresh', 3);
            return (<Navigate to="/user"/>);
        }

        return (
            <div>
              <a href='http://localhost:5000/user'><p className='return' onClick={this.refreshButt}>Retour au compte</p></a>
              <nav>
                  <h1 className='title'>Modifier son compte</h1>
              </nav>

              <form className='formulaire' onSubmit={this.submitHandler}>
                  <label className='inp' >Nouveau prénom</label>
                  <input type='text' value={firstname} name='firstname' onChange={this.changeHandler}></input>
        
                  <label className='inp' >Nouveau nom</label>
                  <input type='text' value={name} name='name' onChange={this.changeHandler}></input>
        
                  <label className='inp' >Nouvelle email</label>
                  <input type='email' value={email} name='email' onChange={this.changeHandler}></input>
        
                  <label className='inp' >Nouveau mot de passe</label>
                  <input type='password' value={password} name='password' onChange={this.changeHandler}></input>
        
                  <button type='submit'>Valider</button>
              </form>

          </div>
        )
    }
}

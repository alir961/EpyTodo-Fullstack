import React, { Component } from 'react'
import axios from 'axios'
import './register.css'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            name: '',
            email: '',
            password: '',
            message: ''
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/register", this.state)
            .then(res => {
                console.log(res);
                this.setState({ message: 'Votre compte à été crée. Vous pouvez maintenant vous connecter.' })
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 409)
                    this.setState({ message: 'Cette adresse email est déjà utilisée.' })
                if (err.response.status === 400)
                    this.setState({ message: 'Vérifiez vos informations.' })
            })
    }

    render() {
        const { firstname, name, email, password, message } = this.state;

        return (
          <div>
              <a href='http://localhost:5000/'><p className='return'>Retour à l'acceuil</p></a>
              <nav>
                  <h1 className='title'>S'enregistrer</h1>
              </nav>

              <form className='formulaire' onSubmit={this.submitHandler}>
                  <label className='inp' >Prénom</label>
                  <input type='text' value={firstname} name='firstname' onChange={this.changeHandler}></input>
        
                  <label className='inp' >Nom</label>
                  <input type='text' value={name} name='name' onChange={this.changeHandler}></input>
        
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

export default Register
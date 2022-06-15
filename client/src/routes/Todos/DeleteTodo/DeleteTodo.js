import React, { Component } from 'react'
import { Navigate } from 'react-router';
import axios from 'axios'

export default class DeleteTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            msgcode: 0,
            message: ''
        }
    }
    

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios
            .delete("http://localhost:3000/todos/" + this.state.id, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                console.log(res);
                localStorage.setItem('refresh', 3);
                this.setState({ msgcode: 1 });
            })
            .catch(err => {
                console.log(err);
                this.setState({ message: "Cet ID n'a pas été trouvé" })
            })
    }

    refresh = e => {
        localStorage.setItem('refresh', 3);
    }

    render() {
        const { id, msgcode, message } = this.state;
        const token = localStorage.getItem('token');

        if (token === '')
            return (<p>Vous devez être connecté pour accéder à votre compte.</p>)

        if (msgcode) {
            return (<Navigate to="/todos"/>);
        }

        return (
            <div>
              <a href='http://localhost:5000/todos' onClick={this.refresh}><p className='return'>Retour au panel</p></a>
              <nav>
                  <h1 className='title'>Supprimer une tâche</h1>
              </nav>

              <form className='formulaire' onSubmit={this.submitHandler}>
                  <label className='inp' >ID de la tâche</label>
                  <input type='number' min='0' name='id' value={id} onChange={this.changeHandler}></input>
        
                  <button type='submit'>Valider</button>
                  <p>{message}</p>
              </form>

            </div>
        )
    }
}

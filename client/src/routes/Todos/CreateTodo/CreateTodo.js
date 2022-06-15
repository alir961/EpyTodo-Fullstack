import React, { Component } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            due_time: '',
            status: '',
            user_id: '',
            msgcode: 0
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        const userid = localStorage.getItem('userid');
        this.setState({ user_id: userid })
    }

    submitHandler = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(this.state);
        axios
            .post("http://localhost:3000/todos", this.state, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                console.log(res);
                localStorage.setItem('refresh', 3);
                this.setState({ msgcode: 1 });
            })
            .catch(err => {
                console.log(err);
            })
    }

    refresh = e => {
        localStorage.setItem('refresh', 3);
    }

    render() {
        const { title, description, due_time, status, msgcode } = this.state;
        
        const token = localStorage.getItem('token');

        if (token === '')
            return (<p>Vous devez être connecté pour accéder à votre compte.</p>)

        if (msgcode)
            return (<Navigate to="/todos"/>);

        return (
            <div>
              <a href='http://localhost:5000/todos' onClick={this.refresh}><p className='return'>Retour au panel</p></a>
              <nav>
                  <h1 className='title'>Créer une tâche</h1>
              </nav>

              <form className='formulaire' onSubmit={this.submitHandler}>
                  <label className='inp' >Titre</label>
                  <input type='text' name='title' value={title} onChange={this.changeHandler}></input>
        
                  <label className='inp' >Description</label>
                  <input type='text' name='description' value={description} onChange={this.changeHandler}></input>
        
                  <label className='inp' >Date d'expiration</label>
                  <input type='text' name='due_time' value={due_time} onChange={this.changeHandler}></input>
        
                  <label className='inp'>Status</label>
                  <input type='text' name='status' value={status} onChange={this.changeHandler}></input>
        
                  <button type='submit'>Valider</button>
              </form>

          </div>
        )
    }
}

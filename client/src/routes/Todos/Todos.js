import axios from 'axios';
import React, { useState } from 'react'
import './todos.css'

export default function Todos() {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    let refresh  = localStorage.getItem('refresh');
    if (refresh > 0) {
        axios
            .get("http://localhost:3000/user/todos", { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                setData(res.data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                setMessage("Vous n'avez pas de tâches.")
            })
            refresh -= 1;
            localStorage.setItem('refresh', refresh);
        axios
            .get("http://localhost:3000/api/id", { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                console.log(res)
                localStorage.setItem('userid', res.data.msg);
            })
            .catch(err => {
                console.log(err);
            })

    }
    function refreshButt () {
        localStorage.setItem('refresh', 3);
    }

    function refreshUser () {
        localStorage.setItem('urefresh', 3);
    }

    function deconnectUser() {
        localStorage.setItem('token', '');
    }


    if (token === '')
        return (<p>Vous devez être connecté pour accéder au panel.</p>)

    return (
        <div>
          <section className="page">
            <nav>
              <div className="onglet">
                  <p>Panel des tâches</p>
              </div>
              <div className="buttons">
                  <button className="login"><a href='http://localhost:5000/' className='login' onClick={deconnectUser}>Se déconnecter</a></button>
                  <button className="register"><a href='http://localhost:5000/user' className='register' onClick={refreshUser}>Mon compte</a></button>
              </div>
            </nav>

            <section className='todoss'>
                <h1>Vos tâches:</h1>
                <p className='message'>{message}</p>

                <div className='buttons'>
                    <button className='create'><a href='http://localhost:5000/todos/create'>Créer une tâche</a></button>
                    <button className='refresh'><a href='http://localhost:5000/todos' onClick={refreshButt}>Rafraîchir les tâches</a></button>
                    <button className='delete'><a href='http://localhost:5000/todos/delete'>Supprimer une tâche</a></button>
                </div>

                {data.map( ( {id, title, description, created_at, due_time, status} ) => {
                    return (
                        <div className='todoList'>
                            <p className='id' key={id}>{id}</p>
                            <p className='title'>{title}</p>
                            <p className='desc'>Description: {description}</p>
                            <p className='crea'>Crée le: {created_at}</p>
                            <p className='due'>Pour le: {due_time}</p>
                            <p className='stat'>Status: {status}</p>
                        </div>
                    )
                })}
            </section>


          </section>
          <footer>
            <h5>Des questions ? Contactez moi via la messagerie en ligne.</h5>
            <div className="colonnes">
                <div className="colonne">
                    <p>Relations clients</p>
                    <p>Relations Investisseurs</p>
                    <p>Modes de lecture</p>
                    <p>Mentions légales</p>
                </div>
                <div className="colonne">
                    <p>Centre d'aide</p>
                    <p>Les meilleurs graphistes</p>
                    <p>Entreprise mondiale</p>
                    <p>Chiffre d'affaire</p>
                    <p>Les meilleurs peintres</p>
                </div>
                <div className="colonne">
                    <p>FAQ</p>
                    <p>Recrutement</p>
                    <p>Conditions d'utilisation</p>
                    <p>Nous contacter</p>
                </div>
                <div className="colonne">
                    <p>Compte</p>
                    <p>S'enregistrer</p>
                    <p>Se connecter</p>
                    <p>Politique de confidentialité</p>
                </div>
            </div>
            <p>D'AMORE Théo, FRANCE</p>
        </footer>
       </div>
    )
}

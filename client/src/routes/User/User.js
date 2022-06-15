import React, { useState } from 'react'
import axios from 'axios'
import './user.css'

export default function User() {

    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    let urefresh = localStorage.getItem('urefresh');

    if (urefresh > 0) {
        axios
            .get("http://localhost:3000/user", { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                setData(res.data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
        urefresh -= 1;
        localStorage.setItem('urefresh', urefresh);
    }

    function refreshButt () {
        localStorage.setItem('refresh', 3);
    }

    if (token === '')
        return (<p>Vous devez être connecté pour accéder à votre compte.</p>)

    return (
        <div>
              <a href='http://localhost:5000/todos' onClick={refreshButt}><p className='return'>Retour au panel</p></a>
              <nav>
                  <h1 className='title'>Mon compte</h1>
              </nav>

              <section className='userInfo'>
                <p>Prénom: {data.firstname}</p>
                <p>Nom: {data.name}</p>
                <p>Email: {data.email}</p>
                <p>Mot de passe: {data.password}</p>
              </section>
              <button className='butt'><a href='http://localhost:5000/user/change' className='link'>Modifier son compte</a></button>
            </div>
    )
}

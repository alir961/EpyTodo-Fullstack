import React from 'react'
import logo from './tick.png'
import './root.css'

export default function Root() {
  return (
    <div>
        <section className="page">
            <nav>
                <div className="onglet">
                    <a href="http://localhost:5000">Acceuil</a>
                    <a href="http://localhost:5000">À propos</a>
                </div>
                <div className="buttons">
                    <button className="login"><a href='http://localhost:5000/login' className='login'>J'ai déjà un compte</a></button>
                    <button className="register"><a href='http://localhost:5000/register' className='register'>S'enregistrer</a></button>
                </div>
            </nav>
            <header>
                <img src={logo} className='logo' alt='logo'/>
                <h1 className='slogan'>Gérez vos tâches,<br />avec Epytodo.</h1>
            </header>
            <section className='todos'>
                <h1>Créer, modifier, supprimer ses tâches en toute simplicité.</h1>
                <p>Avec notre site web Epytodo, gérez vos tâches simplement.<br />
                Une fois connecté, vous serez libre de créer, modifier, supprimer vos tâches,<br/>
                À l'aide d'un panel que nous vous avons mis en place.</p>
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

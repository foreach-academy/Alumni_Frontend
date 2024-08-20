import React, { useState } from 'react';
import instance from '../API/axios';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { validEmail } from '../Regex';
import '../Styles/connexionPage.css';

const ConnexionPage = () => {
    // State
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState('');

    const validateEmail = () => {
        return validEmail.test(email);
    };

    // Comportement
    const connexion = () => {
        if (!validateEmail()) {
            setEmailError(true);
            return;
        }
        setEmailError(false);

        instance.post('/authenticate/login', {
            ut_email : email,
            ut_motdepasse : mdp
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            navigate('/page_annuaire');
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError('Une erreur est survenue');
            }
        });
        console.log(email)
        console.log(mdp);
        
        
    };

    // Affichage 
    return (
        <>
        <div id="containerBlock">
            <div className="container">
                <img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach" />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p>Email non valide</p>}
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                />
                <div>
                    <button onClick={connexion}>Me connecter</button>
                </div>
                {loginError && <p>{loginError}</p>}
                <div>
                    <a href="/">Mot de passe oublié ?</a>
                </div>
                <div>
                    <a href="/inscription">Créer un compte</a>
                </div>
            </div>
        </div>
            <Footer/>
        </>
    );
};

export default ConnexionPage;
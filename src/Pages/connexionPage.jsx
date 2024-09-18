import React, { useContext, useState } from 'react';
import instance from '../API/axios';
import { useNavigate } from 'react-router-dom';
import { validEmail } from '../Regex';
import '../Styles/connexionPage.css';
import AuthContext from '../Contexts/AuthContext';
import axios from 'axios';

const ConnexionPage = () => {
    // State
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState('');
    const {setIsAuthenticated, setToken} = useContext(AuthContext)

    const validateEmail = () => {
        return validEmail.test(email);
    };

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
            if (response.data.token) {
                axios.defaults.headers.common['Authorization'] = "Bearer "+response.data.token;
                window.localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
                setToken(response.data.token);
                navigate('/page_annuaire');
            } else {
                setLoginError('Le token est manquant dans la réponse.');
            }
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError('Une erreur est survenue');
            }
        });

        
        
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
        </>
    );
};

export default ConnexionPage;
import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import '../Styles/annuairePage.css';
import ProfilService from '../Services/ProfilService';

const AnnuairePage = () => {
    const [profils, setProfils] = useState([]);

    // Fonction pour récupérer tous les profils
    const fetchProfils = async () => {
        try {
            const response = await ProfilService.getAllProfil();
            setProfils(response.data);  
        } catch (error) {
            console.error("Erreur lors de la récupération des profils :", error);
        }
    };

    useEffect(() => {
        fetchProfils();
    }, []);

    return (
        <>
            <NavBar />
            <div id='conteneur-annuaire'>
                <div id='barre-recherche'>
                    <input id='rechercher' type="text" placeholder='Rechercher..' />
                </div>
                <div id='legende-block'>
                    <div className='legende-rond'></div>
                    <h4>Anciens apprenant</h4>
                    <div className='legende-rond'></div>
                    <h4>Apprenant</h4>
                    <div className='legende-rond'></div>
                    <h4>Entreprise</h4>
                    <div className='legende-rond'></div>
                    <h4>Formateur</h4>
                </div>
                <div id='profils'>
                    {profils.map((profil, index) => (
                        <div key={index} className="profil-card">
                            <h4>{profil.nom}</h4>
                            <p>{profil.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AnnuairePage;

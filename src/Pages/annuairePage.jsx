import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import '../Styles/annuairePage.css';
import ProfilService from '../Services/ProfilService';
import CardsAnnuaire from '../Components/CardsAnnuaire';

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
                         <CardsAnnuaire
                         key={index}
                         prenom={profil.pr_prenom}
                         nom={profil.pr_nom}
                         description={profil.pr_description}
                         imageUrl={`http://127.0.0.1:3006/${profil.pr_imgprofil}`}
                         role={profil.id_role}
                         entreprise={profil.pr_entreprise} 
                     />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AnnuairePage;

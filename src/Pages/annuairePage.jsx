import React from 'react'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import '../Styles/annuairePage.css'
import CardsAnnuaire from '../Components/CardsAnnuaire';


const annuairePage = () => {

    return <>
        <NavBar/>
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
            <CardsAnnuaire/>
        </div>
        <Footer/>
    </>
}

export default annuairePage;
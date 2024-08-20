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
                <h6>Anciens apprenant</h6>
                <div className='legende-rond'></div>
                <h6>Apprenant</h6>
                <div className='legende-rond'></div>
                <h6>Entreprise</h6>
                <div className='legende-rond'></div>
                <h6>Formateur</h6>
            </div>
            <CardsAnnuaire/>
        </div>
        <Footer/>
    </>
}

export default annuairePage;
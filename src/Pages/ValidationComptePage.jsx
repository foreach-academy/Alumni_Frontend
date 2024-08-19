import React from 'react'
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import '../Styles/ValidationCompte.css'
import ButtonValide from '../Assets/valide.png';
import ButtonRefuse from '../Assets/croix.png';

const ValidationComptePage = () => {

    return <>
    
        <NavBar/>
        <main>
            <h1 id='title-validation'>INSCRIPTION À VALIDER</h1>
        <div className='input-container'>
            <ul className='information-user'>
                <li className='items-informations'>Nom</li>
                <li className='items-informations'>Prénom</li>
                <li className='items-informations'>Email</li>
                <li className='items-informations'>Formation</li>
                <li className='items-informations'>Promotion</li>
            </ul>
            <div className='block-button-validate'>
                <button className='style-button'><img src={ButtonValide} alt="logocheck" height={15} width={15} /></button>
                <button className='style-button'><img src={ButtonRefuse} alt="logocroix" height={15} width={15} /></button>
            </div>
        </div>
        <div className='input-container'>
            <ul className='information-user'>
                <li className='items-informations'>Nom</li>
                <li className='items-informations'>Prénom</li>
            </ul>
            <div className='block-button-validate'>
                <button className='style-button'><img src={ButtonValide} alt="logocheck" height={15} width={15} /></button>
                <button className='style-button'><img src={ButtonRefuse} alt="logocroix" height={15} width={15} /></button>
            </div>
        </div>
        <div className='input-container'>
            <ul className='information-user'>
                <li className='items-informations'>Nom</li>
                <li className='items-informations'>Prénom</li>
                <li className='items-informations'>Email</li>
                <li className='items-informations'>Formation</li>
                <li className='items-informations'>Promotion</li>
            </ul>
            <div className='block-button-validate'>
                <button className='style-button'><img src={ButtonValide} alt="logocheck" height={15} width={15} /></button>
                <button className='style-button'><img src={ButtonRefuse} alt="logocroix" height={15} width={15} /></button>
            </div>
        </div>
        </main>
        <Footer/>

    
    </>
}

export default ValidationComptePage;
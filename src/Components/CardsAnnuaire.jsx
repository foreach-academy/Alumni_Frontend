import React from 'react'
import '../Styles/CardsAnnuaireStyle.css'
import imgprofil2 from '../Assets/imgprofil2.jpg'

const CardsAnnuaire = ({prenom,nom,description,imageUrl,role,entreprise}) => {
    const getBackgroundColor = (role) => {
        switch (role) {
            case 1:// APPRENANT
                return "#2CBAA2";
            case 2:
                return "#2A2D43";
            case 3:
                return "#CB4899";
            case 4:
                return "#DB8E11";
            
        }
    };
    const backgroundColor = getBackgroundColor(role); 
    return <>

    <div className="profil-card" style={{ backgroundColor }}>
            <img src={imageUrl} alt={`${nom} photo`} className='profil_image' /> 
            <div className='profil-card-text'>
                <h4>{prenom} {nom}</h4>
                <p>{description} chez</p>
                <p>{entreprise}</p>
            </div>
        </div>
        
    
    </>
}


export default CardsAnnuaire;
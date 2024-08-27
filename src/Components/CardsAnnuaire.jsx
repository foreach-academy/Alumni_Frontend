import React from 'react'

const CardsAnnuaire = () => {

    const getColorByRoleId = (roleId) => {
        switch(roleId) {
          case 1:
            return '#2B2D43'; // Administrateur
          case 2:
            return '#2BBAA2'; // Utilisateur
          case 3:
            return '#DB8F11'; // Invité
          case 4:
            return '#CB4899'; // Invité
        }
      };

    return <>

        <div>
               {/*  <h3>{Nom}{Prenom}</h3>
                <p>{ro_nom}</p> */}
        </div>
        
    
    </>
}


export default CardsAnnuaire;
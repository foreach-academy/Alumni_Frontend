// import Card from 'react-bootstrap/Card';
// import "../Styles/CardProfil.css";
// import { useEffect, useState } from 'react';
// import ProfilService from '../Services/ProfilService';

//   const CardProfil = () =>{  
//     console.log(produit)
//     const [produit,setProduit] = useState([]);
//     const [profil,setProfil] = useState([])


//     const fetchProfilImage = async() => {
//         try {
//             const response = await ProfilService.getAllProduits();
//             setProduit(response.data);
//         } catch (error) {
//             console.log(error)
//         }
//     }
    
//     useEffect(() =>{
//         fetchProfilImage();
//     }, [])
  
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src={profil.id_imgprofil} />
//     </Card>
//   );
//  }
// export default CardProfil;
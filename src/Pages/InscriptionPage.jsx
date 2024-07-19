import Footer from "../Components/Footer"
import '../Styles/InscriptionPage.css'

const PageInscription = () => {


return <>
    <div className="logo_alumni_page_inscription">
        <img src="../Assets/logo_foreach_horizontal.png" alt="LOGO" />
    </div>
    <div className="titre_contenu">
        <h3>Vous êtes :</h3>
    </div>
    <div className="categorie_inscription">
        <a href="" className="lien_categorie"><p className="categorie_entreprise">Entreprise</p></a>
        <a href="" className="lien_categorie"><p className="categorie_apprenant">Apprenant</p></a>
        <a href="" className="lien_categorie"><p className="categorie_formateur">Formateur</p></a>
    </div>
    <Footer/>
    </>
    
}

export default PageInscription;
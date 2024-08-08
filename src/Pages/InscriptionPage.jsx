import Footer from "../Components/Footer"
import '../Styles/InscriptionPage.css'

const PageInscription = () => {


return <>
    <div className="content_logo_page_inscription">
    <a href="/"><img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach" className="logo_foreach_page_inscription" /></a> 
    </div>
    <div className="titre_contenu">
        <h3>Vous êtes :</h3>
    </div>
    <div className="categorie_inscription">
        <a href="/inscription_entreprise" className="lien_categorie"><p className="categorie_entreprise">Entreprise</p></a>
        <a href="/inscription_apprenant" className="lien_categorie"><p className="categorie_apprenant">Apprenant</p></a>
        <a href="/inscription_formateur" className="lien_categorie"><p className="categorie_formateur">Formateur</p></a>
    </div>
    <Footer/>
    </>
    
}

export default PageInscription;
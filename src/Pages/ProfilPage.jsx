import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Formation from "../Components/DropdownFormation";
import { useState } from "react";
import "../Styles/ProfilPage.css";
import TypeAide from "../Components/DropdownTypeAide";
import TypeCompetence from "../Components/DropdownCompetence";

const ProfilPage = () => {
    const [formation, setFormation] = useState("");
    const [typeAide, setTypeAide] = useState("");
    const [typeCompetence, setTypeCompetence] = useState("");
    const [specialite, setSpecialite] = useState("");
    const [email, setEmail] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const [linkedin, setLinkedin] = useState("")
    const [fun, setFun] = useState("");



return <>
    <body className="page_profil">
        <NavBar/>
        <div className="content_profil">
            <div>
                <h1>Nom</h1>
            </div>
                <div className="info">
                    <p className="liste_info">Ma formation / Mon parcours</p>
                    <div className="bloc_selection_formation">
                        <Formation type="text" name="formation" defaultValue={formation} placeholder="Formation" onChange={(e) => {setFormation(e.target.value)}} required/>
                    </div>
                </div>
                <div className="info">
                    <p className="liste_info">Mes specialites</p>
                    <div className="bloc_input_specialite">
                        <input type="text" name="nom" defaultValue={specialite} placeholder="" onChange={(e) => {setSpecialite(e.target.value)}} className="input_profil" size={32} required/>
                    </div>  
                </div>
                <div className="info">
                    <p className="liste_info">Mon profil Linkedin</p>
                    <div className="bloc_input_linkedin">
                    <input type="lien" name="lien" defaultValue={linkedin} placeholder="" onChange={(e) => {setLinkedin(e.target.value)}} className="input_profil" size={32} required/>
                    </div> 
               </div>
                <div className="info">
                    <p className="liste_info">Mon entreprise</p>
                    <div className="bloc_input_entreprise">
                    <input type="text" name="nom" defaultValue={entreprise} placeholder="" onChange={(e) => {setEntreprise(e.target.value)}} className="input_profil" size={32} required/>
                    </div> 
               </div>
                <div>
                    <p className="liste_info">Mes liens</p>
                </div>
                <div className="info">
                    <p className="liste_info">OK pour </p>
                    <div className="bloc_selection_type_aide">
                        <TypeAide type="text" name="type_aide" defaultValue={typeAide} placeholder="Aide" onChange={(e) => {setTypeAide(e.target.value)}} className="dropdown_typeAide"/>
                    </div>
                </div>
                <div className="info">
                    <p className="liste_info">Mes compétences</p>
                    <div className="bloc_selection_type_competence">
                        <TypeCompetence type="text" name="type_competence" defaultValue={typeCompetence} placeholder="Competence" onChange={(e) => {setTypeCompetence(e.target.value)}}/>
                    </div>
                </div>
                <div className="info">
                    <p className="liste_info">Mail perso / Numero de téléphone</p>
                    <div className="bloc_input_email">
                        <input type="email" name="email" defaultValue={email} placeholder="" onChange={(e) => {setEmail(e.target.value)}} className="input_profil" size={32} required/>
                    </div>
                </div>
                <div className="info">
                    <p className="liste_info">Petit truc fun</p>
                    <div className="bloc_input_fun">
                        <input type="text" name="fun" defaultValue={fun} placeholder="" onChange={(e) => {setFun(e.target.value)}} className="input_profil" size={32} required/>
                    </div>
                </div>
                <div className="boutton_page_profil">
                    <button className="boutton_modifier_profil">Modifier mes infos</button>
                </div>       
        </div>
    </body>    
        <Footer/>
        </>

}

export default ProfilPage;
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Formation from "../Components/DropdownFormation";
import { useState } from "react";
import TypeAide from "../Components/DropdownTypeAide";
import TypeCompetence from "../Components/DropdownCompetence";
import ('../Styles/ProfilPage.css');

const ProfilPage = () => {
    const [formation, setFormation] = useState("");
    const [typeAide, setTypeAide] = useState("");
    const [typeCompetence, setTypeCompetence] = useState("");




return <>
    <body className="page_profil">
        <NavBar/>
        <div className="content_profil">
            <div>
                <h1>Nom</h1>
            </div>
                <div className="info_formation">
                    <p className="liste_info">Ma formation / Mon parcours</p>
                    <div className="bloc_selection_formation">
                        <Formation type="text" name="formation" defaultValue={formation} placeholder="Formation" onChange={(e) => {setFormation(e.target.value)}} required/>
                    </div>
                </div>
                <div>
                    <p className="liste_info">Mes specialites</p>
                </div>
                <div>
                    <p className="liste_info">Mon profil Linkedin</p>
                </div>
                <div>
                    <p className="liste_info">Mon entreprise</p>
                </div>
                <div>
                    <p className="liste_info">Mes liens</p>
                </div>
                <div className="info_type_aide">
                    <p className="liste_info">OK pour </p>
                    <div className="bloc_selection_type_aide">
                        <TypeAide type="text" name="type_aide" defaultValue={typeAide} placeholder="Aide" onChange={(e) => {setTypeAide(e.target.value)}}/>
                    </div>
                </div>
                <div className="info_competence">
                    <p className="liste_info">Mes compétences</p>
                    <div className="bloc_selection_type_competence">
                    <TypeCompetence type="text" name="type_competence" defaultValue={typeCompetence} placeholder="Competence" onChange={(e) => {setTypeCompetence(e.target.value)}}/>
                    </div>
                </div>
                <div>
                    <p className="liste_info">Mail perso / Numero de téléphone</p>
                </div>
                <div>
                    <p className="liste_info">Petit truc fun</p>
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
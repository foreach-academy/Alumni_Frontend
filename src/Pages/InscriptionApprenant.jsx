import Footer from "../Components/Footer"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../API/axios";
import ("../Styles/InscriptionApprenantPage.css");

// const { useState } = require ("react");
// const { useNavigate } = require ("react-router-dom")

const InscriptionApprenant = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [formation, setFormation] = useState("");
    const [promotion, setPromotion] = useState("");

    const inscription = () => {
        instance.post('/auth/inscription_apprenant', {
            ut_email : email,
            ut_motdepasse : mdp,
            pr_nom : nom,
            pr_prenom : prenom,
            type_formation : formation,
            nom_promotion : promotion,

        })
        .then(function(response){
            console.log(response.data.message);
            navigate("/connexion");
        })
        .catch(function(error) {
            console.log(error);
        })
    }


return <>
<body className="page_inscription_apprenant">
    <div className="content_logo_page_inscription_apprenant">
        <img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach" className="logo_foreach_page_inscription_apprenant" />
    </div>
    <div className="block_inscription_apprenant">
        <input type="email" name="email" defaultValue={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} className="input_inscription_apprenant"/>
        <input type="password" name="mot de passe" defaultValue={mdp} placeholder="Mot de passe" onChange={(e) => {setMdp(e.target.value)}} className="input_inscription_apprenant"/>
        <input type="text" name="nom" defaultValue={nom} placeholder="Nom" onChange={(e) => {setNom(e.target.value)}} className="input_inscription_apprenant"/>
        <input type="text" name="prenom" defaultValue={prenom} placeholder="Prenom" onChange={(e) => {setPrenom(e.target.value)}}className="input_inscription_apprenant" />

        <input type="text" name="formation" defaultValue={formation} placeholder="Formation" onChange={(e) => {setFormation(e.target.value)}} className="input_inscription_apprenant"/>
        <input type="text" name="promotion" defaultValue={promotion} placeholder="Promotion" onChange={(e) => {setPromotion(e.target.value)}}className="input_inscription_apprenant"/>
        <button onClick={() => {inscription()}} className="boutton_inscription_apprenant">Valider</button>
    </div>
</body>
    <Footer/>
    </>
    
}

export default InscriptionApprenant;
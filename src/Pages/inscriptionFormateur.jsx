import Footer from "../Components/Footer"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../API/axios";
import { validEmail, validMdp } from '../Regex';
import "../Styles/InscriptionFormateurPage.css";

const InscriptionFormateur = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [mdpError, setMdpError] = useState(false);
    
    const validate = () => {
            if (!validEmail.test(email)) {
              setEmailError(true);
           }
           if (!validMdp.test(mdp)) {
              setMdpError(true);
           }
        };


    const inscription = () => {
        instance.post('/auth/inscription_formateur', {
            ut_email : email,
            ut_motdepasse : mdp,
            pr_nom : nom,
            pr_prenom: prenom,

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
<body className="page_inscription_formateur">
    <div className="content_logo_page_inscription_formateur">
        <img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach" className="logo_foreach_page_inscription_formateur" />
    </div>
    <div className="block_inscription_formateur">
        <input type="email" name="email" defaultValue={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} className="input_inscription_formateur"/>
        <input type="password" name="mot de passe" defaultValue={mdp} placeholder="Mot de passe" onChange={(e) => {setMdp(e.target.value)}} className="input_inscription_formateur"/>
        <input type="text" name="nom" defaultValue={nom} placeholder="Nom" onChange={(e) => {setNom(e.target.value)}} className="input_inscription_formateur"/>
        <input type="text" name="prenom" defaultValue={prenom} placeholder="Prenom" onChange={(e) => {setPrenom(e.target.value)}}className="input_inscription_formateur" />
        <div>
        <div className="case_a_cocher_inscription_apprenant">
                <input type="checkbox" required/>
                <label for="valider_inscription">En m'inscrivant, j'accepte que les données renseignées soient utilisées par l'équipe de ForEach Academy.</label>
        </div>
            <button onClick={validate} className="boutton_inscription_formateur" >Validate</button>
         </div>
         {emailError && <p>Votre email est invalide</p>}
         {mdpError && <p>Votre mot de passe est invalide</p>}
    </div>
</body>
    <Footer/>
    </>
    
}

export default InscriptionFormateur;
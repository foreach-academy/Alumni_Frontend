import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../API/axios";
import { validEmail, validMdp } from '../Regex';
import "../Styles/InscriptionFormateurPage.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
              toast.error("Email incorrect")
           }
           if (!validMdp.test(mdp)) {
              setMdpError(true);
              toast.error("Votre mot de passe doit contenir au moins : 8 caractères, 1 majuscule, 1 chiffre et 1 caractère speciale.")
           }
        };


    const inscription = () => {
        instance.post('/authenticate/inscription_formateur', {
            ut_email : email,
            ut_motdepasse : mdp,
            en_nom_contact : nom,
            en_prenom_contact : prenom,

        })
        .then(function(response){
            toast.success(response.data.message);
            navigate("/connexion");
        })
        .catch(function(error) {
            console.log(error);
        })
    };

    const validInscription = () => {
        if (validate()){
            inscription();
        }
    }


return <>
    <body className="page_inscription_formateur">
        <div className="content_logo_page_inscription_formateur">
        <a href="/"><img src={require("../Assets/logo_foreach_couleur_horizontal.png")} alt="logo_foreach" className="logo_foreach_page_inscription_formateur" /></a>  
        </div>
        <div className="block_inscription_formateur">
                <input type="email" name="email" defaultValue={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} className="input_inscription_formateur" size={35} required/>
                <input type="password" name="mot de passe" defaultValue={mdp} placeholder="Mot de passe" onChange={(e) => {setMdp(e.target.value)}} className="input_inscription_formateur" size={35} required/>
                <input type="text" name="nom" defaultValue={nom} placeholder="Nom" onChange={(e) => {setNom(e.target.value)}} className="input_inscription_formateur" size={35} required/>
                <input type="text" name="prenom" defaultValue={prenom} placeholder="Prenom" onChange={(e) => {setPrenom(e.target.value)}}className="input_inscription_formateur" size={35} required />  
        </div>
            <div className="case_a_cocher_inscription_formateur">
                    <input type="checkbox" required/>
                    <label for="valider_inscription">En m'inscrivant, j'accepte que les données renseignées soient utilisées par l'équipe de ForEach Academy.</label>
            </div>
            <div className="block_boutton_inscription_formateur">
                <button onClick={validInscription} className="boutton_inscription_formateur" >Validate</button>
            </div>
            <p id="redirect_connexion">
                Déjà un compte ? page de{' '}
                <span onClick={() => navigate('/connexion')} className="formateur_redirect_connexion">
                  CONNEXION
                </span>
            </p>
    </body>

</>
    
}

export default InscriptionFormateur;
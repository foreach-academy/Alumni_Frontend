import axios from "axios";
import { jwtDecode } from "jwt-decode";

class UtilisateurService{

    static addUtilisateur(){
        return axios.create("http://127.0.0.1:3006/utilisateur");
    }

    static getUtilisateurIdFromToken() {
        const token = window.localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // console.log("Token décodé :", decodedToken); // Voir le contenu du token
                return decodedToken.id_utilisateur || decodedToken.id;
            } catch (error) {
                console.error("Erreur lors du décodage du token :", error);
                return null;
            }
        }
        return null;
    }
}

export default UtilisateurService;
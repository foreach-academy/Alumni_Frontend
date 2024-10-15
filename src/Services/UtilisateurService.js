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

    static async getUtilisateurByProfilId(profilId) {  
        try {
            const response = await axios.get(`http://127.0.0.1:3006/utilisateur/profil/${profilId}`);
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des infos utilisateur:", error);
            throw error;
        }
    }
    
    static async updateUtilisateur(idUtilisateur, utilisateurData) {  
        try {
            const response = await axios.patch("http://127.0.0.1:3006/utilisateur/" + idUtilisateur, utilisateurData);
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la mise à jour des infos utilisateur:", error);
            throw error;
        }
    }
};

export default UtilisateurService;
import axios from "axios";

class UtilisateurService{

    static addUtilisateur(){
        return axios.create("http://127.0.0.1:3000/utilisateur");
    }
}

export default UtilisateurService;
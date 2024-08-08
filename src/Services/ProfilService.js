import axios from "axios";

class   ProfilService {
    static getAllFormation(){
        return axios.get("http://127.0.0.1:3000/formation/profil");
    }
}

export default ProfilService;
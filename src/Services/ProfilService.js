import axios from "axios";

class   ProfilService {
    static getAllProfil(){
        return axios.get("http://127.0.0.1:3006/profil");
    }

    static getProfilById(id){
        return axios.get("http://127.0.0.1:3006/formation/profil/" + id);
    }
}

export default ProfilService;
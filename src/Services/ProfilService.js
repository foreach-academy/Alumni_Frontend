import axios from "axios";

class   ProfilService {
    static getAllProfil(){
        return axios.get("http://127.0.0.1:3006/profil");
    }

    static getProfilById(id){
        return axios.get("http://127.0.0.1:3006/profil/" + id);
    }
    static addProfil(profilData){
        return axios.post("http://127.0.0.1:3006/profil",profilData
        );
    }
    static updateProfil(id, profilData) {
        return axios.patch("http://127.0.0.1:3006/profil/" + id, profilData);
    }
    
    static uploadProfileImage(id, imageFile) {
        const formData = new FormData();
        formData.append("profileImage", imageFile);
        
        return axios.post("http://127.0.0.1:3006/profil/" + id + "/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    
}

export default ProfilService;
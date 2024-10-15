import axios from "axios";

class LiensService {
  
  static getAllLiens() {
    return axios.get("http://127.0.0.1:3006/liens");
  }
  // static getAllLiens(id_profil) {
  //   return axios.get(`http://127.0.0.1:3006/profils/${id_profil}/liens`);
  // }

  static getLiensById(id_profil, id_lien) {
    return axios.get(`http://127.0.0.1:3006/profils/${id_profil}/liens/${id_lien}`);
}

  static updateLiens(id_profil, id_lien, data) {
    return axios.patch(`http://127.0.0.1:3006/profils/${id_profil}/liens/${id_lien}`, data);
  }

  static createLien(id, data) {
    return axios.post(`http://127.0.0.1:3006/profils/${id}/liens`, data); 
  }
  
}

export default LiensService;

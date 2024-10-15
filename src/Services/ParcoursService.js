import axios from 'axios';

const API_URL = 'http://127.0.0.1:3006/parcours'; // Assure-toi que cette URL correspond à ton backend

class ParcoursService {
  // Méthode pour récupérer un parcours en fonction de l'ID du profil
  async getParcoursByProfilId(profilId) {
    try {
      const response = await axios.get(`${API_URL}/profil/${profilId}`);
      return response.data; 
    } catch (error) {
      console.error("Erreur lors de la récupération du parcours:", error);
      throw error;
    }
  }

  // Méthode pour mettre à jour un parcours existant
  async updateParcours(parcoursId, parcoursData) {
    try {
      const response = await axios.patch(`${API_URL}/${parcoursId}`, parcoursData);
      return response; 
    } catch (error) {
      console.error("Erreur lors de la mise à jour du parcours:", error);
      throw error;
    }
  }
}

export default new ParcoursService();

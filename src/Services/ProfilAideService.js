import axios from 'axios';

// Configuration de l'URL de base pour les requêtes
const API_URL = 'http://127.0.0.1:3006/'; 

class ProfilAideService {
    async getAllProfilAide() {
        try {
            const response = await axios.get(API_URL);
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error('Erreur lors de la récupération des associations Profil-Aide:', error);
            throw error; // Propager l'erreur pour la gestion dans le composant
        }
    }

    async getProfilAideById(id_profil_aide) {
        try {
            const response = await axios.get(`${API_URL}/profil_aide/${id_profil_aide}`);
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'association Profil-Aide avec l'ID ${id_profil_aide}:`, error);
            throw error; 
        }
    }


    async addProfilAide(profilAideData) {
        try {
            const response = await axios.post(API_URL, profilAideData);
            return response.data; 
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'association Profil-Aide:', error);
            throw error; 
        }
    }

    async updateProfilAide(id_profil_aide, profilAideData) {
        try {
    
            const response = await axios.put(`http://127.0.0.1:3006/profil_aide/${id_profil_aide}`, profilAideData);    
            return response.data; // Retourne les données de la réponse pour traitement ultérieur
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'association Profil-Aide avec l'ID ${id_profil_aide}:`, error.response?.data || error.message);
            
            throw error; 
        }
    }
    

    async deleteProfilAide(id_profil_aide) {
        try {
            const response = await axios.delete(`http://127.0.0.1:3006/${id_profil_aide}`);
            return response.data; 
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'association Profil-Aide avec l'ID ${id_profil_aide}:`, error);
            throw error; 
        }
    }

    async getProfilAideByProfilId(id_profil) {
        try {
            const response = await axios.get(`http://127.0.0.1:3006/profil/${id_profil}/profil_aide`);
            return response.data; 
        } catch (error) {
            console.error(`Erreur lors de la récupération de Profil-Aide pour l'ID de profil ${id_profil}:`, error);
            throw error; 
        }
    }

}

export default new ProfilAideService();
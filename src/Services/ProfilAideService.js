import axios from 'axios';

// Configuration de l'URL de base pour les requêtes
const API_URL = 'http://127.0.0.1:3006/'; 

class ProfilAideService {
    // Récupérer toutes les associations Profil-Aide
    async getAllProfilAide() {
        try {
            const response = await axios.get(API_URL);
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error('Erreur lors de la récupération des associations Profil-Aide:', error);
            throw error; // Propager l'erreur pour la gestion dans le composant
        }
    }

    //Récupérer une association Profil-Aide par ID
    async getProfilAideById(id_profil_aide) {
        try {
            const response = await axios.get(`${API_URL}/profil_aide/${id_profil_aide}`);
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'association Profil-Aide avec l'ID ${id_profil_aide}:`, error);
            throw error; // Propager l'erreur pour la gestion dans le composant
        }
    }


    // Ajouter une nouvelle association Profil-Aide
    async addProfilAide(profilAideData) {
        try {
            const response = await axios.post(API_URL, profilAideData);
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'association Profil-Aide:', error);
            throw error; // Propager l'erreur pour la gestion dans le composant
        }
    }

    // Mettre à jour une association Profil-Aide existante
    async updateProfilAide(id_profil_aide, profilAideData) {
        try {
            console.log(`Données envoyées à l'API pour ID ${id_profil_aide}:`, profilAideData);
    
            // Envoie une requête PUT à l'API pour mettre à jour les données
            const response = await axios.put(`http://127.0.0.1:3006/profil_aide/${id_profil_aide}`, profilAideData);
    
            console.log('Réponse du serveur:', response.data);
    
            return response.data; // Retourne les données de la réponse pour traitement ultérieur
        } catch (error) {
            // Affiche une erreur détaillée dans la console
            console.error(`Erreur lors de la mise à jour de l'association Profil-Aide avec l'ID ${id_profil_aide}:`, error.response?.data || error.message);
            
            throw error; // Propage l'erreur pour que le composant appelant puisse la gérer
        }
    }
    

    // Supprimer une association Profil-Aide
    async deleteProfilAide(id_profil_aide) {
        try {
            const response = await axios.delete(`http://127.0.0.1:3006/${id_profil_aide}`);
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'association Profil-Aide avec l'ID ${id_profil_aide}:`, error);
            throw error; // Propager l'erreur pour la gestion dans le composant
        }
    }

    // Récupérer les associations Profil-Aide par ID de profil
    async getProfilAideByProfilId(id_profil) {
        try {
            const response = await axios.get(`http://127.0.0.1:3006/profils/${id_profil}/profil_aide`);
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error(`Erreur lors de la récupération de Profil-Aide pour l'ID de profil ${id_profil}:`, error);
            throw error; // Propager l'erreur pour la gestion dans le composant
        }
    }

}

export default new ProfilAideService();
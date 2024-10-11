import axios from 'axios';

const API_URL = 'http://127.0.0.1:3006'; // Remplacez par l'URL de votre API

class ProfilCompetenceService {

    // Récupérer toutes les compétences
    async getAllCompetences() {
        try {
            const response = await axios.get(`${API_URL}/profil_competence`);
            return response.data; // Retourne la liste des compétences
        } catch (error) {
            console.error('Erreur lors de la récupération des compétences:', error);
            throw error; 
        }
    }

    // Récupérer une compétence spécifique par l'ID du profil
    async getCompetenceById(id_profil) {
        try {
            const response = await axios.get(`${API_URL}/profil_competence/${id_profil}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la compétence pour le profil ${id_profil}:`, error);
            throw error;
        }
    }


    async addProfilCompetence(id_profil, id_competence) {
        try {
            const response = await axios.post(`http://127.0.0.1:3006/profil_competence`, { id_profil, id_competence });
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de l'ajout de la compétence pour le profil ${id_profil}:`, error);
            throw error;
        }
    }

    // Mettre à jour une compétence spécifique
    async updateProfilCompetence(id_competence, competenceData) {
        try {
            const response = await axios.patch(`${API_URL}/profil_competence/${id_competence}`, competenceData);
            return response.data; 
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la compétence ${id_competence}:`, error);
            throw error;
        }
    }

    // Supprimer une compétence spécifique
    async deleteCompetence(id_competence) {
        try {
            const response = await axios.delete(`${API_URL}/profil_competence ${id_competence}`);
            return response.data; // Retourne la réponse de suppression
        } catch (error) {
            console.error(`Erreur lors de la suppression de la compétence ${id_competence}:`, error);
            throw error;
        }
    }

    // Récupérer toutes les compétences d'un profil spécifique
    async getCompetencesByProfilId(id_profil) {
        try {
            const response = await axios.get(`${API_URL}/profil/${id_profil}/profil_competence`);
            return response.data; // Retourne les compétences du profil
        } catch (error) {
            console.error(`Erreur lors de la récupération des compétences pour le profil ${id_profil}:`, error);
            throw error;
        }
    }
}

export default new ProfilCompetenceService();

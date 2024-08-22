import React, { useEffect, useState } from 'react';
import instance from '../API/axios';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import ButtonValide from '../Assets/valide.png';
import ButtonRefuse from '../Assets/croix.png';
import '../Styles/ValidationCompte.css';

const ValidationComptePage = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const response = await instance.get('/utilisateur/pending');
            setPendingUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des inscriptions :', error);
        }
    };

    const validateUser = async (userId) => {
        try {
            await instance.patch(`/utilisateur/validate/${userId}`);
            fetchPendingUsers();  // Mise à jour de la liste après validation
        } catch (error) {
            console.error('Erreur lors de la validation de l\'utilisateur :', error);
        }
    };

    const refuseUser = async (userId) => {
        try {
            await instance.delete(`/utilisateur/${userId}`);
            fetchPendingUsers();  // Mise à jour de la liste après suppression
        } catch (error) {
            console.error('Erreur lors du refus de l\'utilisateur :', error);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const handleRefuse = async (reason) => {
        if (selectedUser) {
            try {
                // Tu pourrais ici envoyer le motif de refus au backend
                await instance.delete(`/utilisateur/${selectedUser.id_utilisateur}`, {
                    data: { reason }
                });
                fetchPendingUsers(); // Met à jour la liste après suppression
            } catch (error) {
                console.error('Erreur lors du refus de l\'utilisateur :', error);
            }
        }
    };

    return (
        <>
            <NavBar />
            <main>
                <h1 id='title-validation'>INSCRIPTION À VALIDER</h1>
                {pendingUsers.length === 0 ? (
                    <p>Aucune inscription en attente</p>
                ) : (
                    pendingUsers.map(user => (
                        <div key={user.id_utilisateur} className='input-container'>
                            <ul className='information-user'>
                                <li className='items-informations'>{user.pr_nom}</li>
                                <li className='items-informations'>{user.pr_prenom}</li>
                                <li className='items-informations'>{user.ut_email}</li>
                                <li className='items-informations'>{user.type_formation}</li>
                                <li className='items-informations'>{user.nom_promotion}</li>
                            </ul>
                            <div className='block-button-validate'>
                                <button 
                                    className='style-button' 
                                    onClick={() => validateUser(user.id_utilisateur)}
                                >
                                    <img src={ButtonValide} alt="logocheck" height={15} width={15} />
                                </button>
                                <button 
                                    className='style-button' 
                                    onClick={() =>  refuseUser(user.id_utilisateur)}
                                >
                                    <img src={ButtonRefuse} alt="logocroix" height={15} width={15} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </main>
            <Footer />
        </>
    );
};

export default ValidationComptePage;

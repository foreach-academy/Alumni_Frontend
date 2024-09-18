import React, { useEffect, useState } from 'react';
import instance from '../API/axios';
import NavBar from '../Components/NavBar';
import ButtonValide from '../Assets/valide.png';
import ButtonRefuse from '../Assets/croix.png';
import Modal from 'react-modal'; // Importation de react-modal
import '../Styles/ValidationCompte.css';

Modal.setAppElement('#root'); // Configuration de l'accessibilité pour react-modal

const ValidationComptePage = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [reason, setReason] = useState('');

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

    const refuseUser = async () => {
        if (selectedUser) {
            try {
                await instance.delete(`/utilisateur/${selectedUser.id_utilisateur}`, {
                    data: { reason }
                });
                fetchPendingUsers();  // Mise à jour de la liste après suppression
                closeModal(); // Ferme la modale après suppression
            } catch (error) {
                console.error('Erreur lors du refus de l\'utilisateur :', error);
            }
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setReason('');
        setIsModalOpen(false);
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
                                    onClick={() => openModal(user)} // Ouvre la modale sur clic
                                >
                                    <img src={ButtonRefuse} alt="logocroix" height={15} width={15} />
                                </button>
                            </div>
                        </div>
                    ))
                )}

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Refuser l'utilisateur"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2>Refuser l'inscription</h2>
                    <p>Êtes-vous sûr de vouloir refuser l'inscription de {selectedUser?.pr_nom} {selectedUser?.pr_prenom} ?</p>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Motif du refus (facultatif)"
                        className="reason-textarea"
                    />
                    <button onClick={refuseUser} className="modal-button">Confirmer</button>
                    <button onClick={closeModal} className="modal-button">Annuler</button>
                </Modal>
            </main>
        </>
    );
};

export default ValidationComptePage;

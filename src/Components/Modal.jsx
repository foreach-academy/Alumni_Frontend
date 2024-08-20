import React, { useState } from 'react';
import Modal from 'react-modal';
import '../Styles/Modal.css';

const RefuseModal = ({ isOpen, onClose, onRefuse }) => {
    const [reason, setReason] = useState('');

    const handleRefuse = () => {
        onRefuse(reason);
        setReason(''); // Réinitialiser le champ de raison
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <h2>Motif de refus</h2>
            <textarea 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                placeholder="Expliquez la raison du refus..."
                rows={5}
                cols={40}
            />
            <div>
                <button onClick={handleRefuse}>Envoyer</button>
                <button onClick={onClose}>Annuler</button>
            </div>
        </Modal>
    );
};

export default RefuseModal;

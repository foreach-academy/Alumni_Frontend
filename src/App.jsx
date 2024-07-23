import React, { useState } from 'react';
import { validEmail, validPassword } from './Regex.jsx';

const App = () => {
   const [email, setEmail] = useState('');
   const [mdp, setMdp] = useState('');
   const [emailError, setEmailError] = useState(false);
   const [mdpError, setMdpError] = useState(false);
   const validate = () => {
      if (!validEmail.test(email)) {
         setEmailError(true);
      }
      if (!validMdp.test(mdp)) {
         setMdpError(true);
      }
   };

   return <>
      <div>
         <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <input
            type="password"
            placeholder="Mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
         />
         <div>
            <button onClick={validate}>Validate</button>
         </div>
         {emailError && <p>Votre email est invalide</p>}
         {mdpError && <p>Votre mot de passe est invalide</p>}
      </div>
      </>
};
export default App;
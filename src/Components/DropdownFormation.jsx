import React, { useEffect, useState } from "react";
import Select from 'react-select'
import axios from "axios";
import FormationService from "../Services/FormationService";


const Formation = ({formation}) => {
    return (
        <Select src={FormationService.type_formation} className="dropdown_formation" />
    )
}

// const Formation = () => {
//     const [formation, setformation] = useState([]);

//     const fetchFormation = async() => {
//         try {
//             const response = await FormationService.getAllFormation();
//             setformation(response.data);
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         fetchFormation();
//     }, [])

// const options = [
//   { value : 'formation.type_formation'},
// ]

// return <>
//      {formation.map((formation, index) => (
//          <Select formation = {formation} key={index} className="dropdown_formation"/> 
//     ))}
// </>

// }

export default Formation;
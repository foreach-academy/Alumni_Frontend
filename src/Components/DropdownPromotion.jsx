import React from "react";
import Select from 'react-select'

const options = [
  { value : 'promotion.nom_promotion'},
]

const Promotion = () => (
  <Select options={options} className="dropdown_promotion"/>
)

export default Promotion;
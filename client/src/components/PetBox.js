import React from 'react'

const PetBox = ({pet, onDelete}) => (
  <form onSubmit={(e) => { e.preventDefault(); onDelete(pet.id) }}>
    <div className="pet">
      <figure>
        <img src={pet.img + `?pet=${pet.id}`} alt=""/>
      </figure>
      <div className="pet-name">{pet.name}</div>
      <div className="pet-type">{pet.type}</div>
      <div className="pet-vaccinated">{pet.vaccinated === true ? 'Yes' : 'No'}</div>
      <button type="submit" name="submit">delete pet</button>
    </div>
  </form>
)

export default PetBox

import React from 'react'
import PetBox from './PetBox'

export default function PetsList({pets, onDelete}) {
  return (
    <div className="row">
      {pets.map(pet => (
        <div className="col-xs-12 col-md-4 col" key={pet.id}>
          <div className="box">
            <PetBox pet={pet} onDelete={onDelete} />
          </div>
        </div>
      ))}
    </div>
  )
}

PetsList.defaultProps = {
  pets: []
}

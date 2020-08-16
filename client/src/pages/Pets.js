import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`
const ADD_PET = gql`
  mutation AddPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`

export default function Pets () {
  const [modal, setModal] = useState(false)
  const { loading, error, data } = useQuery(ALL_PETS)
  const [CreatePet, { error: nePetError } ] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: ALL_PETS });
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...pets] }
      })
    }
  })

  const onSubmit = input => {
    setModal(false)
    CreatePet({ 
      variables: { newPet: input },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          id: `${Math.floor(Math.random() * 10000)}`,
          name: input.name,
          type: input.type,
          img: 'https://via.placeholder.com/150',
          __typename: 'Pet'
        } 
      }
    })
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  if (loading) {
    return (
      <Loader />
    )
  }

  if (error || nePetError) {
    return (
      <p>Error!</p>
    )
  }

  if (data && data.pets) {
    console.log('pets', data.pets)
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}

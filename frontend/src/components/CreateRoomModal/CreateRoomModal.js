import React, { useState } from 'react'
import DownModal from '../Modal/DownModal'
import { useCreateRoomMutation } from '../../redux/features/roomSlice';


function CreateRoomModal({isOpen,handleClose}) {

  const [createRoom, {isLoading}  ] = useCreateRoomMutation();

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const handleCreateRoom = async (e) => {
    e.preventDefault()
    try {
      let roomObj= {
        name,
        category_name:category,
        description
      }
      console.log('will be created', roomObj)
      await createRoom(roomObj)
      handleClose()

    } catch(err) {
      console.log(err)
    }
  }
  return (
    <DownModal isOpen={isOpen}>
        <div className="create-layout__box scroll">
        <div className="create-layout__boxHeader">
          <div className="create-layout__boxTitle">
            <button onClick={handleClose}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>arrow-left</title>
                <path
                  d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                </path>
              </svg>
            </button>
            <h3>Create New Room</h3>
          </div>
        </div>
        <div className="create-layout__body">
          <form className="form" onSubmit={handleCreateRoom}>
            <div className="form__group">
              <label>Room Name</label>
              <input id="room_name"
               name="room_name" 
               type="text" 
               placeholder="E.g. Mastering Python" 
               required
               onChange={(e)=>setName(e.target.value)}
               />
            </div>

            <div className="form__group">
              <label>Category</label>
              <input 
                required 
                type="text" 
                name="topic" 
                id="room_topic" 
                list="topic-list"
                onChange={(e)=>setCategory(e.target.value)}
                 />
              <datalist id="topic-list">
                <select id="room_topic">
                  <option value="Programing">Programing</option>
                  <option value="Business">Business</option>
                </select>
              </datalist>

            </div>


            <div className="form__group">
              <label>About</label>
              <textarea
                name="room_about" 
                id="room_about" 
                placeholder="Write about your study group..."
                required
                onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className="form__action">
              <button type='button' onClick={handleClose} className="btn btn--dark">Cancel</button>
              <button disabled={isLoading} className="btn btn--main" type="submit">{isLoading ? 'Loading...' : 'Create Room'}</button>
            </div>
          </form>
        </div>
      </div>
    </DownModal>
  )
}

export default CreateRoomModal
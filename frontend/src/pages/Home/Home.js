import React, { Fragment, useEffect, useState } from "react";
import Topics from "./Topics";
import RoomList from "./RoomList";
import Activities from "./Activities";
import CreateRoomModal from "../../components/CreateRoomModal/CreateRoomModal";
import { useRoomsQuery } from "../../redux/features/roomSlice";

function Home() {

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useRoomsQuery();

  

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState(null);
  const [filterdRooms, setFilterdRooms] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);

  const createCategories = (rooms) => {
    return rooms?.reduce((acc,current)=>{
      if(acc[current.category]){
        acc[current.category] += 1
      } else {
        acc[current.category] = 1
      }
      return acc
    },{})
  }

  useEffect(()=>{
    if(data?.rooms) {
      setFilterdRooms(data.rooms)
      let categories = createCategories(data.rooms)
      setCategories(categories)
    }
    if(data?.last_messages) {
      setLastMessages(data.last_messages)
    }
  },[data])

  const filterByCategory = (cat) => {
    if(cat==='All') {
      setFilterdRooms(data.rooms)
    } else {
      let rooms = data.rooms.filter(c=> c.category === cat)
      setFilterdRooms(rooms)
    }
  }

  const handleDeleteActivity = (msg_id) => {
    setLastMessages(prev=> prev.filter(msg=>msg.id !== msg_id))
  }


  return (
      <Fragment>
        <CreateRoomModal 
          isOpen={modalIsOpen} 
          handleClose={()=> setModalIsOpen(false)}
          />
        <main className="home-layout">
          <div className="home-container">
            <Topics 
              categories={categories} 
              handleFilterRooms={filterByCategory} 
              allRoomsCount={data?.rooms?.length}
              isLoading={isLoading}
              />
            <RoomList 
              setModalIsOpen={setModalIsOpen} 
              rooms={filterdRooms}
              isLoading={isLoading}
              />
            <Activities
              isLoading={isLoading}
              lastMessages={lastMessages}
              handleDeleteActivity={handleDeleteActivity}
            />
          </div>
        </main>
      </Fragment>
  )
}

export default Home
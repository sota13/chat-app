import React from 'react'
import ActivityItem from './ActivityItem'
import WrapedSpinner from '../../components/Spinner/WrapedSpinner'

function Activities({isLoading, lastMessages, handleDeleteActivity}) {
  return (
    <div className="activities scroll-home">
          <div className="activities__header">
            <h2>Recent Activities</h2>
          </div>
          <div className="activities__container scroll-home">
            {isLoading ? <WrapedSpinner/>:

            lastMessages.map(msg => (
              <ActivityItem key={msg.id} {...msg} handleDeleteActivity={handleDeleteActivity}/>
            ))
            }

          
          

          </div>
        </div>
  )
}

export default Activities
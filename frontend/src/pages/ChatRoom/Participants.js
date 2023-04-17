import React from 'react'
import ParticipantItem from './ParticipantItem'
import WrapedSpinner from '../../components/Spinner/WrapedSpinner'

function Participants({isLoading, participants}) {
  return (
    <div className="participants">
      {isLoading ? <WrapedSpinner/> :
      <>
          <div className="participants__top"> 
          <h3>Participants</h3>
          <span>({participants?.length} Joined)</span>
          </div>
          <div className="participants__list scroll">
            {participants?.map(partic => (
              <ParticipantItem key={partic.id} {...partic}/>
            ))}
            
     
          </div>
      </>
          }
    </div>
  )
}

export default Participants
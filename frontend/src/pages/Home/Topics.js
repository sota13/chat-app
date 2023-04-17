import React, { useState } from 'react'
import WrapedSpinner from '../../components/Spinner/WrapedSpinner'

function Topics({categories, handleFilterRooms, allRoomsCount, isLoading}) {


  const [selectedCategory, setSelectedCategory] = useState('All')

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat)
    handleFilterRooms(cat)
  }
  return (
    <div className="topics scroll-home">
          <div className="topics__header">
            <h2>Browse Topics</h2>
          </div>
          <ul className="topics__list">
          {isLoading ?
          <WrapedSpinner/> :
          <>
            <li onClick={()=> handleSelectCategory('All')}>
              <a  className={selectedCategory ==='All' ? "active" : ''}>All <span>{allRoomsCount}</span></a>
            </li>

            
          {categories && Object.keys(categories).map(cat => (
              <li key={cat} onClick={()=> handleSelectCategory(cat)}>
              <a className={selectedCategory ===cat ? "active" : ''}>{cat} <span>{categories[cat]}</span></a>
            </li>
            ))}
            </>
          }
            
          </ul>
        </div>
  )
}

export default Topics
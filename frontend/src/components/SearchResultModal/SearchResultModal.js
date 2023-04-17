import React from 'react'
import DownModal from '../Modal/DownModal'

function SearchResultModal({isOpen,handleClose}) {
  return (
    <DownModal isOpen={isOpen}>
        <div className="search-layout__box">
          <div className="search-layout__boxHeader">
            <div className="search-layout__boxTitle">
              <button onClick={handleClose}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <title>arrow-left</title>
                  <path
                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                  ></path>
                </svg>
              </button>
              <h3>Results</h3>
            </div>
          </div>

          <div className="topics-page search-layout__body scroll">

            <ul className="topics__list">
              <li>
                <a href="/" className="active">All <span>553</span></a>
              </li>
              <li>
                <a href="/">Python <span>232</span></a>
              </li>
              <li>
                <a href="/">JavaScript <span>122</span></a>
              </li>
              <li>
                <a href="/">React <span>57</span></a>
              </li>
              <li>
                <a href="/">Database <span>90</span></a>
              </li>
            </ul>
          </div>
        </div>
    </DownModal>
  )
}

export default SearchResultModal
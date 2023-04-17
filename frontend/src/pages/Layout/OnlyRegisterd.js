import React, { Fragment } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

function OnlyRegisterd() {
  const { isAuthenticated, user  } = useSelector(state => state.userState);
  const location = useLocation()

  const socketUrl = isAuthenticated ? `${SOCKET_URL}/notifications/?token=${user?.token?.access}` : null;

  const {readyState} = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    shouldReconnect: (closeEvent) => true,
  });

  return (
      isAuthenticated
          ?
          <Fragment>
              <Header/>
              <main className='layout-main'>
                  <Outlet />
              </main>
          </Fragment> 
          : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default OnlyRegisterd
import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

function Layout() {
    return (
        <Fragment>
            <Header/>
            <main className='layout-main'>
                <Outlet />
            </main>
        </Fragment> 
    )
}

export default Layout
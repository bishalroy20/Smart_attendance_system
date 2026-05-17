import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/HomePages/Navbar';
import Footer from '../Components/HomePages/Footer';


const RootLayout = () => {

    return (
        <div className=''>
            <Navbar ></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
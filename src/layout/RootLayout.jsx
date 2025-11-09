import React from 'react';
import Navbar from '../components/common/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/common/Footer';

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <main className='flex-grow'>
                  <Outlet></Outlet>
            </main>
            
            <div> 
                 <Footer></Footer>
            </div>
           
             <ToastContainer />

        </div>
    );
};

export default RootLayout;
import React, { use } from 'react';
import Navbar from '../components/common/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/common/Footer';
import { AuthContext } from '../provider/AuthContext';
import LoadingHome from '../Loader/LoadingHome';

const RootLayout = () => {

      const  { loading} = use(AuthContext)

  if( loading) {
    return  <LoadingHome></LoadingHome>
  }

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
import React from 'react';
import Banner from '../components/home/Banner';
import { AuthContext } from '../provider/AuthContext';
import LoadingHome from '../Loader/LoadingHome';
import FeaturedProperties from '../components/home/FeaturedProperties';
import usePageTitle from '../hooks/usePageTitle';

const Home = () => {

     usePageTitle("Home | HomeNest Real Estate");

    return (

           
      <div className='pb-4 sm:pb-6 md:pb-8 lg:pb-10 bg-base-200'>
            <Banner></Banner>
            <FeaturedProperties></FeaturedProperties>
        </div>
    
        
    );
};

export default Home;
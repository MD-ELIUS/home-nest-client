import React from 'react';
import Banner from '../components/home/Banner';
import { AuthContext } from '../provider/AuthContext';
import LoadingHome from '../Loader/LoadingHome';
import FeaturedProperties from '../components/home/FeaturedProperties';
import usePageTitle from '../hooks/usePageTitle';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ExpertGuidance from '../components/home/ExpertGuidance';
import PopularLocations from '../components/home/PopularLocations';
import ClientTestimonials from '../components/home/ClientTestimonials';

const Home = () => {

     usePageTitle("Home | HomeNest Real Estate");

    return (

           
      <div className='pb-4 sm:pb-6 md:pb-8 lg:pb-10 bg-base-100'>
            <Banner></Banner>
            <FeaturedProperties></FeaturedProperties>
            <WhyChooseUs></WhyChooseUs>
            <ExpertGuidance></ExpertGuidance>
            <PopularLocations></PopularLocations>
            <ClientTestimonials></ClientTestimonials>
        </div>
    
        
    );
};

export default Home;
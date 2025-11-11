import React from 'react';
import Banner from '../components/home/Banner';
import { AuthContext } from '../provider/AuthContext';
import LoadingHome from '../Loader/LoadingHome';
import FeaturedProperties from '../components/home/FeaturedProperties';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <FeaturedProperties></FeaturedProperties>
        </div>
    );
};

export default Home;
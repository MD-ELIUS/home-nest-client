import React, { use } from 'react';
import Banner from '../components/home/Banner';
import { AuthContext } from '../provider/AuthContext';
import LoadingHome from '../Loader/LoadingHome';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
        </div>
    );
};

export default Home;
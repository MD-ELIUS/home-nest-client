import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import LoadingHome from '../Loader/LoadingHome';
import { AuthContext } from '../provider/AuthContext';

const PrivateRoute = ({children}) => {
    const { loading, user } = use(AuthContext);
    const location = useLocation();
 

    if (loading) {
        return <LoadingHome></LoadingHome>
    }


    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to='/login' ></Navigate>;
};

export default PrivateRoute;
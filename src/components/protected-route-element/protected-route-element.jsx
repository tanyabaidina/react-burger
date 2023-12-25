import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';


const ProtectedComponent = ({ onlyUnAuth = false, component }) => {
    const location = useLocation();
    const isAuth =  useSelector((store) => store.userData.isAuth);
    const startPage = location.state?.from?.pathname || '/';

    if (!isAuth)
        return null;

    if (onlyUnAuth && isAuth) {
        return <Navigate to={startPage} state={{ from: location }} replace/>;
    }

    if (!onlyUnAuth && !isAuth) {
        return <Navigate to={"/login"} state={{ from: location }} replace/>;
    }

    return component;
}

ProtectedComponent.propTypes = {
    onlyUnAuth: PropTypes.bool,
    component: PropTypes.element.isRequired
};

export const AuthProtected = ProtectedComponent;
export const UnAuthProtected = ({ component }) => (
    <ProtectedComponent onlyUnAuth={true} component={component} />
);
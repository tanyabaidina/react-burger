import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedComponent = ({ onlyUnAuth = false, component, checkStep=false }) => {
    const location = useLocation();
    const { requestAuth, isAuth, forgotPasswordSuccess } =  useSelector((store) => store.userData);
    const startPage = location.state?.from?.pathname || '/';

    if (requestAuth && !isAuth)
        return null;

    if (onlyUnAuth && isAuth) {
        return <Navigate to={startPage} state={{ from: location }} replace/>;
    }

    if (!onlyUnAuth && !isAuth) {
        return <Navigate to={"/login"} state={{ from: location }} replace/>;
    }

    if (onlyUnAuth && checkStep && !isAuth && !forgotPasswordSuccess) {
        return <Navigate to={startPage} state={{ from: location }} replace/>;
    }

    return component;
}

ProtectedComponent.propTypes = {
    onlyUnAuth: PropTypes.bool,
    component: PropTypes.element.isRequired,
    checkStep: PropTypes.bool
};

export const AuthProtected = ProtectedComponent;
export const UnAuthProtected = ({ component, checkStep }) => (
    <ProtectedComponent onlyUnAuth={true} component={component} checkStep={checkStep} />
);
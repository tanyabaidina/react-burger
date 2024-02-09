import { Navigate, useLocation } from "react-router-dom";
import { JSX } from "react";

import { userDataSelector } from "../../services/store/selectors";
import { useAppSelector } from "../../services/store/store";

interface IProtectedComponent {
    onlyUnAuth?: boolean;
    component: JSX.Element;
    checkStep?: boolean;
}
const ProtectedComponent = ({ onlyUnAuth = false, component, checkStep=false } : IProtectedComponent) => {
    const location = useLocation();
    const { requestAuth, isAuth, forgotPasswordSuccess } =  useAppSelector(userDataSelector);
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

export const AuthProtected = ProtectedComponent;
export const UnAuthProtected = ({ component, checkStep } : IProtectedComponent) => (
    <ProtectedComponent onlyUnAuth={true} component={component} checkStep={checkStep} />
);
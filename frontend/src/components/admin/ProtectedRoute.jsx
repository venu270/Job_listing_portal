/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.role !== "recruiter") {
            navigate("/");
        }
    }, []);

    console.log(user);

    return (
        <>
        {children}
        </>
    );
};

export default ProtectedRoute;
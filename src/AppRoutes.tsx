import { FC, ReactNode, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "./context/AuthContext";
import Spinner from "./components/Spinner";

interface IRouteProps {
    children: ReactNode;
}

const AppRoutes: FC = () => {
    const { currentUser, isLoading } = useContext(AuthContext);

    console.log(currentUser, isLoading);

    const PrivateRoute: FC<IRouteProps> = ({ children }) => {
        if (currentUser) {
            return children;
        }
        return <Navigate to="/login" />;
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

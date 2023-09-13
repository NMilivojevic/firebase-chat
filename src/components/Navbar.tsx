import { signOut } from "firebase/auth";
import { FC, useContext } from "react";
import { auth } from "../firebase";
import AuthContext from "../context/AuthContext";
import chatLogo from "../assets/chat.png";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="navbar">
            <span className="logo">
                <img src={chatLogo} />
            </span>
            <div className="user">
                <span>{currentUser?.displayName}</span>
                <button
                    role="button"
                    type="button"
                    onClick={() => void handleLogout()}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;

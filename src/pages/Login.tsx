import { signInWithEmailAndPassword } from "firebase/auth";
import { FC, FormEvent, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import chatLogo from "../assets/chatDark.png";

interface FError extends Error {
    code?: string;
}

const Login: FC = () => {
    const [error, setError] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email: string = (e.currentTarget[0] as HTMLInputElement)?.value;
        const password: string = (e.currentTarget[1] as HTMLInputElement)
            ?.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError(true);
            const err = error as FError;
            console.log(err.code);
            console.log(err.message);
            if (err.code === "auth/invalid-login-credentials") {
                setErrorMsg("Invalid login credentials.");
            }
            setTimeout(() => {
                setError(false);
                setErrorMsg("");
            }, 5000);
        }
    };

    return (
        <div className="formContainer">
            {error ? <div className="errorToast">{errorMsg}</div> : null}
            <div className="formWrapper">
                <span className="logo">
                    <img src={chatLogo} />
                    Chat app
                </span>{" "}
                <span className="title">Login</span>
                <form aria-required onSubmit={(e) => void handleSubmit(e)}>
                    <input required type="email" placeholder="Email" />
                    <input required type="password" placeholder="Password" />
                    <button type="submit" role="button">
                        Sign in
                    </button>
                </form>
                <p>
                    You don't have an account?
                    <Link to="/register" className="link">
                        {" "}
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

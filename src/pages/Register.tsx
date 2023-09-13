import { FC, FormEvent } from "react";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import chatLogo from "../assets/chatDark.png";

interface FError extends Error {
    code?: string;
}

interface IDocument {
    uid: string;
    displayName: string;
    email: string;
}

const Register: FC = () => {
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const displayName: string = (e.currentTarget[0] as HTMLInputElement)
            ?.value;
        const email: string = (e.currentTarget[1] as HTMLInputElement)?.value;
        const password: string = (e.currentTarget[2] as HTMLInputElement)
            ?.value;

        try {
            const response: UserCredential =
                await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(response.user, { displayName });

            const DocumentObj: IDocument = {
                uid: response.user.uid,
                displayName,
                email,
            };
            await setDoc(doc(db, "Users", response.user.uid), DocumentObj);
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
        } catch (error) {
            setError(true);
            const err = error as FError;
            console.log(err.code);
            console.log(err.message);
            if (err.code === "auth/email-already-in-use") {
                setErrorMsg("Email already in use.");
            }
            if (err.code === "auth/weak-password") {
                setErrorMsg("Provide a password with minimum 6 characters.");
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
                </span>
                <span className="title">Register</span>
                <form aria-required onSubmit={(e) => void handleSubmit(e)}>
                    <input required type="text" placeholder="Username" />
                    <input required type="email" placeholder="Email" />
                    <input
                        required
                        type="password"
                        placeholder="Password (minimum 6 characters)"
                        minLength={6}
                    />
                    <button type="submit" role="button">
                        Sign up
                    </button>
                </form>
                <p>
                    You do have an account?{" "}
                    <Link to="/login" className="link">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

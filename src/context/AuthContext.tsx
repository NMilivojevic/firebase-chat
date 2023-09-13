import { Unsubscribe, User, onAuthStateChanged } from "firebase/auth";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<{
    currentUser: User | null;
    isLoading: boolean;
}>({
    currentUser: null,
    isLoading: false,
});

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const context = { currentUser, isLoading };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;

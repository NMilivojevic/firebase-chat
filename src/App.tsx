import { FC } from "react";
import "./style.scss";
import AppRoutes from "./AppRoutes";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const App: FC = () => {
    return (
        <AuthContextProvider>
            <ChatContextProvider>
                <AppRoutes />
            </ChatContextProvider>
        </AuthContextProvider>
    );
};

export default App;

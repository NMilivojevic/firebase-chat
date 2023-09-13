import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import AuthContext from "./AuthContext";

interface ChatContextProviderProps {
    children: ReactNode;
}

interface IinitialState {
    chatId: string;
    user: {
        uid: string;
        displayName: string;
    };
}

interface IReducerAction {
    type: "CHANGE_USER";
    payload: { uid: string; displayName: string };
}

const initialState: IinitialState = {
    chatId: "",
    user: {
        uid: "",
        displayName: "",
    },
};

const ChatContext = createContext<{
    state: IinitialState;
    dispatch: React.Dispatch<IReducerAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const ChatContextProvider: FC<ChatContextProviderProps> = ({
    children,
}) => {
    const { currentUser } = useContext(AuthContext);

    const chatReducer = (state: IinitialState, action: IReducerAction) => {
        const { type } = action;
        switch (type) {
            case "CHANGE_USER":
                return {
                    ...state,
                    user: action?.payload,
                    chatId:
                        currentUser?.uid || "" > action?.payload?.uid
                            ? currentUser?.uid + action?.payload?.uid
                            : action?.payload?.uid + currentUser?.uid,
                };

            default:
                throw new Error();
        }
    };

    const [state, dispatch] = useReducer(chatReducer, initialState);

    const context = { state, dispatch };

    return (
        <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
    );
};

export default ChatContext;

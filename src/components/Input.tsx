import { FC, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";
import {
    Timestamp,
    arrayUnion,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

interface IMessage {
    id: string;
    text: string;
    senderId: string | undefined;
    date: Timestamp;
}

const Input: FC = () => {
    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);
    const [text, setText] = useState<string>("");

    const handleSend = async (): Promise<void> => {
        setText("");
        if (state.chatId) {
            const message: IMessage = {
                id: uuidv4(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
            };
            await updateDoc(doc(db, "chats", state.chatId), {
                messages: arrayUnion(message),
            });
        }
        if (currentUser?.uid) {
            await updateDoc(doc(db, "userChats", currentUser?.uid), {
                [`${state.chatId}.lastMessage`]: {
                    text,
                },
                [`${state.chatId}.date`]: serverTimestamp(),
            });
        }

        if (state.user.uid) {
            await updateDoc(doc(db, "userChats", state.user.uid), {
                [`${state.chatId}.lastMessage`]: {
                    text,
                },
                [`${state.chatId}.date`]: serverTimestamp(),
            });
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.currentTarget.value)}
                value={text}
            />
            <div className="send">
                <button
                    role="button"
                    type="button"
                    onClick={() => void handleSend()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Input;

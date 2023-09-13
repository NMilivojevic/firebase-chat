import { FC, useContext, useEffect, useState } from "react";
import ChatContext from "../context/ChatContext";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

interface IMessage {
    id: string;
    text: string;
    senderId: string | undefined;
    date: Timestamp;
}

const Messages: FC = () => {
    const { state } = useContext(ChatContext);
    const [messages, setMessages] = useState<IMessage[] | null>(null);
    useEffect(() => {
        const getMessages = () => {
            if (state.chatId !== "") {
                const unsub = onSnapshot(
                    doc(db, "chats", state.chatId),
                    (doc) => {
                        if (doc.exists()) {
                            console.log(doc.data());
                            setMessages(doc.data()["messages"] as IMessage[]);
                        }
                    }
                );

                return () => {
                    unsub();
                };
            }
        };

        if (state.chatId !== "") getMessages();
    }, [state.chatId]);

    return (
        <div className="messages">
            {messages
                ? messages.map((message: IMessage) => {
                      return <Message message={message} key={message.id} />;
                  })
                : null}
        </div>
    );
};

export default Messages;

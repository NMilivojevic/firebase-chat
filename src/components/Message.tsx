import { Timestamp } from "firebase/firestore";
import { FC, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";

interface IMessage {
    id: string;
    text: string;
    senderId: string | undefined;
    date: Timestamp;
}

interface MessageProps {
    message: IMessage;
}

const Message: FC<MessageProps> = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div
            ref={ref}
            className={`message ${
                message.senderId === currentUser?.uid && "owner"
            }`}
        >
            <div className="messageInfo">
                <span>
                    {message.senderId === currentUser?.uid
                        ? "Me"
                        : state?.user?.displayName}
                </span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default Message;

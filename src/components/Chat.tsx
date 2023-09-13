import Messages from "./Messages";
import Input from "./Input";
import { FC, useContext } from "react";
import ChatContext from "../context/ChatContext";
import User from "../assets/user.png";

const Chat: FC = () => {
    const { state } = useContext(ChatContext);

    if (state.chatId === "") {
        return (
            <div className="chat">
                <div className="emptyChat">Start a new conversation</div>
            </div>
        );
    }

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>
                    <img src={User} alt="" />
                </span>
                <span>{state.user?.displayName}</span>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;

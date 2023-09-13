import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { FC, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import AuthContext from "../context/AuthContext";
import ChatContext from "../context/ChatContext";

type ChatType = [
    string,
    {
        date: {
            seconds: number;
            nanoseconds: number;
        };
        userInfo: {
            uid: string;
            displayName: string;
        };
        lastMessage: {
            text: string;
        };
    }
];

interface IUserInfo {
    uid: string;
    displayName: string;
}

const Chats: FC = () => {
    const [chats, setChats] = useState<DocumentData | undefined>([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(
                doc(db, "userChats", currentUser?.uid as string),
                (doc) => {
                    setChats(doc.data());
                }
            );
            return () => {
                unsub();
            };
        };

        if (currentUser?.uid) getChats();
    }, [currentUser?.uid]);

    const handleSelect = (user: IUserInfo) => {
        console.log("select");
        dispatch({ type: "CHANGE_USER", payload: user });
    };

    return (
        <div className="chats">
            {chats
                ? Object.entries(chats)
                      ?.sort((a: ChatType, b: ChatType): number => {
                          return b[1]?.date?.seconds - a[1]?.date?.seconds;
                      })
                      ?.map((chat: ChatType) => {
                          return (
                              <div
                                  className="userChat"
                                  key={chat[0]}
                                  onClick={() =>
                                      handleSelect(chat[1]?.userInfo)
                                  }
                              >
                                  <div className="userChatInfo">
                                      <span>
                                          {chat[1]?.userInfo?.displayName}
                                      </span>
                                      <p>{chat[1]?.lastMessage?.text}</p>
                                  </div>
                              </div>
                          );
                      })
                : null}
        </div>
    );
};

export default Chats;

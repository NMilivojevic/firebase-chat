import {
    ChangeEvent,
    FC,
    KeyboardEvent,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    DocumentData,
    Query,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
import AuthContext from "../context/AuthContext";

interface FError extends Error {
    code?: string;
}

const Search: FC = () => {
    const [errorMsg, setErrorMsg] = useState<string>("");
    const { currentUser } = useContext(AuthContext);
    const [username, setUsername] = useState<
        string | number | readonly string[] | undefined
    >("");
    const [user, setUser] = useState<DocumentData | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (username === "") setUser(null);
    }, [username]);

    const handleSearch = async (): Promise<void> => {
        const q: Query<DocumentData> = query(
            collection(db, "Users"),
            where("displayName", "==", username)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            setError(true);
            const err = error as FError;
            console.log(err.code);
            console.log(err.message);
            if (err.code) {
                setErrorMsg("Something went wrong. Please try again later.");
            }
            setTimeout(() => {
                setError(false);
                setErrorMsg("");
            }, 5000);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value);
    };

    const handleKey = async (
        e: KeyboardEvent<HTMLInputElement>
    ): Promise<void> => {
        if (e.code === "Enter") {
            setError(false);
            await handleSearch();
        }
    };

    const handleClick = async (): Promise<void> => {
        setError(false);
        await handleSearch();
    };
    const handleSelect = async () => {
        // check wheither the group exists or not
        let chatUid: string = "";
        if (currentUser?.uid && user?.["uid"]) {
            chatUid =
                currentUser?.uid > user?.["uid"]
                    ? currentUser?.uid + user?.["uid"]
                    : user?.["uid"] + currentUser?.uid;
        }
        try {
            const response = await getDoc(doc(db, "chats", chatUid));
            if (!response.exists() && user && currentUser) {
                // create chat in chats collection
                await setDoc(doc(db, "chats", chatUid), { messages: [] });
                // create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [`${chatUid}.userInfo`]: {
                        uid: user["uid"] as string,
                        displayName: user["displayName"] as string,
                    },
                    [`${chatUid}.date`]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user["uid"] as string), {
                    [`${chatUid}.userInfo`]: {
                        uid: currentUser?.uid,
                        displayName: currentUser?.displayName,
                    },
                    [`${chatUid}.date`]: serverTimestamp(),
                });
            }
        } catch (error) {
            setError(true);
            const err = error as FError;
            console.log(err.code);
            console.log(err.message);
        }
        setUser(null);
        setUsername("");
    };

    return (
        <div className="search">
            {error ? <div className="errorToast">{errorMsg}</div> : null}
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onChange={handleChange}
                    onKeyDown={(e) => void handleKey(e)}
                    value={username}
                />
                <button
                    role="buttom"
                    type="button"
                    onClick={() => void handleClick()}
                >
                    Search
                </button>
            </div>
            {user ? (
                <div className="userChat">
                    <div
                        className="userChatInfo"
                        onClick={() => void handleSelect()}
                    >
                        {user?.["displayName"]}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default Search;

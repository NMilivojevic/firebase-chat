import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { FC } from "react";

const Sidebar: FC = () => {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
};

export default Sidebar;

import { FC } from "react";
import ChatIcon from "../assets/chat.png";

const Spinner: FC = () => {
    return (
        <div className="spinner">
            <img src={ChatIcon} />
            ...
            {/* <h1>Loading . . . </h1> */}
        </div>
    );
};
export default Spinner;

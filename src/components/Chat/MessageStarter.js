import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import React from "react";

const MessageStarter = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const {avatar, name} = userInfo

    return (<div className="chatting-page start-msg">
        <div>
            <Avatar src={avatar} sx={{width: 70, height: 70}}/>
            <h3>Welcome, {name}</h3>
            <p>Please select a chat to start messaging.</p>
        </div>
    </div>);
};

export default MessageStarter

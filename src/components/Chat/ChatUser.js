import React from "react";
import {useDispatch} from "react-redux";
import {selectChat} from "../../Redux/Actions/Chat/ChattingActions";
import {Avatar} from "@mui/material";

const ChatUser = (props) => {
    const {isGroupChat, chatName, users, latestMessage, id, _id, index, chattingwith} = props

    const dispatch = useDispatch();
    const handleSelectChat = () => {
        dispatch(selectChat({
            isGroupChat, index, user: users.find((el) => el._id != id), _id, chatName,
        }));
    };
    return (<div
        onClick={handleSelectChat}
        className={chattingwith == _id ? "user selectUser" : "user"}
    >
        <div className="history-container">
            {isGroupChat ? (<div>{<Avatar>G</Avatar>}</div>) : (
                <div>{<Avatar src={users.find((el) => el._id != id)?.pic}/>}</div>)}
            <div>
                {isGroupChat ? (<p className="name">{chatName}</p>) : (
                    <p className="name">{users.find((el) => el._id != id)?.name}</p>)}
                <p className="chat">
                    {latestMessage ? latestMessage.content.length > 8 ? latestMessage.content.substring(0, 30) + " . . ." : latestMessage.content : ""}
                </p>
            </div>
        </div>
        <div>
            {latestMessage ? (<p className="time">
                {new Date(latestMessage?.updatedAt).getHours() + ":" + new Date(latestMessage?.updatedAt).getMinutes()}
            </p>) : ("")}
            {/* <p className="unseen-chat">5</p> */}
        </div>
    </div>);
};

export default ChatUser

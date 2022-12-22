import SearchIcon from "@mui/icons-material/Search";
import React, {useEffect, useRef, useState} from "react";
import {Avatar, Badge} from "@mui/material";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import SearchUser from "./SearchUser";
import Notification from "../Notification/Notification";
import {makeRecentChatApi} from "../../Redux/Actions/Chat/RecentChatActions";
import {selectChat} from "../../Redux/Actions/Chat/ChattingActions";
import ChatUser from "./ChatUser";
import {searchUser} from "../../Redux/Actions/User/UserSearchActions";

const MyChat = () => {
    const dispatch = useDispatch();
    const ref = useRef();

    const [search, setSearch] = useState(false);

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const userSearch = useSelector((state) => state.userSearch);
    const {userListInfo} = userSearch
    const {recent_chat, loading: chat_loading} = useSelector((state) => state.recentChat);
    const {chatting} = useSelector((state) => state.chatting);

    const handleQuery = () => (e) => {
        if (!e.target.value) {
            setSearch(false);
            return;
        }
        if (ref.current) clearTimeout(ref.current);
        setSearch(true);
        ref.current = setTimeout(() => {
            dispatch(searchUser(e.target.value));
        }, 1000);
    };

    useEffect(() => {
        if (userInfo.token) dispatch(makeRecentChatApi(userInfo.token));
    }, [userInfo]);

    return (<div className="my-chat-container">
        <div>
            {/*<div className="notification">*/}
            {/*    <h2>Chats</h2>*/}
            {/*    <Badge badgeContent={notification} color="error">*/}
            {/*        <Notification/>*/}
            {/*    </Badge>*/}
            {/*</div>*/}
            <div className="search-container">
                <SearchIcon/>
                <input
                    onChange={handleQuery()}
                    type="text"
                    placeholder="Search users"
                />
            </div>
        </div>
        <div className="recent-chat">
            {/*<p className="Recent">Recent</p>*/}
            <div className="recent-user">
                {search ? userListInfo.map((user) => (<SearchUser
                    key={user._id}
                    user={user}
                    recent_chat={recent_chat}
                    setSearch={setSearch}
                />)) : !chat_loading && recent_chat.map((el, index) => (<ChatUser
                    key={el._id}
                    {...el}
                    index={index}
                    chattingwith={chatting._id}
                    id={userInfo._id}
                />))}
            </div>
        </div>
    </div>);
};

export default MyChat

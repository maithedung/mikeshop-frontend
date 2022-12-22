import {useDispatch} from "react-redux";
import {Avatar} from "@mui/material";
import {accessChat} from "../../Redux/Actions/Chat/RecentChatActions";

const SearchUser = (props) => {
    const {user, recent_chat, setSearch} = props
    const {_id, email, name, token, avatar} = user

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(accessChat(_id, token, recent_chat));
        setSearch(false);
    };

    return (<div onClick={submitHandler} className="user">
        <div className="history-container">
            <div>{<Avatar src={avatar}/>}</div>
            <div>
                <p className="name">{name}</p>
                <p className="chat">Email: {email}</p>
            </div>
        </div>
    </div>);
};

export default SearchUser

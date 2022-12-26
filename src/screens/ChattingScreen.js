import {useSelector} from "react-redux";
import {Navigate} from "react-router";
import SideNavbar from "../components/Chat/SideNavbar";
import MyChat from "../components/Chat/MyChat";
import MessageStarter from "../components/Chat/MessageStarter";
import {ChattingPage} from "../components/Chat/ChattingPage";

const ChattingScreen = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const {chatting} = useSelector((state) => state.chatting);

    if (!userInfo._id) {
        return <Navigate to="/register"/>;
    }

    return (<div className="chatting-container">
        <SideNavbar/>
        <MyChat/>
        {chatting._id ? <ChattingPage/> : <MessageStarter/>}
    </div>);
};

export default ChattingScreen;

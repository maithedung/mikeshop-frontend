import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightTooltip from "../Theme/LightTooltip";
import CustomizedDialogs from "../Dialog/GroupMode";
import {Link} from "react-router-dom";

const SideNavbar = () => {
    return (<div className="side-nav">
        <div>
            <Link to="/">
                <Avatar src="/images/logo.png"/>
            </Link>
        </div>
        <div className="mid-icon">
            <LightTooltip title="Profile" placement="top">
                <Link to="/profile" className="icon-color">
                    <AccountCircleOutlinedIcon/>
                </Link>
            </LightTooltip>
            <LightTooltip placement="top" title="Chats">
                <ChatOutlinedIcon/>
            </LightTooltip>
            <LightTooltip placement="top" title="Groups">
                <CustomizedDialogs/>
            </LightTooltip>
            <LightTooltip placement="top" title="Contacts">
                <AssignmentIndOutlinedIcon/>
            </LightTooltip>
            <LightTooltip placement="top" title="Settings">
                <SettingsOutlinedIcon/>
            </LightTooltip>
        </div>
        <div className="icon-color">
            <LightTooltip placement="top" title="Dark/Light Mode">
                <DarkModeOutlinedIcon/>
            </LightTooltip>
        </div>
    </div>);
}

export default SideNavbar;

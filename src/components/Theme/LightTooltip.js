import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import {styled} from "@mui/material/styles";

const LightTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "black", color: "white", fontSize: 13,
    },
}));

export default LightTooltip;

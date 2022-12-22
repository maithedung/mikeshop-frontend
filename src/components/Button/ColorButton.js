import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

export const ColorButton = styled(Button)(() => ({
    color: "white",
    fontSize: "20px",
    textTransform: "none",
    backgroundColor: "#5865f2",
    "&:hover": {
        backgroundColor: "#3a45c3",
    },
}));

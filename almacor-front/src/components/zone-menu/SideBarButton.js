import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

function SideBarButton(props) {
    const navigate = useNavigate();

    return (
        <Button
            variant={props.page === props.currentPage ? "contained" : "text"}
            size="large"
            disableElevation
            fullWidth
            className="zone-menu-side-bar-button"
            onClick={() => {
                props.handleClose();
                navigate(props.urlPage, { replace: true });
                props.setPage(props.currentPage);
            }}
        >
            {props.children}
        </Button>
    );
}

export default SideBarButton;

import { Typography, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import "./ListedPallet.css";

function ListedPallet(props) {
    return (
        <div className="listed-pallet">
            <Typography variant="h5">PL{props.pallet}</Typography>
            <IconButton
                size="small"
                onClick={() => {
                    props.removePallet(props.index);
                }}
            >
                <ClearIcon fontSize="inherit" />
            </IconButton>
        </div>
    );
}

export default ListedPallet;

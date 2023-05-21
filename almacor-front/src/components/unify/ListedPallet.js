import { Typography } from "@mui/material";

import "./ListedPallet.css";

function ListedPallet(props) {
    return (
        <div className="listed-pallet">
            <Typography variant="h5">PL{props.pallet}</Typography>
        </div>
    );
}

export default ListedPallet;

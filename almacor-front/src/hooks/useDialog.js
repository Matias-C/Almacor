import { useState } from "react";

const useDialog = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return {
        openDialog,
        handleOpenDialog,
        handleCloseDialog,
    }
};

export default useDialog;

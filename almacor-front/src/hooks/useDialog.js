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
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
    }
};

export default useDialog;

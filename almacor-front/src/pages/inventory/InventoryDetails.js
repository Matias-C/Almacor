import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import DisplayDetailsPage from "../../components/display/DisplayDetailsPage";
import InventoryCardSkeleton from "../../components/inventory/InventoryCardSkeleton";
import InventoryCard from "../../components/inventory/InventoryCard";
import InventoryForm from "../../components/inventory/InventoryForm";
import useDialog from "../../hooks/useDialog";

import ContextConnected from "../../context/ContextConnected";

function InventoryDetails() {
    const Connected = useContext(ContextConnected);
    const location = useLocation();

    const [loading, setLoading] = useState(true);

    const [empty, setEmpty] = useState(null);
    const [inventoryDetails, setInventoryDetails] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const {
        openDialog,
        setOpenDialog,
        handleCloseDialog,
    } = useDialog();

    const setInventory = (data) => {
        setEmpty(false);
        setInventoryDetails(data);
    };


    useEffect(() => {
        const getInventoryDetails = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                const res = await fetch(
                    `${Connected.currentURL}api/v1/deposito/inventarios_reales/?n_id_inventario=${location.state.n_id_inventario}&n_id_empresa=${location.state.n_id_empresa}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token.access_token}`,
                        },
                    },
                );
                const data = await res.json();
                console.log(data);
                data.error ? setEmpty(true) : setInventory(data);
                setRefresh(false);
                setLoading(false);
            }
        };
        getInventoryDetails();
    }, [Connected, location, refresh]);

    return (
        <>
            <DisplayDetailsPage
                detailsHeaderDetail={
                    location.state.c_tipo_inventario === "T"
                        ? "TOTAL"
                        : "PARCIAL"
                }
                detailsHeader={`Inventario ${location.state.n_id_inventario}`}
                addButton
                setOpenDialog={setOpenDialog}
            >
                {!empty ? (
                    <Grid container spacing={2}>
                        {loading ? (
                            <>
                                <InventoryCardSkeleton />
                                <InventoryCardSkeleton />
                            </>
                        ) : (
                            inventoryDetails.map((item) => {
                                return (
                                    <InventoryCard
                                        key={item.n_id_pk}
                                        itemId={item.n_id_pk}
                                        itemPL={item.c_numero}
                                        itemHall={item.c_pasillo}
                                        itemCol={item.n_id_columna}
                                        itemRow={item.n_id_fila}
                                        setRefresh={setRefresh}
                                    />
                                );
                            })
                        )}
                    </Grid>
                ) : (
                    <Typography
                        variant="h3"
                        className="inv-details-empty-alert"
                    >
                        Inventario vacío
                    </Typography>
                )}

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>Añadir Incidencia</DialogTitle>

                    <DialogContent>
                        <InventoryForm
                            inventoryId={location.state.n_id_inventario}
                            inventoryDetails={inventoryDetails}
                            setInventoryDetails={setInventoryDetails}
                            setRefresh={setRefresh}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button
                            variant="outlined"
                            className="add-page-button"
                            onClick={() => {
                                handleCloseDialog();
                            }}
                        >
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
            </DisplayDetailsPage>
        </>
    );
}

export default InventoryDetails;

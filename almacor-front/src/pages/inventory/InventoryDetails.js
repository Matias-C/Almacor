import { useLocation } from "react-router-dom";

function InventoryDetails() {

    const location = useLocation();

    return (
        <h1>Inventario {location.state.n_id_inventario}</h1>
    )
}

export default InventoryDetails;
import { useContext } from "react";
import ContextConnected from "../context/ContextConnected";

const useAuth = () => {
    return useContext(ContextConnected);
}

export default useAuth;
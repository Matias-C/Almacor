import { useState, useEffect, useContext } from "react";

import ContextConnected from "../context/ContextConnected";

const useFetch = (url) => {
    const Connected = useContext(ContextConnected);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const token = await JSON.parse(localStorage.getItem("token"));
            if (token) {
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token.access_token}`,
                    },
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw Error("No se pudo completar la petición");
                        }
                        return res.json();
                    })
                    .then((data) => {
                        setData(data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                        setError(err);
                    });
            }
        };
        getData();
    }, [Connected, url]);

    return { data, loading, error };
};

export default useFetch;

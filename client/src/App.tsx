import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { CreateOrder, Header, Main } from "./components";
import { IOrder } from "./types";
import { AppContext, AppContextProvider } from "./context";

export default function App(): JSX.Element {
    const [orders, setOrders] = useState<IOrder[]>();
    const { createdOrder, setCreatedOrder } = useContext(AppContext) as {
        createdOrder: boolean;
        setCreatedOrder: React.Dispatch<React.SetStateAction<boolean>>;
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:8080/orders");
                const data = await response.json();
                setOrders(data);
                setCreatedOrder(false);
            } catch (error: unknown) {
                console.error((error as Error).message);
            }
        })();
    }, [createdOrder, setCreatedOrder]);

    return (
        <AppContextProvider>
            <Header orders={orders?.length} />
            <Main orders={orders} />
            <CreateOrder />
        </AppContextProvider>
    );
}

<script>
    import { BASE_URL } from "../../store/globals";
    import { onMount } from "svelte";

    import io from "socket.io-client";
    const socket = io();

    let price = 0;

    socket.on("stockprice", (data) => {
        price = data;
    }) 

    //TODO: ADD TICKER DATA TO FORM AND PARSE ON BACKEND
    export function refreshSocket() {
        socket.disconnect();
        socket.connect();
    }

</script>

<h1 style="text-align: center">$ {Math.round(price)}</h1>
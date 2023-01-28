import { writable } from "svelte/store";

export const authenticated = writable("false");
export const name = writable("");
export const isAdmin = writable("");
export const UUID = writable("");

//if value is already set, inherit...
if (sessionStorage.getItem("userAuthenticated")) {
    authenticated.set(sessionStorage.getItem("userAuthenticated"));
}
if (sessionStorage.getItem("userName") !== null) {
    name.set(sessionStorage.getItem("userName"));
}
if (sessionStorage.getItem("userIsAdmin")  !== null) {
    isAdmin.set(sessionStorage.getItem("userIsAdmin"));
}
if (sessionStorage.getItem("userUUID")  !== null) {
    UUID.set(sessionStorage.getItem("userUUID"));
}
//

authenticated.subscribe((val) => sessionStorage.setItem("userAuthenticated",val));
name.subscribe((val) => sessionStorage.setItem("userName",val));
isAdmin.subscribe((val) => sessionStorage.setItem("userIsAdmin",val));
UUID.subscribe((val) => sessionStorage.setItem("userUUID",val));
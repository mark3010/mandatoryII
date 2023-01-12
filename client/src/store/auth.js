import { writable } from "svelte/store";
import { persistStore } from "./persistStore";


export const authenticated = persistStore('authenticated',false);

//storing profile info for ease of use + reducing api calls
export const name = persistStore('name',"missingName");
export const isAdmin = persistStore('isAdmin',false);
export const UUID = persistStore('UUID',"missingUUID");
export const ghost = persistStore('ghost',false);
//export const createdAt = persistStore('createdAt',"missing date");
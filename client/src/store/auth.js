import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

export const name = persistStore('name',"missingName")
export const authenticated = persistStore('authenticated',false)
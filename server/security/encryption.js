import bcrypt from "bcrypt";
import {randomUUID } from "crypto";

const saltRounds = 12;

export async function hash(password) {
    return await bcrypt.hash(password, saltRounds);
}

export async function compare(loginPassword, encryptedPassword) {
    return await bcrypt.compare(loginPassword, encryptedPassword);
}

export async function createUUID() {
    return await randomUUID();
}

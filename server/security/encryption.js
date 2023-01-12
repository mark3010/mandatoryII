import bcrypt from "bcrypt";
import crypto, {randomUUID } from "crypto";

const saltRounds = 12;

export async function hash(password) {
    return await bcrypt.hash(password, saltRounds)
}

export async function compare(loginPassword, encryptedPassword) {
    return await bcrypt.compare(loginPassword, encryptedPassword);
}

export async function createUUID() {
    return await randomUUID();
}

/** FOR TESTING PURPOSES ONLY */
/**
hash("ninja").then((response) => {
    console.log(response)
})

compare("ninja","sdcscjRQ4Joz1bIK.LKD85ARbPdkQYxBziuzRqcUARZpNCmm").then((response) => {
    console.log(response)
})
 */
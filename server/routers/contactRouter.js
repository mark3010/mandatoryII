import { Router } from "express";
import { sendMail } from "../util/emails.js";

const router = Router();

router.post("/api/v1/recoverPassword", (req, res) => {
    sendMail("random user", req.body.email, "hello we dont have this feature yet, Sorry!");
    res.sendStatus(200);
});

export default router;
import { Router } from "express";
import { sendMail } from "../util/emails.js";

const router = Router();

router.post("/api/recoverPassword", (req, res) => {
    sendMail("random user", req.body.email, "hello we dont have this feature yet, Sorry!")
    res.send("Thanks for the mail, kiddo");
});

export default router;
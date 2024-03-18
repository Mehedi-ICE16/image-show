import express from "express";
import {getPDF, newUser} from "./controller/pdf.controller";
const router = express.Router();
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

router.get("/pdf", getPDF);
router.post("/pdf", upload.array('files', 2), newUser);

export default router
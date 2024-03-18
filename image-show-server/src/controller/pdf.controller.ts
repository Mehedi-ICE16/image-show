import { setUser, getUser } from "../model/PDF/pdf.query";
import { Request, Response } from "express";
import multer from 'multer';
import fs from 'fs';
import {convertPDFToImagesAndUpload, changeName} from "../model/cludinary";
import { PDFDocument } from 'pdf-lib';


const storage:any = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      cb(null, './uploads');
    },
    filename: function (req: Request, file: any, cb: any) {
      // Customize filename as needed (e.g., original filename with a timestamp)
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  export const getPDF = async (req: Request, res: Response) => {
    try {
        // Assuming 'account_number' is a property in the request body
        const { account_number } = req.body;
        console.log(account_number);
        const user = await getUser(account_number);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting user from database' });
    }
};
export const newUser = async (req: Request, res: Response) => {
    try {
        const uploadedFiles = req.files as Express.Multer.File[];
        const { name, account_number } = req.body;

        if (uploadedFiles.length < 2) {
            return res.status(400).send('Please upload 2 files');
        }

        // Ensure the file paths are strings
        const filePath1 = String(uploadedFiles[0].path);
        const filePath2 = String(uploadedFiles[1].path);

        await changeName(filePath1, account_number, 1);
        await changeName(filePath2, account_number, 2);
        // Read the files as Buffers

   
        

       
        const pdfData1 = (await convertPDFToImagesAndUpload(`./uploads/${account_number}_${1}.pdf`));
        const pdfData2 = (await convertPDFToImagesAndUpload(`./uploads/${account_number}_${2}.pdf`));

        await setUser(name, account_number, pdfData1, pdfData2);
        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
}
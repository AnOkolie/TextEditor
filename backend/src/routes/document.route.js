import express from "express";
import {
  getDocuments,
  createDocument,
  // getDocumentById,
  // updateDocument,
  // deleteDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

router.get("/documents", getDocuments);
router.post("/documents", createDocument);
// router.get("/document/:id", getDocumentById);
// router.put("/document/:id", updateDocument);
// router.delete("/document/:id", deleteDocument);

export default router;

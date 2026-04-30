import { prisma } from "../lib/prisma.ts";

export const getDocuments = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const response = prisma.documents.findMany({
      where: {
        id: userId,
      },
    });
    if (!response) {
      return res
        .status(401)
        .json({ error: "No documents found for this user" });
    }
    return res.status(200).json({
      message: "Retrieved documents for user!",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.sttaus(500).json({ error: "Internal server error" });
  }
};

export const createDocument = async (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.status(400).json({ error: "Missing required values" });
  }

  try {
    const doc = await prisma.documents.create({
      data: {
        title: title,
        content: content,
        userId: userId,
      },
    });
    if (!doc) {
      return res.status(400).json({ error: "Failed to create document" });
    }
    return res.status(200).json({
      message: "Document created successfully",
      data: doc,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "Internal server error" });
  }
};

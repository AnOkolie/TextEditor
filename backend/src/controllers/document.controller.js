import { prisma } from "../lib/prisma.ts";

export const getDocuments = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const response = await prisma.documents.findMany({
      where: {
        user_id: userId,
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createDocument = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.params;
  if (!title || !userId) {
    return res.status(400).json({ error: "Missing required values" });
  }

  try {
    const textContent = content || "";
    const doc = await prisma.documents.create({
      data: {
        title: title,
        content: textContent,
        user_id: userId,
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

export const updateDocument = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Reuired fields are missing" });
  }

  try {
    const doc = prisma.documents.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Error updating document", error);
  }
};

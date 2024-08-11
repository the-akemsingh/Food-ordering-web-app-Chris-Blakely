import { Request, Response } from "express";
import prisma from "../db/prismaClient";

const createcurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;

    const isExistinguser = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });
    if (isExistinguser) {
      return res.status(400).json({ error: "User already exist" });
    }
    const newUser = await prisma.user.create({
      data: {
        ...req.body,
      },
    });

    res.status(201).json({ newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating a user" });
  }
};

const updatecurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, email, addressLine1, country, city } = req.body;

    const isExistinguser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!isExistinguser) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name,
        addressLine1,
        country,
        city,
      },
    });
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating a user" });
  }
};

export default {
  createcurrentUser,
  updatecurrentUser,
};

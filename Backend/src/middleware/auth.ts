import jwt from "jsonwebtoken";
import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prismaClient";

declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
  
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;
    const user = await prisma.user.findUnique({
      where: {
        auth0Id,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.auth0Id = auth0Id as string;
    req.userId = user.id.toString();
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error parsing token" });
  }
};
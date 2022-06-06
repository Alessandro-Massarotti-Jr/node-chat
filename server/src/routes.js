import express from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import 'dotenv/config'

import { User } from "./controllers/UserController.js"

const prisma = new PrismaClient()

export const routes = express.Router();


routes.get("/", async (req, res) => {
  console.log('Ola mundo');
  return res.status(201).json({ ola: "mundo" });
})

routes.post("/createUser", User.Create)

routes.put("/updateUser", User.Update)

routes.delete("/deleteUser", User.Delete)

routes.get("/getUsers", User.getAll)

routes.post("/login", User.login)

// Private Route
routes.get("/user/:email", User.auth, User.getOne);

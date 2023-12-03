import express from "express";
import {getUsers, addUser, updateUser, deleteUser} from "../Controllers/user.js";

const router = express.Router ();

router.get ("/", getUsers);

router.post("/", add.addUser)

router.put ("/:id", updateUser)

router.delete ("/:id", deleteUser)

export default router;
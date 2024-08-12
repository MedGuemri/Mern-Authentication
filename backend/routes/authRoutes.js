import express from "express"
import { logout, singin, singup } from "../controllers/authControllers.js"

const router = express.Router()

router.get("/singup",singup)

router.get("/singin",singin)

router.get("/logout",logout)



export default router
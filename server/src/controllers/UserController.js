import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import 'dotenv/config'

const prisma = new PrismaClient()

export var User = {}

User.Create = async (req, res) => {

 
    
    const salt = await bcrypt.genSalt(12);
    const passwordhash = await bcrypt.hash(req.body.password, salt)

    try {
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                password: passwordhash,
                name: req.body.name
            }
        })

        async () => { await prisma.$disconnect(); }

        return res.status(201).json({ success: true, message: "usuario criado", data: newUser });

    } catch (err) {
        return res.status(500).json({ success: false, error:err.message});
    }

}

User.Delete = async (req, res) => {

    const userMail = req.body.email

    try {
        const user = await prisma.user.delete({
            where: {
                email: userMail
            },
        });

        async () => {
            await prisma.$disconnect();
        }
        return res.status(201).json({ success: true, message: "usuario Deletado com success!", data: user });

    } catch (err) {
        return res.status(400).json({ erro: err });
    }
}

User.Update = async (req, res) => {
    const userMail = req.body.email

    try {
        const user = await prisma.user.update({
            where: {
                email: userMail
            },
            data: {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }
        });

        async () => {
            await prisma.$disconnect();
        }

        return res.status(201).json({ success: true, message: "usuario Atualizado", data: user });

    } catch (err) {
        return res.status(400).json({ erro: err });
    }
}

User.getAll = async (req, res) => {


    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                name: true,
                id:true,
              },
        });

        async () => {
            await prisma.$disconnect();
        }

        return res.status(201).json({ success: true, message: "List of all users", data: users });

    } catch (err) {
        return res.status(400).json({ erro: err });
    }
}

User.login = async (req, res) => {
    const userMail = req.body.email
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: userMail
                }
            }
        });

        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkPassword) {
            return res.status(424).json({ message: 'senha invalida' });
        }

        try {

            const jwt_secret = process.env.JWT_SECRET;


            const jwt_token = jwt.sign({
                id: user.id,
            }, jwt_secret)

            async () => {
                await prisma.$disconnect();
            }

            return res.status(201).json({ success: true, message: "usuario efetuou login", data: user, token: jwt_token });

        } catch (err) {
            return res.status(400).json({ success: false, erro: err.message });
        }

    } catch (err) {
        return res.status(400).json({ success: false, erro: err.message });
    }

}

User.getOne = async (req, res) => {
    const userEmail = req.params.email;

    // check if user exists
    const user = await prisma.user.findFirst({
        where: {
            email: userEmail
        },
        select: {
            email: true,
            name: true,
            id:true,
          },
    });

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ success: true, message: "User found", data: user });
}

User.auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    try {
        const secret = process.env.JWT_SECRET;

        jwt.verify(authHeader, secret);

        next();
    } catch (err) {
        res.status(400).json({ msg: "O Token é inválido!" });
    }
}
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import 'dotenv/config'

const prisma = new PrismaClient();

export var Messages = {};

Messages.socket = {};

Messages.save = async (req, res) => {

    try {
        const newMessage = await prisma.messages.create({
            data: {
                sender: req.body.senderId,
                receiver: req.body.receiverId,
                message: req.body.message,
            }
        })

        async () => { await prisma.$disconnect(); }

        return res.status(201).json({ sucesso: true, message: "mensagem criado", data: newMessage });

    } catch (err) {
        return res.status(400).json({ sucesso: false, error: err.message });
    }

}

Messages.getAll = async (req, res) => {
    try {
        const messages = await prisma.messages.findMany({
            select: {
                sender: true,
                receiver: true,
                message: true,
                id: true,
            },
        });

        async () => {
            await prisma.$disconnect();
        }

        return res.status(201).json({ sucesso: true, message: "List of all messages", data: messages });

    } catch (err) {
        return res.status(400).json({ sucesso: false, erro: err.message });
    }
}

Messages.getChat = async (req, res) => {

    const sender = req.params.sender;
    const receiver = req.params.receiver;

    try {
        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    {
                        sender: sender,
                        receiver: receiver,
                    },
                    {
                        sender: receiver,
                        receiver: sender
                    }
                  ]
            },
            select: {
                sender: true,
                receiver: true,
                message: true,
                id: true,
            },
            orderBy: {
                createdAt: 'asc',
              },
        });

        async () => {
            await prisma.$disconnect();
        }

        return res.status(201).json({ sucesso: true, message: "List of all messages", data: messages });

    } catch (err) {
        return res.status(400).json({ sucesso: false, erro: err.message });
    }
}

Messages.socket.save = async (data)=>{

    try {
        const newMessage = await prisma.messages.create({
            data: {
                sender: data.sender,
                receiver: data.receiver,
                message: data.message,
            }
        })

        async () => { await prisma.$disconnect(); }

        return { sucesso: true, message: "mensagem criado", data: newMessage };

    } catch (err) {
        return { sucesso: false, error:err.message };
    }
}

Messages.socket.getChat = async (data) =>{

    const sender = data.sender;
    const receiver = data.receiver;

    try {
        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    {
                        sender: sender,
                        receiver: receiver,
                    },
                    {
                        sender: receiver,
                        receiver: sender
                    }
                  ]
            },
            select: {
                sender: true,
                receiver: true,
                message: true,
                id: true,
            },
            orderBy: {
                createdAt: 'desc',
              },
        });

        async () => {
            await prisma.$disconnect();
        }

        return { sucesso: true, message: "List of all messages", data: messages };

    } catch (err) {
        return { sucesso: false, erro: err.message };
    }
}
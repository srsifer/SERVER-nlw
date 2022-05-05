import express from 'express';
import nodemailer from 'nodemailer'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailermail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repositories';
import { SubimitFeedbackUseCase } from './services/submit-feedback-use-case';

export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot} = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const subimitFeedbackUseCase = new SubimitFeedbackUseCase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )

    await subimitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    
    console.log('terminei')
    return res.status(201).send();
})
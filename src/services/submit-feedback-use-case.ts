import { MailAdapter } from "../adapters/mail-adapters";
import { FeedBacksRepository } from "../repositories/feedbacks-repositories";

interface SubimitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string,
}

export class SubimitFeedbackUseCase {
    constructor(
        private feedbackRepository: FeedBacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubimitFeedbackUseCaseRequest) {
        const {type, comment, screenshot} = request;

        if(!type) {
            throw new Error('Type is required');
        }

        if (!comment) {
            throw new Error('Comment is required');
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

         await this.feedbackRepository.create({
             type,
             comment,
             screenshot,
         })
         
         await this.mailAdapter.sendMail({
            subject: 'novo feedback meu app nlw',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário do feedback: ${comment}</p>`,
                `<img src="${screenshot}" alt="imagem do feedback"/>"`,
                `</div>`
            ].join('\n')
         })
    }
}
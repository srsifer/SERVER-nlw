import { SubimitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const subimitFeedback =  new SubimitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('subimit feedback', () => {
    it('shoud be able to submit feedback', async () => {
        await expect(subimitFeedback.execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('shoud not able to submit feedback without type', async () => {
        await expect(subimitFeedback.execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64',
        })).rejects.toThrow();
    })

    it('shoud not able to submit feedback without comment', async () => {
        await expect(subimitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64',
        })).rejects.toThrow();
    })

    it('shoud not able to submit feedback with an invalid screenshot', async () => {
        await expect(subimitFeedback.execute({
            type: 'BUG',
            comment: 'comment test',
            screenshot: '123',
        })).rejects.toThrow();
    })
})
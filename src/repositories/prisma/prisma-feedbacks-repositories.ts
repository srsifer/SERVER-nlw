import { prisma } from "../../prisma";
import { FeedbacksCreateData, FeedBacksRepository } from "../feedbacks-repositories";


export class PrismaFeedbackRepository implements FeedBacksRepository {
  async create({type ,comment, screenshot}: FeedbacksCreateData) {
        await prisma.feedbacks.create({
            data:{
                type,
                comment,
                screenshot,
            }
        });
    }
}
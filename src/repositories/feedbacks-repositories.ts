export interface FeedbacksCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedBacksRepository {
    create: (data: FeedbacksCreateData) => Promise<void>;
}
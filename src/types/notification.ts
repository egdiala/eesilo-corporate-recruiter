export type GetNotificationQuery = {
    page?: string;
    item_per_page?: string;
    component?: "count" | "count-unread";
}

export interface FetchedNotification {
    _id: string;
    user_id: string;
    user_type: string;
    title: string;
    description: string;
    status?: number;
    data: Record<string, any>;
    createdAt: Date | string;
    updatedAt: Date | string;
    __v: number;
    notification_id: string;
}

export interface NotificationCount {
    _id: null;
    total: number
}
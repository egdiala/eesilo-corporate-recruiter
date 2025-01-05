export type GetSubscriptionQuery = {
    page?: string;
    start_date?: string;
    end_date?: string;
    item_per_page?: string;
    component?: "count" | "subplan";
}

export type InitSubscriptionParams = {
    plan_id: string;
    plan_duration: "1" | "2"; // 1=Monthly | 2=Yearly
}

export type CompleteSubscriptionParams = {
    transaction_ref: string;
}

export type InitSaveCardParams = {
    strip_payment_id: string;
}

export type GetSavedCardQuery = {
    component?: "add-card";
}

export interface FetchedPlan {
    plan_name: string;
    monthly_cost: number;
    yearly_cost: number;
    is_default: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    plan_id: string;
}

export interface FetchedSubscriptionHistory {
    user_id: string;
    plan_id: string;
    sub_amount: number;
    sub_duration: number;
    start_date: Date | string;
    end_date: Date | string;
    status: number;
    intent_id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    __v: number;
    plan_name: string;
}

export interface InitSubscriptionResponse {
    client_secret: string;
    amount: number;
    app_secret: string;
    transaction_ref: string;
}

export interface FetchedCard {
    card_id: string;
    brand: "visa" | "mastercard" | "verve";
    pan: string;
    exp_month: number;
    exp_year: number
}
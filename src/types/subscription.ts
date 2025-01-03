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
    component: "app-secret";
}
export interface  WordImage {
    id: string;
    item_id: string;
    user_id: string;
    url: string;
}

export interface WordItem {
    id: string;
    user_id: string
    word: string;
    translation: string;
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface ctx {
    [key:string]: any;
}

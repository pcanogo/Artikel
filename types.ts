export interface Item {
    id: string;
    wordBank_id: string;
    word: string;
    translation: string;
    imgs: string[];
}

export interface WordBank {
    id: string;
    items: string[];
}

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;

    wordBank_id: string;
}
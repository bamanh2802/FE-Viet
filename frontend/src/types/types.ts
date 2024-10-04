export interface Project {
  project_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};


export interface Document{
    created_at: string;
    document_id: string;
    document_name: string;
    document_path: string;
    project_id: string;
    type: string;
    updated_at: string
}

export interface ImageType {
    image_id: string;
    image_path: string;
    document_id: string;
    page: number;
    order_in_ref: number;
    caption: string;
}

export interface Conversation {
    conversation_id: string;
    conversation_name: string;
    created_at: string;
    updated_at: string;
    project_id: string;
}
export interface User {
    user_id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string
    password: string
    created_at: string
    updated_at: string
    dob: string
}


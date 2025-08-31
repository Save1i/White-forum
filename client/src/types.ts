export type Msg = {
  id: number;
  username: string;
  title: string;
  content: string;
};

export type Comm = {
    content: string; 
    created_at: string; 
    id: number; 
    post_id: number; 
    user_id: number
}; 
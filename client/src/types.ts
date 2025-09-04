export type Msg = {
  id: number;
  user_id: number;
  username: string;
  title: string;
  content: string;
  like_count: number;
  favorite_count: string;
  favorited_by_user: boolean;
  liked_by_user: boolean;
  priority: number;
};

export type Comm = {
    content: string; 
    created_at: string; 
    id: number; 
    post_id: number; 
    user_id: number;
    username: string;
}; 
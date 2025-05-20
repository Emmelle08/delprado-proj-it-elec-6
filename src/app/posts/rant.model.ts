export interface Reply {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}

export interface Rant {
  _id: string;
  content: string;
  userId: string;
  createdAt: Date;
  replies?: {
    content: string;
    userId: string;
  }[];
}

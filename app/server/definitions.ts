//This file contains the type definitions for the data

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Course = {
  id: string | null;
  name: string | null;
  description: string | null;
  instructor_id: string | null;
  instructor_name: string | null;
  public: boolean | null;
  rating: string | null;
  users_rated: number | null;
  img_url: string | null;
  category_id: string | null;
  sections: section[] | null;
};

export type section = {
  id: string;
  name: string;
};

export type review = {
  user: string;
  review: string;
  timestamp: string;
};

export type Category = {
  id: string;
  name: string;
  href: string;
};

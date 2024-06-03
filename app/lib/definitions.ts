//This file contains the type definitions for the data

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Course = {
  id: string;
  name: string;
  instructor_id: string;
  instructor_name: string;
  categoryId: string;
  description: string;
  rating: number;
  users_rated: number;
  reviews: review[];
  sections: section[];
  img_url: string;
};

export type section = {
  id: string;
  name: string;
  course_material_id: string;
};

export type review = {
  user: string;
  review: string;
  timestamp: string;
};

export type block = {
  type: "text" | "title";
  content: string;
  size: number;
};

export type CourseMaterial = {
  id: string;
  course_id: string;
  blocks: block[];
};

export type Category = {
  cat_Id: string;
  name: string;
  href: string;
};

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
  category: string;
  description: string;
  rating: number;
};

export type blocks = {
  type: "text" | "title";
  content: string;
  size: number;
};

export type CourseMaterial = {
  id: string;
  course_id: string;
  blocks: blocks[];
};

export type Category = {
  id: string;
  name: string;
  href: string;
};

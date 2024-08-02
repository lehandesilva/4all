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
  sections: section_for_course[] | null;
};

export type newSection = {
  name: string;
  blocks: block[];
};

export type section_for_course = {
  id: string;
  name: string;
};

export type section_for_section = {
  id: string;
  instructor_id: string | null;
  name: string;
  blocks: block[] | null;
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

export type history = {
  course_id: number;
  section_id: number;
};

export type block = {
  type: "text" | "image" | "video" | "quiz" | "subtitle";
  content: string;
  style: {
    color: String | null;
    size: Number | null;
    align: String | null;
  };
};

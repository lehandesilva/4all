//This file contains the type definitions for the data

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type userAuth = {
  id: string;
  name: string;
  email: string;
  role: string;
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

export type block = {
  id: string;
  type: "text" | "image" | "video" | "quiz" | "subtitle" | string;
  content: string;
  style: {
    color: String | null;
    size: Number | null;
    align: String | null;
  };
};

export type block_for_editor = {
  id: string;
  type: "text" | "image" | "video" | "quiz" | "subtitle" | string;
  content: string;
  style: {
    color: String | null;
    size: Number | null;
    align: String | null;
  };
  file: File | null;
};

export type review = {
  review_id: string;
  course_id: string;
  user_id: string;
  user_name: string;
  comment: string;
  timestamp: Date;
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

export type CurrentUserCourses = {
  id: string | null;
  name: string | null;
  public: boolean | null;
  rating: string | null;
  img_url: string | null;
  category_id: string | null;
};

export type Courses_for_page = {
  id: string | null;
  name: string | null;
  instructor_name: string | null;
  rating: string | null;
  img_url: string | null;
};

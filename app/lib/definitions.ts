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
  description: string;
  course_material: JSON;
  rating: number;
};

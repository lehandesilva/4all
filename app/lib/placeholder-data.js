//File contains placeholder data to seed the database with and to help develop the app initially

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
  {
    id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    name: "The CIA",
    email: "cia@nextmail.com",
    password: "123456",
  },
];

const courses = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "How to pull off a coup",
    instructor_id: users[1].id,
    instructor_name: users[1].name,
    category: "Politics",
    description: "The US government knows what's best for your country pal",
    rating: 5,
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "How to pull off a coup",
    instructor_id: users[1].id,
    instructor_name: users[1].name,
    category: "Politics",
    description: "The US government knows what's best for your country pal",
    rating: 5,
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "How to pull off a coup",
    instructor_id: users[1].id,
    instructor_name: users[1].name,
    category: "Politics",
    description: "The US government knows what's best for your country pal",
    rating: 5,
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "How to pull off a coup",
    instructor_id: users[1].id,
    instructor_name: users[1].name,
    category: "Politics",
    description: "The US government knows what's best for your country pal",
    rating: 5,
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "How to pull off a coup",
    instructor_id: users[1].id,
    instructor_name: users[1].name,
    category: "Politics",
    description: "The US government knows what's best for your country pal",
    rating: 5,
  },
];

const course_material = [
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    course_id: courses[0].id,
    blocks: [
      {
        type: "title",
        content: "What the deepstate is made off",
        size: 3,
      },
      {
        type: "text",
        content:
          "What do all of the three letter agencies and the vatican city have in common? They're all a part of the deepstate. :O",
        size: 1,
      },
    ],
  },
];

const categories = [
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Development",
    href: "",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "Business",
    href: "",
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    name: "Design",
    href: "",
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "IT & Software",
    href: "",
  },
];

module.exports = { users, courses, course_material, categories };

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
    instructor_id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    description: "The US government knows what's best for your country pal",
    course_material: {
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
    rating: 5,
  },
];

module.exports = { users, courses };

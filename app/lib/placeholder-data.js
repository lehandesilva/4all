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
    name: "admin",
    email: "admin@nextmail.com",
    password: "123456",
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

const courses = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Beginner's Guide to Data Science",
    instructor_id: users[0].id,
    instructor_name: users[0].name,
    categoryId: categories[0].id,
    description:
      "Welcome to the Beginner's Guide to Data Science! In this course, we'll embark on an exciting journey into the fascinating world of data science. Whether you're a complete novice or have some experience with data analysis, this course will provide you with a solid foundation to kickstart your learning journey.",
    rating: 5,
    reviews: [
      {
        id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81dd",
        user: "nam",
        review: "This is great!",
      },
    ],
    sections: [
      {
        id: "d6e15727-9fe1-4961-8c5b-ea44a9bd8bba",
        name: "Introduction to Data Science",
        course_material_id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
      },
      {
        id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
        name: "Data Collection and Preparation",
        course_material_id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
      },
      {
        id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
        name: "Exploratory Data Analysis (EDA)",
        course_material_id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
      },
    ],
    img_url: "",
  },
];

const course_material = [
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    course_id: courses[0].id,
    blocks: [
      {
        type: "title",
        content: "What is Data Science?",
        size: 3,
      },
      {
        type: "text",
        content:
          "Let's start our adventure with an exploration into the captivating realm of data science. Have you ever wondered how Netflix recommends movies you'll love or how Amazon suggests products you might want to buy? That's data science at work! Data science is all about extracting insights and knowledge from data to solve complex problems and make informed decisions. From predicting customer behavior to optimizing business operations, the possibilities are endless! In this section, we'll dive into the basics of data science, exploring its key concepts, applications, and real-world examples. By the end of this section, you'll have a solid understanding of what data science is all about and why it's such an exciting field to explore.",
        size: 1,
      },
    ],
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    course_id: courses[0].id,
    blocks: [
      {
        type: "title",
        content: "Collecting Data",
        size: 3,
      },
      {
        type: "text",
        content:
          "Now that we've laid the groundwork, let's roll up our sleeves and get our hands dirty with some data! Data collection is the first step in any data science project. We'll learn how to gather data from various sources, including databases, APIs, and web scraping. But collecting data is just the beginning – we'll also dive into the crucial task of data cleaning and preprocessing. Trust me, clean data is the secret sauce to successful data analysis! In this section, we'll explore techniques for cleaning, transforming, and organizing data to ensure its quality and reliability. By the end of this section, you'll be equipped with the skills to collect and preprocess data effectively for your own data science projects.",
        size: 1,
      },
    ],
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    course_id: courses[0].id,
    blocks: [
      {
        type: "title",
        content: "Data Analysis",
        size: 3,
      },
      {
        type: "text",
        content:
          "Ready to uncover hidden insights lurking within our datasets? Exploratory Data Analysis (EDA) is our trusty detective tool for unraveling the mysteries hidden within our data. We'll learn how to visualize and explore our data using graphs, charts, and statistical summaries. Who knew data could be so visually appealing? But EDA isn't just about pretty pictures – it's about gaining a deeper understanding of our data and identifying patterns, trends, and outliers that can guide our analysis. By the end of this section, you'll be a certified data detective, armed with the skills to uncover valuable insights from your datasets.",
        size: 1,
      },
    ],
  },
];

module.exports = { users, courses, course_material, categories };

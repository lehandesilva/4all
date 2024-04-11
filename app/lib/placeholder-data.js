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
    reviews: [
      {
        id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81dd",
        user: "nam",
        review: "lol get gud",
      },
    ],
    sections: [
      {
        id: "d6e15727-9fe1-4961-8c5b-ea44a9bd8bba",
        name: "Setup",
        course_material_id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
      },
      {
        id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
        name: "Rooting out communism",
        course_material_id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
      },
      {
        id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
        name: "Shitting and pissing",
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
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    course_id: courses[0].id,
    blocks: [
      {
        type: "title",
        content: "shit and piss",
        size: 3,
      },
      {
        type: "text",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, odio! Deserunt quia error nostrum praesentium magni, totam voluptatum ad illo maxime nesciunt incidunt tempora laboriosam officiis quo omnis perferendis fuga! Facere nostrum illo aspernatur molestias corporis sed culpa dolores assumenda dolorum sequi natus unde veritatis quasi fugit, vitae ipsum ratione eos eveniet soluta laboriosam quam autem debitis! Facilis, iste praesentium! Aperiam iusto ipsum nulla dolores architecto ea voluptates odit, ex enim commodi. Magnam quia consectetur illo veniam expedita eveniet iste non optio, numquam repudiandae ab, aspernatur repellendus excepturi quas at!Mollitia aut quidem quo dolorum praesentium sit rerum, sapiente, omnis, numquam velit ipsam dolore delectus? Magni deserunt laudantium consequuntur ex tenetur ut facere natus aut! Nemo quas dolorem optio ut!Earum voluptatem incidunt obcaecati voluptates iure nostrum architecto quae alias minima illo dolores excepturi est inventore distinctio sunt, perspiciatis, praesentium aut numquam recusandae, consequatur consectetur. Esse sed itaque libero laudantium.Suscipit cumque laudantium rerum atque corporis quod incidunt repellendus libero, expedita maiores distinctio quisquam laborum nobis reprehenderit ad enim amet dolorem sunt eveniet dignissimos quaerat saepe ea quos esse? Provident!Odit similique nihil illum quibusdam dolorem mollitia! Exercitationem natus iusto reprehenderit nobis magnam illo dolorem, aliquam nihil voluptas id dolores voluptatibus beatae aut similique eaque perspiciatis numquam non in laboriosam.Cum accusamus dolores, esse nam ratione nostrum placeat nemo in? Quidem quo reiciendis officiis iste praesentium ea mollitia commodi et, sequi aliquam neque, animi sapiente odio. Minus consectetur inventore nobis!Iure quasi repudiandae minus consectetur molestias assumenda eaque repellendus possimus aut cum suscipit perspiciatis eveniet nesciunt est omnis, qui quidem consequatur nulla eligendi dignissimos doloremque? Quia incidunt dolores facere molestias!Eaque facere blanditiis distinctio minima veniam illum! Veritatis illo doloribus, fugiat corporis ex delectus culpa vero, expedita molestias quo quod, optio tenetur nobis nam. Omnis adipisci magni debitis aliquam accusantium?",
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
        content: "Fuck up cuba",
        size: 3,
      },
      {
        type: "text",
        content:
          "balls balls bacll Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, dolores. Inventore tempora, esse dolorum atque distinctio, dicta, obcaecati quaerat itaque nisi quae fugit nobis ea fuga ad dolor voluptatum aut.",
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

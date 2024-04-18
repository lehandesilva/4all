const { db } = require("@vercel/postgres");
const {
  users,
  courses,
  course_material,
  categories,
} = require("../app/lib/placeholder-data.js");

const bcrypt = require("bcryptjs");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE, 
                password TEXT NOT NULL
            );
        `;

    console.log("Created users table");

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id},${user.name},${user.email},${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
                `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return { createTable, users: insertedUsers };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}
async function seedCourses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS courses (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        instructor_id UUID REFERENCES users(id),
        instructor_name VARCHAR(255),
        category_id UUID REFERENCES categories(id),
        description TEXT,
        rating DECIMAL(2, 1),
        reviews JSONB [],
        sections JSONB [],
        img_url TEXT,
        CONSTRAINT fk_instructor_user FOREIGN KEY (instructor_id) REFERENCES users(id)
      );
    `;

    console.log("Created courses table");

    const insertedCourses = await Promise.all(
      courses.map(async (course) => {
        return client.sql`
          INSERT INTO courses (id, name, instructor_id, instructor_name, category_id, description, rating, reviews, sections ,img_url)
          VALUES (${course.id}, ${course.name}, ${course.instructor_id}, ${course.instructor_name}, ${course.categoryId}, ${course.description}, ${course.rating}, ${course.reviews}, ${course.sections}, ${course.img_url})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedCourses.length} courses`);

    return { createTable, courses: insertedCourses };
  } catch (error) {
    console.error("Error seeding courses:", error);
    throw error;
  }
}

async function seedCourseMaterial(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS course_material (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        course_id UUID REFERENCES courses(id),
        blocks JSONB [],
        CONSTRAINT fk_course_material FOREIGN KEY (course_id) REFERENCES courses(id)
      );
    `;

    console.log("Created course_material table");

    const insertedMaterial = await Promise.all(
      course_material.map(async (material) => {
        return client.sql`
          INSERT INTO course_material (id, course_id, blocks)
          VALUES (${material.id}, ${material.course_id}, ${material.blocks})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedMaterial.length} course materials`);

    return { createTable, material: insertedMaterial };
  } catch (error) {
    console.error("Error seeding course material:", error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        href TEXT NOT NULL
      );
    `;

    console.log("Created categories table");

    const insertedCategories = await Promise.all(
      categories.map(async (category) => {
        return client.sql`
          INSERT INTO categories (id, name, href)
          VALUES (${category.id}, ${category.name}, ${category.href})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return { createTable, categories: insertedCategories };
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCategories(client);
  await seedCourses(client);
  await seedCourseMaterial(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});

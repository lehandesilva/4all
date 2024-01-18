const { db } = require("@vercel/postgres");
const { users, courses } = require("../app/lib/placeholder-data.js");

const bcrypt = require("bcrypt");

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
        instructor_id UUID NOT NULL,
        description TEXT NOT NULL,
        course_material JSON,
        rating INT
    );
    `;

    console.log("Created courses table");

    const insertedCourses = await Promise.all(
      courses.map(
        (course) => client.sql`
            INSERT INTO courses (name, instructor_id, description, course_material, rating)
            VALUES (${course.name},${course.instructor_id},${course.description},${course.course_material},${course.rating})
            ON CONFLICT (id) DO NOTHING;
            `
      )
    );
    console.log(`Seeded ${insertedCourses.length} courses`);

    return {
      createTable,
      courses: insertedCourses,
    };
  } catch (error) {
    console.error("Error seeding courses:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCourses(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});

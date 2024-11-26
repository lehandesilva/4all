# 4all - A community driven free e-Learning platform

## This project is still in development

## Tech Stack and libraries/frameworks used

- Backend - NodeJs, ExpressJs, JWT, bcrypt, Drizzle-Orm
- Frontend - NextJs, TailwindCss, zod-validation
- Storage - PostgreSQL, Redis, AWS S3
- Infrastructure - AWS ECS with EC2 lauch type, AWS Amplify, AWS RDS, AWS ElastiCache, AWS S3, AWS Application Load Balancer, Docker
- CICD - Github Actions

## Project Features

- Course Creation: Users can create and publish courses in blog or video format.
- Authentication and Security: Implemented secure user authentication with bcryptjs for password hashing, JWT for session management, and HTTP-only cookies for added security.
- File Storage: Integrated Amazon S3 for file storage, with robust validation of file size and format during uploads, and utilized signed URLs to ensure secure access to stored content.
- Role-Based Access Control: Restricted access to certain actions based on user roles (e.g., admin vs. regular user).
- Caching: Integrated Redis for caching frequently accessed courses to improve performance.
- Database Management: Used PostgreSQL as the database, managed schema with Drizzle ORM, and implemented efficient querying.
- Scalability: Designed a backend API deployed using Docker containers on AWS ECS with a PostgreSQL database hosted on RDS.
- Deployment Pipeline: Built CI/CD pipelines using GitHub Actions to streamline deployment.
- Input Validation: Used Zod for comprehensive user input validation to maintain data integrity and prevent invalid or malicious data.
- Load Balancing: Configured an Application Load Balancer (ALB) to distribute backend traffic effectively.
- Production-Ready Infrastructure: Deployed on AWS with best practices for scalability, reliability, and performance.

## Future Improvements

- Implementing JWT refresh tokens for long-term authentication.
- Adding a search feature for course discovery.
- Implementing NLP for course content analysis.
- Adding quiz functionality for interactive learning.

import { NextFunction, Request, Response } from "express";
import {
  deleteCourseService,
  insertNewCourse,
  insertNewSectionIntoSectionTable,
  insertSectionIntoCourseTable,
  queryCourseInstructorFromCourseId,
  queryCoursesFromInstructorById,
  querySectionsOfCourse,
  updateCoursePrivate,
  updateCoursePublic,
  updateCourseTable,
  updateSectionInSectionsTable,
} from "../services/users";
import { block } from "../../../shared/definitions";
import redisClient from "../redis/redis";

export async function getCoursesFromInstructorById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userid } = req.params;
  if (req.user?.id !== userid) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const result = await queryCoursesFromInstructorById(userid);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteCourseById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { courseId } = req.params;
  try {
    const result = await queryCourseInstructorFromCourseId(courseId);

    if (req.user?.id !== result[0].instructor_id) {
      res.status(403).json({ message: "Forbidden" });
    }

    await deleteCourseService(courseId);

    await redisClient.del("courses");

    return res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNewCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description, url, category } = req.body;

    const result = await insertNewCourse(
      name,
      description,
      req.user?.id!,
      req.user?.name!,
      url,
      category
    );

    await redisClient.del("courses");

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNewSection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const sectionName: string = req.body.sectionName;
    const blocks: block[] = req.body.blocks;
    const courseId: string = req.params.courseId;

    const newSectionId = await insertNewSectionIntoSectionTable(
      userId!,
      sectionName,
      blocks
    );

    const sections = await querySectionsOfCourse(courseId);

    const newSectionList =
      sections !== null
        ? [...sections, { id: newSectionId, name: sectionName }]
        : [{ id: newSectionId, name: sectionName }];

    await insertSectionIntoCourseTable(newSectionList, courseId);

    return res.status(201).json({ sectionId: newSectionId });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateSection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sectionName: string = req.body.sectionName;
    const blocks: block[] = req.body.blocks;
    const courseId: string = req.params.courseId;
    const sectionId: string = req.params.sectionId;

    await updateSectionInSectionsTable(sectionName, blocks, sectionId);
    const sections = await querySectionsOfCourse(courseId);

    const newSectionList = sections?.map((section) => {
      if (section.id === sectionId) {
        section.name = sectionName;
      }
      return section;
    });

    await insertSectionIntoCourseTable(
      newSectionList ? newSectionList : null,
      courseId
    );

    return res.status(200).json({ sectionId: sectionId });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateCourseDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const courseId = req.params.courseId;
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;

    await updateCourseTable(name, description, url, courseId);

    await redisClient.del("courses");

    return res.status(200).json({ courseId: courseId });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function makeCoursePrivate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const courseId = req.params.courseId;

    await updateCoursePrivate(courseId);

    await redisClient.del("courses");

    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function makeCoursePublic(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const courseId = req.params.courseId;

    await updateCoursePublic(courseId);

    await redisClient.del("courses");

    return res.status(200);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let students;
  if (query.matricNumber) {
    students = await prisma.student.find({
      matricNumber: String(query.matricNumber),
    });
  } else if (query.level) {
    students = await prisma.student.find({
      level: String(query.level),
    });
  }

  return students;
});

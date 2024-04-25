import { prisma } from "../../prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let students;

  try {
    if (query.matricNumber) {
      students = await prisma.student.findUnique({
        where: {
          matricNumber: String(query.matricNumber),
        },
        include: {
          Visits: true,
          NextOfKin: true,
        },
      });
    } else if (query.level) {
      students = await prisma.student.findMany({
        where: {
          level: query.level,
        },
      });
    } else {
      students = await prisma.student.findMany();
    }
  } catch (error) {
    console.log(error);
  }

  return students;
});

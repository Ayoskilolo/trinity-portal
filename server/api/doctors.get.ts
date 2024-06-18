import { prisma } from "../../prisma/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let doctors;

  try {
    if (query.status) {
      doctors = await prisma.doctor.findMany({
        where: {
          status: query.status,
        },
      });
    } else {
      doctors = await prisma.doctor.findMany();
    }
  } catch (error) {
    console.log(error);
  }

  return doctors;
});

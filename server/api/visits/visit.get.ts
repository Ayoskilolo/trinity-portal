import { prisma } from "../../../prisma/db";

export default eventHandler(async (event) => {
  const query = getQuery(event);

  let visits;
  if (query.studentId) {
    const formattedDate = new Date(String(query.dateFilter));
    visits = await prisma.visits.findMany({
      where: {
        studentId: String(query.studentId),
      },
    });
  }

  if (query.doctorId) {
    visits = await prisma.visits.findMany({
      where: {
        doctorId: String(query.doctorId),
      },
    });
  }

  return visits;
});

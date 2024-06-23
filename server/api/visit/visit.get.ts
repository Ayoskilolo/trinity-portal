import { prisma } from "../../../prisma/db";

export default eventHandler(async (event) => {
  const query = getQuery(event);
  let visits;

  if (query.visitId) {
    visits = await prisma.visits.findUnique({
      where: {
        id: String(query.visitId),
      },
      include: {
        Doctor: true,
        Student: true,
      },
    });
  }

  if (query.matricNumber) {
    const formattedDate = new Date(String(query.dateFilter));
    visits = await prisma.visits.findMany({
      where: {
        studentId: String(query.matricNumber),
      },
      include: {
        Doctor: true,
        Student: true,
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

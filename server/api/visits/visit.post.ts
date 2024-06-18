import { prisma } from "../../../prisma/db";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const { datePicked, studentId, doctorId, ...visitInfo } = body;
  let newVisit;

  if (body) {
    try {
      // const Student = await prisma.student.findUnique({
      //   where: {
      //     matricNumber: String(studentId),
      //   },
      // });

      // const Doctor = await prisma.doctor.findUnique({
      //   where: {
      //     id: doctorId,
      //   },
      // });

      newVisit = await prisma.visits.create({
        data: {
          ...visitInfo,
          Student: {
            connect: {
              matricNumber: studentId,
            },
          },
          Doctor: {
            connect: {
              id: doctorId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return newVisit;
});

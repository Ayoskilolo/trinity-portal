import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.password || !body.role) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing Required Fields",
    });
  }

  const { email, userName } = body;

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(body.password, salt);
  let newUser;

  switch (body.role) {
    case "student":
      const { userName, role, email, dateOfBirth, password, ...studentData } =
        body;
      newUser = await prisma.student.create({
        data: {
          dateOfBirth: new Date(dateOfBirth),
          password: hashedPassword,
          ...studentData,
        },
      });
    case "doctor":
      const { firstName, lastName } = body;
      newUser = await prisma.doctor.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });
    case "nurse":
      newUser = await prisma.nurse.create({
        data: { email, userName, password: hashedPassword },
      });
  }

  return { ...newUser, password: undefined };
});

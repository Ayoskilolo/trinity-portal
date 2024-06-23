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

  const userEmail = email;
  const name = userName;

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
      break;
    case "doctor":
      const { firstName, lastName } = body;
      try {
        newUser = await prisma.doctor.create({
          data: {
            email: userEmail,
            firstName,
            lastName,
            password: hashedPassword,
            status: "ON_SEAT",
          },
        });
      } catch (error) {
        console.log(error);
      }

      break;
    case "nurse":
      console.log(userEmail);
      console.log(name);
      console.log(hashedPassword);
      console.log("iran");
      newUser = await prisma.nurse.create({
        data: { email: userEmail, userName: name, password: hashedPassword },
      });
      break;
  }

  return { ...newUser, password: undefined };
});

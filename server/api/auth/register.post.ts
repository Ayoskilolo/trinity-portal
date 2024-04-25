import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.userName || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing Required Fields",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(body.password, salt);

  const user = await prisma.user.create({
    data: { ...body, password: hashedPassword },
  });

  return { ...user, password: undefined };
});

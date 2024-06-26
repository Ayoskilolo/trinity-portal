import { prisma } from "../../../prisma/db";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (body.id) {
      console.log(body);
      await prisma.visits.update({
        where: {
          id: String(body.id),
        },
        data: {
          ...body,
        },
      });
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
});

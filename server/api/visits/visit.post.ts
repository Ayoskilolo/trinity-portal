export default eventHandler(async (event) => {
  const body = await readBody(event);

  if (body) {
    console.log(body);
  }
});

export default eventHandler(async (event) => {
  const query = getQuery(event);

  let visits;
  if (query.dateFilter) {
    const formattedDate = new Date(String(query.dateFilter));
    visits = await visitsSchema.find({
      dateOfVisit: formattedDate,
    });
  } else {
    visits = await visitsSchema.find({
      dateOfVisit: new Date(),
    });
  }

  const formattedVisits = visits.forEach((visit) => {
    return visit.toObject;
  });
});

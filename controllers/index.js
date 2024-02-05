const promptContactsRoute = (req, res) => {
  res.send(
    `Add '/contacts' to the url to view contacts, or '/api-docs' for API documentation!`,
  );
};
module.exports = { promptContactsRoute };

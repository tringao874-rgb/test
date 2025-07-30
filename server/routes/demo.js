const handleDemo = (req, res) => {
  const response = {
    message: "Hello from the server! This is a demo API endpoint.",
  };
  res.json(response);
};

module.exports = {
  handleDemo,
};

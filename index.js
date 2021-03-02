const app = require("./app");
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  let files = [];
  const objects = fs.readdirSync("./bins");
  if (objects.length === 0) {
    res.send("you have no objects");
  } else {
    try {
      for (let object of objects) {
        files.push(JSON.parse(fs.readFileSync(`./bins/${object}`)));
      }
      const successMessage = {
        success: true,
        data: files,
      };
      res.status(200).send(successMessage);
    } catch (error) {
      res.status(500).send("there is a problem with the server " + error);
    }
  }
});

// get a specific object by id
app.get("/b/:id", (req, res) => {
  if (!fs.existsSync(`./bins/${req.params.id}.json`)) {
    res.status(400).send(`{
            "success": false,
            "message": "Invalid Bin Id provided"
        }`);
  } else {
    fs.readFile(`./bins/${req.params.id}.json`, (err, data) => {
      if (err) {
        res.status(500).send("there is a problem with the server " + err);
      } else {
        const body = JSON.parse(data);
        const successMessage = {
          success: true,
          data: body,
        };

        res.status(200).send(successMessage);
      }
    });
  }
});

//update specific object by id
app.put("/:id", (req, res) => {
  const { body } = req;
  body.id = req.params.id;
  if (!fs.existsSync(`./bins/${req.params.id}.json`)) {
    res.status(400).send(`{
            "success": false,
            "message": "Bin id not found"
        }`);
  } else {
    fs.writeFile(
      `./bins/${req.params.id}.json`,
      JSON.stringify(body, null, 4),
      (err) => {
        if (err) {
          res.status(500).send("there is a problem with the server " + err);
        } else {
          const successMessage = {
            success: true,
            data: body,
            version: 1,
            parentId: req.params.id,
          };
          res.status(200).send(successMessage);
        }
      }
    );
  }
});

//creating new file with new object
app.post("/", (req, res) => {
  const { body } = req;
  const id; // short url
  if (Object.keys(body).length === 0) {
    res.status(400).send(`{
            "success": false,
            "message": "Bin cannot be blank"
        }`);
  }
  body.id = id;
  fs.writeFile(`./bins/${id}.json`, JSON.stringify(body, null, 4), (err) => {
    if (err) {
      res.status(500).send("there is a problem with the server " + err);
    } else {
      const successMessage = {
        success: true,
        data: body,
        version: 1,
        parentId: id,
      };
      console.log(body);
      res.status(200).send(successMessage);
    }
  });
});

//deleting specific file by id
app.delete("/b/:id", (req, res) => {
  const id = req.params.id;
  if (!fs.existsSync(`./bins/${req.params.id}.json`)) {
    res.status(400).send(`{
            "success": false,
            "message": "Bin id not found"
        }`);
  } else {
    fs.unlink(`./bins/${id}.json`, (err) => {
      if (err) {
        res.status(500).send("there is a problem with the server " + err);
      } else {
        res
          .status(200)
          .send({ success: true, message: "bin deleted successfully" });
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

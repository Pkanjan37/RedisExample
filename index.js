const express = require("express");
const dotnev = require("dotenv");
const redis = require("redis");
const axios = require("axios");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});
client.connect();
client["auth"] = null;
dotnev.config();

const app = express();
const port = 3000;

app.get("/api", async (req, res) => {
  const exist = await isExist(req.query.query);
  if (exist) {
    console.log("Redis");
    const response = await client.get(req.query.query);
    console.log(response);
    res.status(200);
    res.send(JSON.parse(response));
  } else {
    console.log("API");
    axios
      .get(
        "https://deelay.me/5000/https://api.agify.io?name=" + req.query.query
      )
      .then(function (response) {
        // handle success
        client.set(req.query.query, JSON.stringify(response.data));
        res.status(200);
        res.send(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
});

async function isExist(query) {
  const value = await client.get(query);
  if (value) {
    return true;
  } else {
    return false;
  }
}

app.get("/", (req, res) => {
  client.get("foo", (err, reply) => {
    if (err) throw err;
    console.log(reply);
  });
  res.send("Express + TypeScript Server");
});

app.post("/create", (req, res) => {
  PostModel.create({
    title: "Some Title",
    subtitle: "Some Subtitle",
    content: "Some Content",
  })
    .then((result) => {
      return res.json({
        message: "Record created successfully!",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        message: "Unable to create a record!",
      });
    });
});

app.get("/get-all", (req, res) => {
  PostModel.findAll({
    attributes: ["id", "title"],
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        message: "Unable to fetch records!",
      });
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

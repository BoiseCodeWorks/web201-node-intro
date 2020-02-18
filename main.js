import express from "express";
import { json } from "body-parser";
import { BadRequest } from "./errors";
import { Cat } from "./models/Cat";

let server = express();
let port = 8080;

let felix = new Cat({
  name: "Felix The Cat",
  age: 95
});

let cats = [felix];

server.use(json());
server.use(express.static(__dirname + "/client"));

server.get("/api/cats", (req, res, next) => {
  res.send(cats);
});

server.get("/api/cats/:catId", (req, res, next) => {
  try {
    let id = req.params.catId;
    let cat = cats.find(c => c.id.toString() == id);

    if (!cat) {
      throw new BadRequest("[Invalid Id] no cat found at id " + id);
    }

    res.send(cat);
  } catch (e) {
    next(e);
  }
});

server.post("/api/cats", (req, res, next) => {
  // where is the data coming in?
  // what data is coming in and is it valid?
  // where do I put the new data
  // what do I return

  try {
    let newCat = new Cat(req.body);
    cats.push(newCat);
    res.status(201).send({
      path: "/api/cats/" + newCat.id,
      result: newCat
    });
  } catch (e) {
    next(e);
  }
});

// default error handler
server.use((error, req, res, next) => {
  if (error.status == 500) {
    console.log("this was something bad on my part"); // should be logged to an external system
  }
  res.status(error.status).send(error.message);
});

server.use((req, res, next) => {
  res.sendFile("./client/404/index.html");
});

server.listen(port, () => {
  console.log("The server is running on port ", port);
});

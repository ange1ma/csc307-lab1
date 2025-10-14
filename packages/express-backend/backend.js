// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("testing mongoose :P");
});

const idGenerator = () => {
  return Math.round(Math.random() * 1000000);
};

// console.log(idGenerator());

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userServices
    .getUsers(name, job)
    .then((users) => res.json({users_list: users}))
    .catch((error) => {
      console.log(error);
    });
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let user = findUserById(id);
  if (user === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    users.users_list = users.users_list.filter(user => user.id !== id); res.status(204).send();
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = idGenerator().toString()
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

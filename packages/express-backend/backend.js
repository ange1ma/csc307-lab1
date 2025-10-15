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

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices
    .findUserById(id)
    .then((user) => {
      if (!user ) {
        res.status(404).send("Resource not found.")
      }
      res.send(user)
    })
    .catch((error) => {
      console.log(error)
    })
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

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = idGenerator().toString()
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const jwt = require('jsonwebtoken')

const projectRouter = require("express").Router();
const Project = require("../models/project");
const Grouppage = require("../models/grouppage");
const Baipost = require("../models/baipost");
const User = require("../models/user");

//Authentication
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
// GET /projects
// get all projects
projectRouter.get("/projects/:uid", (request, response) => {
  Project.find({ user: request.params.uid })
    .populate("user")
    .then((pro) => {
      response.json(pro);
    });
});

// POST /projects
// create new project
projectRouter.post("/projects", async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, "abc")
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const newProject = new Project({
    name: request.body.name,
    user: user._id,
  });
  newProject.save().then((newPro) => {
    response.json(newPro);
  });
});

// DELETE /projects/:pid
// delete project
async function deleteBaipostRef({ deleteGroupArray }) {
  console.log(deleteGroupArray);
  deleteGroupArray.forEach(async function (Group) {
    await Baipost.deleteMany({ grouppage: Group._id });
  });
}
projectRouter.delete("/projects/:pid", async (request, response, next) => {
  let deleteGroupArray = await Grouppage.find({ project: request.params.pid });
  await deleteBaipostRef({ deleteGroupArray });
  await Grouppage.deleteMany({ project: request.params.pid });
  Project.findByIdAndRemove(request.params.pid)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = projectRouter;

const grouppageRouter = require("express").Router();
const Project = require("../models/project");
const Grouppage = require("../models/grouppage");
const Baipost = require("../models/baipost");

// GET /grouppages
// get all grouppages
grouppageRouter.get("/grouppages", (request, response) => {
  Grouppage.find({})
    .populate("project")
    .then((gp) => {
      response.json(gp);
    });
});

// POST /projects/:pid
// create new grouppage
grouppageRouter.post("/projects/:pid", async (request, response) => {
  const pid = request.params.pid;
  const project = await Project.findOne({ _id: pid });
  let newName = request.body.name;
  let newID = request.body.group_id;
  const newGrouppage = new Grouppage();
  newGrouppage.name = newName;
  newGrouppage.group_id = newID;
  newGrouppage.project = project;
  newGrouppage.save().then((newGP) => {
    response.json(newGP);
  });
});

// DELETE /grouppages/:gid
// delete grouppage
grouppageRouter.delete("/grouppages/:gid", async (request, response) => {
  const { gid } = request.params;
  await Baipost.deleteMany({ grouppage: gid });
  Grouppage.findByIdAndRemove(gid)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = grouppageRouter;

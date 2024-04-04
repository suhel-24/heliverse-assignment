const express=require('express')
const router = express.Router();

const {
    createTeam,
    getTeamById,
    getTeams,
  } =require("../controller/teamController")
  
  
  router.post("/", createTeam);
  router.get("/all", getTeams);
  router.get("/:id", getTeamById);

module.exports=router;
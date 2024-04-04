import React, { useEffect } from "react";
import Searchbar from "../components/Searchbar";
import Search from "../icons/Search";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMember, clearAll } from "../context/teamContext";

const inactiveClass =
  "w-auto md:h-44 cursor-pointer flex mr-2 flex-col items-center justify-between gap-2 border border-gray-100 border-opacity-10 rounded-md md:mr-4 p-2 md:p-4 hover:shadow-xl transition duration-300 ease-in-out";
const activeClass =
  "w-auto md:h-44 bg-slate-500 rounded-xl mr-2 p-2 md:p-4 flex flex-col items-center justify-between gap-2 md:mr-4 hover:shadow-xl cursor-pointer";

const x = [
  "left-0",
  "left-7",
  "left-14",
  "left-21",
  "left-28",
  "left-35",
  "left-42",
  "left-49",
  "left-56",
  "left-5",
  "left-10",
  "left-15",
  "left-20",
  "left-25",
  "left-30",
  "left-35",
  "left-40",
  "left-45",
  "left-50",
  "left-55",
  "left-60",
  "left-65",
  "left-70",
  "left-80",
  "left-90",
  "left-100",
  "z-0",
  "z-1",
  "z-2",
  "z-3",
  "z-4",
  "z-5",
  "z-6",
  "z-7",
  "z-8",
];

const Team = () => {
  const [teams, setTeams] = React.useState([]);
  const dispatch = useDispatch();
  const [teamId, setTeamId] = React.useState("");

  const [active, setActive] = React.useState(0);

  useEffect(() => {
    const getTeam = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/team/all"
      );
      const data = await response.data;
      setTeams(data);
    };
    getTeam();
  }, []);

  const getTeamById = async () => {
    if (teamId === "") return;

    const response = await axios.get(
      `http://localhost:3000/api/team/${teamId}`
    );
    const data = await response.data;
    setTeams([data]);
  };

  return (
    <div className="bg-[#32353F] h-full w-full px-4 md:py-3 flex flex-col ">
      <div className="flex items-center gap-3">
        <input
          className="bg-transparent rounded-full my-3 md:my-5 w-[80%] md:w-[40%] h-10 
           py-2 pl-4 pr-2 border border-gray-100 border-opacity-10 
    focus:outline-none focus:ring-2 focus:ring-opacity-50
     text-white placeholder-gray-400
  "
          type="text"
          placeholder="Enter Your Team Code"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
        />
        <button
          onClick={getTeamById}
          className="
  text-black flex items-center justify-center
  bg-slate-100  rounded-full h-[30px] w-[30px] focus:outline-none focus:ring-0 focus:ring-opacity-50 placeholder-gray-400"
        >
          <Search />
        </button>
      </div>
      <h1
        className="
        font-bold text-xl md:text-2xl mb-4 text-white
      "
      >
        {teamId === "" ? "All Teams" : "Your Team"}
      </h1>
      <div
        className="grid grid-cols-2 md:grid-cols-4 
      text-white gap-y-2 md:gap-2 overflow-y-scroll"
      >
        {teams.map((team, index) => (
          <div
            key={team._id}
            className={index == active ? activeClass : inactiveClass}
            onClick={() => {
              console.log(team.members);
              dispatch(clearAll());
              team.members.map((member) => dispatch(addMember(member)));
              setActive(index);
            }}
          >
            <div className="text-sm md:text-base">
              <span
                className={
                  index == active ? "font-bold " : "text-blue-500 font-bold"
                }
              >
                Active Members :{" "}
              </span>
              {team.members?.length}
            </div>
            <div
              className="h-10  mx-auto 
            flex items-center justify-center"
            >
              {team.members.length > 4
                ? team.members.slice(0, 4).map((member) => (
                    <img
                      key={member._id}
                      className={`rounded-full h-10 w-10  border-2 bg-slate-300
                   ${
                     active == index ? " border-slate-700" : " border-slate-500"
                   }
             `}
                      src={member.avatar}
                      alt=""
                    />
                  ))
                : team.members.map((member) => (
                    <img
                      key={member._id}
                      className={`rounded-full h-10 w-10  border-2 bg-slate-300
     ${active == index ? " border-slate-700" : " border-slate-500"}
`}
                      src={member.avatar}
                      alt=""
                    />
                  ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center my-2">
              {team.domains.length > 4
                ? team.domains.slice(1, 4).map((domain, index2) => (
                    <div
                      key={index2}
                      className={
                        active == index
                          ? "bg-slate-900 text-center text-xs rounded-full  px-2 py-1"
                          : "text-center text-xs text-stone-800 bg-slate-400 rounded-full  px-2 py-1"
                      }
                    >
                      {domain}
                    </div>
                  ))
                : team.domains.map((domain, index2) => (
                    <div
                      key={index2}
                      className={
                        active == index
                          ? "bg-slate-900 text-center text-xs rounded-full  px-2 py-1"
                          : "text-center text-xs text-stone-800 font-semibold bg-slate-400 rounded-full  px-2 py-1"
                      }
                    >
                      {domain}
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

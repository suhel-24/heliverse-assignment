import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember, clearAll } from "../context/teamContext";
import EyeClosed from "../icons/EyeClosed";
import EyeOpen from "../icons/EyeOpen";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Profile = () => {
  const path = window.location.pathname;
  const teamMembers = useSelector((state) => state.teamState.members);
  const dispatch = useDispatch();
  const [success, setSuccess] = React.useState(false);
  const [teamCode, setTeamCode] = React.useState("teamcode");

  useEffect(() => {
    setSuccess(false);
  }, [window.location.pathname == "/team"]);

  const createTeam = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/team/",
      {
        memberIds: teamMembers.map((member) => member.id),
      }
    );
    const data = await response.data;
    console.log(data);

    if (response.status == 201) {
      setTeamCode(data._id);
      console.log(teamCode);
      toast.success("Team Created Successfully");
      setSuccess(true);
      dispatch(clearAll());
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="
    w-full pb-6 mb-6
    md:flex flex-col
    md:w-full md:bg-[#1E212A] text-blue-500 h-full px-4 py-4"
    >
      <h1
        className="text-xl font-bold
      "
      >
        {path == "/team" ? "Member Details" : "Add Members To Your Team"}
      </h1>
      {teamMembers.length == 0 ? (
        <div className="flex flex-col md:h-full items-center mt-12 md:mt-32">
          <img
            src={
              success
                ? "https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png"
                : "https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp"
            }
            alt=""
            height={success ? 150 : 250}
            width={success ? 150 : 250}
          />
          <p className="mt-4">
            {success ? "Team Created Successfully" : "No Members Added"}
          </p>
        </div>
      ) : (
        <div className="mt-5 h-[85%] md:overflow-y-scroll">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between py-2 px-2 border
               border-gray-100 border-opacity-10 rounded-lg mb-2 mr-3"
            >
              <span className="basis-[60%]  ml-2 flex items-center justify-start gap-3 ">
                <img
                  src={member.avatar}
                  height={60}
                  width={60}
                  className="rounded-md bg-gray-200"
                  alt={`user-{user.id}`}
                />{" "}
                <div className="">
                  <p>
                    {member.first_name} {member.last_name}
                  </p>
                  <p className="text-xs text-gray-400">{member.domain}</p>
                  <p>
                    {member.available ? (
                      <span className="flex items-center gap-2 text-green-400 text-xs font-bold">
                        <EyeOpen />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-400 text-xs font-bold">
                        <EyeClosed />
                        Not Available
                      </span>
                    )}
                  </p>
                </div>
              </span>
              <button
                className="basis-
    flex items-center justify-center
    bg-white h-6  p-2 rounded-full text-black hover:bg-gray-100  font-semibold py-1 px-2  shadow
  "
                onClick={() => dispatch(removeMember(member.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {teamMembers.length > 0 && (
        <button
          className="md:mt-auto w-full mt-5  mb-12
    flex items-center justify-center
    bg-white h-10  p-2 rounded-md text-black
     hover:bg-gray-100  font-semibold py-5 md:py-1 px-2  shadow
  "
          onClick={createTeam}
        >
          Save Team
        </button>
      )}
      {success && (
        <div className="flex flex-col gap-4 mb-2 mt-20 md:mt-0">
          <button
            className="mt-auto basis-
    flex items-center justify-center
    bg-white h-10  p-2 rounded-md text-black hover:bg-gray-100  font-semibold py-1 px-2  shadow
  "
            onClick={() => {
              navigator.clipboard.writeText(teamCode);
              toast.success("Team Code Copied to Clipboard");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
            Copy Team Code
          </button>
          <button
            className="mt-auto basis-
    flex items-center justify-center
    bg-green-500 text-white h-10  p-2 rounded-md  hover:bg-gray-100  font-semibold py-1 px-2  shadow
  "
            onClick={() => {
              setSuccess(false);
            }}
          >
            Create Another Team
          </button>
        </div>
      )}
      <div className="h-[4px] md:hidden"></div>
    </div>
  );
};

export default Profile;

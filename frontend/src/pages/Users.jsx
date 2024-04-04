import axios from "axios";
import React, { useEffect } from "react";
import UserCard from "../components/UserCard";
import Searchbar from "../components/Searchbar";
import { Bars } from "react-loader-spinner";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [gender, setGender] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      //https://heliverse-assignment-production.up.railway.app
      const response = await axios.get(
        "http://localhost:3000/api/users/"
      );
      const data = await response.data;
      setUsers(data.users);
      setTotalUsers(data.totalLength);
      setLoading(false);
    };

    getAllUsers();
  }, []);

  const getUsers = async () => {
    let baseUrl = `http://localhost:3000/api/users?page=${currentPage}`;
    if (name !== "") baseUrl += `&name=${name}`;
    if (status !== "") baseUrl += `&available=${status}`;
    if (domain !== "") baseUrl += `&domain=${domain}`;
    if (gender != null) baseUrl += `&gender=${gender}`;
    setLoading(true);
    const response = await axios.get(baseUrl);
    const data = await response.data;
    setUsers(data.users);
    setTotalUsers(data.totalLength);
    setLoading(false);
  };

  return (
    <div className="bg-[#32353F] h-full w-full px-4 py-3 ">
      <Searchbar
        status={status}
        setStatus={setStatus}
        domain={domain}
        setDomain={setDomain}
        name={name}
        setName={setName}
        gender={gender}
        setGender={setGender}
        getUsers={getUsers}
      />
      {/* header */}
      <div
        className="mt-4 md:mt-0 flex items-center justify-around 
      py-2 md:px-3 border border-gray-100 border-opacity-10 "
      >
        <span className="w-[80%] md:basis-[40%]  ml-2 flex items-center justify-start gap-3 mx-3 ">
          <input
            type="checkbox"
            className="mr-8 ml-2 md:ml-1 h-4 w-4 accent-slate-100 rounded-sm 
                focus:outline-none focus:ring-2 focus:ring-opacity-50 
                bg-transparent cursor-pointer"
          />
          <p className="text-xs text-gray-400">Name</p>
        </span>

        <div className="mr-8 md:mr-0 md:basis-[20%]">
          <p className="text-xs text-gray-400">Status</p>
        </div>

        <p
          className="hidden md:flex md:basis-[30%] text-start text-xs
         text-gray-400"
        >
          Email
        </p>
      </div>
      <div
        className="bg-[#32353F] h-[80%] flex-grow text-white 
      overflow-y-scroll"
      >
        {users.length > 0 ? (
          users.map((user) => <UserCard user={user} key={user._id} />)
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <Bars
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p>Please wait!</p>
          </div>
        )}
      </div>
      <div className="w-full mt-3 pb-4 md:pb-0">
        <div className="w-full mx-auto">
          {totalUsers > 20
            ? [...Array(Math.floor(totalUsers / 20))].map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    getUsers();
                  }}
                  className={`w-9 px-2 text-center border border-gray-100 border-opacity-10 text-white ${
                    index + 1 == currentPage ? "bg-black" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))
            : [...Array(Math.ceil(totalUsers / 20))].map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    getUsers();
                  }}
                  className={`w-9 px-2 text-center border border-gray-100 border-opacity-10 text-white ${
                    index + 1 == currentPage ? "bg-black" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Users;

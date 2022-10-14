import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "../src/services/service";
import {
  checkForEmptyKeys,
  checkEmail,
} from "../src/services/InputsNullChecker";

const Team = (props) => {
  const router = useRouter();
  const [teamList, setTeamList] = useState([]);

  const [teamdata, setteamdata] = useState({
    id: "",
    file: "",
  });

  useEffect(() => {
    getAllMatch();
  }, []);

  const createTeam = () => {
    console.log(teamdata);

    let { anyEmptyInputs, errorString } = checkForEmptyKeys(teamdata);
    console.log(errorString);
    if (anyEmptyInputs.length > 0) {
      props.toaster({ type: "error", message: errorString });
      return;
    }

    const data = new FormData();
    data.append("id", teamdata.id);
    data.append("file", teamdata.file);

    Api("post", "jobs/uploadTeam", data, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          setteamdata({
            id: "",
            file: "",
          });
        }
        props.loader(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
      }
    );
  };

  const getAllMatch = () => {
    const userDetail = JSON.parse(localStorage.getItem("userDetail"));
    const data = { id: userDetail.id };
    Api("post", "jobs/getAllMatch", data, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          setTeamList(res.data.matchList);
        }
        props.loader(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
      }
    );
  };

  return (
    <div className=" min-h-screen bg-black md:-mt-16 overflow-x-auto">
      <div className="pt-20 pb-5 px-5">
        <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
          <div>
            <p className="text-white font-bold md:text-3xl text-lg">Team</p>
          </div>
        </div>
        <div className=" border-2 border-red-700 rounded-sm p-5">
          <div>
            <p className="text-white text-lg font-semibold mt-1">
              {" "}
              Select Match
            </p>
            <select
              value={teamdata.id}
              onChange={(text) => {
                setteamdata({ ...teamdata, id: text.target.value });
              }}
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-52"
            >
              <option value="">Select match</option>
              {teamList.map((match) => (
                <option key={match._id} value={match._id}>
                  {match.teamA} vs {match.teamB}
                </option>
              ))}
            </select>
            <p className="text-white text-lg font-semibold mt-1">
              {" "}
              Upload Photo
            </p>
            <input
              onChange={(e) => {
                console.log(e.target.files[0]);
                setteamdata({ ...teamdata, file: e.target.files[0] });
              }}
              type="file"
              className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-full"
            />
            <div className="flex justify-end mt-4">
              <button
                className="text-white bg-red-700 rounded-sm  text-md py-21 w-32 h-10"
                onClick={() => {
                  createTeam();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

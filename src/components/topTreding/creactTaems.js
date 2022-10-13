import React, { useState } from "react";
import { Api } from "../../services/service";
import { useRouter } from "next/router";

const CreactTaems = (props) => {
  const router = useRouter();
  const [matchdata, setmatchdata] = useState({
    seriesName: "",
    teamA: "",
    teamB: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const creatematch = () => {
    console.log(matchdata);
    props.loader(true);
    Api("post", "jobs/createMatch", matchdata, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          props.setShowForm(false);
          setmatchdata({
            seriesName: "",
            teamA: "",
            teamB: "",
            startDate: "",
            endDate: "",
            location: "",
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

  return (
    <div className=" bg-black overflow-x-auto">
      <div className="pt-20 pb-5 px-5">
        <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
          <div>
            <p className="text-white font-bold md:text-3xl text-lg">
              {props.title}
            </p>
          </div>
        </div>

        <div className=" border-2 border-red-700 rounded-sm p-5">
          <div className="grid md:grid-cols-2 grid-cols-1 items-start">
            <div className="grid grid-cols-1 md:mr-2">
              <p className="text-white text-lg font-semibold mt-1">
                {" "}
                Series Name
              </p>
              <input
                placeholder="Enter Series Name"
                value={matchdata.seriesName}
                onChange={(text) => {
                  console.log(text);
                  setmatchdata({
                    ...matchdata,
                    seriesName: text.target.value,
                  });
                }}
                className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
              />
            </div>
            <div className="grid grid-cols-1 md:mr-2">
              <p className="text-white text-lg font-semibold mt-1"> Location</p>
              <input
                placeholder="Enter Location"
                value={matchdata.location}
                onChange={(text) => {
                  console.log(text);
                  setmatchdata({ ...matchdata, location: text.target.value });
                }}
                className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
              />
            </div>
            <div className="grid grid-cols-1 md:mr-2">
              <p className="text-white text-lg font-semibold mt-1">
                {" "}
                Start Date
              </p>
              <input
                value={matchdata.startDate}
                onChange={(text) => {
                  console.log(text);
                  setmatchdata({ ...matchdata, startDate: text.target.value });
                }}
                type="date"
                className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
              />
            </div>
            <div className="grid grid-cols-1 md:mr-2">
              <p className="text-white text-lg font-semibold mt-1"> End Date</p>
              <input
                value={matchdata.endDate}
                onChange={(text) => {
                  console.log(text);
                  setmatchdata({ ...matchdata, endDate: text.target.value });
                }}
                type="date"
                className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 items-start">
            <div className="grid grid-cols-1 md:mr-2">
              <p className="text-white text-lg font-semibold mt-1">Team A</p>
              <input
                value={matchdata.teamA}
                placeholder="Enter Team A"
                onChange={(text) => {
                  console.log(text);
                  setmatchdata({ ...matchdata, teamA: text.target.value });
                }}
                className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
              />
            </div>

            <div className="grid grid-cols-1 md:mr-2">
              <p className="text-white text-lg font-semibold mt-1">Team B</p>
              <input
                value={matchdata.teamB}
                placeholder="Enter Team B"
                onChange={(text) => {
                  console.log(text);
                  setmatchdata({ ...matchdata, teamB: text.target.value });
                }}
                className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="text-white bg-red-700 rounded-sm  text-md py-21 w-32 h-10"
            onClick={() => {
              creatematch();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreactTaems;

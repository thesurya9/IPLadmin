/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CreactTaems from "../src/components/topTreding/creactTaems";
import TeamsList from "../src/components/topTreding/teamsList";
import { Api } from "../src/services/service";
import { useRouter } from "next/router";
import moment from "moment/moment";

const Matches = (props) => {
  const router = useRouter();
  const [teamsList, setTeamsList] = useState([]);
  const [sigleData, setSigleData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllMatch();
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getAllMatch = () => {
    const userDetail = JSON.parse(localStorage.getItem("userDetail"));
    const data = { id: userDetail.id };
    Api("post", "jobs/getAllMatch", data, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          res.data.matchList.forEach((element) => {
            element.startDate = moment(element.startDate).format("DD-MM-YYYY");
          });
          setTeamsList(res.data.matchList);
        }
        props.loader(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
      }
    );
  };

  const deleteMatch = (id) => {
    props.loader(true);
    Api("post", "jobs/deleteOneMatch", { id }, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          props.toaster({
            type: "success",
            message: "Match deleted successfully",
          });
          getAllMatch();
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
      {showForm && (
        <CreactTaems
          setShowForm={setShowForm}
          title="Matches"
          {...props}
          getAllMatch={getAllMatch}
          sigleData={sigleData}
          setSigleData={setSigleData}
        />
      )}
      <div className="pt-20 pb-5 px-5">
        {!showForm && (
          <button
            className="bg-red-700 text-white rounded p-1.5 mt-1 ml-5 px-5"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add Match
          </button>
        )}
        <div className="p-5 mt">
          <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
            <div>
              <p className="text-white font-bold md:text-3xl text-lg">
                Matche List
              </p>
            </div>
          </div>
          <TeamsList
            data={teamsList}
            setSigleData={setSigleData}
            setShowForm={setShowForm}
            deleteMatch={deleteMatch}
            goToTop={goToTop}
          />
        </div>
      </div>
    </div>
  );
};

export default Matches;

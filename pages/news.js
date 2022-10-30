/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Api } from "../src/services/service";
import { useRouter } from "next/router";
import NewsTable from "../src/components/news/newstable";
import moment from "moment/moment";
import {
  checkForEmptyKeys,
  checkEmail,
} from "../src/services/InputsNullChecker";

const News = (props) => {
  const router = useRouter();
  const [newsdata, setnewsdata] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [tableList, setTableList] = useState([]);

  useEffect(() => {
    getAllNews();
  }, []);

  const createNews = () => {
    console.log(newsdata);

    let { anyEmptyInputs, errorString } = checkForEmptyKeys(newsdata);
    console.log(errorString);
    if (anyEmptyInputs.length > 0) {
      props.toaster({ type: "error", message: errorString });
      return;
    }

    props.loader(true);
    console.log(newsdata);
    const data = new FormData();
    data.append("title", newsdata?.title || "");
    data.append("location", newsdata?.location || "");
    data.append("date", newsdata?.date || "");
    data.append("news", newsdata?.news || "");
    data.append("file", newsdata?.file || "");

    Api("post", "jobs/saveNewsWithImg", data, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          getAllNews();
          setShowForm(false);
          setnewsdata({
            title: "",
            date: "",
            location: "",
            news: "",
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

  const getAllNews = () => {
    props.loader(true);
    Api("post", "jobs/getAllNews", "", router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          res.data.newsList.forEach((element) => {
            element.date = moment(element.date).format("DD-MM-YYYY");
          });
          setTableList(res.data.newsList);
        }
        props.loader(false);
      },
      (err) => {
        console.log(err);
        props.loader(false);
      }
    );
  };

  const deleteNews = (id) => {
    props.loader(true);
    Api("post", "jobs/deleteOneNews", { id }, router).then(
      (res) => {
        console.log(res);
        if (res?.status) {
          props.toaster({
            type: "success",
            message: "News deleted successfully",
          });
          getAllNews();
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
        {showForm && (
          <div>
            <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
              <div>
                <p className="text-white font-bold md:text-3xl text-lg">News</p>
              </div>
            </div>
            <div className=" border-2 border-red-700 rounded-sm p-5">
              <div className="grid md:grid-cols-2 grid-cols-1 items-start">
                <div className="grid grid-cols-1 md:mr-2">
                  <p className="text-white text-lg font-semibold mt-1">Title</p>
                  <input
                    value={newsdata.title}
                    placeholder="Enter Title"
                    onChange={(text) => {
                      console.log(text);
                      setnewsdata({ ...newsdata, title: text.target.value });
                    }}
                    className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
                  />
                </div>
                <div className="grid grid-cols-1 md:mr-2">
                  <p className="text-white text-lg font-semibold mt-1">Date</p>
                  <input
                    value={newsdata.date}
                    type="date"
                    onChange={(text) => {
                      console.log(text);
                      setnewsdata({ ...newsdata, date: text.target.value });
                    }}
                    className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 items-start">
                <div className="grid grid-cols-1 md:mr-2">
                  <p className="text-white text-lg font-semibold mt-1">
                    Location
                  </p>
                  <input
                    value={newsdata.location}
                    placeholder="Enter Location"
                    onChange={(text) => {
                      console.log(text);
                      setnewsdata({ ...newsdata, location: text.target.value });
                    }}
                    className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
                  />
                </div>

                <div className="grid grid-cols-1 md:mr-2">
                  <p className="text-white text-lg font-semibold mt-1">
                    Upload image{" "}
                  </p>
                  <input
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setnewsdata({ ...newsdata, file: e.target.files[0] });
                    }}
                    className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 "
                  />
                </div>
              </div>
              <textarea
                value={newsdata.news}
                onChange={(text) => {
                  console.log(text);
                  setnewsdata({ ...newsdata, news: text.target.value });
                }}
                placeholder="Enter News"
                className="rounded-md border-2 border-red-900 mt-1 outline-none text-white bg-black p-1.5 w-full"
                rows="12"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  className="text-white bg-red-700 rounded-sm  text-md py-21 w-32 h-10"
                  onClick={() => {
                    createNews();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {!showForm && (
          <button
            className="bg-red-700 text-white rounded p-1.5 mt-1 ml-5 px-5"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add News
          </button>
        )}
        <div className="p-5 mt">
          <div className="grid grid-cols-2 bg-stone-900 md:px-5 p-3 rounded-sm  border-t-4 border-red-700 ">
            <div>
              <p className="text-white font-bold md:text-3xl text-lg">
                News List
              </p>
            </div>
          </div>
          <NewsTable data={tableList} deleteNews={deleteNews} />
        </div>
      </div>
    </div>
  );
};

export default News;

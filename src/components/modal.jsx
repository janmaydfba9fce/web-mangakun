import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import React from "react";

const baseURL = "https://api-mangakun.herokuapp.com/";

export default function Modal({ details, updateFn, refreshFn }) {
  const history = useHistory();

  const [editValue, setEditValue] = useState({
    title: "",
    overview: "",
  });

  const onSaveChanges = async () => {
    await axios
      .put(baseURL + `api/post/${details._id}`, {
        title: editValue.title,
        overview: editValue.overview,
      })
      .then((value) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {" "}
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-body">
              <form>
                <div className="w-100 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    required={true}
                    defaultValue={details?.title}
                    onChange={(e) => {
                      setEditValue({
                        ...editValue,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="w-100">
                  <textarea
                    className="form-control mt-2"
                    rows="5"
                    placeholder="Overview"
                    required={true}
                    defaultValue={details?.overview}
                    onChange={(e) => {
                      setEditValue({
                        ...editValue,
                        overview: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>

                <div className="w-100">
                  <div className="mt-5 ms-2">
                    <button
                      type="button"
                      className="btn btn-dark   w-100"
                      onClick={() => onSaveChanges()}
                      data-mdb-dismiss="modal"
                    >
                      Save changes
                    </button>
                    <button
                      type="submit"
                      className="btn btn-light mt-2  w-100"
                      data-mdb-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

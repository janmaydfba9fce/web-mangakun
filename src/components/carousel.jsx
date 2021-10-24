import React from "react";
import { useHistory } from "react-router-dom";

export const Carousel = ({ data }) => {
  const history = useHistory();

  if (data.length !== 0) {
    return (
      <section className="mt-2">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 ">
          {data.map((value, index) => {
            return (
              <div
                className="col pointer p-3"
                key={value._id}
                onClick={() => {
                  history.replace({
                    pathname: `/m/${value._id}`,
                    state: value,
                  });
                }}
              >
                <div className="d-flex">
                  <img
                    src={value.posterUrl}
                    key={index}
                    alt={value.title}
                    loading="lazy"
                    style={{
                      height: "150px",
                      objectFit: "fill",
                    }}
                  />
                  <div className="ps-3">
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#111",
                        fontWeight: "500  ",
                      }}
                    >
                      {value.title}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        overflow: "hidden",
                        whiteSpace: "pre-wrap",
                        textOverflow: "ellipsis",
                        height: "120px",
                      }}
                    >
                      {value.overview}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  return <div></div>;
};

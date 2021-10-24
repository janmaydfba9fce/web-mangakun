import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const baseURL = "https://api-mangakun.herokuapp.com/";

export default function Registration() {
  const [isError, setIsError] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    if (data.password === data.passwordConfirm) {
      setIsPasswordMatched(true);
      await axios
        .post(baseURL + "api/user", {
          email: data.email,
          password: data.password,
        })
        .then((value) => {
          localStorage.setItem("auth", "ddf134eb615b4b32eed1g8e3");
          history.replace("/admin");
          setIsError(false);
        })
        .catch((error) => {
          setIsError(true);
        });
      return;
    }
    setIsPasswordMatched(false);
  };
  const auth = () => {
    var value = localStorage.getItem("auth");
    if (value !== null) {
      history.replace("/admin");
    }
  };

  useEffect(() => {
    auth();
  }, []);
  window.document.title = "Sign up" + " | " + "Mangakun";
  return (
    <section className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-md-5 col-lg-5 col-xl-3">
          <section style={{ marginTop: "200px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2 mt-5">
                <input
                  type="email"
                  id="form1Example1"
                  className="form-control"
                  placeholder="Email"
                  required={true}
                  {...register("email")}
                />
              </div>

              <div>
                <input
                  type="password"
                  id="form1Example2"
                  className="form-control"
                  placeholder="Password"
                  required={true}
                  {...register("password")}
                />
                <input
                  type="password"
                  id="form1Example2"
                  className="form-control mt-2"
                  placeholder="Confirm password"
                  required={true}
                  {...register("passwordConfirm")}
                />
              </div>
              {!isPasswordMatched && (
                <p
                  className="text-danger p-0 m-0 mb-5 mt-2 text-center"
                  style={{ fontSize: "12px" }}
                >
                  Password not matched
                </p>
              )}
              {isError && (
                <p
                  className="text-danger p-0 m-0 mb-5 mt-2 text-center"
                  style={{ fontSize: "12px" }}
                >
                  Email is currently in used
                </p>
              )}
              <div className="d-flex justify-content-end mt-2">
                <p
                  className="pointer"
                  style={{ fontSize: "12px" }}
                  onClick={() => {
                    history.replace("/login");
                  }}
                >
                  Already have an account?
                </p>
              </div>
              <button type="submit" className="btn btn-dark btn-block">
                Create my account
              </button>
            </form>
          </section>
        </div>
        <div className="col"></div>
      </div>
    </section>
  );
}

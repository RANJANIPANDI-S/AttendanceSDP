import { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import { FaUniversity } from "react-icons/fa";
import { PiStudentThin, PiUserThin, PiSpinnerGapBold } from "react-icons/pi";
import CircleDesign from "../Layouts/CircleDesign";
import ErrorStrip from "../ErrorStrip";
import Header from "../Layouts/Header";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [message, setMessage] = useState("");

  const slowLoadingIndicator = () => {
    setTimeout(() => {
      setMessage(
        "NOTE: Web Services on the free instance type are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up."
      );
    }, 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userType === "") {
      setError({
        response: {
          data: "Select User Type",
        },
      });
    } else {
      setButtonText("Loading...");
      slowLoadingIndicator();
      try {
        const response = await axios.post(`/auth/login/${userType}`, {
          username,
          password,
        });
        await setUser({ ...response.data, userType });
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...response.data, userType })
        );
      } catch (err) {
        setError(err);
        setButtonText("Login");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      setUser(JSON.parse(localStorage.getItem("userDetails")));
    }
    setUserType("");
    setMessage("");
  }, [setUserType, setMessage, setUser]);

  return (
    <>
      {!user?._id ? (
        <main
          className="relative z-0 min-h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://assoftech.com/images/college.jpg")',
          }}
        >
          <header className="fixed top-0 w-full bg-slate-500/50 p-2 text-xs dark:bg-slate-700/50 lg:text-base">
            {message && !error && message}
          </header>
          <Header />
          <CircleDesign />
          <section className="relative z-10 mt-1 mb-4 flex items-center justify-center text-6xl md:text-8xl lg:gap-4">
            {/* <FaUniversity /> */}
            {/* <h1 className="font-spectral font-semibold text-slate-900 dark:text-slate-300">
              Ed F
              <span className="inline-block h-10 w-10 rounded-full bg-violet-900 dark:bg-violet-600 md:h-14 md:w-14 xl:h-14 xl:w-14"></span>
              lio
            </h1> */}
          </section>
          <div className="relative z-10 mx-auto max-w-lg mb-16 mt-24">
            {/* Adjusted mb-16 and added mt-24 for gap */}
            <section className="relative z-0 w-full justify-self-center rounded-lg bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(6,9,19,0.6)] p-4">
              <form
                className="tracking-wide placeholder:text-slate-200 dark:placeholder:text-violet-200"
                onSubmit={(e) => handleLogin(e)}
              >
                <section className="flex flex-col items-center justify-start">
                  <div className="flex w-full text-lg">
                    <label
                      className="radio relative flex w-1/2 cursor-pointer flex-col items-center rounded-tl-lg p-4 dark:border-l-[1.5px] dark:border-t-[1.5px] dark:border-solid dark:border-violet-900"
                      htmlFor="staff"
                    >
                      Staff
                      <input
                        className="absolute opacity-0"
                        type="radio"
                        value="staff"
                        id="staff"
                        name="userType"
                        onClick={() => setUserType("staff")}
                      />
                    </label>
                    <label
                      className="radio relative flex w-1/2 cursor-pointer flex-col items-center rounded-tr-lg p-4 dark:border-r-[1.5px] dark:border-t-[1.5px] dark:border-solid dark:border-violet-900"
                      htmlFor="student"
                    >
                      Student
                      <input
                        className="absolute opacity-0"
                        type="radio"
                        value="student"
                        id="student"
                        name="userType"
                        onClick={() => setUserType("student")}
                      />
                    </label>
                  </div>
                  <div className="flex w-full justify-center p-1 pt-0 text-8xl dark:border-x-[1.5px] dark:border-solid dark:border-violet-900 md:p-3 md:pt-0">
                    {userType === "student" ? (
                      <PiStudentThin className="animate-slide rounded-full border-2 border-slate-900 p-1 dark:border-slate-300 md:p-2" />
                    ) : userType === "staff" ? (
                      <PiUserThin className="animate-slide rounded-full border-2 border-slate-900 p-1 dark:border-slate-300 md:p-2" />
                    ) : (
                      <FaUniversity className="animate-fadeIn rounded-lg border-2 border-slate-900 p-1 dark:border-slate-300 md:p-2" />
                    )}
                  </div>
                </section>
                <section className="rounded-b-lg px-4 pb-4 dark:border-x-[1.5px] dark:border-b-[1.5px] dark:border-solid dark:border-violet-900">
                  {userType ? (
                    <>
                      <input
                        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 bg-[rgba(255,255,255,0.6)] p-1 pl-2 outline-none focus:border-violet-900 dark:border-slate-200 dark:bg-[rgba(6,9,19,0.6)] dark:caret-inherit dark:focus:border-violet-400"
                        placeholder="username"
                        id="username"
                        type="text"
                        required
                        autoComplete="off"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 bg-[rgba(255,255,255,0.6)] p-1 pl-2 outline-none focus:border-violet-900 dark:border-slate-200 dark:bg-[rgba(6,9,19,0.6)] dark:caret-inherit dark:focus:border-violet-400"
                        placeholder="password"
                        id="password"
                        type="password"
                        required
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        className="mb-1 flex h-10 w-full items-center justify-center gap-1 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-wait dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus:bg-slate-900 lg:mb-2"
                        type="submit"
                        value="Login"
                        disabled={buttonText !== "Login"}
                      >
                        {buttonText !== "Login" && (
                          <PiSpinnerGapBold className="animate-spin" />
                        )}
                        {buttonText}
                      </button>
                    </>
                  ) : (
                    <p className="w-full bg-violet-300 dark:bg-violet-950/90 rounded p-4 my-12 text-center">
                      Select User Type
                    </p>
                  )}
                  {error && <ErrorStrip error={error} />}
                  <p className="inline text-slate-600 dark:text-violet-200">
                    Click to{" "}
                  </p>
                  <button
                    type="button"
                    className="font-semibold text-violet-600 hover:underline focus:underline dark:text-violet-400"
                    onClick={() => navigate("./register/reg_student")}
                  >
                    Register
                  </button>
                </section>
              </form>
            </section>
          </div>
        </main>
      ) : (
        <Navigate to="./dash" />
      )}
    </>
  );
};

export default Login;
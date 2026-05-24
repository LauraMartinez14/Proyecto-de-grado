import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router";
import { AuthResponse, AuthResponseError } from "../../types/authData";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();

  const [type, setType] = useState("password");
  const [open, setOpen] = useState(false);

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        console.log("Autenticación exitosa");
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;
        console.log(json.body);
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
        goTo("/");
      } else {
        console.log("Error");
        const json = (await response.json()) as AuthResponseError;
        console.log(json);

        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleToggle = () => {
    if (type === "password") {
      setOpen(true);
      setType("text");
    } else {
      setOpen(false);
      setType("password");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#C4D2E7] flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-5 shadow-lg w-1/3 border-black bg-white rounded-lg"
        >
          <h1 className="text-center font-bold text-2xl text-[#173555]">
            Sistema de Monitoreo
          </h1>
          <p className="text-[#173555] text-center text-sm">
            Deshidratador Solar
          </p>
          {!!errorResponse && (
            <div className="text-red-600 text-center font-medium">
              {" "}
              {errorResponse}{" "}
            </div>
          )}
          <p className="text-sm text-center mt-5 mb-2">
            Inicie sesión para continuar
          </p>
          <div className="w-3/4 flex items-center flex-col justify-center m-auto">
            <div className="flex flex-col items-center">
              <label className="font-semibold text-[#173555] text-sm flex justify-start min-w-full">
                Usuario
              </label>
              <div className="flex items-center">
                <div className="absolute w-5 h-5 ml-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>

                <input
                  type="text"
                  className="mt-2 mb-2 pl-10 pr-10"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label className="font-semibold text-[#173555] text-sm flex justify-start min-w-full">
                Contraseña
              </label>
              <div className="relative flex items-center">
                <div className="absolute w-5 h-5 ml-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>

                <input
                  type={type}
                  className="mt-2 mb-2 pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 cursor-pointer w-5 h-5 flex items-center"
                  onClick={handleToggle}
                >
                  {open ? (
                    <svg
                      fill="#9e9e9e"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#9e9e9e"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>eye</title>{" "}
                        <path d="M30.564 15.506c-9.59-10.957-19.543-10.957-29.129 0-0.115 0.131-0.185 0.305-0.185 0.494s0.070 0.363 0.186 0.495l-0.001-0.001c4.793 5.479 9.693 8.256 14.563 8.256h0.001c4.869 0 9.771-2.777 14.564-8.256 0.116-0.131 0.186-0.304 0.186-0.494s-0.070-0.363-0.187-0.495l0.001 0.001zM3.004 16c8.704-9.626 17.291-9.622 25.992 0-8.703 9.621-17.291 9.621-25.992 0zM16 11.25c-2.623 0-4.75 2.127-4.75 4.75s2.127 4.75 4.75 4.75c2.623 0 4.75-2.127 4.75-4.75v0c-0.003-2.622-2.128-4.747-4.75-4.75h-0zM16 19.25c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25c1.795 0 3.25 1.455 3.25 3.25v0c-0.002 1.794-1.456 3.248-3.25 3.25h-0z"></path>{" "}
                      </g>
                    </svg>
                  ) : (
                    <svg
                      fill="#9e9e9e"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>eye-slash</title>{" "}
                        <path d="M18.822 22.904c-5.215 1.275-10.524-1.051-15.818-6.904 1.337-1.501 2.79-2.843 4.364-4.034l0.076-0.055c0.186-0.138 0.305-0.357 0.305-0.604 0-0.414-0.336-0.75-0.75-0.75-0.166 0-0.32 0.054-0.444 0.146l0.002-0.001c-1.91 1.447-3.588 3.024-5.086 4.761l-0.036 0.042c-0.115 0.131-0.185 0.305-0.185 0.494s0.070 0.363 0.186 0.495l-0.001-0.001c4.803 5.488 9.693 8.254 14.582 8.254 1.123-0.001 2.212-0.142 3.252-0.406l-0.092 0.020c0.332-0.082 0.573-0.377 0.573-0.729 0-0.414-0.336-0.75-0.75-0.75-0.064 0-0.125 0.008-0.184 0.023l0.005-0.001zM16.75 20c-0-0.414-0.336-0.75-0.75-0.75v0c-1.794-0.002-3.248-1.456-3.25-3.25v-0c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0c0.003 2.622 2.128 4.747 4.75 4.75h0c0.414-0 0.75-0.336 0.75-0.75v0zM23.565 22.503c2.701-1.672 5.010-3.665 6.965-5.967l0.034-0.042c0.116-0.131 0.186-0.304 0.186-0.494s-0.070-0.363-0.187-0.495l0.001 0.001c-6.844-7.82-13.822-10.081-20.758-6.76l-7.277-7.276c-0.135-0.131-0.32-0.212-0.523-0.212-0.414 0-0.75 0.336-0.75 0.75 0 0.203 0.081 0.388 0.213 0.523l27.999 28.001c0.136 0.136 0.324 0.22 0.531 0.22 0.415 0 0.751-0.336 0.751-0.751 0-0.207-0.084-0.395-0.22-0.531v0zM28.996 16c-1.852 2.121-4.004 3.919-6.402 5.345l-0.121 0.067-2.636-2.635c0.569-0.767 0.911-1.731 0.912-2.776v-0c-0.003-2.622-2.128-4.747-4.75-4.75h-0c-1.045 0.002-2.009 0.344-2.789 0.921l0.013-0.009-2.29-2.29c6.027-2.647 11.95-0.64 18.062 6.127zM14.301 13.239c0.486-0.307 1.077-0.489 1.711-0.489 1.788 0 3.238 1.45 3.238 3.238 0 0.634-0.182 1.225-0.497 1.724l0.008-0.013z"></path>{" "}
                      </g>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-sky-700 hover:bg-sky-700 p-2 rounded-3xl mt-2 text-white text-sm w-32"
            >
              INGRESAR
            </button>
          </div>
        </form>
        <p className="text-sm font-semibold mt-3">
          Acceso exclusivo para administradores
        </p>
      </div>
    </>
  );
};

export default LoginPage;

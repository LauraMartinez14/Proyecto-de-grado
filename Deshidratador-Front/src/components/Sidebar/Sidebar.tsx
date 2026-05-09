import { NavLink } from "react-router";
import Icon from "../../assets/icons/Icon";

const Sidebar = () => {
  return (
    <aside className="w-1/6 text-[#486F99]">
      <div className="h-28"></div>
      <ul className="px-7">
        <li className=" font-bold">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#C4D2E7] rounded-lg text-[#173555] py-2 px-4 inline-flex items-center w-full"
                : "py-2 px-4 inline-flex items-center"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                id="Vector"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.10352 0.496979L0.103516 6.89698V16.497H6.32572V11.1636H9.88131V16.497H16.1035V6.89698L8.10352 0.496979Z"
                fill="#173555"
              />
            </svg>
            <label className="ml-2"> Inicio</label>
          </NavLink>
        </li>
        <li className="font-bold">
          <NavLink
            to={"/reportes"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#C4D2E7] rounded-lg text-[#173555] py-2 px-4 inline-flex items-center w-full"
                : "py-2 px-4 inline-flex items-center"
            }
          >
            <Icon name="reports" />
            <label className="ml-2">Reportes</label>
          </NavLink>
        </li>
        <li className="font-bold">
          <NavLink
            to={"/estadisticas"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#C4D2E7] rounded-lg text-[#173555] py-2 px-4 inline-flex items-center w-full"
                : "py-2 px-4 inline-flex items-center"
            }
          >
            <Icon name="stats" />
            <label className="ml-2">Estadisticas</label>
          </NavLink>
        </li>
        <li className="font-bold">
          <NavLink
            to={"/notificaciones"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#C4D2E7] rounded-lg text-[#173555] py-2 px-4 inline-flex items-center w-full"
                : "py-2 px-4 inline-flex items-center"
            }
          >
            <Icon name="notifications" />
            <label className="ml-2">Notificaciones</label>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

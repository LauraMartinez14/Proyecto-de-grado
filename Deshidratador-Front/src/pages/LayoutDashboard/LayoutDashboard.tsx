import { Link, Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../auth/AuthProvider";
// import logo from "../../assets/img/logo.png";

const LayoutDashboard = () => {

  const auth = useAuth();

  async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/signout', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.signOut();
      }

    } catch (error) {
      console.log("error", error);
      
    }
  }

  return (
    <>
      <header className="bg-white h-8">
        <nav>
          <ul className="flex w-full justify-end">
            {/* <li>
              <img src={logo} alt="logo.png" />
            </li> */}
            <li className="flex">
              <a href="#" onClick={handleSignOut}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z" fill="#000000"></path></g></svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="bg-[#C4D2E7] flex-1 px-10 pb-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutDashboard;
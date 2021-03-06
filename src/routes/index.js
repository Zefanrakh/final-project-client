import Login from "../pages/login";
import Register from "../pages/register";
import Verify from "../pages/verify";
import Dashboard from "../pages/dashboard";
import Appointment from "../pages/appointment";
import Customer from "../pages/customer";
import History from "../pages/history";
import PresenceList from "../pages/presenceList";
import Monitoring from "../pages/monitoring";
import Viewer from "../pages/viewer";

const routes = [
  {
    component: () => <Dashboard />,
    path: "/",
  },
  {
    component: () => <Viewer />,
    path: "/viewer/trgz",
  },
  {
    component: () => <Monitoring />,
    path: "/monitoring/:cameraId",
  },
  {
    component: () => <PresenceList />,
    path: "/present-list",
  },
  {
    component: () => <History />,
    path: "/history",
  },
  {
    component: () => <Login />,
    path: "/login",
  },
  {
    component: () => <Register />,
    path: "/register",
  },
  {
    component: () => <Verify />,
    path: "/verify",
  },
  {
    component: () => <Appointment />,
    path: "/appointment",
  },

  { component: () => <Customer />, path: "/customers" },
];

export default routes;

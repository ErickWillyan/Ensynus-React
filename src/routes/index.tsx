import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import HomeTeacher from "@/pages/HomeTeacher";
import ClassroomPage from "@/pages/ClassroomPage";
import RequireAuth from "@/components/RequireAuth";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/RegisterUser",
    element: <RegisterUser />,
  },
  {
    path: "/homeTeacher",
    element: (
      <RequireAuth>
        <HomeTeacher />
      </RequireAuth>
    ),
  },
  {
    path: "/homeTeacher/turma/:turmaId/:turmaNome",
    element: (
      <RequireAuth>
        <ClassroomPage />
      </RequireAuth>
    ),
  },
]);

import EnsynusLogo from "../../assets/images/ensynusLogo.png";
import RegisterClassDialog from "../registerClassDialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/stores/userStore";

export default function NavbarTeacher() {
  const navigate = useNavigate();
  const setAuth = userStore((state) => state.setAuth);
  const insertUserId = userStore((state) => state.insertUserId);

  const handleLogout = () => {
    insertUserId("");
    setAuth(false);
    navigate("/");
  };
  return (
    <nav className="flex items-center w-full m-auto max-w-7xl justify-between">
      <div className="flex items-center">
        <img src={EnsynusLogo} alt="Logo" className="aspect-square w-14" />
        <h1 className="font-changa-one font-extrabold text-2xl text-amber-300">
          Ensynus
        </h1>
      </div>
      <ul className="flex gap-2">
        <li>
          <RegisterClassDialog />
        </li>
        <li>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white border-0"
          >
            Sair
          </Button>
        </li>
      </ul>
    </nav>
  );
}

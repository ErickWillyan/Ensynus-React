import EnsynusLogo from "../../assets/images/ensynusLogo.png";
import RegisterUserDialog from "../registerUserDialog";
import LoginDialog from "../loginDialog";

export default function Navbar() {
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
          <RegisterUserDialog />
        </li>
        <li>
          <LoginDialog />
        </li>
      </ul>
    </nav>
  );
}

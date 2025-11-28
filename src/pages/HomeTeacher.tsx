import NavbarTeacher from "@/components/navbarTeacher";
import ClassList from "@/components/classList";
// import { userStore } from "@/stores/userStore";

export default function HomeTeacher() {
  return (
    <>
      <NavbarTeacher />
      <main className="mt-6 px-4">
        <div className="max-w-4xl m-auto my-8 text-xl">
          <h1 className="text-sky-950 font-bold">Turmas</h1>
        </div>
        <ClassList />
      </main>
    </>
  );
}

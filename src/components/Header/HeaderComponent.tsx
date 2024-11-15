import mainLogo from "@/assets/mole.png";
import { ModeToggle } from "../ModeToggle/ModeToggleComponent";

const HeaderComponent = () => {
  return (
    <div className="flex flex-wrap items-center justify-between w-full mx-auto gap-2 my-8 max-w-[800px]">
      <div className="flex items-center gap-2">
        <img
          src={mainLogo}
          alt="logo"
          className="w-20 h-20 rounded-full bg-slate-200 p-2"
        />
        <h1 className="ml-4">Tienda - El Topo</h1>
      </div>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
};

export default HeaderComponent;

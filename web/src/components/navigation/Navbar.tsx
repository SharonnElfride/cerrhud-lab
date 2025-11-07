import { useAuth } from "@/context/AuthContext";
import { LabLinks } from "@/shared/cerrhud_data";
import NavbarProfile from "../profile/NavbarProfile";
import NavbarLink from "./NavbarLink";
import NavMenu from "./NavMenu";
import logoIcon from "/src/assets/adaptive-icon.png";

const Navbar = ({}) => {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-between px-2 py-5 text-sm">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-center">
          <img src={logoIcon} className="rounded-full w-8 h-8" />
          <h2 className="uppercase font-extrabold text-base text-primary">
            Cerrhud Lab
          </h2>
        </div>

        <hr className="border-primary/50 mb-2" />

        <NavMenu user={user} />
      </div>

      <div className="flex flex-col gap-2 w-full text-primary">
        <div className="flex flex-col gap-2">
          {LabLinks.map((item, idx) => (
            <NavbarLink key={`${item.title.toKeyCase(idx)}`} linkItem={item} />
          ))}
        </div>

        <hr className="border-primary/50 mt-5" />

        <NavbarProfile user={user} loading={loading} />
      </div>
    </div>
  );
};

export default Navbar;

import ListTitle from "@/components/shared/ListTitle";
import { AdminsData } from "@/shared/entity-data";

const Users = ({}) => {
  return (
    <div className="p-5 space-y-5">
      <ListTitle title={AdminsData.title} description={AdminsData.description} />
    </div>
  );
};

export default Users;

import PageHeadline from "@/components/shared/PageHeadline";
import { AdminsData } from "@/shared/entity-data";

const Users = ({}) => {
  return (
    <div className="p-5 space-y-5">
      <PageHeadline
        title={AdminsData.title}
        description={AdminsData.description}
        variant={"list"}
      />
    </div>
  );
};

export default Users;

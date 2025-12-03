import PageHeadline from "@/components/shared/page-headline";
import { AdminsData } from "@/shared/entity-data";

const Admins = ({}) => {
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

export default Admins;

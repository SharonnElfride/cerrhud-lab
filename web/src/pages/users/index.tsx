import ListTitle from "@/components/shared/ListTitle";

const Users = ({}) => {
  return (
    <div className="p-5 space-y-5">
      <ListTitle
        title="Utilisateurs"
        description="Gestion des utilisateurs et de leurs droits d'accès."
      />
    </div>
  );
};

export default Users;

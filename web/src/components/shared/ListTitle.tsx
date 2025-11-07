import CDescription from "../ui/custom/cdescription";
import CTitle from "../ui/custom/ctitle";

interface ListTitleProps {
  title: string;
  description: string;
}

const ListTitle = ({ title, description }: ListTitleProps) => {
  return (
    <div className="space-y-2">
      <CTitle>{title}</CTitle>
      <CDescription>{description}</CDescription>
    </div>
  );
};

export default ListTitle;

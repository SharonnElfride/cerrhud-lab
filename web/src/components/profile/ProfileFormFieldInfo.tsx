import { useIsMobile } from "@/hooks/use-mobile";

const ProfileFormFieldInfo = ({
  children,
  style,
  ...props
}: React.ComponentProps<"div">) => {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: !isMobile ? "20%" : "100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ProfileFormFieldInfo;

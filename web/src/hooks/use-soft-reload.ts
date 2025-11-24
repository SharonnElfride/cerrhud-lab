import { useNavigate } from "react-router-dom";

export function usePageSoftReload() {
  const navigate = useNavigate();

  return () => {
    navigate(".", {
      replace: true,
    });
  };
}

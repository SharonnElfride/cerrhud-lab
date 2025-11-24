import { useNavigate } from "react-router-dom";

export function useGoBack() {
  const navigate = useNavigate();

  return (fallbackPath: string, replace: boolean = true) => {
    try {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(fallbackPath, { replace });
      }
    } catch (error: any) {
      console.error("CANNOT USE GO BACK");
      console.error(error.message);

      navigate(fallbackPath, { replace });
    }
  };
}

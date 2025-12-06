import { getAdminById } from "@/services/admins-service";
import { useEffect, useState } from "react";

function displayUserName(userId: string) {
  const [name, setName] = useState("Chargement...");

  useEffect(() => {
    (async () => {
      const user = await getAdminById(userId);
      setName(
        user && !user.hidden
          ? `${user.firstname ?? ""} ${user.surname ?? ""}`
          : "SYSTÈME"
      );
    })();
  }, [userId]);

  return name;
}

export { displayUserName };

import { getProfileById } from "@/services/profiles-service";
import { useEffect, useState } from "react";

function displayUserName(userId: string) {
  const [name, setName] = useState("Chargement...");

  useEffect(() => {
    (async () => {
      const user = await getProfileById(userId);
      setName(user && !user.hidden ? `${user.first_name ?? ""} ${user.surname ?? ""}` : "SYSTÈME");
    })();
  }, [userId]);

  return name;
}

export { displayUserName };

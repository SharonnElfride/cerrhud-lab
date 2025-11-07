import { formatDate } from "date-fns";
import { fr } from "date-fns/locale";

function cFormatDate(date: string) {
  return formatDate(new Date(date), "dd MMMM yyyy", {
    locale: fr,
  });
}

export { cFormatDate };

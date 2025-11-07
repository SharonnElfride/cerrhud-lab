import type { Tables } from "@/lib/supabase/supabase";

function MedicalTestsMasterDetail(row: Tables<"medical_tests">) {
  return (
    <div className="px-4 py-2 text-sm text-muted-foreground">
      <p>
        <strong>Mobile ID :</strong> {row.mobile_id}
      </p>
      <p>
        <strong>Image :</strong> {row.image ?? "—"}
      </p>
      <p>
        <strong>Description :</strong> {row.description ?? "—"}
      </p>
    </div>
  );
}

export default MedicalTestsMasterDetail;

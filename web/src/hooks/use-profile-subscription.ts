import { supabase } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/supabase";
import { useEffect } from "react";

type Profile = Tables<"profiles">;

interface UseProfileSubscriptionOptions {
  userId?: string;
  onProfileUpdate?: (updatedProfile: Profile) => void;
}

export function useProfileSubscription({
  userId,
  onProfileUpdate,
}: UseProfileSubscriptionOptions) {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`profile-changes-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          //   console.log("📡 Profile updated:", payload);

          if (payload.new && onProfileUpdate) {
            const updatedProfile = {
              ...payload.new,
              avatar: payload.new.avatar
                ? `${payload.new.avatar}?v=${Date.now()}`
                : null,
            } as Profile;

            onProfileUpdate(updatedProfile);
          }
        }
      )
      .subscribe();

    return () => {
      //   console.log("🧹 Unsubscribing from profile changes");
      supabase.removeChannel(channel);
    };
  }, [userId, onProfileUpdate]);
}

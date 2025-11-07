import { useProfileSubscription } from "@/hooks/useProfileSubscription";
import { supabase } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/supabase";
import { RolePermissions } from "@/models/RolePermissions";
import { FromJson, type UserPermissions } from "@/models/UserPermissions";
import { PROFILES_TABLENAME } from "@/shared/constants";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: Tables<"profiles"> | null;
  userPermissions: UserPermissions;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userPermissions: RolePermissions["user"],
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Tables<"profiles"> | null>(null);
  const [userPermissions, setUserPermissions] = useState<UserPermissions>(
    RolePermissions["user"]
  );
  const [loading, setLoading] = useState(true);

  useProfileSubscription({
    userId: user?.id,
    onProfileUpdate: (updatedUser) => {
      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        avatar: updatedUser.avatar
          ? `${updatedUser.avatar}?v=${Date.now()}`
          : null,
      }));

      setUserPermissions(
        updatedUser
          ? FromJson(updatedUser.permissions, updatedUser.role)
          : RolePermissions["user"]
      );
    },
  });

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session?.user) {
        await loadUserData(data.session.user.id);
      } else {
        noUserData();
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          noUserData();
        }
      }
    );

    initSession();

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setUserPermissions(
      user ? FromJson(user.permissions, user.role) : RolePermissions["user"]
    );
  }, [user]);

  const loadUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from(PROFILES_TABLENAME)
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setUser({
        ...data,
        avatar: data.avatar ? `${data.avatar}?v=${Date.now()}` : null,
      });

      setUserPermissions(
        user ? FromJson(user.permissions, user.role) : RolePermissions["user"]
      );
    }
    setLoading(false);
  };

  const noUserData = () => {
    setUser(null);
    setUserPermissions(RolePermissions["user"]);
    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userPermissions, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

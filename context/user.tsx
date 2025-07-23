// react
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

// swr
import useSWR from "swr";

// interfaces
import { User } from "@/interfaces/user";
import { authService, userService } from "@/services";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean | null;
  logout: () => void;
  mutateUser: () => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

/**
 * Provides the current user context to its children components.
 *
 * This component uses SWR to fetch the current user data and exposes
 * user information, loading state, a mutate function, and a logout handler
 * via the `UserContext`.
 *
 * @param children - The child components that will have access to the user context.
 * @returns A context provider wrapping the children.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);

  const {
    data: user,
    isLoading,
    mutate: mutateUser,
  } = useSWR("FETCH_CURRENT_USER", () => userService.getCurrentUser(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    dedupingInterval: 60000, // Cache for 1 minute
    errorRetryCount: 1,
    errorRetryInterval: 2000,
    onError: (err) => {
      const status = err?.status;

      if (status === 401) {
        setLoggedIn(false);
      } else {
        console.error("Unexpected error:", err);
        setLoggedIn(null);
      }
    },
    onSuccess: (data) => {
      console.log("Fetched user:", data);
      setLoggedIn(true);
    },
  });

  const logout = useCallback(() => {
    const refreshToken = authService.getRefreshToken();
    authService.logout({ refresh_token: refreshToken as string });
    authService.purgeAuth();
    mutateUser();
  }, [mutateUser]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user: user ?? null,
      logout,
      isLoading,
      mutateUser,
      isLoggedIn,
    }),
    [user, logout, isLoading, mutateUser, isLoggedIn],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

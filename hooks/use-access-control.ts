import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context";

interface AccessControlOptions {
  allowedRoles: string[];
  redirectTo?: string;
  showUnauthorizedMessage?: boolean;
}

interface AccessControlResult {
  isAuthorized: boolean;
  isLoading: boolean;
  user: any;
}

export const useAccessControl = (
  options: AccessControlOptions,
): AccessControlResult => {
  const { user } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    allowedRoles,
    redirectTo = "/dashboard",
    showUnauthorizedMessage = true,
  } = options;

  useEffect(() => {
    if (user) {
      const hasPermission = allowedRoles.includes(user.role);
      setIsAuthorized(hasPermission);

      if (!hasPermission && redirectTo) {
        // Redirect unauthorized users
        router.push(redirectTo);
      }
    }
    setIsLoading(false);
  }, [user, router, allowedRoles, redirectTo]);

  return {
    isAuthorized,
    isLoading,
    user,
  };
};

// Predefined access control hooks for common use cases
export const useAdminAccess = (redirectTo?: string) => {
  return useAccessControl({
    allowedRoles: ["admin"],
    redirectTo,
  });
};

export const useEmployerAccess = (redirectTo?: string) => {
  return useAccessControl({
    allowedRoles: ["employer"],
    redirectTo,
  });
};

export const useAdminOrEmployerAccess = (redirectTo?: string) => {
  return useAccessControl({
    allowedRoles: ["admin", "employer"],
    redirectTo,
  });
};

export const useStudentAccess = (redirectTo?: string) => {
  return useAccessControl({
    allowedRoles: ["student"],
    redirectTo,
  });
};

export const useAuthenticatedAccess = (redirectTo?: string) => {
  return useAccessControl({
    allowedRoles: ["admin", "employer", "student"],
    redirectTo,
  });
};

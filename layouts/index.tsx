import { ReactElement, ReactNode } from "react";
import { AuthGuard } from "@/hooks/auth-guard";
import RootLayout from "./root";

// Layout types
export type LayoutType =
  | "default"
  | "auth"
  | "protected"
  | "student"
  | "employer"
  | "admin"
  | "none";

// Layout wrapper component
function LayoutWrapper({
  children,
  type,
  requiredRole,
  fallback,
}: {
  children: ReactNode;
  type: LayoutType;
  requiredRole?: "admin" | "student" | "employer";
  fallback?: ReactNode;
}) {
  // No layout
  if (type === "none") {
    return <>{children}</>;
  }

  // Auth pages (login, signup) - no navbar/footer, no auth guard
  if (type === "auth") {
    return <>{children}</>;
  }

  // Protected pages - require authentication but show navbar/footer
  if (
    type === "protected" ||
    type === "student" ||
    type === "employer" ||
    type === "admin"
  ) {
    const role =
      type === "student"
        ? "student"
        : type === "employer"
          ? "employer"
          : type === "admin"
            ? "admin"
            : requiredRole;

    return (
      <AuthGuard requiredRole={role} fallback={fallback}>
        <RootLayout>{children}</RootLayout>
      </AuthGuard>
    );
  }

  // Default pages - public with navbar/footer
  return <RootLayout>{children}</RootLayout>;
}

// Predefined layouts - define once, use everywhere
export const Layouts = {
  // Public pages with navbar and footer
  Public: (page: ReactElement) => (
    <LayoutWrapper type="default">{page}</LayoutWrapper>
  ),

  // Auth pages (login, signup) - no navbar/footer
  Auth: (page: ReactElement) => (
    <LayoutWrapper type="auth">{page}</LayoutWrapper>
  ),

  // Protected pages requiring authentication (any role)
  Protected: (page: ReactElement) => (
    <LayoutWrapper type="protected">{page}</LayoutWrapper>
  ),

  // Student-only pages
  Student: (page: ReactElement) => (
    <LayoutWrapper type="student">{page}</LayoutWrapper>
  ),

  // Employer-only pages
  Employer: (page: ReactElement) => (
    <LayoutWrapper type="employer">{page}</LayoutWrapper>
  ),

  // Admin-only pages
  Admin: (page: ReactElement) => (
    <LayoutWrapper type="admin">{page}</LayoutWrapper>
  ),

  // Custom layout (no automatic wrapping)
  Custom: (page: ReactElement) => (
    <LayoutWrapper type="none">{page}</LayoutWrapper>
  ),
} as const;

// Higher-order component for cleaner page wrapping
export function withLayout<P extends object>(
  Component: React.ComponentType<P>,
  layoutFn: (page: ReactElement) => ReactElement,
) {
  const WrappedComponent = (props: P) => {
    const page = <Component {...props} />;
    return layoutFn(page);
  };

  // Add getLayout method for Next.js
  WrappedComponent.getLayout = layoutFn;

  return WrappedComponent;
}

// Utility to create custom layouts
export function createLayout(
  type: LayoutType,
  requiredRole?: "admin" | "student" | "employer",
  fallback?: ReactNode,
) {
  return (page: ReactElement) => (
    <LayoutWrapper type={type} requiredRole={requiredRole} fallback={fallback}>
      {page}
    </LayoutWrapper>
  );
}

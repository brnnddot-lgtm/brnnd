import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/email-creation")({
  beforeLoad: () => {
    throw redirect({ to: "/services/ecommerce" });
  },
});

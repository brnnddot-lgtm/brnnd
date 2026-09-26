import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/product-design")({
  beforeLoad: () => {
    throw redirect({ to: "/services/ui-ux" });
  },
});

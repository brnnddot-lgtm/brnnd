import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/e-commerce")({
  beforeLoad: () => {
    throw redirect({ to: "/services/ecommerce" });
  },
});

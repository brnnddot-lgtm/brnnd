import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/rebranding-services")({
  beforeLoad: () => {
    throw redirect({ to: "/services/rebranding" });
  },
});

import { checkConfig, requireAdmin } from "@/lib/adminAuth";
import AdminClientView from "./AdminClientView";

export const instant = false;

export const metadata = {
  title: "Admin Console | GrowElite",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const { isConfigured, missing } = checkConfig();
  const auth = await requireAdmin();

  return (
    <AdminClientView
      isConfigured={isConfigured}
      missing={missing}
      initialAuthenticated={auth.authenticated}
    />
  );
}
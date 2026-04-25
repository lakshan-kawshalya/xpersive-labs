import { auth } from "@xpersive/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role === "CLIENT") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}

import { redirect } from "next/navigation";

export const metadata = {
  title: "Leadership | GrowElite",
  description: "Meet the executive leadership driving category growth at GrowElite.",
};

export default function TeamPage() {
  redirect("/about#ceo");
}

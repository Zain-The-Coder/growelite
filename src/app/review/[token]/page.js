import { inspectToken } from "@/lib/tokens";
import ReviewForm from "@/components/review/ReviewForm";
import InvalidTokenScreen from "@/components/review/InvalidTokenScreen";

export const instant = false;

export const metadata = {
  title: "Client Feedback | GrowElite",
  robots: {
    index: false,
    follow: false,
  },
  referrer: "no-referrer",
};

export default async function ReviewPage({ params }) {
  const { token } = await params;

  const result = await inspectToken(token);

  if (!result.valid) {
    return <InvalidTokenScreen />;
  }

  return (
    <ReviewForm
      token={token}
      initialLabel={result.token.label}
      initialCompany={result.token.company}
    />
  );
}

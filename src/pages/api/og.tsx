import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

// Map paths to OpenGraph metadata
const routeMetadata = {
    "/": { title: "Dashboard", description: "View statistics about your Neesilo account" },
    "/jobs": { title: "Jobs", description: "View jobs posted by you" },
    "/talent": { title: "Talent Search", description: "Find talents to hire" },
    "/employees": { title: "Employees", description: "View talents that have been hired by you." },
    "/calendar": { title: "Calendar", description: "See interview schedules for the month." },
    "/billings": { title: "Billing & Subscription", description: "Billing and subscriptions page" },
    "/report": { title: "Reports", description: "Generate reports here" },
    "/notifications": { title: "Notifications", description: "Get alerts on updates concerning you." },
    "/settings": { title: "Settings", description: "Adjust parameters to fit your needs." },
    "/help": { title: "Help & Support", description: "Get help with using Neesilo" },
    "/profile": { title: "Profile", description: "View your profile page." },
    "/auth/login": { title: "Login", description: "Enter your details to access Neesilo", },
    "/auth/welcome": { title: "Welcome", description: "Choose how you would like to proceed", },
    "/auth/sign-up": { title: "Sign Up", description: "Complete the form to get started with Neesilo", },
    "/auth/forgot-password": { title: "Forgot Password", description: "Recover your Neesilo account here." }
};

export default function handler(req: any) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const metadata = routeMetadata[pathname as keyof typeof routeMetadata] || { title: "Default Title", description: "Default Description" };

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#f9f9f9",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          fontWeight: "bold",
        }}
      >
        <img
          width="246"
          height="109"
          src="https://neesilo-corporate-recruiter.vercel.app/og_image.png"
        />
        {metadata.title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

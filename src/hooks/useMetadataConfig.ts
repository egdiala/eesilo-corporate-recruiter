import { useLocation } from "react-router-dom";

export const useMetadataConfig = () => {
    const location = useLocation();
    const pathname = location.pathname;
  
    const routeTitles = {
      "/": {
        title: "Dashboard",
        description: "View statistics about your Neesilo account.",
        keywords: "Neesilo, recruiter, corporate, dashboard",
        openGraph: {
          title: "Dashboard",
          description: "View statistics about your Neesilo account.",
          url: "/",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/jobs": {
        title: "Jobs",
        description: "View jobs posted by you.",
        keywords: "Neesilo, recruiter, corporate, jobs",
        openGraph: {
          title: "Jobs",
          description: "View jobs posted by you.",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/talent": {
        title: "Talent Search",
        description: "Find talents to hire.",
        keywords: "Neesilo, recruiter, corporate, talent",
        openGraph: {
          title: "Talent Search",
          description: "Find talents to hire.",
          url: "/talent",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/employees": {
        title: "Employees",
        description: "View talents that have been hired by you.",
        keywords: "Neesilo, recruiter, corporate, employees",
        openGraph: {
          title: "Employees",
          description: "View talents that have been hired by you.",
          url: "/employees",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/calendar": {
        title: "Calendar",
        description: "See interview schedules for the month.",
        keywords: "Neesilo, recruiter, corporate, calendar",
        openGraph: {
          title: "Calendar",
          description: "See interview schedules for the month.",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/billings": {
        title: "Billing & Subscription",
        description: "Billing and subscriptions page",
        keywords: "Neesilo, recruiter, corporate, billing, subscription",
        openGraph: {
          title: "Billing & Subscription",
          description: "Billing and subscriptions page",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/report": {
        title: "Reports",
        description: "Generate reports here",
        keywords: "Neesilo, recruiter, corporate, reports",
        openGraph: {
          title: "Reports",
          description: "Generate reports here",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/notifications": {
        title: "Notifications",
        description: "Get alerts on updates concerning you.",
        keywords: "Neesilo, recruiter, corporate, notifications",
        openGraph: {
          title: "Notifications",
          description: "Get alerts on updates concerning you.",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/settings": {
        title: "Settings",
        description: "Adjust parameters to fit your needs.",
        keywords: "Neesilo, recruiter, corporate, settings",
        openGraph: {
          title: "Settings",
          description: "Adjust parameters to fit your needs.",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/help": {
        title: "Help & Support",
        description: "Get help with using Neesilo",
        keywords: "Neesilo, recruiter, corporate, help, support",
        openGraph: {
          title: "Help & Support",
          description: "Get help with using Neesilo",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
      "/profile": {
        title: "Profile",
        description: "View your profile page.",
        keywords: "Neesilo, recruiter, corporate, profile",
        openGraph: {
          title: "Profile",
          description: "View your profile page.",
          url: "/jobs",
          image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
          type: "website",
        },
      },
        "/auth/login": {
          title: "Login",
          description: "Enter your details to access Neesilo",
          keywords: "jobs, photography, design, auth, login",
          openGraph: {
            title: "Login",
            description: "Enter your details to access Neesilo",
            url: "/jobs",
            image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
            type: "website",
          },
        },
        "/auth/welcome": {
          title: "Welcome",
          description: "Choose how you would like to proceed",
          keywords: "jobs, photography, design, auth, welcome",
          openGraph: {
            title: "Welcome",
            description: "Choose how you would like to proceed",
            url: "/jobs",
            image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
            type: "website",
          },
        },
        "/auth/sign-up": {
          title: "Sign Up",
          description: "Complete the form to get started with Neesilo",
          keywords: "jobs, photography, design, auth, sign-up, register",
          openGraph: {
            title: "Sign Up",
            description: "Complete the form to get started with Neesilo",
            url: "/jobs",
            image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
            type: "website",
          },
        },
        "/auth/forgot-password": {
          title: "Forgot Password",
          description: "Recover your Neesilo account here.",
          keywords: "jobs, photography, design, auth, forgot-password, forgot, password",
          openGraph: {
            title: "Forgot Password",
            description: "Recover your Neesilo account here.",
            url: "/jobs",
            image: "https://neesilo-corporate-recruiter.vercel.app/og_image.png",
            type: "website",
          },
        },
    };

    // Find the most specific route title that matches
    const title = Object.keys(routeTitles)
        .reverse()
        .find(route => pathname.startsWith(route));

    return routeTitles[title as keyof typeof routeTitles] || "Default Title";
};

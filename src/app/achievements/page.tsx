import type { Metadata } from "next";
import Achievements from "@/components/Achievements";

export const metadata: Metadata = {
    title: "Achievements | DJS NOVA",
    description:
        "Explore the stellar achievements and accomplishments of DJS NOVA - from award-winning events to groundbreaking research in astronomy and astrophysics.",
    keywords: [
        "achievements",
        "awards",
        "events",
        "astronomy",
        "astrophysics",
        "DJS NOVA",
    ],
    openGraph: {
        title: "Achievements | DJS NOVA",
        description:
            "Celebrate our stellar accomplishments in astronomy and astrophysics.",
        type: "website",
    },
};

export default function AchievementsPage() {
    return (
        <>
            <Achievements />
        </>
    );
}
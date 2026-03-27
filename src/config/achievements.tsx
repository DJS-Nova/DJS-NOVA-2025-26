import { Trophy, Rocket, Target, Star, Globe } from "lucide-react";

export const categoriesData = [
    { id: "all", label: "All" },
    { id: "aerospace", label: "Aerospace" },
    { id: "competition", label: "Competitions" },
    { id: "research", label: "Research" },
];

export const statsData = [
    { value: "15+", label: "Awards Won" },
    { value: "10+", label: "Projects" },
    { value: "500+", label: "Community" },
    { value: "5", label: "Global Ranks" },
];

export const achievementsData = [
    {
        id: 1,
        title: "CanSat 2026 Finalist",
        description:
            "Ranked among top international teams for autonomous canister satellite recovery.",
        category: "aerospace",
        year: "2026",
        iconName: "rocket",
    },
    // Add more mock items here
];

export const getIconComponent = (iconName: string) => {
    switch (iconName) {
        case "rocket":
            return <Rocket size={24} />;
        case "trophy":
            return <Trophy size={24} />;
        case "target":
            return <Target size={24} />;
        case "globe":
            return <Globe size={24} />;
        default:
            return <Star size={24} />;
    }
};

export const filterAchievementsByCategory = (data: any[], category: string) => {
    return category === "all"
        ? data
        : data.filter((item) => item.category === category);
};
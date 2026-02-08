import { MetadataRoute } from "next";
import { portfolioData } from "@/app/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = `https://${portfolioData.personalInfo.portfolio}`;

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/resume`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}

import { MetadataRoute } from "next";
import { portfolioData } from "@/app/data/portfolio";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
        },
        sitemap: `https://${portfolioData.personalInfo.portfolio}/sitemap.xml`,
    };
}

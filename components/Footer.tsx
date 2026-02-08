"use client";

import { Heart } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-100 dark:bg-slate-950 border-t border-neutral-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Shibin Mariyan Stanly
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        © {currentYear} All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "Warden Protocol Docs",
    tagline: "",
    favicon: "img/favicon.svg",

    // Set the production url of your site here
    url: "https://docs.wardenprotocol.org",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "warden-protocol", // Usually your GitHub org/user name.
    projectName: "wardenprotocol", // Usually your repo name.

    onBrokenLinks: "throw",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    markdown: {
        mermaid: true,
    },
    customFields: {
        markdownHooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },
    themes: ["@docusaurus/theme-mermaid"],

    presets: [
        [
            "classic",
            {
                docs: {
                    routeBasePath: "/",
                    sidebarPath: "./sidebars.ts",
                    exclude: ["**/adr-template.md"],
                },
                theme: {
                    customCss: ["./src/css/custom.css"],
                },
                gtag: {
                    trackingID: "G-E7VXFZ2CBQ",
                    anonymizeIP: true,
                },
                googleTagManager: {
                    containerId: "GTM-NN4WPW42",
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        // image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            defaultMode: "dark",
        },
        algolia: {
            appId: '3TCJS4JC6F',
            apiKey: '732e1c627088d28114b1daa89f3bb8a6',
            indexName: 'developer-docs',
            contextualSearch: true,
            insights: true,              
            // askAi: 'YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID',              
        },
        navbar: {
            title: "",
            logo: {
                alt: "Warden Protocol Logo",
                href: "/",
                src: "img/logo.svg",
                srcDark: "img/logo-dark.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "learn",
                    label: "Learn",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    sidebarId: "operateNode",
                    label: "Operate a node",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    sidebarId: "publishAgent",
                    label: "Publish an Agent",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    sidebarId: "ward",
                    label: "$WARD",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    sidebarId: "korean",
                    label: "KR",
                    position: "right"
                },
                {
                    href: "https://help.wardenprotocol.org",
                    label: "User guides",
                    position: "right",
                },
                {
                    'aria-label': 'Discord Invite',
                    'className': 'navbar--discord-link',
                    'href': 'https://discord.com/invite/wardenprotocol',
                    'position': 'right',
                },
                {
                    'aria-label': 'GitHub Repository',
                    'className': 'navbar--github-link',
                    'href': 'https://github.com/warden-protocol/wardenprotocol',
                    'position': 'right',
                },
            ],
        },

        footer: {
            copyright: `Copyright © ${new Date().getFullYear()} Warden Protocol.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;

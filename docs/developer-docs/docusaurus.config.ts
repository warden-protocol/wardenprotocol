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
    onBrokenMarkdownLinks: "warn",

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
                    sidebarId: "buildApp",
                    label: "Build an app",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    sidebarId: "buildAgent",
                    label: "Build an Agent",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    sidebarId: "buildKeychain",
                    label: "Build a Keychain",
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
                    sidebarId: "tokens",
                    label: "Tokens",
                    position: "left",
                },
                {
                    href: "https://discord.com/invite/wardenprotocol",
                    label: "Discord",
                    position: "right",
                },
                {
                    href: "https://github.com/warden-protocol/wardenprotocol",
                    label: "GitHub",
                    position: "right",
                },
                {
                    href: "https://help.wardenprotocol.org",
                    label: "SpaceWard",
                    position: "right",
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

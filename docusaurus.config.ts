import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AI for Humanity',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
url: 'https://HasnainSolangi.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
baseUrl: '/ai-for-humanity-book/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'HasnainSolangi', // Usually your GitHub org/user name.
  projectName: 'ai-for-humanity-book', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      ur: {
        label: 'اردو (Urdu)',
        direction: 'rtl', // Docusaurus automatically flips the layout for Urdu!
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false, // Disable blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
colorMode: {
      defaultMode: 'light',
      disableSwitch: false, // Shows the toggle button
      respectPrefersColorScheme: true, // Respects System Settings
    },
navbar: {
      title: 'AI for Humanity', // Keeps the text title
      logo: {
        alt: 'Logo', 
        src: 'img/favicon.png', // Ensure this file actually exists!
        srcDark: 'img/favicon.png',
      },
      items: [
        {
          to: '/docs/00-preface',
          label: 'Book',
          position: 'left',
          activeBasePath: 'docs',
        },
        // Locale Dropdown (Cleaned)
        {
          type: 'localeDropdown',
          position: 'right',
        },
        // GitHub Link (Icon style)
        {
          href: 'https://github.com/HasnainSolangi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
  style: 'dark',
  links: [
    {
      title: 'Documentation',
      items: [
        {
          label: 'Book',
          to: '/docs/00-preface',
        },
        {
          label: 'Getting Started',
          to: '/docs/00-preface',
        },
        {
          label: 'Tutorials',
          to: '/docs/00-preface',
        },
        {
          label: 'API Reference',
          to: '/docs/00-preface',
        },
      ],
    },
    {
      title: 'Community',
      items: [
        {
          label: 'GitHub',
          href: 'https://github.com/HasnainSolangi',
        },
        {
          label: 'LinkedIn',
          href: 'https://linkedin.com/in/hasnain-solangi',
        },
        {
          label: 'Twitter/X',
          href: 'https://twitter.com/HasnainSolangi',
        },
        {
          label: 'Facebook',
          href: 'https://facebook.com/HasnainSolangi',
        },
        {
          label: 'Discord',
          href: 'https://discord.gg/yourserver',
        },
        {
          label: 'Stack Overflow',
          href: 'https://stackoverflow.com/users/yourprofile',
        },
      ],
    },
    {
      title: 'Content & Blog',
      items: [
        {
          label: 'Medium Blog',
          href: 'https://medium.com/@HasnainSolangi',
        },
        {
          label: 'Dev.to',
          href: 'https://dev.to/hasnainsolangi',
        },
        {
          label: 'Hashnode',
          href: 'https://hashnode.com/@HasnainSolangi',
        },
        {
          label: 'Personal Blog',
          href: 'https://yourblog.com',
        },
        {
          label: 'YouTube',
          href: 'https://youtube.com/@HasnainSolangi',
        },
        {
          label: 'Newsletter',
          href: 'https://newsletter.yoursite.com',
        },
      ],
    },
    {
      title: 'Professional',
      items: [
        {
          label: 'Portfolio',
          href: 'https://hasnainsolangi.com',
        },
        {
          label: 'Resume/CV',
          href: 'https://hasnainsolangi.com/resume',
        },
        {
          label: 'Upwork',
          href: 'https://upwork.com/freelancers/~yourprofile',
        },
        {
          label: 'Fiverr',
          href: 'https://fiverr.com/hasnainsolangi',
        },
        {
          label: 'Toptal',
          href: 'https://toptal.com/resume/hasnain-solangi',
        },
        {
          label: 'AngelList',
          href: 'https://angel.co/u/hasnain-solangi',
        },
      ],
    },
    {
      title: 'Open Source',
      items: [
        {
          label: 'GitHub Sponsors',
          href: 'https://github.com/sponsors/HasnainSolangi',
        },
        {
          label: 'npm Packages',
          href: 'https://npmjs.com/~hasnainsolangi',
        },
        {
          label: 'PyPI Packages',
          href: 'https://pypi.org/user/HasnainSolangi',
        },
        {
          label: 'Docker Hub',
          href: 'https://hub.docker.com/u/hasnainsolangi',
        },
        {
          label: 'Open Collective',
          href: 'https://opencollective.com/hasnainsolangi',
        },
      ],
    },
    {
      title: 'Learning & Teaching',
      items: [
        {
          label: 'Udemy Courses',
          href: 'https://udemy.com/user/hasnain-solangi',
        },
        {
          label: 'Coursera',
          href: 'https://coursera.org/instructor/hasnainsolangi',
        },
        {
          label: 'Khan Academy',
          href: 'https://khanacademy.org/profile/hasnainsolangi',
        },
        {
          label: 'freeCodeCamp',
          href: 'https://freecodecamp.org/hasnainsolangi',
        },
        {
          label: 'Codecademy',
          href: 'https://codecademy.com/profiles/hasnainsolangi',
        },
      ],
    },
    {
      title: 'Design & Creative',
      items: [
        {
          label: 'Dribbble',
          href: 'https://dribbble.com/HasnainSolangi',
        },
        {
          label: 'Behance',
          href: 'https://behance.net/HasnainSolangi',
        },
        {
          label: 'Figma Community',
          href: 'https://figma.com/@hasnainsolangi',
        },
        {
          label: 'CodePen',
          href: 'https://codepen.io/HasnainSolangi',
        },
        {
          label: 'Awwwards',
          href: 'https://awwwards.com/HasnainSolangi',
        },
      ],
    },
    {
      title: 'Tech Communities',
      items: [
        {
          label: 'Reddit Profile',
          href: 'https://reddit.com/user/HasnainSolangi',
        },
        {
          label: 'Hacker News',
          href: 'https://news.ycombinator.com/user?id=HasnainSolangi',
        },
        {
          label: 'Product Hunt',
          href: 'https://producthunt.com/@hasnain_solangi',
        },
        {
          label: 'Indie Hackers',
          href: 'https://indiehackers.com/HasnainSolangi',
        },
        {
          label: 'Showwcase',
          href: 'https://showwcase.com/hasnainsolangi',
        },
      ],
    },
    {
      title: 'Contact & Support',
      items: [
        {
          label: 'Email',
          href: 'mailto:hasnain@example.com',
        },
        {
          label: 'Calendly',
          href: 'https://calendly.com/hasnainsolangi',
        },
        {
          label: 'Buy Me a Coffee',
          href: 'https://buymeacoffee.com/hasnainsolangi',
        },
        {
          label: 'Ko-fi',
          href: 'https://ko-fi.com/hasnainsolangi',
        },
        {
          label: 'Patreon',
          href: 'https://patreon.com/HasnainSolangi',
        },
      ],
    },
    {
      title: 'More Platforms',
      items: [
        {
          label: 'Instagram',
          href: 'https://instagram.com/HasnainSolangi',
        },
        {
          label: 'TikTok',
          href: 'https://tiktok.com/@hasnainsolangi',
        },
        {
          label: 'Twitch',
          href: 'https://twitch.tv/HasnainSolangi',
        },
        {
          label: 'Spotify Podcasts',
          href: 'https://open.spotify.com/show/yourpodcast',
        },
        {
          label: 'Apple Podcasts',
          href: 'https://podcasts.apple.com/podcast/yourpodcast',
        },
        {
          label: 'Substack',
          href: 'https://hasnainsolangi.substack.com',
        },
      ],
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} Hasnain Ahmed`,
},
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

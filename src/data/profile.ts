/**
 * Single source of truth for the site's content.
 * The home page, 404 page, meta tags, search-engine data and social preview image all read from it.
 */

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  /** One short line shown on the link card. */
  description?: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  company: string;
  intro: string;
  sourceUrl: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: 'Ben Hopkins',
  handle: 'benhopkinstech',
  role: 'Lead Software Engineer',
  company: 'Lloyds Banking Group',
  intro:
    "I build backend systems and love squeezing every bit of performance out of them. I'm also exploring how AI is reshaping the way we build software.",
  sourceUrl: 'https://github.com/benhopkinstech/ben.hopkins.tech',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/benhopkinstech/',
      handle: '/in/benhopkinstech',
      description: 'Career history and professional updates.',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/benhopkinstech',
      handle: '@benhopkinstech',
      description: 'Code, side projects and experiments.',
    },
    {
      label: 'X',
      href: 'https://x.com/benhopkinstech',
      handle: '@benhopkinstech',
      description: 'Quick thoughts on software and tech.',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@benhopkinstech',
      handle: '@benhopkinstech',
      description: 'Videos, when I get round to making them.',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/benhopkinstech/',
      handle: '@benhopkinstech',
      description: 'Life away from the keyboard?',
    },
    {
      label: 'Email',
      href: 'mailto:ben@hopkins.tech',
      handle: 'ben@hopkins.tech',
      description: 'The best way to reach me directly.',
    },
  ],
};

/** True for `mailto:` links, which open the mail app rather than a website. */
export const isEmail = (link: SocialLink) => link.href.startsWith('mailto:');

const siteNames = profile.socials.filter((s) => !isEmail(s)).map((s) => s.label);
const siteList = new Intl.ListFormat('en-GB', { type: 'conjunction' }).format(siteNames);
const hasEmail = profile.socials.some(isEmail);

/** Search-result snippet. Built from the fields above so it stays accurate. */
export const metaDescription =
  `${profile.name}, ${profile.role} at ${profile.company}.` +
  (siteNames.length ? ` Find me on ${siteList}${hasEmail ? ', or by email' : ''}.` : hasEmail ? ' Find me by email.' : '');

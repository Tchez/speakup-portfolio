import type { APIRoute } from 'astro';
import { channels, copy, partners, site, type Locale } from '../data/site';

// /llms.txt (llmstxt.org): a plain-Markdown summary for AI assistants, built from the same copy as the page
// so the facts can never drift from what the site says.
const plain = (text: string) => text.replaceAll('**', '');

// llmstxt.org allows one H1, so the English half nests one level down.
const section = (locale: Locale, h = '##') => {
  const t = copy[locale];
  const pt = locale === 'pt';
  return [
    `${h} ${pt ? 'O que é' : 'What it is'}`,
    `- ${plain(t.hero.lead)}`,
    `- ${plain(t.about.heading)} ${plain(t.about.body)}`,
    `- ${plain(t.mission.label)}: ${plain(t.mission.body)}`,
    '',
    `${h} ${t.meetups.heading}`,
    `- ${plain(t.meetups.body)}`,
    ...t.meetups.facts.map((fact) => `- ${fact.big}: ${fact.small}`),
    `- ${t.meetups.certificate.big}: ${t.meetups.certificate.small}`,
    `- ${plain(t.audience.lead)}`,
    '',
    `${h} ${t.volunteer.heading}`,
    `- ${plain(t.volunteer.body)} ${plain(t.volunteer.hours)}`,
    '',
    `${h} ${t.partnersSection.heading}`,
    ...partners.map((partner) => `- ${partner.name} (${partner.role[locale]}): ${partner.perks[locale].map(plain).join('; ')}`),
  ].join('\n');
};

export const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${copy.pt.description}
> ${copy.en.description}

${section('pt')}

## Links
- Site (PT): ${site.url}
- Site (EN): ${site.url}en/
- Instagram (${channels.instagramHandle}), novidades e próximo encontro: ${channels.instagram}
- WhatsApp: ${channels.whatsapp}
- Discord: ${channels.discord}
- LinkedIn: ${channels.linkedin}
- ${copy.pt.volunteer.heading}: ${channels.volunteerForm}
- E-mail (parcerias): ${channels.email}
- Fundador: ${site.founder.name} (${site.founder.url})

## In English

${section('en', '###')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

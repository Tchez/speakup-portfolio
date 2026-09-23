import type { ImageMetadata } from 'astro';
import photo01 from '../assets/photos/encontro-01.jpg';
import photo04 from '../assets/photos/encontro-04.jpg';
import photo16 from '../assets/photos/encontro-16.jpg';
import photo17 from '../assets/photos/encontro-17.jpg';
import photoSpookUp from '../assets/photos/spookup.jpg';
import photoDublin from '../assets/photos/dublin.jpg';
import poster01 from '../assets/videos/encontro-01.jpg';
import poster04 from '../assets/videos/encontro-04.jpg';
import poster16 from '../assets/videos/encontro-16.jpg';
import poster17 from '../assets/videos/encontro-17.jpg';
import posterDublin from '../assets/videos/dublin.jpg';
import posterSpookParade from '../assets/videos/halloween-desfile.jpg';
import posterSpookMeetup from '../assets/videos/halloween-encontro.jpg';

export type Locale = 'pt' | 'en';
export type Localized<T = string> = Record<Locale, T>;

export const locales: Locale[] = ['pt', 'en'];
export const htmlLang: Localized = { pt: 'pt-BR', en: 'en' };
export const homePath: Localized = { pt: '/', en: '/en/' };

export const site = {
  url: 'https://speakup.tchez.dev/',
  name: 'SpeakUp Community',
  shortName: 'SpeakUp',
  logo: '/speakup-round.png',
  foundingDate: '2025-01',
  founder: { name: 'Marco Netto', url: 'https://tchez.dev/' },
};

/** Exact channel URLs from SPEC 001 — the validation script checks them. */
export const channels = {
  instagram: 'https://www.instagram.com/speakup_cmty/',
  instagramHandle: '@speakup_cmty',
  whatsapp: 'https://chat.whatsapp.com/FI9mvqI9z1CAyjZFEXLpGu',
  discord: 'https://discord.gg/azsgD8T5tP',
  linkedin: 'https://www.linkedin.com/company/speakup-cmty',
  volunteerForm: 'https://docs.google.com/forms/d/e/1FAIpQLSc-VSmezGF7007Vds1O1p270gA2M3Ez_EpJNZ2dtKs2APDg3Q/viewform',
  email: 'speakup.palmas@gmail.com',
};

export interface Partner {
  name: string;
  /** Short role shown as the card label. */
  role: Localized;
  /** What the partnership means in practice, one line each. */
  perks: Localized<string[]>;
}

export const partners: Partner[] = [
  {
    name: 'Wizard Palmas',
    role: { pt: 'Escola de idiomas', en: 'Language school' },
    perks: {
      pt: ['**Desconto na matrícula e no curso** para quem vem pelo SpeakUp', 'Emite os certificados de horas complementares', 'Apoio em eventos temáticos, como o SpookUp (Halloween)'],
      en: ['**Discounted enrollment and course fees** for people who come through SpeakUp', 'Issues the complementary-hours certificates', 'Support for themed events, like SpookUp (Halloween)'],
    },
  },
  {
    name: 'Bee Cool Hostel',
    role: { pt: 'Local dos encontros', en: 'Where we meet' },
    perks: {
      pt: ['Onde acontece a maioria dos nossos encontros presenciais', 'Descontos em drinks e comidas para quem vai ao SpeakUp'],
      en: ['Where most of our in-person meetups take place', 'Discounts on drinks and food for SpeakUp participants'],
    },
  },
];

export interface PhotoItem {
  type: 'photo';
  src: ImageMetadata;
  alt: Localized;
}

export interface VideoItem {
  type: 'video';
  /** YouTube video ID (the part after `watch?v=` or `shorts/`). */
  youtubeId: string;
  /** Instagram Reels / YouTube Shorts are vertical (9:16); regular videos are horizontal (16:9). */
  orientation: 'vertical' | 'horizontal';
  /** Short, name-free description, used as the play button label. */
  title: Localized;
  /** Optional local cover image; defaults to YouTube's thumbnail. */
  poster?: ImageMetadata;
}

export type MediaItem = PhotoItem | VideoItem;

/** "Nossos encontros" carousel: meetup photos and YouTube videos, in display order. */
// Photos: converted from the owner's HEIC originals, EXIF/GPS stripped. Alt text describes the scene, never names.
const photos = {
  meetup17: { type: 'photo', src: photo17, alt: {
    pt: 'Grupo reunido à noite no terraço de tijolos, no 17º encontro presencial',
    en: 'Group gathered at night on the brick terrace at the 17th in-person meetup' } },
  spookUp: { type: 'photo', src: photoSpookUp, alt: {
    pt: 'Participantes fantasiados comemorando no salão do SpookUp, a edição de Halloween',
    en: 'Participants in costume celebrating in the hall at SpookUp, the Halloween edition' } },
  dublin: { type: 'photo', src: photoDublin, alt: {
    pt: 'Participantes reunidos em um escritório na edição internacional em Dublin, na Irlanda',
    en: 'Participants gathered in an office at the international edition in Dublin, Ireland' } },
  meetup16: { type: 'photo', src: photo16, alt: {
    pt: 'Foto em grupo à noite, diante de uma parede de tijolos, no 16º encontro presencial',
    en: 'Group photo at night in front of a brick wall at the 16th in-person meetup' } },
  meetup04: { type: 'photo', src: photo04, alt: {
    pt: 'Grupo acenando para a câmera em um salão, no 4º encontro presencial',
    en: 'Group waving at the camera in a hall at the 4th in-person meetup' } },
  meetup01: { type: 'photo', src: photo01, alt: {
    pt: 'Participantes sorrindo ao redor de mesas de madeira ao ar livre, no 1º encontro presencial',
    en: 'Participants smiling around wooden tables outdoors at the 1st in-person meetup' } },
} satisfies Record<string, PhotoItem>;

// Covers are the videos' own vertical YouTube thumbnails, stored locally so nothing loads from Google before a click.
const videos = {
  meetup17: { type: 'video', youtubeId: '2v_NdWnzJNc', orientation: 'vertical', poster: poster17,
    title: { pt: '17º encontro presencial', en: '17th in-person meetup' } },
  spookParade: { type: 'video', youtubeId: 'pXw4dqYqHiE', orientation: 'vertical', poster: posterSpookParade,
    title: { pt: 'Desfile de fantasias no SpookUp, a edição de Halloween', en: 'Costume parade at SpookUp, the Halloween edition' } },
  dublin: { type: 'video', youtubeId: '-SuPf2xw9PM', orientation: 'vertical', poster: posterDublin,
    title: { pt: 'Edição internacional em Dublin, na Irlanda', en: 'International edition in Dublin, Ireland' } },
  spookMeetup: { type: 'video', youtubeId: '9z1LW9mdR_4', orientation: 'vertical', poster: posterSpookMeetup,
    title: { pt: '1º SpookUp, a edição de Halloween', en: 'The first SpookUp, our Halloween edition' } },
  meetup16: { type: 'video', youtubeId: 'Ye-8IZUrxxA', orientation: 'vertical', poster: poster16,
    title: { pt: '16º encontro presencial: dinâmica Guess My Role', en: '16th in-person meetup: the Guess My Role game' } },
  meetup01: { type: 'video', youtubeId: 'mtzZ51Rx4tg', orientation: 'vertical', poster: poster01,
    title: { pt: '1º encontro presencial do SpeakUp', en: 'SpeakUp’s first in-person meetup' } },
  meetup04: { type: 'video', youtubeId: '9xKB7x6U3r8', orientation: 'vertical', poster: poster04,
    title: { pt: '4º encontro presencial', en: '4th in-person meetup' } },
} satisfies Record<string, VideoItem>;

/** Display order (owner's): each edition's photo, then its video(s) — SpookUp, 17º, Dublin, 16º, 4º, 1º. */
export const media: MediaItem[] = [
  photos.spookUp, videos.spookParade, videos.spookMeetup,
  photos.meetup17, videos.meetup17,
  photos.dublin, videos.dublin,
  photos.meetup16, videos.meetup16,
  photos.meetup04, videos.meetup04,
  photos.meetup01, videos.meetup01,
];

/** Text wrapped in `**…**` renders as a red keyword. */
export const copy = {
  pt: {
    title: 'SpeakUp Community — Comunidade gratuita para praticar inglês em Palmas (TO)',
    description: 'Comunidade gratuita de conversação em inglês em Palmas, Tocantins. Venha praticar inglês em encontros mensais, sem julgamento e para todos os níveis.',
    skip: 'Pular para o conteúdo',
    deck: { index: 'Índice', home: 'Início' },
    languageSwitch: { label: 'English', short: 'EN', aria: 'Read this page in English' },
    nav: { about: 'Quem somos', meetups: 'Encontros', volunteer: 'Voluntários', partners: 'Parceiros' },
    hero: {
      label: 'SpeakUp Community · Palmas – TO',
      lead: 'Uma comunidade para praticar inglês sem pressão e sem julgamentos.',
      points: ['Encontros mensais e **gratuitos**', 'Todos os níveis são bem-vindos'],
      cta: 'Fique por dentro no Instagram',
      logoAlt: 'Logo do SpeakUp Community',
    },
    agenda: { label: 'Sumário', heading: 'O que você encontra aqui' },
    // One idea per slide: label (section name) → large statement → one supporting paragraph.
    about: {
      label: 'Quem somos',
      heading: 'Uma comunidade gratuita e sem fins lucrativos.',
      body: 'Organizamos encontros voltados para a prática da **conversação em inglês**. Aqui, aprendemos juntos, compartilhamos experiências e nos apoiamos no aprendizado do idioma diariamente!',
    },
    mission: {
      label: 'Nossa missão',
      heading: 'Fazer as pessoas falarem inglês.',
      body: 'Criar oportunidades para praticar inglês **gratuitamente**, com **interações reais**, sem precisar sair do **Brasil**, ganhar confiança e criar conexões. Sempre num ambiente **agradável e livre de julgamentos**.',
    },
    values: {
      heading: 'Nossos valores',
      items: [
        { name: 'Acolhimento', text: 'Criar um ambiente em que as pessoas se sintam confortáveis para participar, independentemente do nível de inglês.' },
        { name: 'Respeito', text: 'Respeitar diferenças culturais, opiniões e os limites de cada participante.' },
        { name: 'Colaboração', text: 'Incentivar a troca de conhecimentos e a ajuda mútua entre os participantes.' },
        { name: 'Acessibilidade', text: 'Reduzir barreiras que dificultem a participação das pessoas na comunidade.' },
        { name: 'Diversidade', text: 'Valorizar diferentes experiências, culturas e formas de expressão.' },
      ],
    },
    meetups: {
      heading: 'Como funcionam os encontros',
      body: 'Um ambiente descontraído para conversar em inglês, com debates, jogos e dinâmicas em grupo. Dá para chegar sem conhecer ninguém, conhecer várias pessoas e errar sem medo.',
      facts: [
        { big: '1× por mês', small: 'geralmente no Bee Cool Hostel, em Palmas – TO' },
        { big: '100% gratuito', small: 'sem custo nenhum' },
        { big: 'Todos os níveis', small: 'do iniciante ao avançado' },
        { big: 'Edições temáticas', small: 'como o SpookUp (Halloween) e a Summer Edition' },
      ],
      certificate: { big: 'Horas complementares', small: 'certificado de participação' },
      cta: 'Ver o próximo encontro no Instagram',
    },
    audience: {
      heading: 'Por que participar?',
      lead: 'A melhor forma de aprender inglês é praticando, e dá para fazer isso sem sair de Palmas. **Qualquer pessoa pode participar**, de qualquer nível, estudando na escola, no curso ou por conta própria.',
      items: [
        'Praticar e melhorar seu inglês',
        'Ganhar horas complementares',
        'Ganhar confiança para se comunicar',
        'Fazer novas amizades',
        'Destacar-se profissionalmente',
        'Expandir suas oportunidades',
      ],
      cta: 'Quero participar',
    },
    photos: { heading: 'Nossos encontros', lead: 'Fotos e vídeos de encontros passados.', prev: 'Anterior', next: 'Próximo', play: 'Assistir ao vídeo', region: 'Fotos e vídeos dos encontros' },
    volunteer: {
      heading: 'Apoie nossa comunidade',
      body: 'São os voluntários que fazem os encontros acontecerem: criando atividades e dinâmicas, ajudando na organização e logística e, principalmente, no marketing. Você ajuda quando e o quanto puder, ganha experiência prática, pratica o inglês e ainda faz networking.',
      hours: 'E, além de apoiar o projeto, você ainda ganha **horas complementares**.',
      cta: 'Quero ser voluntário',
    },
    partnersSection: {
      heading: 'Parceiros',
      lead: 'Quem caminha com a gente para levar a conversação em inglês a mais pessoas.',
      join: 'Quer ser parceiro do SpeakUp?',
      cta: 'Fale com a gente por e-mail',
    },
    links: {
      heading: 'Fale com a gente',
      // Every card: one-line name + one-line description (same shape, same height).
      items: {
        instagram: { label: 'Instagram', hint: 'Novidades e encontros' },
        whatsapp: { label: 'WhatsApp', hint: 'Grupo da comunidade' },
        discord: { label: 'Discord', hint: 'Conversas online' },
        linkedin: { label: 'LinkedIn', hint: 'Página da comunidade' },
        volunteerForm: { label: 'Voluntariado', hint: 'Formulário de inscrição' },
        email: { label: 'E-mail', hint: 'Parcerias' },
      },
      newTab: '(abre em nova aba)',
    },
    footer: {
      signature: 'Let’s SpeakUp!',
      tagline: 'Comunidade gratuita e sem fins lucrativos de conversação em inglês · Palmas – TO',
      credit: 'Criado por',
    },
  },
  en: {
    title: 'SpeakUp Community — Free English conversation community in Palmas, Brazil',
    description: 'Free English conversation community in Palmas, Tocantins, Brazil. Practice English at monthly in-person meetups. All levels welcome, no judgment.',
    skip: 'Skip to content',
    deck: { index: 'Index', home: 'Home' },
    languageSwitch: { label: 'Português', short: 'PT', aria: 'Ler esta página em português' },
    nav: { about: 'About', meetups: 'Meetups', volunteer: 'Volunteer', partners: 'Partners' },
    hero: {
      label: 'SpeakUp Community · Palmas – TO',
      lead: 'A community to practice English with no pressure and no judgment.',
      points: ['**Free** monthly meetups', 'All levels are welcome'],
      cta: 'Stay in the loop on Instagram',
      logoAlt: 'SpeakUp Community logo',
    },
    agenda: { label: 'Contents', heading: 'What you’ll find here' },
    about: {
      label: 'Who we are',
      heading: 'A free, non-profit community.',
      body: 'We organize meetups focused on practicing **English conversation**. Here, we learn together, share experiences and support each other in learning the language every day!',
    },
    mission: {
      label: 'Our mission',
      heading: 'Getting people to speak English.',
      body: 'To create opportunities to practice English **for free**, through **real interactions**, without leaving **Brazil**, build confidence and make connections. Always in a **welcoming, judgment-free** environment.',
    },
    values: {
      heading: 'Our values',
      items: [
        { name: 'Welcome', text: 'Create an environment where people feel comfortable taking part, whatever their English level.' },
        { name: 'Respect', text: 'Respect cultural differences, opinions and each participant’s boundaries.' },
        { name: 'Collaboration', text: 'Encourage knowledge sharing and mutual help among participants.' },
        { name: 'Accessibility', text: 'Reduce the barriers that make it harder for people to take part in the community.' },
        { name: 'Diversity', text: 'Value different experiences, cultures and ways of expressing oneself.' },
      ],
    },
    meetups: {
      heading: 'How meetups work',
      body: 'A relaxed place to talk in English, with debates, games and group activities. You can come without knowing anyone, meet lots of people and make mistakes without fear.',
      facts: [
        { big: 'Once a month', small: 'usually at Bee Cool Hostel, in Palmas – TO' },
        { big: '100% free', small: 'no cost at all' },
        { big: 'All levels', small: 'from beginner to advanced' },
        { big: 'Themed editions', small: 'like SpookUp (Halloween) and the Summer Edition' },
      ],
      certificate: { big: 'Complementary hours', small: 'certificate of participation' },
      cta: 'See the next meetup on Instagram',
    },
    audience: {
      heading: 'Why join?',
      lead: 'The best way to learn English is to practice it, and you can do that without leaving Palmas. **Anyone can join**, at any level, whether you study at school, in a course or on your own.',
      items: [
        'Practice and improve your English',
        'Earn complementary hours',
        'Gain confidence to communicate',
        'Make new friends',
        'Stand out professionally',
        'Expand your opportunities',
      ],
      cta: 'I want to join',
    },
    photos: { heading: 'Our meetups', lead: 'Photos and videos from past meetups.', prev: 'Previous', next: 'Next', play: 'Watch the video', region: 'Meetup photos and videos' },
    volunteer: {
      heading: 'Support our community',
      body: 'Volunteers are the ones who make meetups happen: creating activities and games, helping with organization and logistics and, above all, with marketing. You help when and as much as you can, gain hands-on experience, practice your English and build your network.',
      hours: 'And on top of supporting the project, you also earn **complementary hours**.',
      cta: 'Sign up to volunteer',
    },
    partnersSection: {
      heading: 'Partners',
      lead: 'The people walking with us to bring English conversation to more people.',
      join: 'Want to partner with SpeakUp?',
      cta: 'Email us',
    },
    links: {
      heading: 'Get in touch',
      items: {
        instagram: { label: 'Instagram', hint: 'News and meetups' },
        whatsapp: { label: 'WhatsApp', hint: 'Community group' },
        discord: { label: 'Discord', hint: 'Online conversations' },
        linkedin: { label: 'LinkedIn', hint: 'Community page' },
        volunteerForm: { label: 'Volunteering', hint: 'Sign-up form' },
        email: { label: 'Email', hint: 'Partnerships' },
      },
      newTab: '(opens in a new tab)',
    },
    footer: {
      signature: 'Let’s SpeakUp!',
      tagline: 'Free, non-profit English conversation community · Palmas – TO, Brazil',
      credit: 'Created by',
    },
  },
} satisfies Localized<unknown>;

/** Escape HTML, then turn `**text**` into a red keyword. */
export function rich(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="kw">$1</strong>');
}

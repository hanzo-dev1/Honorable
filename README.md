# davidoganah.com

Personal portfolio for David Oganah, AI Automation Engineer and founder of
SabiFlow. Built as a single-page site covering services, selected work,
process, and contact.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + TypeScript (strict mode)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Lucide React](https://lucide.dev) for icons
- [pnpm](https://pnpm.io) as package manager
- Deployed on [Vercel](https://vercel.com)

## Local development

```bash
pnpm install       # install dependencies
pnpm dev           # start the dev server at http://localhost:3000
pnpm lint          # run ESLint
pnpm build         # production build
pnpm start         # run the production build locally
```

## Project structure

```
src/
  app/            # routes, layout, metadata, robots/sitemap
  components/
    ui/           # primitives: Button, Container, Section, Badge
    sections/     # page sections: Nav, Hero, About, Services, Stack,
                   # Work, Process, Contact, Footer
    providers/    # client-only context providers (MotionProvider)
  content/        # typed content data (services, projects, stack)
  lib/            # utils (cn helper, nav links)
```

## Deploy

Deployed on Vercel, connected to this repo's main branch for automatic
deploys on push. To deploy manually from the CLI:

```bash
pnpm dlx vercel        # preview deploy
pnpm dlx vercel --prod # production deploy
```

Domain: `davidoganah.com`, configured in the Vercel dashboard under
Project Settings → Domains.

## Credits

Built by David Oganah. Architected and implemented with Claude.

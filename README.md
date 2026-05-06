# Flashpoint

Website for Flashpoint Gallery & Community Space — a South Philly home for outsider art and community gatherings at 1226 Tasker St, Philadelphia PA.

## Stack

Vanilla HTML, CSS, and JavaScript. No framework, no build tools, no dependencies. Open a file and it works.

## Structure

```
flashpoint/
├── index.html
├── about.html
├── events.html
├── gallery.html
├── connect.html
├── _headers              # Netlify security headers
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── images/           # Hero, exhibition, and work photos
│   └── icons/            # Favicon and PWA icons
├── css/
│   ├── base/             # variables, reset, typography, animations
│   ├── components/       # nav, footer, button, page-header, audio-player
│   └── pages/            # home, about, events, gallery, connect
└── js/
    ├── components/       # nav, footer, audio-player
    ├── pages/            # page-specific logic
    └── utils/            # animate, seo
```

## Running locally

No build step required. Open any `.html` file directly in a browser, or serve the root with any static server:

```bash
npx serve .
# or
python3 -m http.server
```

## Deployment

Hosted on Netlify. Push to `main` and Netlify deploys automatically. Security headers are configured in `_headers`.

## Before going live

These placeholders need real values before launch:

| Placeholder | File | What to replace |
|---|---|---|
| `MAILING_FORM_ID` | `connect.html` | Formspree form ID for mailing list |
| `EVENT_FORM_ID` | `connect.html` | Formspree form ID for event inquiries |
| `href="#"` on Signal button | `connect.html` | Real Signal group invite link |
| `flashpointphilly.com` | all HTML, `sitemap.xml`, `seo.js` | Real domain once purchased |
| `assets/images/` | all HTML | Real photos (hero, exhibition, works) |
| `assets/icons/` | `site.webmanifest` | Favicon and PWA icons (192×192, 512×512 PNG) |
| `assets/images/og-image.jpg` | all HTML | OG image for social sharing (1200×630) |

## CSS conventions

- BEM methodology throughout
- All values in `px` — no `rem`
- Design tokens defined in `css/base/variables.css`
- Dark sections use `--color-black` (`#0d0d0d`), light sections use `--color-white` (`#f4f2ee`)

## Contact

flashpointphilly@gmail.com

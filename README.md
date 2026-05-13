# Flashpoint
 
Website for **Flashpoint Gallery & Community Space** — a South Philly home for outsider art and community gatherings at 1226 Tasker St, Philadelphia PA.
 
---
 
## Stack
 
Vanilla HTML, CSS, and JavaScript. No framework, no build tools, no dependencies. Open a file and it works.
 
---
 
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
 
---
 
## Key Features
 
### Black & White Gallery
The site uses a stark, high-contrast black-and-white design language — dark sections rendered in `#0d0d0d`, light sections in `#f4f2ee` — that puts the art front and center. A subtle rainbow animation adds a single thread of color, providing just enough warmth without compromising the gallery aesthetic.
 
### Live Jazz Radio Player
A live WRTI Philadelphia jazz stream plays from a persistent audio player pinned to the bottom of every page. The player state is saved to `localStorage`, so music continues uninterrupted as visitors navigate between pages or switch browser tabs.
 
### Contact & Exhibit Scheduling Forms
Two forms are handled via [Formspree](https://formspree.io):
- **Contact Us** — general inquiries (`connect.html`, form ID: `MAILING_FORM_ID`)
- **Schedule an Exhibit** — event and exhibition requests (`connect.html`, form ID: `EVENT_FORM_ID`)
No backend required — submissions go directly to your inbox.
 
### Admin Panel
A password-protected admin feature lets registered gallery owners log in to:
- Upload new exhibition photos to the gallery
- Post and update calendar events
Credentials are managed client-side; no server infrastructure required.
 
---
 
## Running Locally
 
No build step required. Open any `.html` file directly in a browser, or serve the root with any static server:
 
```bash
npx serve .
# or
python3 -m http.server
```
 
---
 
## Deployment
 
Hosted on Netlify. Push to `main` and Netlify deploys automatically. Security headers are configured in `_headers`.
 
---
 
## Before Going Live
 
These placeholders need real values before launch:
 
| Placeholder                  | File                                | What to Replace                                |
| ---------------------------- | ----------------------------------- | ---------------------------------------------- |
| `MAILING_FORM_ID`            | `connect.html`                      | Formspree form ID for the contact form         |
| `EVENT_FORM_ID`              | `connect.html`                      | Formspree form ID for exhibit scheduling       |
| `href="#"` on Signal button  | `connect.html`                      | Real Signal group invite link                  |
| `flashpointphilly.com`       | all HTML, `sitemap.xml`, `seo.js`   | Real domain once purchased                     |
| `assets/images/`             | all HTML                            | Real photos (hero, exhibition, works)          |
| `assets/icons/`              | `site.webmanifest`                  | Favicon and PWA icons (192×192, 512×512 PNG)   |
| `assets/images/og-image.jpg` | all HTML                            | OG image for social sharing (1200×630 px)      |
| Admin credentials            | `js/pages/admin.js` (or equivalent) | Secure owner login for gallery/calendar access |
 
---
 
## CSS Conventions
 
- BEM methodology throughout
- Design tokens defined in `css/base/variables.css`
- Dark sections use `--color-black` (`#0d0d0d`), light sections use `--color-white` (`#f4f2ee`)
---
 
## Contact
 
[flashpointphilly@gmail.com](mailto:flashpointphilly@gmail.com)

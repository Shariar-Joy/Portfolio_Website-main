# Shariar Nazim Joy — Portfolio

A responsive, buildless portfolio made with HTML, CSS, and JavaScript. It presents selected projects, education, technical skills, certifications, community involvement, and a downloadable CV.

## Local preview

Run this command from this directory, then visit http://localhost:5500:

```sh
python -m http.server 5500 --bind 127.0.0.1
```

No package installation or build step is required. The site can also be opened directly through `index.html`.

## Updating the portfolio

- Update copy, project links, and technology lists in `index.html`.
- Update the visual design in `css/style.css` and interactions in `js/main.js`.
- Replace `assets/Shariar_CV.pdf` to update every CV link.
- The four main projects follow the supplied CV. Additional GitHub projects appear under “A little more exploring.”
- Marketplace, cattle management, and voice assistant artwork is illustrative. The Agri Inventory image is an existing project screenshot.
- Contact uses real email, phone, LinkedIn, and GitHub links; there is no backend contact form.

## Publishing

Deploy this directory as a static site. Use no build command, and set the publish directory to `.` when this folder is the deployment root. If deploying from the parent repository, use `Protfolio_Website` as the publish directory.

The nested `Portfolio-Website-Template-main` folder and old vendor assets are retained as legacy files. The redesigned root page only loads `css/style.css`, `js/main.js`, its images, and the CV. Google Fonts is optional; system fonts are used if it is unavailable.

## Accessibility and motion

The page includes keyboard navigation, a skip link, accessible filter buttons, native project details, mobile navigation, visible focus indicators, and support for reduced motion. Main content and all projects remain available without JavaScript.

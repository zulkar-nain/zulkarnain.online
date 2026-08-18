# Zulkar Nain Portfolio

A polished, responsive one-page portfolio website for Zulkar Nain built with HTML, CSS, and vanilla JavaScript.

## Structure

- `index.html` — page structure and content
- `style.css` — visual design, responsive layout, and animations
- `script.js` — theme toggle, mobile menu, and reveal-on-scroll behavior
- `CNAME` — custom domain configuration for GitHub Pages
- `birthdaywish/index.html` — public birthday celebration board
- `birthdaywish/hbdPersonname.html` — duplicate-and-edit birthday wish template
- `birthdaywish/birthday.css` and `birthdaywish/birthday.js` — birthday page styling and interactions

## Features

- Responsive layout for mobile, tablet, and desktop
- Sticky navigation with mobile menu
- Light/dark theme toggle using local storage
- Accessible semantics, visible focus states, and reduced-motion support
- Static deployment compatible with GitHub Pages

## Birthday Wishes

The birthday pages are intentionally not linked from the portfolio homepage. To add a wish, duplicate `birthdaywish/hbdPersonname.html`, rename it using the `hbd[Personname].html` pattern, replace the name, date, image, and message in the marked edit areas, then add a matching entry to `birthdaywish/index.html`. Store each person's image in `birthdaywish/images/` and update the image path in their page.

## Local Preview

Open `index.html` directly in a browser or serve the folder with a static server.

Example:

```bash
python -m http.server 8000
```

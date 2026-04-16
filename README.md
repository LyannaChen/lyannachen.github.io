# Personal website — GitHub Pages deployment

This repository contains a static personal site. To deploy on GitHub Pages as a user site (username.github.io):

1. Rename the repo on GitHub to `USERNAME.github.io` (replace `USERNAME`).
2. Ensure `index.html` is at the repository root (already present).
3. Push the repository to GitHub and the `main` branch.

Example commands (replace `USERNAME` and `EMAIL`):

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

A GitHub Actions workflow (`.github/workflows/pages.yml`) is included and will automatically deploy the site when you push to `main`.

After the push, your site will be available at `https://USERNAME.github.io` (it may take a minute to publish).

If you prefer a project site (not a user site), create a regular repo and configure Pages accordingly or use the `gh-pages` branch.

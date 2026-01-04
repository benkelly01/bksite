# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Hugo (static site generator) and deployed to GitHub Pages. The site uses a custom minimal theme located in `themes/minimal/`.

## Common Commands

```bash
# Run development server with drafts enabled
hugo server -D

# Build for production (output in public/)
hugo --minify

# Create new blog post
hugo new content posts/my-new-post.md
```

## Architecture

### Content Structure

- `content/posts/` - Blog posts in markdown format
- `content/about.md` - About page
- `archetypes/default.md` - Template for new content files

### Theme Structure (`themes/minimal/`)

The site uses a custom theme with a simple layout hierarchy:

- `layouts/_default/baseof.html` - Base template, defines overall HTML structure
- `layouts/_default/single.html` - Single page/post template
- `layouts/_default/list.html` - List template for post indexes
- `layouts/index.html` - Homepage template
- `layouts/partials/` - Reusable template fragments (head, header, footer)
- `static/css/` - Static CSS files
- `assets/css/` - CSS assets processed by Hugo

### Configuration

`hugo.yaml` contains site-wide configuration including:
- Base URL (must be updated for GitHub Pages deployment)
- Site metadata (title, author, description)
- Social links
- Menu structure
- Syntax highlighting settings (Dracula theme)
- Markdown rendering options (unsafe HTML enabled for flexibility)

### Front Matter Format

Posts use YAML or TOML front matter with standard fields:
- `title` - Post title
- `date` - Publication date (YYYY-MM-DD)
- `description` - Meta description for previews
- `tags` - Array of tags
- `draft` - Boolean for draft status

### Deployment

The site deploys to GitHub Pages via GitHub Actions (workflow file expected in `.github/workflows/`). Pushing to `main` branch triggers automated build and deployment.

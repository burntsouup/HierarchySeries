# The Hierarchy Series: Who Feeds Whom

I found the Will system in James Islington's *Hierarchy* books (*The Will of the Many* and *The Strength of the Few*) hard to keep straight, so I built this page to lay it out visually. It's free, it's a fan project, and it's meant for readers who want the mechanics without re-reading a hundred pages.

**Live site:** https://burntsouup.github.io/HierarchySeries/

## What's on the page

- A pyramid of the eight ranks, Octavus at the bottom to Princeps at the top. Click a rank to see its strength, how many people cede to it, and how many sit behind it.
- A "Follow the Will upward" button that walks up the pyramid one rank at a time.
- An optional character layer. Pick how far you've read (none, Book 1, Books 1–2) and characters show up on their ranks. Nothing past that point is shown.
- Folded sections for how the maths works, the three branches, a spoiler-light summary of the world, and a glossary.

## Where the numbers come from

Each person cedes half of their Will to the person above them, and the groups feeding each rank get smaller as you climb: 8 Octavii to a Septimus, 7 Septimii to a Sextus, down to 2 Dimidii to the Princeps. Everything else follows from that, using the Will chart on the [Hierarchy wiki](https://hierarchy.fandom.com/wiki/Catenan_Republic):

- strength at the head of a pyramid: 1, 5, 18.5, 56.5, 142.25, 285.5, 429.25, 430.25
- people in one full pyramid: 40,320 Octavii up to 1 Princeps, 46,233 in total
- Republic-wide head counts are rough estimates from the census in Book 1

Character placements come from the Wikipedia pages for each book and the same wiki. If you spot something wrong, please [open an issue](https://github.com/burntsouup/HierarchySeries/issues).

## Running it locally

```bash
npm install
npm run dev
```

`npm run build` makes a production build in `dist/`, and pushing to `main` deploys it to GitHub Pages.

## Built with

React and Vite, plain CSS. The content lives in `src/data/`.

## Credits

The Hierarchy series belongs to James Islington and Saga Press. This site isn't affiliated with or endorsed by them.

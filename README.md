# Pomodoro Clock

A Pomodoro-style timer that alternates between a focus session and a break, with
adjustable lengths and an audio cue on each phase switch.

![Screenshot](https://placehold.co/1200x630?text=25+%2B+5+Clock)

**Live demo:** [username.github.io/pomodoro-clock](https://username.github.io/pomodoro-clock)

## Features

- Adjustable session (1–60 min) and break (1–60 min) lengths
- Start/pause and reset controls
- Automatic switch between Session and Break with an audio cue
- Length controls lock while the timer is running

## Tech Stack

- **React 19** + **TypeScript 6** — with the React Compiler (babel plugin) enabled
- **Vite 8** — build tool & dev server
- **Bun** — package manager, runtime & test runner
- **CSS Modules** — scoped component styles, no framework
- **ESLint (flat config) + Prettier** — linting & formatting
- **Testing:** `bun test` + `@testing-library/react` + `@testing-library/jest-dom` + `happy-dom`

## Getting Started

\`\`\`bash
bun install
bun run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command           | Description                        |
|--------------------|---------------------------------------|
| `bun run dev`      | Start dev server                       |
| `bun run build`    | Type-check, then production build      |
| `bun run preview`  | Preview the production build           |
| `bun test`         | Run tests once                         |
| `bun run lint`     | Lint + type-check                      |
| `bun run format`   | Format with Prettier                   |

## Project Structure

\`\`\`
src/
├── components/
│   ├── LengthControl/
│   └── TimerDisplay/
├── hooks/
│   └── usePomodoroTimer.ts
├── utils/
│   └── format-time.ts
├── types/
│   └── pomodoro.types.ts
└── main.tsx
\`\`\`

## Why these dependencies

- `@testing-library/jest-dom` — adds readable DOM matchers (`toBeDisabled`,
  `toBeInTheDocument`) on top of `bun:test`'s `expect`, which doesn't include them by
  default.
- `@happy-dom/global-registrator` — lightweight DOM environment so component tests can
  run under `bun test` without a real browser.
- `babel-plugin-react-compiler` / `@rolldown/plugin-babel` — came with the project
  scaffold; enables the React Compiler for automatic memoization.

## License

MIT

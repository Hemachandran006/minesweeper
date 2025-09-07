# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the application for production (includes TypeScript compilation)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Package Management
- `npm install` - Install all dependencies
- `npm ci` - Clean install (recommended for CI/CD)

## Architecture Overview

This is a React + TypeScript Minesweeper game built with Vite. The codebase follows a clean architectural pattern with separation of concerns:

### Core Architecture Patterns

**State Management**: Uses a custom hook pattern (`useGameState`) that encapsulates all game logic and state management. This hook serves as the single source of truth for the game state and provides methods to interact with it.

**Game Logic Separation**: Pure game logic is isolated in `src/utils/gameLogic.ts`, making it easily testable and reusable. This includes mine placement, cell revelation, flood fill algorithms, and win/lose condition checking.

**Component Hierarchy**: 
- `App` → `Game` → (`GameHeader` + `GameBoard`) → `Cell`
- Each component has a single responsibility and receives props from parent components

**Type Safety**: Strong TypeScript typing throughout with interfaces defined in `src/types/game.ts` for `Cell`, `GameState`, and `GameSettings`.

### Key Files and Their Responsibilities

- `src/hooks/useGameState.ts` - Central game state management with timer logic and game flow control
- `src/utils/gameLogic.ts` - Pure functions for all minesweeper game mechanics (mine placement, flood fill, win conditions)
- `src/types/game.ts` - Type definitions for game entities and state
- `src/components/Game.tsx` - Main game container orchestrating all game components
- `src/components/GameBoard.tsx` - Renders the grid of cells using CSS Grid
- `src/components/GameHeader.tsx` - Displays mine counter, timer, reset button, and difficulty selector

### Game State Flow

The game follows this state management pattern:
1. `useGameState` hook maintains all game state (board, status, counters)
2. First click triggers mine placement using a safe algorithm that avoids the clicked cell
3. Cell revelation uses recursive flood-fill for empty cells
4. Timer starts on first click and stops on game end
5. Game status updates trigger UI changes (emoji faces, win/lose messages)

### Styling Approach

Uses inline styles with a retro Windows 95 aesthetic (gray backgrounds, inset/outset borders). No external CSS frameworks - all styling is component-level for maintainability.

## Important Implementation Details

### Mine Placement Algorithm
The game uses a "first-click safe" mine placement where mines are only placed after the first click, ensuring the first clicked cell is never a mine.

### Flood Fill Implementation
Cell revelation uses an iterative flood fill with a visited set to prevent infinite recursion and efficiently reveal connected empty cells.

### Timer Implementation
Uses `useEffect` with `setInterval` that calculates elapsed time from the game start timestamp, providing accurate timing even if the component re-renders.

### Difficulty System
Three preset difficulty levels stored in `DIFFICULTY_SETTINGS` constant with different grid sizes and mine counts. The system is extensible for custom difficulties.

# Journal App

A focused, private, and beautifully customizable personal journal application built with **Tauri**, **React**, and **Mantine**.

## 🖋️ Key Features

- **Privacy First**: Your journal entries are stored locally on your device (in the `Documents/JournalApp` folder). Nothing ever leaves your machine.
- **Modern Writing Experience**: Powered by **BlockNote**, providing a seamless, block-based rich text editor with support for Markdown-like commands.
- **Beautiful Themes**:
  - **Light & Dark**: Standard modes for comfortable writing in any environment.
  - **Paper**: A specially crafted theme with a warm cream background and "Georgia" serif typography for a classic, scholarly feel.
- **Complete Typography Control**:
  - Independent **Editor** and **UI** font settings.
  - Choose between **Sans**, **Serif**, and **Monospace** styles to match your preference.
- **Minimalist Aesthetic**:
  - **Focused Design**: A clean, single-entry view that removes distractions.
  - **Fluid Layout**: Responsive interface with a collapsible sidebar and hidden scrollbars for a premium feel.
  - **Smart Header**: Displays the current entry's full date and time while allowing for instant renaming.
- **Data Management**:
  - **Quick Search & Sort**: Find your entries by date or title instantly.
  - **Data Reset**: A secure "Danger Zone" in settings allows you to wipe all your data if you want a fresh start.

## 🛠️ Technology Stack

- **Framework**: [Tauri v2](https://tauri.app/) (Desktop bridge)
- **Frontend**: [React 19](https://react.dev/) + [Typescript](https://www.typescriptlang.org/)
- **UI Components**: [Mantine v8](https://mantine.dev/)
- **Editor**: [BlockNote](https://www.blocknotejs.org/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Icons**: [Tabler Icons](https://tabler.io/icons)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Rust](https://www.rust-lang.org/tools/install) (for Tauri)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/qudwl/journal.git
   cd journal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run tauri dev
   ```

4. Build for production:
   ```bash
   npm run tauri build
   ```

## 📂 Storage

Entries are stored as `.json` files for the content and `.meta.json` files for metadata (like display names and custom dates) in:
- **Windows**: `C:\Users\[User]\Documents\JournalApp`
- **macOS/Linux**: `~/Documents/JournalApp`

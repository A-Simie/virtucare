# VirtuCare | Premium Healthcare Appointment Ecosystem

VirtuCare is a high-fidelity medical management platform engineered for clinical precision and elite user experience. Built with a modern tech stack, it provides a seamless bridge between patients and healthcare professionals through an intuitive, data-driven interface.

## ✨ Core Features

- **🛡️ Global Notification System**: Real-time alerts for bookings, cancellations, and system updates with a persistent side-drawer preview and full notification history.
- **👨‍⚕️ Professional Specialist Directory**: A curated database of medical professionals with verified badges, specialty-specific iconography, and detailed clinical bios.
- **📅 Advanced Appointment Orchestration**:
    - **Intelligent Booking**: Multi-step animated flow with conflict resolution and double-booking prevention.
    - **Live Management**: Full-featured appointment table with dynamic filtering, pagination, and status tracking.
    - **Action Center**: Contextual menus for quick actions like cancellation with confirmation safeguards.
- **📊 Dynamic Clinical Dashboard**: Real-time health statistics, upcoming consultation tracking, and system-wide activity logs.
- **⚡ Performance-First UI**: 
    - **Skeleton Loading**: Integrated across all pages to ensure zero layout shift and a perceived speed boost.
    - **Reusable Architecture**: Centralized component system (Avatar, UserNav, IconButton) for absolute visual consistency.
- **🎨 Premium Medical Aesthetics**: A sophisticated palette (Slate Indigo, Deep Teal, Emerald) paired with squircle-based geometry for a modern, professional feel.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/virtucare.git
   cd virtucare
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the portal:**
   Open [http://localhost:3000](http://localhost:3000) to view the landing/login page.

## 🛠️ Tech Stack

- **Core**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API & Custom Hooks
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📂 Architecture

- `src/app/`: Next.js App Router orchestration (Layouts & Pages).
- `src/components/ui/`: Atomic UI primitives (Buttons, Cards, Skeletons, Avatars).
- `src/features/`: Complex feature-specific logic and domain components.
- `src/context/`: Global state providers (Notifications, Appointments).
- `src/hooks/`: Custom hooks for persistence and logical abstraction.
- `src/utils/`: High-performance utility functions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# VirtuCare | Premium Healthcare Appointment Ecosystem

VirtuCare is a high-fidelity medical management platform engineered for clinical precision and elite user experience. Built with a modern tech stack, it provides a seamless bridge between patients and healthcare professionals through an intuitive, data-driven interface.

## ✨ Core Features

- **🛡️ Global Notification System**: Real-time alerts for bookings, cancellations, and system events. Includes a persistent side-drawer and a full-page history audit.
- **🔑 Personalized Identity**: Dynamic user greeting logic that utilizes the verified login email as the primary system identifier.
- **🕵️ Security Session Tracking**: Automated "New Login" alerts in the notification hub to monitor account access with precise timestamps.
- **👨‍⚕️ Professional Specialist Directory**: A curated database of medical professionals with verified badges, optimized for high-performance mobile viewing.
- **📅 Advanced Appointment Orchestration**:
    - **Intelligent Booking**: Multi-step animated flow with conflict resolution and doctor portrait persistence.
    - **Live Management**: Full-featured table with real-time text search, status filtering (Upcoming/Cancelled), and day-based selection.
- **🔍 Advanced Search & Discovery**: Multi-criteria search infrastructure for finding specialists and navigating historical consultations.
- **📊 Advanced Clinical Analytics**:
    - **Interactive Health Trends**: High-fidelity SVG visualization suite featuring animated Line charts (Glucose/BP), Donut charts (Nutrition), and multicolored Bar charts (Activity).
    - **Diagnostic Record Generator**: Professional, PDF-optimized clinical report engine with intelligent page-break handling and personalized identification.
- **🛡️ Global Notification System**: Real-time alerts for bookings, cancellations, and system events (e.g., report generation auditing).
- **🔒 Session Guard & Persistence**: 
    - **Automated Auth Redirect**: Integrated route protection that redirects unauthenticated users to the login portal if no session (email) is detected.
    - **Persistent State**: Utilizes localized storage for maintaining user sessions, medical records, and notification history across page refreshes.
- **🤝 Help & Legal Hub**: Integrated support center for Terms and Conditions, Privacy Policy, and 24/7 Patient Support.
- **⚡ Performance-First UI**: 
    - **Skeleton Loading**: Zero layout shift architecture across all authenticated routes.
    - **Typography & Brand**: Standardized natural-case typography and high-resolution doctor portraits for a premium clinical feel.
- **🧹 Codebase Integrity**: Production-ready codebase following a comprehensive audit and removal of dead code.

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

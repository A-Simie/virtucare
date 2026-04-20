# VirtuCare | Premium Healthcare Appointment Ecosystem

VirtuCare is a high-fidelity medical management platform engineered for clinical precision and elite user experience. Built with a modern tech stack (Next.js 15, TypeScript, Tailwind CSS), it provides a seamless bridge between patients and healthcare professionals through an intuitive, data-driven interface.

This project was built as part of a 72-hour take-home assessment, focusing on clarity, structure, and shipping a production-ready feature set.

## 🚀 The Approach

The core philosophy behind VirtuCare was to build a system that feels **professional and trustworthy**—essential for any healthcare application. I followed a **Component-Driven Development (CDD)** approach:

1.  **Atomic Foundation**: Created highly reusable UI primitives (Buttons, Cards, Modals) using a consistent design system based on Tailwind CSS and Framer Motion.
2.  **Feature-First Architecture**: Organized code into logical feature modules (`booking`, `appointments`, `reports`, `doctors`) to ensure high maintainability and clear separation of concerns.
3.  **State-First Logic**: Leveraged React Context and custom Hooks to manage complex states (Notifications, Appointments) with persistent local storage.
4.  **UX Polish**: Prioritized micro-interactions, skeleton loading states, and responsive typography to ensure the app "feels" premium and avoids the "AI-generated" look.

## 🧠 Key Decisions

-   **State Persistence**: Chose `localStorage` combined with custom hooks (`useLocalStorage`) to ensure appointment data and notifications persist across refreshes, fulfilling the persistence requirement without the overhead of a backend for this assessment.
-   **SVG-Based Analytics**: Built a custom SVG-based charting engine for health trends. This avoided heavy third-party dependencies while allowing for pixel-perfect control over entry animations and print optimization.
-   **Typography Standard**: Moved away from all-caps headers to a natural title-case hierarchy. This improves readability in clinical contexts where precision is paramount.
-   **Doctor Identity**: Decided to persist actual doctor portraits during the booking flow to humanize the experience and provide visual consistency across the dashboard and consultation views.

## 🚧 Challenges Faced

-   **Complex Date Logic**: Implementing robust double-booking prevention required careful comparison of ISO strings and custom date-helpers to ensure time-slot integrity across different doctors.
-   **Print-Perfect Layouts**: Engineering the Clinical Reports to look like professional medical documents when printed (using `@media print`) required deep CSS optimization to handle page breaks and grid-to-column transitions correctly.
-   **Performance Skeletons**: Creating skeleton states that exactly match the final rendered content to ensure zero Layout Shift (CLS) was a meticulous but necessary task for the premium feel.

## ✨ Core Features

-   **📅 Advanced Appointment Orchestration**:
    -   **Intelligent Booking**: Multi-step animated flow with real-time double-booking prevention.
    -   **Live Management**: Full-featured table with real-time text search, status filtering, and day-based selection.
-   **📊 Advanced Clinical Analytics**:
    -   **Interactive Health Trends**: High-fidelity SVG visualization suite featuring animated Line, Donut, and multicolored Bar charts.
    -   **Diagnostic Record Generator**: Professional, PDF-optimized clinical report engine.
-   **🛡️ Global Notification System**: Real-time alerts for bookings, cancellations, and system events with an Amber Printer identity for reports.
-   **🔒 Session Guard**: Integrated route protection that redirects unauthenticated users and maintains persistent sessions.
-   **🤝 Help & Legal Hub**: Integrated support center for Terms, Privacy, and 24/7 Patient Support.
-   **🧹 Codebase Integrity**: Production-ready codebase following a comprehensive audit.

## 🛠️ Tech Stack

-   **Core**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS 4
-   **Animations**: Framer Motion
-   **State**: Context API & Custom Hooks
-   **Icons**: Lucide React
-   **Date Handling**: date-fns

## 🏁 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/A-Simie/virtucare.git
    cd virtucare
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Access the portal:**
    Open [http://localhost:3000](http://localhost:3000)

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

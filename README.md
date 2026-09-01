Project Aashray — Community Elder Welfare Platform
A responsive web application connecting senior citizens, verified care homes, donors, and student volunteers through a direct, transparent support framework[cite: 1, 2].

The platform tracks and fulfills essential supply shortages—spanning critical medical equipment, daily hygiene items, specialized nutrition, and infrastructure utilities—preventing donation waste and ensuring supplies reach verified care facilities directly[cite: 1, 2].

📌 Core Features
Real-Time Requirement Tracking: Dynamic dashboard displaying target, fulfilled, and remaining counts across verified care partner homes[cite: 1, 2].

Zero-Waste Dynamic Pledging: Interactive modal flow allowing donors to commit to exact item quantities[cite: 1, 2]. Progress meters update dynamically and lock once target capacity is met[cite: 1, 2].

Instant Search & Category Filtering: Multi-parameter search and category filtering across Medical, Hygiene, Nutrition, and Utilities[cite: 1, 2].

Volunteer Onboarding Portal: Integrated volunteer intake workflow to organize digital literacy, recreation, medical camps, and companionship sessions[cite: 1, 2].

Mobile-First & Accessible Architecture: Fully responsive layout optimized for mobile screens, featuring accessible WAI-ARIA modal dialogs, clean SVG line iconography, and non-blocking toast notifications[cite: 1, 2, 3].

Client-Side Persistence: Browser localStorage integration preserving live pledge allocations and progress states across sessions.

🛠️ Technology Stack
Markup: Semantic HTML5 with WAI-ARIA accessibility roles[cite: 1]

Styling: Vanilla CSS3 (Custom Design Tokens, Flexbox, CSS Grid, Keyframe Animations, Viewport Media Queries)[cite: 3]

Scripting: Vanilla JavaScript (ES6+, Intersection Observer API, Web Animation API, LocalStorage API)[cite: 2]

Deployment & CI/CD: Vercel (Automated Git-triggered pipeline)

📂 Project Structure
Plaintext
Aashray_portal/
├── index.html          # Application markup, semantic sections, and modal dialogs
├── style.css           # Global design system, responsive breakpoints, and animations
├── script.js           # Dynamic data rendering, pledge logic, search/filters, and counters
├── ashraylogo.png      # Platform brand logo asset
└── README.md           # Platform documentation
🚀 Getting Started
Prerequisites
Any modern web browser (Chrome, Firefox, Safari, Edge).

(Optional) Live Server for Visual Studio Code or Node.js.

Local Setup
Clone the repository:

Bash
git clone https://github.com/CodeStrategist16/Aashray_portal.git
cd Aashray_portal
Launch the application:

Direct: Open index.html in your browser.

Using VS Code: Right-click index.html and choose Open with Live Server.

Using Node CLI:

Bash
npx serve .
⚙️ Data Model Schema
Item shortages are defined dynamically in script.js to simulate a real-time inventory ledger[cite: 1, 2]:

JavaScript
{
  id: "need-1",
  title: "Digital BP Monitors",
  category: "medical",
  categoryLabel: "CRITICAL",
  priority: "urgent",
  priorityLabel: "URGENT",
  iconKey: "medical",
  home: "Shantideep Senior Care Home",
  desc: "Reliable blood-pressure monitors are needed for daily vital tracking and routine health monitoring of residents.",
  target: 8,
  fulfilled: 3
}
Capacity Left: Calculated via Math.max(0, target - fulfilled)

Completion Progress: Evaluated via Math.round((fulfilled / target) * 100)

Pledge Control: Input fields dynamically set max bounds based on the remaining allocation[cite: 2].

🤝 Contributing
Contributions to improve accessibility, UI polish, or backend integrations are welcome:

Fork the repository.

Create a feature branch (git checkout -b feature/EnhancedFeature).

Commit your changes (git commit -m 'feat: add enhanced feature').

Push to your branch (git push origin feature/EnhancedFeature).

Open a Pull Request.

📄 License
This project is open-source and available under the MIT License.

🌐 Links & Contact
Live Deployment: aashrayportal.vercel.app

Repository: github.com/CodeStrategist16/Aashray_portal

Initiative: Community Elder Care & Welfare Support[cite: 1]

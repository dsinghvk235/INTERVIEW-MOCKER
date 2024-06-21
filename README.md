# AI Interview Mocker Website

This repository contains the code for an AI Interview Mocker website built using Next.js, TypeScript, Tailwind CSS, Clerk, and Gemini. The website provides a platform for users to practice and prepare for interviews by simulating real interview scenarios with AI.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
5. [Project Structure](#project-structure)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

The AI Interview Mocker website allows users to prepare for interviews by engaging with AI-powered interviewers. The platform simulates various interview scenarios and provides feedback to help users improve their performance.

## Features

- User authentication and management with Clerk.
- AI-powered interview simulations.
- Real-time feedback on interview responses.
- User-friendly interface built with Tailwind CSS.
- Type-safe codebase with TypeScript.

## Tech Stack

- **Next.js**: React framework for building server-side rendered and static web applications.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom designs.
- **Clerk**: Authentication and user management service.
- **Gemini**: AI and ML integration for interview simulations.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14.x or later)
- npm or yarn package manager

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/ai-interview-mocker.git
    cd ai-interview-mocker
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root directory and add your Clerk and Gemini API keys:

    ```bash
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
    CLERK_API_KEY=<your-clerk-api-key>
    GEMINI_API_KEY=<your-gemini-api-key>
    ```

4. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```plaintext
ai-interview-mocker/
├── public/                 # Public assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Next.js pages
│   ├── styles/             # Tailwind CSS styles
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React contexts for global state
│   └── services/           # API service functions
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Usage

### Running the Application

To start the development server, use:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production, use:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `.next` directory.

### Running in Production

To start the application in production mode, use:

```bash
npm start
# or
yarn start
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file as needed for your specific project requirements.

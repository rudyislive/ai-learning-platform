# AI Learning Platform - Frontend

Modern React + TypeScript frontend for the AI Learning Platform.

## Features

- 🎨 Modern UI with TailwindCSS
- 🔐 Authentication (Login/Register)
- 📚 Course browsing and learning
- 💻 Interactive code editor with Monaco
- 🧩 Problem solving interface
- 🎯 Algorithm visualizations
- 🤖 AI-powered assistant
- 📊 Progress tracking

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Monaco Editor** - Code editing
- **Axios** - API calls
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME="AI Learning Platform"
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # UI components (Button, Card, Input)
│   ├── layout/         # Layout components
│   ├── code/           # Code editor components
│   └── ai/             # AI assistant components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── courses/        # Course pages
│   ├── problems/       # Problem pages
│   └── algorithms/     # Algorithm visualizer
├── services/           # API services
├── store/              # Redux store
│   └── slices/         # Redux slices
├── types/              # TypeScript types
├── utils/              # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Available Pages

- `/` - Home/Landing page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard
- `/courses` - Course listing
- `/courses/:id` - Course detail
- `/courses/:courseId/lessons/:lessonId` - Lesson viewer
- `/problems` - Problem listing
- `/problems/:id` - Problem detail with code editor
- `/algorithms` - Algorithm visualizer
- `/profile` - User profile

## Features

### Authentication
- Login and registration
- JWT token management
- Protected routes

### Courses
- Browse courses by difficulty level
- Track progress
- Watch video lectures
- Interactive code examples
- Module and lesson structure

### Problems
- Filter by difficulty
- Search functionality
- Code editor with multiple languages
- Test case validation
- Real-time code execution

### Algorithm Visualizer
- Step-by-step visualization
- Multiple algorithms (sorting, search, graph, ML)
- Complexity analysis
- Code implementation

### AI Assistant
- Context-aware help
- Chat interface
- Code explanation
- Debugging assistance

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

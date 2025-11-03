# AI Co-Founder

An autonomous multi-agent AI system that functions as a virtual business partner, managing all operational aspects of a service business while the human founder focuses exclusively on strategic growth and vision.

## Overview

AI Co-Founder employs 7 specialized AI agents that work collaboratively across different business functions:

- **Alex** (Sales Agent): Lead generation, outreach, proposal creation
- **Riley** (Marketing Agent): Content creation, social media, campaigns
- **Morgan** (Finance Agent): Invoicing, expense tracking, cash flow
- **Jordan** (Operations Agent): Client onboarding, project management
- **Sam** (HR Agent): Recruitment, onboarding, performance tracking
- **Taylor** (R&D Agent): Market research, competitor analysis
- **Casey** (Customer Success Agent): Client communication, support

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **AI**: OpenAI API for natural language processing
- **Real-time**: Socket.io for WebSocket connections
- **Database**: PostgreSQL with Sequelize ORM

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aicofounder

# Install dependencies for all packages
npm run setup

# Set up environment variables
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Run database migrations
cd backend && npm run migrate

# Start development servers
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3000`

## Project Structure

```
aicofounder/
├── frontend/                 # React.js frontend application
├── backend/                # Node.js backend API
├── shared/                 # Shared types and utilities
├── docker-compose.yml      # Development environment setup
└── package.json           # Root package.json with scripts
```

## Features

- **Conversational Interface**: Natural language chat with AI agents
- **Dashboard Widgets**: Real-time business metrics and insights
- **Automated Workflows**: End-to-end business process automation
- **Approval Queues**: Review and approve high-stakes AI actions
- **Third-party Integrations**: Gmail, Stripe, HubSpot, Google Calendar
- **Voice Input**: Web Speech API for hands-free operation
- **Real-time Updates**: Live status updates and notifications

## Core Workflows

1. **Send Payment Link**: "Send payment link of $299 to Sam"
2. **Lead Generation**: "Find 20 leads in e-commerce industry"
3. **Client Onboarding**: "Onboard new client TechStart Inc, $5,000/month retainer"
4. **Email Summary**: Daily automated email briefing
5. **Competitor Research**: "Research what automation services competitor offers"

## Development

### Environment Variables

Frontend (.env):
```
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

Backend (.env):
```
DATABASE_URL=postgresql://user:password@localhost:5432/aicofounder
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

### Database Setup

```bash
cd backend
npm run migrate    # Run migrations
npm run seed       # Seed with sample data
```

### Testing

```bash
npm test           # Run all tests
npm run test:frontend  # Frontend tests only
npm run test:backend   # Backend tests only
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

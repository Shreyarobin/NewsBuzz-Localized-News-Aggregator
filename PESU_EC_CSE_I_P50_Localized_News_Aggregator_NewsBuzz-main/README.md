# Localized News Aggregator

**Project ID:** P50  
**Course:** UE23CS341A  
**Academic Year:** 2025  
**Semester:** 5th Sem  
**Campus:** EC  
**Branch:** CSE  
**Section:** I  
**Team:** NewsBuzz

## 📋 Project Description

A news dashboard fetching headlines from predefined RSS feeds, categorizing by topic, and allowing keyword search. The project uses RSS-parsing libraries, category-tagging logic, and search indexing.

This repository contains the source code and documentation for the Localized News Aggregator project, developed as part of the UE23CS341A course at PES University.

## 🧑‍💻 Development Team (NewsBuzz)

- [@ShimonaDSinha](https://github.com/ShimonaDSinha) - Scrum Master
- [@Shravaniii03](https://github.com/Shravaniii03) - Developer Team
- [@PES2UG23CS560](https://github.com/PES2UG23CS560) - Developer Team
- [@pes2ug23cs562](https://github.com/pes2ug23cs562) - Developer Team

## 👨‍🏫 Teaching Assistant

- [@dredblackblue](https://github.com/dredblackblue)
- [@shreyavijay2022](https://github.com/shreyavijay2022)
- [@Meenakshi4d5f](https://github.com/Meenakshi4d5f)
- [@tejaswiniv27](https://github.com/tejaswiniv27)
- [@Shriya285](https://github.com/Shriya285)

## 👨‍⚖️ Faculty Supervisor

- *No valid faculty GitHub username found*


## 🚀 Getting Started

### Prerequisites
- [List your prerequisites here]

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/pestechnology/PESU_EC_CSE_I_P50_Localized_News_Aggregator_NewsBuzz.git
   cd PESU_EC_CSE_I_P50_Localized_News_Aggregator_NewsBuzz
   ```

2. Install dependencies
   - Backend (from project root):
     ```powershell
     cd src\backend
     npm install
     ```

   - Frontend (from project root):
     ```powershell
     cd ..\frontend
     npm install
     ```

3. Run locally (two terminals)
   - Start backend (runs on port 4000):
     ```powershell
     # from project root
     cd src\backend
     npm run dev
     ```

   - Start frontend (Vite dev server, port 5173 by default):
     ```powershell
     # from project root
     cd src\frontend
     npm run dev
     ```

Notes:
- The backend currently exposes a placeholder endpoint at `GET /api/news`.
- This is a minimal skeleton to get frontend and backend running. Next steps: wire RSS parsing, category tagging, and search indexing.

## 📁 Project Structure

```
PESU_EC_CSE_I_P50_Localized_News_Aggregator_NewsBuzz/
├── src/                 # Source code
├── docs/               # Documentation
├── tests/              # Test files
├── .github/            # GitHub workflows and templates
├── README.md          # This file
└── ...
```

## 🛠️ Development Guidelines

### Branching Strategy
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches

### Commit Messages
Follow conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test-related changes

### Code Review Process
1. Create feature branch from `develop`
2. Make changes and commit
3. Create Pull Request to `develop`
4. Request review from team members
5. Merge after approval

## 📚 Documentation

- [API Documentation](docs/api.md)
- [User Guide](docs/user-guide.md)
- [Developer Guide](docs/developer-guide.md)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📄 License

This project is developed for educational purposes as part of the PES University UE23CS341A curriculum.

---

**Course:** UE23CS341A  
**Institution:** PES University  
**Academic Year:** 2025  
**Semester:** 5th Sem

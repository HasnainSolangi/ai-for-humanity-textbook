# Implementation Plan: Home Page & Global Navigation Layout

**Branch**: `001-home-nav-layout` | **Date**: 2025-11-29 | **Spec**: D:\ai-for-humanity-textbook\specs\001-home-nav-layout\spec.md
**Input**: Feature specification from `/specs/001-home-nav-layout/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the technical implementation for the "AI for Humanity" platform, focusing on creating a distinct home page, integrating global navigation, developing rich media generation capabilities (slides and PDFs), implementing robust authentication and user personalization, and integrating a RAG-based chatbot. The implementation will leverage Docusaurus for documentation and React for custom UI components, with a phased approach to development.

## Technical Context

**Language/Version**: JavaScript/TypeScript (Node.js 18+, React 18+)
**Primary Dependencies**: Docusaurus, React, Tailwind CSS, Better-Auth, `jspdf`/`react-to-pdf` (for PDFs), `reveal.js`/React-based slide component (for Slides), LangChain or similar (for RAG chatbot).
**Storage**: User personalization data (Software and Hardware Background) will be stored in a dedicated backend database.
**Testing**: Jest, React Testing Library
**Target Platform**: Web (browsers)
**Project Type**: Web application
**Performance Goals**: Users can successfully navigate between the Home Page and the Book View using the global navigation in under 1 second. The Home Page loads completely, including all interactive elements and content, within 3 seconds on a standard broadband connection.
**Constraints**: None explicitly stated beyond performance goals.
**Scale/Scope**: Public-facing knowledge base with user personalization for thousands of users.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file `D:\ai-for-humanity-textbook\.specify\memory\constitution.md` contains placeholder content. For a thorough check, its complete principles are required. Based on general software engineering principles and the stated feature goals, the current plan appears to align with best practices for modularity and maintainability. Gates will be evaluated as 'passing' for this phase, assuming standard development principles.

## Project Structure

### Documentation (this feature)

```text
specs/001-home-nav-layout/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
./
├── src/
│   ├── pages/
│   │   └── index.tsx      # Custom Home Page with AI-Native layout
│   ├── components/
│   │   ├── GlobalHeader.tsx # Custom global navigation
│   │   ├── HeroSection.tsx
│   │   ├── StructuredCards.tsx
│   │   ├── CustomFooter.tsx
│   │   ├── TranslationToggle.tsx
│   │   ├── RAGWidget.tsx    # Floating chatbot widget
│   │   ├── PDFGenerator.tsx # Component for PDF generation
│   │   └── SlideGenerator.tsx # Component for slide generation
│   └── theme/             # Docusaurus theme overrides
├── blog/
├── docs/
├── static/
├── docusaurus.config.js
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js
└── package.json

```

**Structure Decision**: The project will adopt a web application structure with a Docusaurus-based frontend (`./`) for the primary site and documentation. Authentication, user personalization data storage, and potentially RAG logic will need to be integrated within this existing structure, or a different approach for backend functionality considered.

## Architectural Decisions

1.  **Home Page Layout**:
    *   **Decision**: Implement a custom React page at `frontend/docusaurus/src/pages/index.tsx` within the Docusaurus project.
    *   **Rationale**: This allows for a completely distinct "AI-Native" landing page experience separate from the standard Docusaurus documentation layout, meeting the requirement for a high-impact home page. Tailwind CSS will be used for flexible and responsive styling of elements like the interactive card layout.
    *   **Alternatives Considered**: Using Docusaurus's built-in markdown pages with custom React components embedded (rejected due to limited layout control and potential for Docusaurus styling conflicts) or an entirely separate marketing site (rejected for increased deployment/maintenance overhead).

2.  **Rich Media Engine**:
    *   **PDF Generation**:
        *   **Decision**: Utilize `jspdf` or `react-to-pdf` for client-side generation of chapter summaries into PDF format.
        *   **Rationale**: Client-side generation simplifies deployment and reduces server-side load. These libraries provide robust capabilities for converting React components or HTML to PDF.
        *   **Alternatives Considered**: Server-side PDF generation (rejected for increased server complexity and cost), using browser print-to-PDF functionality (rejected for lack of customization and control over output).
    *   **Slide Generation**:
        *   **Decision**: Implement a React-based slide component that parses current MDX chapter content into a slide format. Consider `reveal.js` for interactive presentation features if a suitable React wrapper or direct integration is feasible.
        *   **Rationale**: Leveraging existing MDX content ensures consistency with the book and reduces content duplication. A React-based component offers flexibility for customization and integration within the Docusaurus environment.
        *   **Alternatives Considered**: Manual slide creation (rejected for inefficiency), using external presentation tools (rejected for lack of direct integration with documentation content).

3.  **Personalization**:
    *   **Better-Auth Integration**:
        *   **Decision**: Integrate `better-auth` client-side hooks within the Docusaurus application. This will handle Email/Password and OAuth (GitHub/Google) signup/login flows.
        *   **Rationale**: The user explicitly requested the "Better-Auth" library. Client-side hooks enable seamless integration with the Docusaurus frontend without requiring significant changes to the static site generation process.
        *   **Alternatives Considered**: Implementing custom authentication logic (rejected due to security risks and complexity), using a different authentication library (rejected due to explicit user request).
    *   **Software/Hardware Background Storage**:
        *   **Decision**: A dedicated backend database will be used for storing the "Software and Hardware Background" user profile data.
        *   **Rationale**: This provides centralized, persistent storage, enabling cross-device and server-side personalization, and offering better security for potentially sensitive user data. This is crucial for a robust personalization engine.
        *   **Alternatives Considered**: Local Storage (rejected due to limitations in persistence, cross-device access, and security for critical data).

4.  **Chatbot Integration**:
    *   **Decision**: Implement a floating "RAG Widget" component that will be available on all Docusaurus documentation pages.
    *   **Rationale**: A floating widget provides ubiquitous access to the RAG chatbot without disrupting the reading flow. Being present on all doc pages ensures that users can easily get answers related to any chapter.
    *   **Alternatives Considered**: A dedicated chatbot page (rejected for breaking reading flow), embedding the chatbot directly into each chapter (rejected for clutter and maintenance overhead).

## Implementation Phases

### Phase 1: Core Docusaurus Setup & Tailwind Config [x] Complete
*   Set up the Docusaurus project.
*   Integrate and configure Tailwind CSS for styling.
*   Establish basic global navigation as per spec.

### Phase 2: Marketing Home Page Implementation [x] Complete
*   Develop the custom React Home Page (`src/pages/index.tsx`).
*   Implement the Hero Section with title and subtitle.
*   Design and implement the interactive Structured Cards layout with hover effects.
*   Create the custom Footer with personal links.

### Phase 3: Auth & Personalization Logic
*   Integrate the "Better-Auth" library client-side hooks into Docusaurus.
*   Implement the Email/Password and OAuth (GitHub/Google) signup/login flows.
*   Implement the "Software and Hardware Background" input during the signup flow.
*   Develop the storage solution for "Software and Hardware Background" based on the architectural decision (client-side storage or external service).
*   Develop personalization engine logic to utilize this data (initial simple personalization based on background).

### Phase 4: Rich Media (PDF/Slide) Generators
*   Develop the PDF generation component using `jspdf` or `react-to-pdf` to create chapter summaries.
*   Develop the React-based slide component that parses MDX content into a slide format.

### Phase 5: Chatbot Integration [x] Complete
*   Develop the floating "RAG Widget" React component.
*   Integrate the RAG (Retrieval Augmented Generation) logic to answer questions based on book content.
*   Ensure the chatbot is accessible on all Docusaurus documentation pages.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

# Feature Tasks: Home Page & Global Navigation Layout

**Feature Branch**: `001-home-nav-layout`
**Date**: 2025-11-29
**Spec**: D:\ai-for-humanity\specs\001-home-nav-layout\spec.md
**Plan**: D:\ai-for-humanity\specs\001-home-nav-layout\plan.md

## Summary

This document outlines the detailed, atomic, and independently executable tasks for implementing the "AI for Humanity" platform. It covers global navigation, a custom home page, authentication, personalization, rich media generation, and chatbot integration. Tasks are organized by user story and grouped into logical phases to facilitate incremental development and testing, with strict adherence to granularity and critical dependencies.

## Task List

### Phase 1: Core Docusaurus Setup & Tailwind Config
*   **Goal**: Establish the foundational Docusaurus project with Tailwind CSS, install core libraries, and set up basic global navigation.
*   **Independent Test**: Docusaurus site is runnable, Tailwind CSS classes are applied, core rich media libraries are installed, and basic navigation links are present and clickable without error.
*   **Tasks**:
    - [x] T002 Install Tailwind CSS and its peer dependencies (`tailwindcss`, `postcss`, `autoprefixer`) in `./`
    - [x] T003 Configure `tailwind.config.js` in `./` to include Docusaurus template paths
    - [x] T004 Configure `postcss.config.js` in `./` to use Tailwind CSS and Autoprefixer
    - [x] T005 Configure Docusaurus `docusaurus.config.js` to include custom themes/plugins for Tailwind CSS integration
    - [ ] T006 Create `./src/components/GlobalHeader.tsx` to scaffold the global navigation component
    - [ ] T007 Implement Brand/Home Link ("AI For Humanity") in `./src/components/GlobalHeader.tsx` linking to `/`
    - [ ] T008 Implement Primary Nav ("Book") link in `./src/components/GlobalHeader.tsx` linking to Docusaurus docs introduction (`/docs/intro`)
    - [ ] T009 Create `./src/components/TranslationToggle.tsx` to scaffold the Urdu/English language switching component
    - [x] T010 Install `jspdf` or `react-to-pdf` library for PDF generation in `./`
    - [x] T011 Install `reveal.js` or a suitable React-based slide library for slide generation in `./`

### Phase 2: Marketing Home Page Implementation [US2, US4]
*   **Goal**: Develop the distinct, AI-Native home page with interactive elements and a custom footer.
*   **Independent Test**: Home page (`/`) loads correctly, displays hero section, interactive cards show hover effects, and custom footer with personal links is present.
*   **Tasks**:
    - [ ] T012 [P] [US2] Create `src/pages/index.tsx` to scaffold the custom Home Page
    - [ ] T013 [P] [US2] Implement Hero Section JSX and basic styling in `src/pages/index.tsx` for title "AI for Humanity" and subtitle
    - [ ] T014 [P] [US2] Create `src/components/HeroSection.tsx` and move Hero Section content into it, integrating it into `index.tsx`
    - [ ] T015 [P] [US2] Create `src/components/StructuredCards.tsx` to scaffold the structured cards component
    - [ ] T016 [P] [US2] Implement card layout and basic content in `src/components/StructuredCards.tsx`
    - [ ] T017 [P] [US2] Add hover effects using Tailwind CSS to cards in `src/components/StructuredCards.tsx`
    - [ ] T018 [P] [US2] Integrate `StructuredCards.tsx` into `src/pages/index.tsx`
    - [ ] T019 [P] [US4] Create `src/components/CustomFooter.tsx` to scaffold the custom footer component
    - [ ] T020 [P] [US4] Implement GitHub, LinkedIn, and Portfolio links and basic styling in `src/components/CustomFooter.tsx`
    - [ ] T021 [P] [US4] Integrate `CustomFooter.tsx` into `src/pages/index.tsx`

### Phase 3: Auth & Personalization Logic [US5]
*   **Goal**: Integrate the Better-Auth library, implement signup/login flows, and store user personalization data.
*   **Independent Test**: Users can sign up via Email/Password or OAuth (GitHub/Google). During signup, users are prompted for "Software and Hardware Background" which is successfully stored and retrieved for personalization.
*   **Tasks**:
    - [ ] T033 [US5] Install `better-auth` client-side library in `./`
    - [ ] T034 [US5] Integrate `better-auth` client-side hooks into `./` for Email/Password authentication flow
    - [ ] T035 [US5] Integrate `better-auth` client-side hooks into `./` for OAuth (GitHub/Google) authentication flow
    - [ ] T036 [US5] Create a new Docusaurus page or component for the signup form to include "Software and Hardware Background" input
    - [ ] T037 [US5] Implement client-side logic to send "Software and Hardware Background" data to personalization service upon signup completion
    - [ ] T038 [US5] Develop initial personalization engine logic (client-side or separate service) to utilize stored background data

### Phase 4: Rich Media (PDF/Slide) Generators [FR-012, FR-013]
*   **Goal**: Develop client-side capabilities for generating PDF summaries and presentation slides from chapter content.
*   **Independent Test**: A user can click a button to generate a PDF summary of a chapter. A user can click a button to view a chapter's content as presentation slides.
*   **Tasks**:
    - [ ] T039 [P] Create `src/components/PDFGenerator.tsx` component to scaffold PDF generation UI
    - [ ] T040 [P] Implement logic in `src/components/PDFGenerator.tsx` to read current chapter content and generate PDF summaries using `jspdf` or `react-to-pdf`
    - [ ] T041 [P] Create `src/components/SlideGenerator.tsx` component to scaffold slide generation UI
    - [ ] T042 [P] Implement logic in `src/components/SlideGenerator.tsx` to parse MDX chapter content into a slide format, potentially integrating with `reveal.js`
    - [ ] T043 Integrate PDF generation component into Docusaurus chapter pages (e.g., as a button in the layout)
    - [ ] T044 Integrate Slide generation component into Docusaurus chapter pages (e.g., as a button or dedicated view)

### Phase 5: Chatbot Integration [FR-014]
*   **Goal**: Embed a floating RAG-based chatbot across all documentation pages.
*   **Independent Test**: The RAG chatbot widget is visible and functional on all documentation pages, providing accurate answers based on the book's content.
*   **Tasks**:
    - [ ] T045 Create `src/components/RAGWidget.tsx` to scaffold the floating chatbot UI component
    - [ ] T046 Implement basic chat interface (input, display) in `src/components/RAGWidget.tsx`
    - [ ] T047 Integrate RAG (Retrieval Augmented Generation) logic into `src/components/RAGWidget.tsx` (client-side or via backend API) to query book content and display responses
    - [ ] T048 Ensure `src/components/RAGWidget.tsx` is globally accessible on all Docusaurus documentation pages (e.g., by modifying Docusaurus theme layout components)

## Dependencies

- Phase 1 must be completed before starting any other phase.
- Phase 2 depends on Phase 1.
- Phase 3 depends on Phase 1 (for core setup) and specifically on the Better-Auth library being integrated (T033) and a suitable data storage/personalization approach.
- Phase 4 depends on Phase 1 (for core setup and rich media library installations T010, T011).
- Phase 5 depends on Phase 1 (for core setup) and potentially on client-side RAG services or an external RAG API if implemented.

## Parallel Execution Examples

**Within Phase 1 (Setup)**:
*   T006 (GlobalHeader scaffold), T007 (Brand Link), T008 (Book Link), T009 (TranslationToggle scaffold), T010 (jspdf/react-to-pdf install), and T011 (reveal.js/slide library install) can be developed in parallel after initial Docusaurus and Tailwind setup (T001-T005).

**Across Phases**:
*   Phase 2 (Marketing Home Page) tasks T012-T021 can be developed in parallel with initial frontend authentication setup (T033).
*   Phase 4 (Rich Media Generators) tasks T039-T044 can be developed in parallel with Phase 2 and 3 tasks, after Phase 1 completion.
*   Phase 5 (Chatbot Integration) tasks T045-T048 can be developed in parallel with Phases 2, 3, and 4 tasks, after Phase 1 completion.

## Implementation Strategy

An MVP-first approach will be used, prioritizing core navigation and the home page. Development will proceed incrementally, completing each user story and phase before moving to the next. Parallel execution opportunities will be leveraged to optimize development time where task dependencies allow. Each task is designed to be atomic and independently verifiable.

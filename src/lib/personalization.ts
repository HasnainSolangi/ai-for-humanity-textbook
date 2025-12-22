import { useAuth } from '../contexts/AuthContext';

interface PersonalizationData {
  softwareBackground: string;
  hardwareBackground: string;
}

interface PersonalizedContent {
  recommendedChapters: string[];
  learningPath: string;
  difficultyLevel: string;
  focusAreas: string[];
}

export const usePersonalization = () => {
  const { user } = useAuth();

  const getPersonalizedContent = (): PersonalizedContent => {
    if (!user?.softwareBackground || !user?.hardwareBackground) {
      // Default content if user is not authenticated or doesn't have background data
      return {
        recommendedChapters: [
          '/docs/00-preface',
          '/docs/part-1-foundations/chapter-1-the-case-for-institutional-intelligence/01-lesson-1-1-the-transformational-promise-across-sectors',
          '/docs/part-1-foundations/chapter-2-concepts-and-mental-models/01-lesson-2-1-systems-thinking-for-ai-deployments'
        ],
        learningPath: 'comprehensive',
        difficultyLevel: 'beginner',
        focusAreas: ['foundations', 'ethics']
      };
    }

    // Determine learning path based on background
    let learningPath = 'comprehensive';
    let difficultyLevel = 'intermediate';
    const focusAreas: string[] = [];

    // Analyze software background
    switch (user.softwareBackground) {
      case 'beginner':
        difficultyLevel = 'beginner';
        focusAreas.push('foundations', 'basics');
        break;
      case 'intermediate':
        difficultyLevel = 'intermediate';
        focusAreas.push('practical', 'implementation');
        break;
      case 'expert':
        difficultyLevel = 'advanced';
        focusAreas.push('advanced', 'optimization');
        break;
    }

    // Analyze hardware background
    switch (user.hardwareBackground) {
      case 'beginner':
        focusAreas.push('theoretical');
        break;
      case 'intermediate':
        focusAreas.push('integration');
        break;
      case 'expert':
        focusAreas.push('embedded', 'robotics');
        break;
    }

    // Determine learning path
    if (user.softwareBackground === 'beginner' && user.hardwareBackground === 'beginner') {
      learningPath = 'beginner-friendly';
    } else if (user.softwareBackground === 'expert' || user.hardwareBackground === 'expert') {
      learningPath = 'accelerated';
    } else {
      learningPath = 'balanced';
    }

    // Generate recommended chapters based on background
    const recommendedChapters = generateRecommendedChapters(
      user.softwareBackground,
      user.hardwareBackground,
      focusAreas
    );

    return {
      recommendedChapters,
      learningPath,
      difficultyLevel,
      focusAreas
    };
  };

  const generateRecommendedChapters = (
    softwareBg: string,
    hardwareBg: string,
    focusAreas: string[]
  ): string[] => {
    const chapters: string[] = [];

    // Base chapters for everyone
    chapters.push('/docs/00-preface');

    // Add chapters based on software background
    if (softwareBg === 'beginner') {
      chapters.push(
        '/docs/part-1-foundations/chapter-2-concepts-and-mental-models/01-lesson-2-1-systems-thinking-for-ai-deployments',
        '/docs/part-2-humane-ai-design/chapter-4-ethics-into-engineering/01-lesson-4-1-operationalizing-fairness-and-non-discrimination'
      );
    } else if (softwareBg === 'intermediate') {
      chapters.push(
        '/docs/part-3-enterprise-reliability-engineering/chapter-7-architectural-foundations-for-enterprise-ai/01-lesson-7-1-reference-architecture-modular-testable-auditable-systems',
        '/docs/part-2-humane-ai-design/chapter-5-human-centered-interaction-design/01-lesson-5-1-designing-for-mental-models-of-diverse-users'
      );
    } else if (softwareBg === 'expert') {
      chapters.push(
        '/docs/part-3-enterprise-reliability-engineering/chapter-10-sre-mlops-best-practices/01-lesson-10-1-ci-cd-for-models-vs-code-canaries-shadowing-gating',
        '/docs/part-6-governance/chapter-22-legal-regulatory/01-lesson-22-1-international-regulations-overview-and-mapping'
      );
    }

    // Add chapters based on hardware background
    if (hardwareBg === 'beginner') {
      chapters.push(
        '/docs/part-1-foundations/chapter-1-the-case-for-institutional-intelligence/01-lesson-1-1-the-transformational-promise-across-sectors'
      );
    } else if (hardwareBg === 'intermediate') {
      chapters.push(
        '/docs/part-4-sector-playbooks/chapter-13-manufacturing/01-lesson-13-1-iiot-and-embedded-ai-systems',
        '/docs/part-4-sector-playbooks/chapter-14-automotive/01-lesson-14-1-autonomous-systems-and-safety-critical-ai'
      );
    } else if (hardwareBg === 'expert') {
      chapters.push(
        '/docs/part-4-sector-playbooks/chapter-13-manufacturing/01-lesson-13-1-iiot-and-embedded-ai-systems',
        '/docs/part-8-case-studies/chapter-27-hospital/01-lesson-27-1-case-study-hospital-clinical-decision-support-at-scale'
      );
    }

    return chapters.slice(0, 5); // Return top 5 recommendations
  };

  return {
    getPersonalizedContent,
    generateRecommendedChapters
  };
};

// Backend service for personalization
export const personalizationService = {
  async getPersonalizedRecommendations(userId: string) {
    // This would typically call the backend API
    // For now, we'll simulate the response based on user data
    return {
      userId,
      recommendations: [
        {
          id: '1',
          title: 'Recommended for Your Background',
          description: 'Content tailored to your software and hardware experience',
          type: 'chapter',
          url: '/docs/part-1-foundations/chapter-1-the-case-for-institutional-intelligence/01-lesson-1-1-the-transformational-promise-across-sectors',
          priority: 1
        },
        {
          id: '2',
          title: 'Next Steps in Your Learning Path',
          description: 'Based on your expertise level',
          type: 'chapter',
          url: '/docs/part-2-humane-ai-design/chapter-4-ethics-into-engineering/01-lesson-4-1-operationalizing-fairness-and-non-discrimination',
          priority: 2
        }
      ],
      learningPath: 'balanced',
      difficultyLevel: 'intermediate',
      focusAreas: ['foundations', 'ethics']
    };
  }
};
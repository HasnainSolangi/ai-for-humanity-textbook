import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePersonalization } from '../lib/personalization';

interface PersonalizeButtonProps {
  currentPath?: string;
}

const PersonalizeButton: React.FC<PersonalizeButtonProps> = ({ currentPath }) => {
  const { user, isLoading } = useAuth();
  const { getPersonalizedContent } = usePersonalization();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [personalizedContent, setPersonalizedContent] = useState(null);

  useEffect(() => {
    if (user) {
      const content = getPersonalizedContent();
      setPersonalizedContent(content);
    }
  }, [user]);

  if (isLoading || !user) {
    return null; // Don't show the button if not authenticated
  }

  const handlePersonalizeClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const personalized = personalizedContent;

  return (
    <div className="dropdown dropdown--hoverable margin-left--md">
      <button
        className="button button--secondary button--sm"
        onClick={handlePersonalizeClick}
        aria-expanded={isDropdownOpen}
      >
        <i className="fa fa-user-circle"></i> Personalize
      </button>

      {isDropdownOpen && personalized && (
        <div className="dropdown__menu">
          <div className="dropdown__link" style={{ fontWeight: 'bold', padding: '0.5rem 1rem' }}>
            Your Learning Path: {personalized.learningPath}
          </div>

          <div className="dropdown__link" style={{ padding: '0.5rem 1rem' }}>
            <strong>Difficulty:</strong> {personalized.difficultyLevel}
          </div>

          <div className="dropdown__link" style={{ padding: '0.5rem 1rem' }}>
            <strong>Focus Areas:</strong> {personalized.focusAreas.join(', ')}
          </div>

          <div className="dropdown__link" style={{ padding: '0.5rem 1rem', borderTop: '1px solid #eee' }}>
            <strong>Recommended Next Steps:</strong>
          </div>

          {personalized.recommendedChapters.slice(0, 3).map((chapter, index) => (
            <a
              key={index}
              href={chapter}
              className="dropdown__link"
              style={{ padding: '0.5rem 1rem', paddingLeft: '2rem' }}
              onClick={() => setIsDropdownOpen(false)}
            >
              Chapter {index + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizeButton;
import React from 'react';
import PropTypes from 'prop-types';

const elegantPlaceholder = (
  <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-2xl overflow-hidden">
    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="white" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 13c2.5 0 4.5 2 4.5 4.5v.25a.25.25 0 01-.25.25H7.75a.25.25 0 01-.25-.25v-.25C7.5 15 9.5 13 12 13z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  </div>
);

const StoryCard = ({ imageUrl, name, project, location, personalQuote, websiteThemes, onClick }) => {
  // Only show up to 2 themes for elegance
  const shownThemes = websiteThemes ? websiteThemes.slice(0, 2) : [];
  return (
    <div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-indigo-100 transition-all duration-200 cursor-pointer max-w-sm mx-auto min-h-[400px]"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${name}`}
    >
      {/* Aspect-ratio image container */}
      <div className="w-full aspect-[16/9] overflow-hidden rounded-t-2xl bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name || 'Storyteller'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          elegantPlaceholder
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 py-5">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-1 truncate drop-shadow-sm">{name}</h3>
          <div className="flex justify-center items-center gap-2 mb-2">
            {project && <span className="inline-block px-3 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-100 shadow-sm">{project}</span>}
            {location && <span className="text-xs text-gray-400 font-medium">{location}</span>}
          </div>
          {personalQuote && (
            <div className="relative flex flex-col items-center justify-center my-4 min-h-[60px]">
              <svg className="absolute -left-4 top-0 w-8 h-8 text-indigo-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><text x="0" y="20" fontSize="32" fontFamily="serif">“</text></svg>
              <span className="italic text-indigo-600 text-base text-center px-2 z-10 line-clamp-4">{personalQuote}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {shownThemes.map((theme) => (
            <span key={theme} className="inline-block px-3 py-1 text-xs font-semibold bg-white/60 backdrop-blur border border-gray-200 rounded-full shadow-sm" style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)'}}>
              {theme}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

StoryCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  project: PropTypes.string,
  location: PropTypes.string,
  personalQuote: PropTypes.string,
  websiteThemes: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

export default StoryCard; 
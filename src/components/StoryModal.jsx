import React from 'react';
import PropTypes from 'prop-types';

const StoryModal = ({ open, onClose, story }) => {
  if (!open || !story) return null;
  const fields = story.fields || {};
  const imageUrl = fields['Profile Image']?.[0]?.url;
  const videoEmbed = fields['Video Embed']; // Assume this is a URL or embed code
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {imageUrl && (
          <img src={imageUrl} alt={fields['Name']} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
        )}
        <h2 className="text-2xl font-bold text-center mb-2">{fields['Name']}</h2>
        <div className="flex justify-center gap-2 mb-2">
          {fields['Project'] && <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-indigo-100 text-indigo-800">{fields['Project']}</span>}
          {fields['Location'] && <span className="text-sm text-gray-500">{fields['Location']}</span>}
        </div>
        {fields['Personal Quote'] && (
          <div className="italic text-indigo-700 text-center mb-2">"{fields['Personal Quote']}"</div>
        )}
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {fields['Website themes'] && Array.isArray(fields['Website themes']) && fields['Website themes'].map((theme) => (
            <span key={theme} className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
              {theme}
            </span>
          ))}
        </div>
        {fields['Bio'] && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1">Bio</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">{fields['Bio']}</p>
          </div>
        )}
        {fields['Empathy Ledger Reflection'] && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1">Empathy Ledger Reflection</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">{fields['Empathy Ledger Reflection']}</p>
          </div>
        )}
        {videoEmbed && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1">Story Video</h3>
            {/* If it's a YouTube/Vimeo URL, embed it. Otherwise, render as HTML. */}
            {videoEmbed.match(/(youtube|vimeo)\.com/) ? (
              <iframe
                src={videoEmbed.replace('watch?v=', 'embed/')}
                title="Story Video"
                className="w-full aspect-video rounded"
                allowFullScreen
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: videoEmbed }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

StoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  story: PropTypes.object,
};

export default StoryModal; 
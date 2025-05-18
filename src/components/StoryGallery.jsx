import React, { useEffect, useState } from 'react';
import { fetchAirtableRecords } from '../utils/airtable';
import PropTypes from 'prop-types';
import StoryCard from './StoryCard';
import StoryModal from './StoryModal';

const TABLE_NAME = 'Storytellers'; // Change if your table name is different

const StoryGallery = ({ limit, view }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchAirtableRecords(TABLE_NAME, view)
      .then((data) => {
        setStories(data.records || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [view]);

  if (loading) return <div className="text-center py-8">Loading stories…</div>;
  if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>;

  if (!stories.length) return <div className="text-center py-8">No stories found.</div>;

  const displayedStories = limit ? stories.slice(0, limit) : stories;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 items-start">
        {displayedStories.map((story) => {
          const fields = story.fields || {};
          const imageUrl = fields['File Profile Image']?.[0]?.url;
          const name = fields['Name'];
          const project = fields['Project'];
          const location = fields['Location'];
          const personalQuote = fields['Personal Quote'];
          const websiteThemes = Array.isArray(fields['Website themes']) ? fields['Website themes'] : (fields['Website themes'] ? [fields['Website themes']] : []);
          return (
            <StoryCard
              key={story.id}
              imageUrl={imageUrl}
              name={name}
              project={project}
              location={location}
              personalQuote={personalQuote}
              websiteThemes={websiteThemes}
              onClick={() => setSelectedStory(story)}
            />
          );
        })}
      </div>
      <StoryModal open={!!selectedStory} onClose={() => setSelectedStory(null)} story={selectedStory} />
    </>
  );
};

StoryGallery.propTypes = {
  limit: PropTypes.number,
  view: PropTypes.string,
};

export default StoryGallery; 
import React, { useEffect, useState } from 'react';
import { fetchAirtableRecords } from './utils/airtable';

const TABLE_NAME = 'Stories'; // Change to your actual table name

const AirtableDemo = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAirtableRecords(TABLE_NAME)
      .then(data => {
        setRecords(data.records || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Airtable data...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Airtable Demo: {TABLE_NAME}</h2>
      {records.length === 0 ? (
        <div>No records found.</div>
      ) : (
        <ul>
          {records.map(record => (
            <li key={record.id}>
              <pre>{JSON.stringify(record.fields, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirtableDemo; 
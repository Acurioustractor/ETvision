const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

export async function fetchAirtableRecords(table, view = 'Grid view') {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}?view=${encodeURIComponent(view)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });
  if (!res.ok) throw new Error('Airtable fetch failed');
  return res.json();
} 
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

// Default data structure
const defaultEntities = {
  foundations: [
    { id: "f1", name: "Horizon Foundation", category: "foundation", size: 85, color: "#8b5cf6" },
    { id: "f2", name: "Seachange Trust", category: "foundation", size: 65, color: "#8b5cf6" },
    { id: "f3", name: "Watershed Fund", category: "foundation", size: 45, color: "#8b5cf6" }
  ],
  intermediaries: [
    { id: "i1", name: "Consulting Firm", category: "intermediary", size: 30, color: "#f59e0b" },
    { id: "i2", name: "Program Officer", category: "intermediary", size: 25, color: "#f59e0b" },
    { id: "i3", name: "Evaluation Team", category: "intermediary", size: 28, color: "#f59e0b" },
    { id: "i4", name: "Grant Writer", category: "intermediary", size: 20, color: "#f59e0b" },
    { id: "i5", name: "Communications Team", category: "intermediary", size: 22, color: "#f59e0b" }
  ],
  communities: [
    { id: "c1", name: "Local Advocates", category: "community", size: 40, color: "#10b981" },
    { id: "c2", name: "Youth Leaders", category: "community", size: 35, color: "#10b981" },
    { id: "c3", name: "Cultural Center", category: "community", size: 38, color: "#10b981" },
    { id: "c4", name: "Neighborhood Council", category: "community", size: 42, color: "#10b981" },
    { id: "c5", name: "Health Collective", category: "community", size: 36, color: "#10b981" },
    { id: "c6", name: "Parents Group", category: "community", size: 30, color: "#10b981" }
  ]
};

// Default connections data
const defaultConnections = [
  // Direct connections
  { source: "f1", target: "c1", strength: 0.2, direct: true },
  { source: "f2", target: "c2", strength: 0.1, direct: true },
  
  // Intermediated connections
  { source: "f1", target: "i1", strength: 0.8, direct: true },
  { source: "i1", target: "c1", strength: 0.6, direct: true },
  { source: "i1", target: "c3", strength: 0.4, direct: true },
  
  { source: "f1", target: "i2", strength: 0.9, direct: true },
  { source: "i2", target: "i3", strength: 0.7, direct: true },
  { source: "i3", target: "c2", strength: 0.5, direct: true },
  { source: "i3", target: "c4", strength: 0.4, direct: true },
  
  { source: "f2", target: "i4", strength: 0.8, direct: true },
  { source: "i4", target: "c3", strength: 0.6, direct: true },
  { source: "i4", target: "c5", strength: 0.3, direct: true },
  
  { source: "f3", target: "i5", strength: 0.9, direct: true },
  { source: "i5", target: "i3", strength: 0.6, direct: true },
  { source: "i5", target: "c6", strength: 0.2, direct: true }
];

// Default intervention strategies
const defaultInterventions = [
  {
    id: "int1",
    name: "Direct Community Embedding",
    description: "Foundation staff spend 20% of their time embedded in communities",
    impact: 0.85,
    transformations: [
      { source: "f1", target: "c1", newStrength: 0.8 },
      { source: "f1", target: "c2", newStrength: 0.7 },
      { source: "f1", target: "c3", newStrength: 0.6 },
      { source: "f2", target: "c4", newStrength: 0.7 },
      { source: "f2", target: "c5", newStrength: 0.65 }
    ]
  },
  {
    id: "int2",
    name: "Community Decision Authority",
    description: "Communities have direct authority over 30% of grant decisions",
    impact: 0.9,
    transformations: [
      { source: "c1", target: "f1", newStrength: 0.7 }, // Reversed direction - community to foundation
      { source: "c2", target: "f1", newStrength: 0.6 },
      { source: "c3", target: "f2", newStrength: 0.6 },
      { source: "c4", target: "f2", newStrength: 0.65 },
      { source: "c5", target: "f3", newStrength: 0.7 }
    ]
  },
  {
    id: "int3",
    name: "Intermediary Transformation",
    description: "Retraining intermediaries as facilitative bridges rather than gatekeepers",
    impact: 0.75,
    transformations: [
      { source: "i1", target: "c1", newStrength: 0.9 },
      { source: "i2", target: "c2", newStrength: 0.8 },
      { source: "i3", target: "c3", newStrength: 0.85 },
      { source: "i4", target: "c4", newStrength: 0.75 },
      { source: "i5", target: "c5", newStrength: 0.8 }
    ]
  }
];

const ProximityCartography = ({
  width = 800,
  height = 600,
  entities = defaultEntities,
  connections = defaultConnections,
  interventions = defaultInterventions
}) => {
  // ... (component code as provided in your artifact message) ...

// (The rest of the code is unchanged from your provided artifact)
// Please see the previous artifact message for the full code body.

// ... (rest of the component code) ...
};

export default ProximityCartography; 
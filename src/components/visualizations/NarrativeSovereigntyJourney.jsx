import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

const defaultJourneyData = [
  { 
    id: 'storyteller', 
    name: 'Storyteller', 
    type: 'origin',
    sovereigntyLevel: 100,
    description: 'The originator and rightful owner of the narrative',
    tooltip: 'Stories begin with lived experience'
  },
  { 
    id: 'collection', 
    name: 'Story Collection', 
    type: 'process',
    sovereigntyLevel: 90,
    description: 'The process of recording and documenting stories',
    tooltip: 'Ethical collection respects agency'
  },
  { 
    id: 'curation', 
    name: 'Curation', 
    type: 'process',
    sovereigntyLevel: 70,
    description: 'Selection and organization of stories',
    tooltip: 'Editorial decisions can shape meaning'
  },
  { 
    id: 'amplification', 
    name: 'Amplification', 
    type: 'process',
    sovereigntyLevel: 65,
    description: 'Distribution and sharing of stories',
    tooltip: 'Wider audiences introduce new contexts'
  },
  { 
    id: 'institutional', 
    name: 'Institutional Use', 
    type: 'application',
    sovereigntyLevel: 40,
    description: 'Utilization by governments, foundations, etc.',
    tooltip: 'Often disconnected from original context'
  },
  { 
    id: 'policy', 
    name: 'Policy Impact', 
    type: 'impact',
    sovereigntyLevel: 25,
    description: 'Influence on formal decisions and policy',
    tooltip: 'Abstracted from individual narratives'
  }
];

// Checkpoint data representing sovereignty protection mechanisms
const defaultCheckpoints = [
  {
    id: 'consent',
    name: 'Consent Framework',
    position: 1, // Between storyteller and collection
    description: 'Granular, revocable consent mechanisms',
    effectiveness: 85
  },
  {
    id: 'attribution',
    name: 'Attribution System',
    position: 2, // Between collection and curation
    description: 'Ensures proper credit and context preservation',
    effectiveness: 70
  },
  {
    id: 'review',
    name: 'Storyteller Review',
    position: 3, // Between curation and amplification
    description: 'Opportunity to approve final representations',
    effectiveness: 90
  },
  {
    id: 'valueExchange',
    name: 'Value Exchange',
    position: 4, // Between amplification and institutional use
    description: 'Fair compensation for narrative value',
    effectiveness: 75
  },
  {
    id: 'governance',
    name: 'Governance Participation',
    position: 5, // Between institutional use and policy impact
    description: 'Storyteller voice in decision-making',
    effectiveness: 60
  }
];

function NarrativeSovereigntyJourneyMobile({ journeyData = defaultJourneyData }) {
  const [step, setStep] = useState(0);
  const stage = journeyData[step];
  return (
    <div className="md:hidden px-2 py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">Narrative Sovereignty Journey</h1>
      <p className="text-base text-gray-600 text-center mb-6">Track the journey of a story and its sovereignty.</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        {journeyData.map((s, i) => (
          <div key={s.id} className={`h-2 w-8 rounded-full ${i === step ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
        <div className="text-xs font-semibold uppercase text-indigo-500 mb-2 tracking-wider">Stage {step + 1} of {journeyData.length}</div>
        <div className="text-xl font-bold text-indigo-900 mb-2">{stage.name}</div>
        <div className="mb-3 text-gray-700">{stage.description}</div>
        <div className="mt-4 text-gray-700 italic text-center text-base">{stage.tooltip}</div>
      </div>
      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous</button>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50" onClick={() => setStep(s => Math.min(journeyData.length - 1, s + 1))} disabled={step === journeyData.length - 1}>Next</button>
      </div>
    </div>
  );
}

const NarrativeSovereigntyJourney = ({
  journeyData = defaultJourneyData,
  checkpoints = defaultCheckpoints,
  width = 800,
  height = 500,
  showDetails = true
}) => {
  const svgRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Set up layout
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const main = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Create x scale for journey stages
    const x = d3.scalePoint()
      .domain(journeyData.map(d => d.id))
      .range([0, innerWidth])
      .padding(0.5);
    
    // Create y scale for sovereignty level
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);
    
    // Create line generator
    const line = d3.line()
      .x(d => x(d.id))
      .y(d => y(d.sovereigntyLevel))
      .curve(d3.curveMonotoneX);
    
    // Draw traditional line (if in compare mode)
    if (compareMode) {
      const traditionalData = journeyData.map(item => ({
        ...item,
        sovereigntyLevel: Math.max(item.sovereigntyLevel - 40, 5) // Dramatically lower sovereignty in traditional model
      }));
      
      main.append("path")
        .datum(traditionalData)
        .attr("fill", "none")
        .attr("stroke", "#ff9999")
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", "5,5")
        .attr("d", line);
        
      // Add label for traditional line
      main.append("text")
        .attr("x", innerWidth - 100)
        .attr("y", innerHeight - 20)
        .attr("fill", "#e55c5c")
        .attr("font-size", "12px")
        .text("Traditional Model");
    }
    
    // Draw empathy ledger line
    main.append("path")
      .datum(journeyData)
      .attr("fill", "none")
      .attr("stroke", "#6366f1")
      .attr("stroke-width", 4)
      .attr("d", line);
      
    // Add label for empathy ledger line
    main.append("text")
      .attr("x", innerWidth - 100)
      .attr("y", innerHeight - 40)
      .attr("fill", "#6366f1")
      .attr("font-size", "12px")
      .text("Empathy Ledger Model");
    
    // Draw nodes
    main.selectAll(".journey-node")
      .data(journeyData)
      .enter()
      .append("circle")
      .attr("class", "journey-node")
      .attr("cx", d => x(d.id))
      .attr("cy", d => y(d.sovereigntyLevel))
      .attr("r", 8)
      .attr("fill", d => {
        switch(d.type) {
          case 'origin': return "#10b981";
          case 'process': return "#6366f1";
          case 'application': return "#f59e0b";
          case 'impact': return "#ef4444";
          default: return "#6b7280";
        }
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        setActiveNode(d);
        d3.select(event.currentTarget)
          .transition()
          .duration(300)
          .attr("r", 12);
      })
      .on("mouseout", (event) => {
        setActiveNode(null);
        d3.select(event.currentTarget)
          .transition()
          .duration(300)
          .attr("r", 8);
      });
      
    // Add node labels
    main.selectAll(".journey-label")
      .data(journeyData)
      .enter()
      .append("text")
      .attr("class", "journey-label")
      .attr("x", d => x(d.id))
      .attr("y", d => y(d.sovereigntyLevel) - 15)
      .attr("text-anchor", "middle")
      .attr("fill", "#4b5563")
      .attr("font-size", "12px")
      .text(d => d.name);
    
    // Draw checkpoints (sovereignty protection mechanisms)
    if (checkpoints && checkpoints.length) {
      checkpoints.forEach(checkpoint => {
        const startIndex = checkpoint.position - 1;
        const endIndex = checkpoint.position;
        
        if (startIndex >= 0 && endIndex < journeyData.length) {
          const startNode = journeyData[startIndex];
          const endNode = journeyData[endIndex];
          
          // Calculate positioning for the checkpoint
          const x1 = x(startNode.id);
          const y1 = y(startNode.sovereigntyLevel);
          const x2 = x(endNode.id);
          const y2 = y(endNode.sovereigntyLevel);
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - 30; // Position above the line
          
          // Draw the checkpoint
          main.append("circle")
            .attr("cx", midX)
            .attr("cy", midY)
            .attr("r", 6)
            .attr("fill", `rgba(16, 185, 129, ${checkpoint.effectiveness / 100})`)
            .attr("stroke", "#10b981")
            .attr("stroke-width", 2)
            .on("mouseover", (event) => {
              d3.select(event.currentTarget)
                .transition()
                .duration(300)
                .attr("r", 10);
                
              // Add temporary tooltip
              main.append("rect")
                .attr("class", "checkpoint-tooltip")
                .attr("x", midX - 100)
                .attr("y", midY - 60)
                .attr("width", 200)
                .attr("height", 50)
                .attr("rx", 5)
                .attr("fill", "white")
                .attr("stroke", "#10b981")
                .attr("stroke-width", 1)
                .attr("opacity", 0)
                .transition()
                .duration(300)
                .attr("opacity", 0.9);
                
              main.append("text")
                .attr("class", "checkpoint-tooltip")
                .attr("x", midX)
                .attr("y", midY - 40)
                .attr("text-anchor", "middle")
                .attr("fill", "#1f2937")
                .attr("font-size", "12px")
                .attr("font-weight", "bold")
                .text(checkpoint.name)
                .attr("opacity", 0)
                .transition()
                .duration(300)
                .attr("opacity", 1);
                
              main.append("text")
                .attr("class", "checkpoint-tooltip")
                .attr("x", midX)
                .attr("y", midY - 25)
                .attr("text-anchor", "middle")
                .attr("fill", "#4b5563")
                .attr("font-size", "10px")
                .text(checkpoint.description)
                .attr("opacity", 0)
                .transition()
                .duration(300)
                .attr("opacity", 1);
            })
            .on("mouseout", (event) => {
              d3.select(event.currentTarget)
                .transition()
                .duration(300)
                .attr("r", 6);
                
              // Remove tooltips
              main.selectAll(".checkpoint-tooltip")
                .transition()
                .duration(300)
                .attr("opacity", 0)
                .remove();
            });
        }
      });
    }
    
    // Add axes
    const xAxis = d3.axisBottom(x);
    main.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "10px");
    
    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d => `${d}%`);
    main.append("g")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "10px");
    
    // Add y-axis label
    main.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#4b5563")
      .attr("font-size", "12px")
      .text("Narrative Sovereignty Level");
    
  }, [journeyData, checkpoints, width, height, compareMode]);

  return (
    <>
      <div className="hidden md:block">
        <div className="narrative-sovereignty-journey-container">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Narrative Sovereignty Journey</h3>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={() => setCompareMode(!compareMode)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-700">Compare with Traditional Model</span>
              </label>
            </div>
          </div>
          
          <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <svg ref={svgRef} width={width} height={height}></svg>
            
            {activeNode && showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-md border border-indigo-100"
              >
                <h4 className="text-lg font-semibold text-gray-800">{activeNode.name}</h4>
                <p className="text-sm text-gray-600">{activeNode.description}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium mr-2">Sovereignty Level:</span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${activeNode.sovereigntyLevel}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{activeNode.sovereigntyLevel}%</span>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>This visualization maps the journey of stories from their origin to their ultimate impact, highlighting where narrative sovereignty is maintained or compromised, and the mechanisms that protect storyteller agency.</p>
          </div>
        </div>
      </div>
      <NarrativeSovereigntyJourneyMobile journeyData={journeyData} />
    </>
  );
};

export default NarrativeSovereigntyJourney; 
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { motion } from 'framer-motion';

// Default dataset showing value flows
const defaultTraditionalData = {
  nodes: [
    { id: "storytellers", name: "Storytellers", category: "people" },
    { id: "media", name: "Media Organizations", category: "institution" },
    { id: "nonprofits", name: "Nonprofits", category: "institution" },
    { id: "government", name: "Government Agencies", category: "institution" },
    { id: "foundations", name: "Foundations", category: "institution" },
    { id: "corporations", name: "Corporations", category: "institution" },
    { id: "financial", name: "Financial Value", category: "value" },
    { id: "social", name: "Social Value", category: "value" },
    { id: "reputational", name: "Reputational Value", category: "value" },
    { id: "impact", name: "Impact Value", category: "value" },
  ],
  links: [
    // Storytellers generate value...
    { source: "storytellers", target: "financial", value: 100, description: "Stories generate financial value" },
    { source: "storytellers", target: "social", value: 150, description: "Stories generate social value" },
    { source: "storytellers", target: "reputational", value: 120, description: "Stories generate reputational value" },
    { source: "storytellers", target: "impact", value: 180, description: "Stories generate impact value" },
    
    // Financial value flows mainly to institutions
    { source: "financial", target: "media", value: 40, description: "Media organizations monetize stories" },
    { source: "financial", target: "nonprofits", value: 20, description: "Nonprofits raise funds using stories" },
    { source: "financial", target: "foundations", value: 5, description: "Foundations gain donations through impact stories" },
    { source: "financial", target: "corporations", value: 30, description: "Corporations profit from storytelling" },
    { source: "financial", target: "storytellers", value: 5, description: "Minimal financial return to storytellers" },
    
    // Social value distribution
    { source: "social", target: "media", value: 30, description: "Media builds audience through stories" },
    { source: "social", target: "nonprofits", value: 40, description: "Nonprofits build movements with stories" },
    { source: "social", target: "foundations", value: 25, description: "Foundations demonstrate social impact" },
    { source: "social", target: "government", value: 35, description: "Government builds social programs" },
    { source: "social", target: "storytellers", value: 20, description: "Some social benefit returns to communities" },
    
    // Reputational value distribution
    { source: "reputational", target: "media", value: 25, description: "Media gains credibility" },
    { source: "reputational", target: "nonprofits", value: 30, description: "Nonprofits build brand recognition" },
    { source: "reputational", target: "foundations", value: 25, description: "Foundations enhance their image" },
    { source: "reputational", target: "corporations", value: 30, description: "Corporate brand enhancement" },
    { source: "reputational", target: "storytellers", value: 10, description: "Minimal recognition for storytellers" },
    
    // Impact value distribution
    { source: "impact", target: "nonprofits", value: 50, description: "Nonprofits claim impact achievements" },
    { source: "impact", target: "foundations", value: 45, description: "Foundations demonstrate effectiveness" },
    { source: "impact", target: "government", value: 40, description: "Government shows policy success" },
    { source: "impact", target: "corporations", value: 25, description: "Corporate social responsibility claims" },
    { source: "impact", target: "storytellers", value: 20, description: "Some impact returns to communities" },
  ]
};

// Empathy Ledger model data
const defaultEmpathyLedgerData = {
  nodes: [
    { id: "storytellers", name: "Storytellers", category: "people" },
    { id: "media", name: "Media Organizations", category: "institution" },
    { id: "nonprofits", name: "Nonprofits", category: "institution" },
    { id: "government", name: "Government Agencies", category: "institution" },
    { id: "foundations", name: "Foundations", category: "institution" },
    { id: "corporations", name: "Corporations", category: "institution" },
    { id: "financial", name: "Financial Value", category: "value" },
    { id: "social", name: "Social Value", category: "value" },
    { id: "reputational", name: "Reputational Value", category: "value" },
    { id: "impact", name: "Impact Value", category: "value" },
  ],
  links: [
    // Storytellers generate value...
    { source: "storytellers", target: "financial", value: 100, description: "Stories generate financial value" },
    { source: "storytellers", target: "social", value: 150, description: "Stories generate social value" },
    { source: "storytellers", target: "reputational", value: 120, description: "Stories generate reputational value" },
    { source: "storytellers", target: "impact", value: 180, description: "Stories generate impact value" },
    
    // Financial value flows with much more to storytellers
    { source: "financial", target: "media", value: 20, description: "Media organizations share story value" },
    { source: "financial", target: "nonprofits", value: 15, description: "Nonprofits share fundraising proceeds" },
    { source: "financial", target: "foundations", value: 5, description: "Foundations provide direct support" },
    { source: "financial", target: "corporations", value: 15, description: "Corporations pay fair licensing" },
    { source: "financial", target: "storytellers", value: 45, description: "Substantial financial return to storytellers" },
    
    // Social value distribution
    { source: "social", target: "media", value: 20, description: "Media platforms share social capital" },
    { source: "social", target: "nonprofits", value: 25, description: "Nonprofits co-create movements" },
    { source: "social", target: "foundations", value: 15, description: "Foundations facilitate networks" },
    { source: "social", target: "government", value: 20, description: "Government provides social infrastructure" },
    { source: "social", target: "storytellers", value: 70, description: "Majority of social benefit returns to communities" },
    
    // Reputational value distribution
    { source: "reputational", target: "media", value: 15, description: "Media shares storyteller platform" },
    { source: "reputational", target: "nonprofits", value: 20, description: "Nonprofits highlight storyteller contributions" },
    { source: "reputational", target: "foundations", value: 15, description: "Foundations center storyteller expertise" },
    { source: "reputational", target: "corporations", value: 15, description: "Corporate recognition of stories" },
    { source: "reputational", target: "storytellers", value: 55, description: "Majority of recognition to storytellers" },
    
    // Impact value distribution
    { source: "impact", target: "nonprofits", value: 25, description: "Nonprofits collaborate on impact claims" },
    { source: "impact", target: "foundations", value: 20, description: "Foundations share impact credit" },
    { source: "impact", target: "government", value: 25, description: "Government acknowledges community contribution" },
    { source: "impact", target: "corporations", value: 10, description: "Transparent corporate impact reporting" },
    { source: "impact", target: "storytellers", value: 100, description: "Substantial impact returns to communities" },
  ]
};

const ValueExchangeEcosystem = ({
  width = 900,
  height = 600,
  traditional = defaultTraditionalData,
  empathyLedger = defaultEmpathyLedgerData
}) => {
  const svgRef = useRef(null);
  const [activeModel, setActiveModel] = useState('empathyLedger');
  const [activeLink, setActiveLink] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  
  const calculateTotals = (data) => {
    // Calculate total value flowing to storytellers
    const storytellerLinks = data.links.filter(l => l.target === 'storytellers');
    const totalToStorytellers = storytellerLinks.reduce((sum, link) => sum + link.value, 0);
    
    // Calculate total value flowing from storytellers
    const fromStorytellers = data.links.filter(l => l.source === 'storytellers');
    const totalFromStorytellers = fromStorytellers.reduce((sum, link) => sum + link.value, 0);
    
    // Calculate percentage return
    const percentageReturn = Math.round((totalToStorytellers / totalFromStorytellers) * 100);
    
    return {
      totalToStorytellers,
      totalFromStorytellers,
      percentageReturn
    };
  };
  
  const traditionalStats = calculateTotals(traditional);
  const empathyLedgerStats = calculateTotals(empathyLedger);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const currentData = activeModel === 'traditional' ? traditional : empathyLedger;

    // Deep clone and ensure all IDs are strings
    const sankeyData = {
      nodes: currentData.nodes.map(d => ({ ...d, id: String(d.id) })),
      links: currentData.links.map(d => ({
        ...d,
        source: String(d.source),
        target: String(d.target)
      }))
    };

    // Defensive log
    console.log('Sankey nodes:', sankeyData.nodes.map(n => n.id));
    console.log('Sankey links:', sankeyData.links.map(l => [l.source, l.target]));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const margin = { top: 20, right: 30, bottom: 30, left: 30 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const main = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    // Create sankey generator
    const sankeyGen = sankey()
      .nodeWidth(20)
      .nodePadding(10)
      .extent([[0, 0], [innerWidth, innerHeight]]);
    
    // Generate the sankey diagram
    const { nodes, links } = sankeyGen(sankeyData);
    
    // Create node color scale
    const colorScale = d3.scaleOrdinal()
      .domain(['people', 'institution', 'value'])
      .range(['#10b981', '#6366f1', '#f59e0b']);
    
    // Draw the links
    const link = main.append("g")
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", d => {
        // Check if source or target is storytellers
        if (d.source.id === 'storytellers' || d.target.id === 'storytellers') {
          return '#10b981';
        }
        return '#d1d5db';
      })
      .attr("stroke-width", d => Math.max(1, d.width))
      .attr("fill", "none")
      .attr("opacity", 0.7)
      .on("mouseover", (event, d) => {
        setActiveLink(d);
        
        d3.select(event.currentTarget)
          .transition()
          .duration(300)
          .attr("stroke-width", d.width + 2)
          .attr("opacity", 1);
      })
      .on("mouseout", (event) => {
        setActiveLink(null);
        
        d3.select(event.currentTarget)
          .transition()
          .duration(300)
          .attr("stroke-width", d => Math.max(1, d.width))
          .attr("opacity", 0.7);
      });
      
    // Draw the nodes
    const node = main.append("g")
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
      .on("mouseover", (event, d) => {
        setActiveNode(d);
        
        d3.select(event.currentTarget)
          .select("rect")
          .transition()
          .duration(300)
          .attr("stroke", "#000")
          .attr("stroke-width", 2);
      })
      .on("mouseout", (event) => {
        setActiveNode(null);
        
        d3.select(event.currentTarget)
          .select("rect")
          .transition()
          .duration(300)
          .attr("stroke", "#000")
          .attr("stroke-width", 0.5);
      });
    
    // Add rectangles for the nodes
    node.append("rect")
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => colorScale(d.category))
      .attr("stroke", "#000")
      .attr("stroke-width", 0.5);
    
    // Add labels for the nodes
    node.append("text")
      .attr("x", d => (d.x0 < innerWidth / 2) ? (d.x1 - d.x0 + 6) : -6)
      .attr("y", d => (d.y1 - d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => (d.x0 < innerWidth / 2) ? "start" : "end")
      .text(d => d.name)
      .attr("font-size", "10px")
      .attr("fill", "#4b5563");
    
  }, [activeModel, traditional, empathyLedger, width, height]);

  return (
    <div className="value-exchange-ecosystem-container">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Value Exchange Ecosystem</h3>
        <div className="flex items-center">
          <button
            className={`px-3 py-1 rounded-md text-sm mr-2 ${activeModel === 'traditional' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveModel('traditional')}
          >
            Traditional Model
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${activeModel === 'empathyLedger' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveModel('empathyLedger')}
          >
            Empathy Ledger Model
          </button>
        </div>
      </div>
      
      <div className="flex mb-4">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200 mr-4">
          <div className="text-sm text-gray-700 font-medium">Value Generated by Storytellers</div>
          <div className="text-3xl font-bold text-indigo-700 my-2">
            {activeModel === 'traditional' ? traditionalStats.totalFromStorytellers : empathyLedgerStats.totalFromStorytellers}
            <span className="text-sm text-gray-500 ml-1">units</span>
          </div>
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200 mr-4">
          <div className="text-sm text-gray-700 font-medium">Value Returned to Storytellers</div>
          <div className="text-3xl font-bold text-green-600 my-2">
            {activeModel === 'traditional' ? traditionalStats.totalToStorytellers : empathyLedgerStats.totalToStorytellers}
            <span className="text-sm text-gray-500 ml-1">units</span>
          </div>
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700 font-medium">Return Percentage</div>
          <div className="text-3xl font-bold text-amber-600 my-2">
            {activeModel === 'traditional' ? traditionalStats.percentageReturn : empathyLedgerStats.percentageReturn}%
          </div>
        </div>
      </div>
      
      <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <svg ref={svgRef} width={width} height={height}></svg>
        
        {(activeLink || activeNode) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md border border-indigo-100 max-w-xs"
          >
            {activeLink && (
              <>
                <h4 className="text-md font-semibold text-gray-800">{activeLink.source.name} → {activeLink.target.name}</h4>
                <p className="text-sm text-gray-600">{activeLink.description}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium">Value Flow: </span>
                  <span className="text-sm text-indigo-600 font-semibold">{activeLink.value} units</span>
                </div>
              </>
            )}
            
            {activeNode && !activeLink && (
              <>
                <h4 className="text-md font-semibold text-gray-800">{activeNode.name}</h4>
                <div className="mt-2">
                  <span className="text-sm font-medium">Category: </span>
                  <span className="text-sm">
                    {activeNode.category === 'people' && 'People & Communities'}
                    {activeNode.category === 'institution' && 'Institutions & Organizations'}
                    {activeNode.category === 'value' && 'Value Types'}
                  </span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>This visualization shows how stories generate different forms of value and how that value flows through the ecosystem. In the traditional model, most value accrues to institutions, while the Empathy Ledger model ensures equitable distribution with a focus on returning value to storytellers.</p>
      </div>
    </div>
  );
};

export default ValueExchangeEcosystem; 
// src/components/charts/d3/D3BaseChart.jsx
import React, { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';

const D3BaseChart = ({ 
  data, 
  width = 500, 
  height = 300, 
  margin = { top: 20, right: 20, bottom: 40, left: 40 }, // Define default margin
  renderChart,
  className = "" 
}) => {
  const svgRef = useRef();

  const drawChart = useCallback(() => {
    if (!data || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create main group with margins
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Call the render function with D3 context and pass margin
    renderChart(svg, g, {
      width,
      height,
      innerWidth,
      innerHeight,
      data,
      margin // Pass margin to the render function
    });
  }, [data, width, height, margin, renderChart]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);

  return (
    <div className={`bg-gray-900/50 rounded-lg p-4 border border-gray-700 ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="mx-auto"
      />
    </div>
  );
};

export default D3BaseChart;
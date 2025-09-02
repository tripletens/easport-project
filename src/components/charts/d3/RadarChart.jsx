// src/components/charts/d3/RadarChart.jsx
import React, { useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ players, attributes, width = 500, height = 400, className = "" }) => {
  const svgRef = useRef();
  
  const processedData = useMemo(() => {
    if (!players || !attributes) return null;

    return players.map(player => {
      const stats = player.statistics[0] || {};
      return {
        name: player.player.name,
        values: attributes.map(attr => {
          // Handle nested keys like 'goals.total'
          const value = attr.key.split('.').reduce((obj, key) => obj?.[key], stats) || 0;
          return {
            axis: attr.label,
            value: Math.min(value, attr.max || 100), // Cap at max value
            max: attr.max || 100
          };
        })
      };
    });
  }, [players, attributes]);

  useEffect(() => {
    if (!processedData || processedData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left + innerWidth / 2}, ${margin.top + innerHeight / 2})`);

    const angleSlice = (Math.PI * 2) / processedData[0].values.length;

    // Scales
    const rScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);

    // Grid circles
    const circles = [20, 40, 60, 80, 100];
    circles.forEach(circle => {
      g.append('circle')
        .attr('r', rScale(circle))
        .attr('fill', 'none')
        .attr('stroke', '#4B5563')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2');
    });

    // Axis lines and labels
    processedData[0].values.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const line = d3.line()([[0, 0], [radius * Math.cos(angle), radius * Math.sin(angle)]]);
      
      g.append('path')
        .attr('d', line)
        .attr('stroke', '#4B5563')
        .attr('stroke-width', 1);

      g.append('text')
        .attr('class', 'axis-label')
        .attr('x', (radius + 15) * Math.cos(angle))
        .attr('y', (radius + 15) * Math.sin(angle))
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('fill', '#9CA3AF')
        .style('font-size', '11px')
        .text(d.axis);
    });

    // Color scale
    const colorScale = d3.scaleOrdinal()
      .domain(processedData.map(d => d.name))
      .range(['#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']);

    // Draw each player's radar
    processedData.forEach(player => {
      const lineGenerator = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .angle((d, i) => angleSlice * i - Math.PI / 2)
        .radius(d => rScale(d.value));

      g.append('path')
        .datum(player.values)
        .attr('d', lineGenerator)
        .attr('fill', colorScale(player.name))
        .attr('fill-opacity', 0.15)
        .attr('stroke', colorScale(player.name))
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.8);

      // Add data points
      player.values.forEach((d, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = rScale(d.value) * Math.cos(angle);
        const y = rScale(d.value) * Math.sin(angle);
        
        g.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 4)
          .attr('fill', colorScale(player.name))
          .attr('stroke', '#1F2937')
          .attr('stroke-width', 1);
      });
    });

    // LEGEND - MOVED TO TOP LEFT CORNER
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left - 40}, ${margin.top - 40})`);

    processedData.forEach((player, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`)
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          d3.select(this).select('rect').attr('stroke', '#FFFFFF').attr('stroke-width', '2');
        })
        .on('mouseout', function() {
          d3.select(this).select('rect').attr('stroke', 'none');
        });

      legendGroup.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale(player.name))
        .attr('rx', 3);

      legendGroup.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .text(player.name)
        .attr('fill', '#E5E7EB')
        .style('font-size', '14px')
        .style('font-weight', '500');
    });

  }, [processedData, width, height]);

  if (!processedData || processedData.length === 0) {
    return (
      <div style={{
        backgroundColor: 'rgba(17, 24, 39, 0.5)', 
        borderRadius: '0.5rem', 
        padding: '2rem', 
        textAlign: 'center', 
        border: '1px solid rgba(55, 65, 81, 1)',
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{color: 'rgba(156, 163, 175, 1)'}}>Select players to generate radar comparison</div>
      </div>
    );
  }

  return (
    <div style={{ width: width, height: height, position: 'relative' }} className={className}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default RadarChart;

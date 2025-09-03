import React, { useState } from 'react';
import { useTeamPlayers } from '../../hooks/useTeamPlayers';
import { getClubById } from '../../config/premierLeagueClubs';
import RadarChart from '../charts/d3/RadarChart';
import BarChartComparison from '../charts/d3/BarChartComparison';

const PlayerComparison = ({
    playersData = [],
    selectedPlayers: externalSelectedPlayers = [],
    setSelectedPlayers: externalSetSelectedPlayers,
    onBack,
    selectedSeason,
    selectedTeam,
    club
}) => {
    const { data, loading, error } = useTeamPlayers(selectedTeam, selectedSeason);
    const [comparisonType, setComparisonType] = useState('radar');
    
    // we use local state if setSelectedPlayers is not provided
    const [internalSelectedPlayers, setInternalSelectedPlayers] = useState([]);
    
    // we will determine which state to use
    const usingExternalState = typeof externalSetSelectedPlayers === 'function';
    const selectedPlayers = usingExternalState ? externalSelectedPlayers : internalSelectedPlayers;
    const setSelectedPlayers = usingExternalState ? externalSetSelectedPlayers : setInternalSelectedPlayers;

    const displayClub = club || getClubById(selectedTeam);

    const chartAttributes = [
        { key: 'goals.total', label: 'Goals', max: 30 },
        { key: 'goals.assists', label: 'Assists', max: 20 },
        { key: 'shots.total', label: 'Total Shots', max: 100 },
        { key: 'shots.on', label: 'Shots on Target', max: 50 },
        { key: 'passes.total', label: 'Total Passes', max: 150 },
        { key: 'passes.accuracy', label: 'Pass Accuracy', max: 100 },
        { key: 'dribbles.attempts', label: 'Dribble Attempts', max: 100 },
        { key: 'dribbles.success', label: 'Successful Dribbles', max: 80 },
        { key: 'tackles.total', label: 'Total Tackles', max: 80 },
        { key: 'tackles.blocks', label: 'Blocks', max: 30 },
        { key: 'tackles.interceptions', label: 'Interceptions', max: 40 },
        { key: 'cards.yellow', label: 'Yellow Cards', max: 15 },
        { key: 'cards.red', label: 'Red Cards', max: 5 }
    ];

    const handlePlayerSelect = (player) => {
        // we will check if player is already selected
        const isAlreadySelected = selectedPlayers.some(p => p.player.id === player.player.id);
        
        if (isAlreadySelected) {
            // let's remove player from selection
            setSelectedPlayers(prev => prev.filter(p => p.player.id !== player.player.id));
        } else if (selectedPlayers.length < 4) {
            // we will add player to selection (max of 4 players)
            setSelectedPlayers(prev => [...prev, player]);
        } else {
            // we will show a message if user is trying to select more than 4 players
            alert("You can only select up to 4 players for comparison");
        }
    };

    const players = playersData.length > 0 ? playersData : (data?.response || []);

    return (
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(31, 41, 55, 0.5)', borderRadius: '0.75rem', border: '1px solid rgba(55, 65, 81, 1)' }}>
          
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <button
                    onClick={onBack}
                    style={{ display: 'flex', alignItems: 'center', color: '#22d3ee', fontSize: '0.875rem', fontWeight: '500' }}
                    onMouseOver={(e) => e.target.style.color = '#67e8f9'}
                    onMouseOut={(e) => e.target.style.color = '#22d3ee'}
                >
                    &larr; Back to Players List
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {displayClub && (
                        <>
                            <img
                                src={displayClub.logo}
                                alt={displayClub.name}
                                style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
                            />
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22d3ee' }}>{displayClub.name} Player Comparison</h2>
                                <p style={{ color: 'rgba(156, 163, 175, 1)' }}>Premier League {selectedSeason}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setComparisonType('radar')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s',
                            ...(comparisonType === 'radar'
                                ? { backgroundColor: '#0891b2', color: 'white', boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.2)' }
                                : { backgroundColor: 'rgba(55, 65, 81, 1)', color: 'rgba(209, 213, 219, 1)', cursor: 'pointer' }
                            )
                        }}
                        onMouseOver={(e) => {
                            if (comparisonType !== 'radar') {
                                e.target.style.backgroundColor = 'rgba(75, 85, 99, 1)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (comparisonType !== 'radar') {
                                e.target.style.backgroundColor = 'rgba(55, 65, 81, 1)';
                            }
                        }}
                    >
                        📊 Radar Chart
                    </button>
                    <button
                        onClick={() => setComparisonType('bar')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s',
                            ...(comparisonType === 'bar'
                                ? { backgroundColor: '#0891b2', color: 'white', boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.2)' }
                                : { backgroundColor: 'rgba(55, 65, 81, 1)', color: 'rgba(209, 213, 219, 1)', cursor: 'pointer' }
                            )
                        }}
                        onMouseOver={(e) => {
                            if (comparisonType !== 'bar') {
                                e.target.style.backgroundColor = 'rgba(75, 85, 99, 1)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (comparisonType !== 'bar') {
                                e.target.style.backgroundColor = 'rgba(55, 65, 81, 1)';
                            }
                        }}
                    >
                        📈 Bar Chart
                    </button>
                    <button
                        onClick={() => setComparisonType('table')}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s',
                            ...(comparisonType === 'table'
                                ? { backgroundColor: '#0891b2', color: 'white', boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.2)' }
                                : { backgroundColor: 'rgba(55, 65, 81, 1)', color: 'rgba(209, 213, 219, 1)', cursor: 'pointer' }
                            )
                        }}
                        onMouseOver={(e) => {
                            if (comparisonType !== 'table') {
                                e.target.style.backgroundColor = 'rgba(75, 85, 99, 1)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (comparisonType !== 'table') {
                                e.target.style.backgroundColor = 'rgba(55, 65, 81, 1)';
                            }
                        }}
                    >
                        📋 Data Table
                    </button>
                </div>

                {selectedPlayers.length > 0 && (
                    <div style={{ color: '#22d3ee', fontSize: '0.875rem', backgroundColor: 'rgba(22, 78, 99, 0.3)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                        {selectedPlayers.length} player{selectedPlayers.length !== 1 ? 's' : ''} selected
                    </div>
                )}
            </div>

            {/* here ww will show all the visualization items i.e charts, table and radar */}
            {selectedPlayers.length > 0 ? (
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    {comparisonType === 'radar' ? (
                        <div style={{
                            backgroundColor: 'rgba(17, 24, 39, 0.5)',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            border: '1px solid rgba(55, 65, 81, 1)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <RadarChart
                                players={selectedPlayers}
                                attributes={chartAttributes.slice(0, 6)}
                                width={700}
                                height={500}
                            />
                        </div>
                    ) : comparisonType === 'bar' ? (
                        <BarChartComparison
                            players={selectedPlayers}
                            attributes={chartAttributes}
                            width={700}
                            height={500}
                        />
                    ) : (
                        <div style={{ backgroundColor: 'rgba(17, 24, 39, 0.5)', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid rgba(55, 65, 81, 1)' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#22d3ee', marginBottom: '1rem' }}>Player Statistics Table</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '700px' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid rgba(75, 85, 99, 1)' }}>
                                            <th style={{ textAlign: 'left', fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', paddingBottom: '0.5rem' }}>Attribute</th>
                                            {selectedPlayers.map(player => (
                                                <th key={player.player.id} style={{ textAlign: 'left', fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)', paddingBottom: '0.5rem' }}>
                                                    {player.player.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chartAttributes.map(attr => (
                                            <tr key={attr.key} style={{ borderBottom: '1px solid rgba(55, 65, 81, 0.5)' }}>
                                                <td style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: 'rgba(209, 213, 219, 1)', fontWeight: '500' }}>{attr.label}</td>
                                                {selectedPlayers.map(player => {
                                                    const stats = player.statistics[0] || {};
                                                    const value = attr.key.split('.').reduce((obj, key) => obj?.[key], stats) || 0;
                                                    return (
                                                        <td key={player.player.id} style={{ padding: '0.5rem 0', fontSize: '0.875rem', color: 'rgba(156, 163, 175, 1)' }}>
                                                            {typeof value === 'number' ? value.toFixed(1) : value}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'rgba(17, 24, 39, 0.5)',
                    borderRadius: '0.5rem',
                    padding: '3rem',
                    border: '1px solid rgba(55, 65, 81, 1)',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px'
                }}>
                    <div>
                        <div style={{ color: '#22d3ee', fontSize: '1.125rem', marginBottom: '0.5rem' }}>⚖️ Select Players to Compare</div>
                        <div style={{ color: 'rgba(156, 163, 175, 1)' }}>Choose up to 4 players from the list below to start comparing their performance</div>
                    </div>
                </div>
            )}

            {/* we will add player selection feature here */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'rgba(209, 213, 219, 1)' }}>
                        Available Players ({players.length})
                    </h3>
                    <button
                        onClick={() => setSelectedPlayers([])}
                        disabled={selectedPlayers.length === 0}
                        style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            ...(selectedPlayers.length === 0
                                ? { backgroundColor: 'rgba(55, 65, 81, 1)', color: 'rgba(107, 114, 128, 1)', cursor: 'not-allowed' }
                                : { backgroundColor: 'rgba(153, 27, 27, 0.3)', color: 'rgba(252, 165, 165, 1)', cursor: 'pointer' }
                            )
                        }}
                        onMouseOver={(e) => {
                            if (selectedPlayers.length > 0) {
                                e.target.style.backgroundColor = 'rgba(153, 27, 27, 0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedPlayers.length > 0) {
                                e.target.style.backgroundColor = 'rgba(153, 27, 27, 0.3)';
                            }
                        }}
                    >
                        Clear Selection
                    </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '0.75rem' }}>
                    {players.map((player) => {
                        const isSelected = selectedPlayers.some(p => p.player.id === player.player.id);
                        const stats = player.statistics[0] || {};
                        const rating = stats.games?.rating ? parseFloat(stats.games.rating).toFixed(1) : 'N/A';

                        return (
                            <div
                                key={player.player.id}
                                onClick={() => handlePlayerSelect(player)}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    ...(isSelected
                                        ? { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4', boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.1)' }
                                        : { backgroundColor: 'rgba(31, 41, 55, 0.5)', borderColor: 'rgba(75, 85, 99, 1)' }
                                    )
                                }}
                                onMouseOver={(e) => {
                                    if (!isSelected) {
                                        e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!isSelected) {
                                        e.target.style.backgroundColor = 'rgba(31, 41, 55, 0.5)';
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <img
                                        src={player.player.photo}
                                        alt={player.player.name}
                                        style={{ width: '3rem', height: '3rem', borderRadius: '9999px', objectFit: 'cover', border: '2px solid rgba(75, 85, 99, 1)' }}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/48';
                                        }}
                                    />
                                    <div style={{ flex: '1', minWidth: '0' }}>
                                        <div style={{
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            color: isSelected ? '#a5f3fc' : 'rgba(229, 231, 235, 1)'
                                        }}>
                                            {player.player.name}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'rgba(156, 163, 175, 1)' }}>
                                            {stats.games?.position || 'N/A'} • {player.player.age} yrs
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                            <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'rgba(147, 197, 253, 1)', padding: '0.1rem 0.4rem', borderRadius: '0.25rem' }}>
                                                ⚽ {stats.goals?.total || 0}
                                            </span>
                                            <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', color: 'rgba(134, 239, 172, 1)', padding: '0.1rem 0.4rem', borderRadius: '0.25rem' }}>
                                                🎯 {stats.goals?.assists || 0}
                                            </span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '0.1rem 0.4rem',
                                                borderRadius: '0.25rem',
                                                ...(rating >= 7.5 ? { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: 'rgba(134, 239, 172, 1)' } :
                                                    rating >= 6.5 ? { backgroundColor: 'rgba(234, 179, 8, 0.2)', color: 'rgba(253, 224, 71, 1)' } :
                                                        { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'rgba(252, 165, 165, 1)' }
                                                )
                                            }}>
                                                ⭐ {rating}
                                            </span>
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <div style={{ width: '1.25rem', height: '1.25rem', backgroundColor: '#06b6d4', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'white' }}>✓</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlayerComparison;
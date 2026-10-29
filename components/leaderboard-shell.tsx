'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown, Crown, Flame, Search, Swords, Trophy, Zap } from 'lucide-react'

const mockPlayers = [
  { name: 'Aiko Tanaka', mobile: '•••• 4821', score: 9840, title: 'Sakura Vanguard', color: '#f04f3e', initials: 'AT' },
  { name: 'Ren Ishikawa', mobile: '•••• 1108', score: 9310, title: 'Void Walker', color: '#ff9f43', initials: 'RI' },
  { name: 'Mika Sato', mobile: '•••• 7742', score: 8875, title: 'Moonlit Ronin', color: '#e6cf71', initials: 'MS' },
  { name: 'Yuki Nakamura', mobile: '•••• 2951', score: 8420, title: 'Spirit Caller', color: '#6ee7b7', initials: 'YN' },
  { name: 'Kai Mori', mobile: '•••• 6390', score: 7990, title: 'Iron Alchemist', color: '#67e8f9', initials: 'KM' },
  { name: 'Hana Watanabe', mobile: '•••• 5204', score: 7650, title: 'Star Seeker', color: '#c4b5fd', initials: 'HW' },
  { name: 'Sora Fujimoto', mobile: '•••• 8426', score: 7280, title: 'Crimson Blade', color: '#f9a8d4', initials: 'SF' },
  { name: 'Jun Hayashi', mobile: '•••• 3137', score: 6910, title: 'Dawn Keeper', color: '#94a3b8', initials: 'JH' },
]

const rankStyles = ['rank-gold', 'rank-silver', 'rank-bronze']

export function LeaderboardShell() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All players')
  const [showAll, setShowAll] = useState(false)
  const players = useMemo(() => mockPlayers.filter((player) => {
    const matchesQuery = player.name.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = activeFilter === 'All players' || (activeFilter === 'Top 3' ? player.score >= 8875 : player.score < 8875)
    return matchesQuery && matchesFilter
  }), [activeFilter, query])
  const visiblePlayers = showAll ? players : players.slice(0, 6)

  return (
    <main className="site-shell min-h-screen overflow-hidden selection:bg-[#ef493a] selection:text-white">
      <div className="noise-layer" />
      <header className="site-header page-width">
        <a className="brand-mark" href="#top" aria-label="Kage home"><img src="/shinobi-crest.png" alt="Kage crest" /><span>KAGE<span className="brand-slash">/</span>01</span></a>
        <nav className="desktop-nav"><a className="active" href="#leaderboard">Rankings</a><a href="#rules">How to play</a><a href="#about">Event intel</a></nav>
        <button className="outline-button">Enter arena <ArrowUpRight className="size-3.5" /></button>
      </header>

      <section id="top" className="hero page-width">
        <div className="hero-copy reveal-up"><p className="eyebrow"><span className="live-dot" /> Season 01 / 2025</p><h1>Climb the<br /><em>shinobi</em><br />ranks.</h1><p className="hero-body">The arena is open. Prove your knowledge of the worlds that made you, one challenge at a time.</p><div className="hero-actions"><a className="solid-button" href="#leaderboard">View standings <ArrowUpRight className="size-4" /></a><span className="micro-copy">Updates every 30 min</span></div></div>
        <div className="hero-art reveal-fade"><div className="art-frame"><img src="/katana-relic.png" alt="Black katana resting on washi paper" /><div className="art-caption"><span>Artifact 001</span><span>影 / KAGE</span></div></div><div className="vertical-label">THE WAY OF THE BLADE · THE WAY OF THE MIND</div><div className="hero-seal">影</div></div>
        <div className="scroll-cue"><span /> Scroll to enter</div>
      </section>

      <section className="stat-strip page-width"><Stat label="Players ranked" value="1,248" /><Stat label="Questions cleared" value="24K+" /><Stat label="Prize pool" value="¥500K" /><div className="stat-aside"><Zap className="size-4 text-[#ef493a]" /><span>Live event<br /><b>Tokyo / Remote</b></span></div></section>

      <section id="leaderboard" className="leaderboard-section page-width">
        <div className="section-intro"><div><p className="eyebrow"><Trophy className="size-3.5" /> Current standings</p><h2>Who holds<br /><span>the scroll?</span></h2></div><div className="section-note"><span>Last sync</span><strong>12:48:06 JST</strong><i>●</i></div></div>
        <div className="toolbar"><label className="search-box"><Search className="size-4" /><input aria-label="Search players" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by player name" /></label><div className="select-wrap"><select aria-label="Filter leaderboard" value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}><option>All players</option><option>Top 3</option><option>Rising stars</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2" /></div></div>
        <div className="top-three-grid">{players.slice(0, 3).map((player, index) => <TopPlayer key={player.name} player={player} rank={index + 1} />)}</div>
        <div className="table-card"><div className="table-head"><span>Rank</span><span>Player identity</span><span className="hidden sm:block">Archetype</span><span className="text-right">Score</span></div>{visiblePlayers.slice(3).map((player, index) => <PlayerRow key={player.name} player={player} rank={index + 4} />)}{visiblePlayers.length <= 3 && <div className="empty-state">No players found in this filter.</div>}</div>
        {players.length > 6 && <button onClick={() => setShowAll(!showAll)} className="view-all">{showAll ? 'Collapse rankings' : 'View all rankings'} <ArrowUpRight className="size-3.5" /></button>}
      </section>

      <section className="intel-band page-width" id="about"><div className="intel-image"><img src="/oni-mask.png" alt="Sculptural oni mask artifact" /></div><div><p className="eyebrow">Event intel / 01</p><h2>More than<br /><span>a score.</span></h2><p>Every answer leaves a mark. Earn your title, find your clan, and make the next move count.</p><a className="text-link" href="#rules">Read the rules <ArrowUpRight className="size-3.5" /></a></div><div className="intel-kanji">勝</div></section>
      <footer className="site-footer page-width"><span>KAGE / Anime challenge league</span><span>Mock data active · Firebase ready</span><span>© 2025</span></footer>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="stat-item"><span>{label}</span><strong>{value}</strong></div> }
function TopPlayer({ player, rank }: { player: typeof mockPlayers[number]; rank: number }) { return <article className={`top-player ${rank === 1 ? 'featured' : ''}`}><div className="player-top"><div className={`rank-badge ${rankStyles[rank - 1]}`}>{rank}</div><div><h3>{player.name}</h3><p>{player.mobile}</p></div><Crown className="crown-icon" /></div><div className="player-bottom"><div><span className="player-title">{player.title}</span><span className="player-label">{rank === 1 ? 'Current champion' : 'Ranked player'}</span></div><div className="score-block"><span>Score</span><strong>{player.score.toLocaleString()}</strong></div></div><div className="card-watermark">{rank === 1 ? '壱' : rank === 2 ? '弐' : '参'}</div></article> }
function PlayerRow({ player, rank }: { player: typeof mockPlayers[number]; rank: number }) { return <div className="player-row"><span className="row-rank">{String(rank).padStart(2, '0')}</span><div className="identity"><div className="initials" style={{ backgroundColor: `${player.color}20`, color: player.color }}>{player.initials}</div><div><strong>{player.name}</strong><small>{player.mobile}</small></div></div><span className="archetype hidden sm:block">{player.title}</span><strong className="row-score">{player.score.toLocaleString()}</strong></div> }

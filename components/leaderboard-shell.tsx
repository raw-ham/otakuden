'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Crown, Gift, Search, Zap } from 'lucide-react'

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
  const players = useMemo(() => mockPlayers.filter((player) => player.name.toLowerCase().includes(query.toLowerCase()) && (activeFilter === 'All players' || (activeFilter === 'Top 3' ? player.score >= 8875 : player.score < 8875))), [activeFilter, query])
  const visiblePlayers = showAll ? players : players.slice(0, 6)

  return <main className="site-shell min-h-screen overflow-hidden selection:bg-[#ef493a] selection:text-white">
    <div className="noise-layer" />
    <div className="arcade-ticker"><span>オタク魂</span><b>INSERT COIN · PLAY TO RANK</b><span>勝者</span></div><header className="site-header page-width"><a className="brand-mark" href="#rankings"><img src="/shinobi-crest.png" alt="OTAKUS NITRR crest" /><span>OTAKU&apos;S <span className="brand-slash">/</span> DEN</span></a><nav className="desktop-nav"><a className="active" href="#rankings">Rankings</a><a href="#prizes">Prizes</a><a href="#about">Event intel</a></nav><button className="outline-button">Enter arena <ArrowUpRight className="size-3.5" /></button></header>

    <section id="rankings" className="ranking-portal page-width"><div className="portal-copy"><p className="eyebrow"><span className="live-dot" /> 公式 / OFFICIAL COMMUNITY</p><h1>OTAKUS<br /><em>/ NITRR</em></h1><p>The official leaderboard for the OTAKUS community of NITRR University. One arena, every legend.</p><div className="portal-meta"><span><b>1,248</b> 応援 / players</span><span><b>12:48:06</b> JST sync</span></div></div><div className="portal-katana"><img src="/katana-relic.png" alt="Katana resting on textured paper" /><span>剣 · OTAKUS</span></div><div className="portal-stamp">オタク<br /><span>影</span></div><div className="japanese-banner hero-banner">アニメ · 知識 · 栄光</div></section>

    <section className="leaderboard-section page-width"><div className="toolbar"><div><h2>Top of the clan</h2><div className="japanese-banner">ランキング · LIVE / NITRR</div></div><div className="toolbar-controls"><label className="search-box"><Search className="size-4" /><input aria-label="Search players" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search player" /></label><div className="select-wrap"><select aria-label="Filter leaderboard" value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}><option>All players</option><option>Top 3</option><option>Rising stars</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2" /></div></div></div><div className="top-three-grid">{players.slice(0, 3).map((player, index) => <TopPlayer key={player.name} player={player} rank={index + 1} />)}</div><div className="table-card"><div className="table-head"><span>Rank</span><span>Player identity</span><span className="hidden sm:block">Archetype</span><span className="text-right">Score</span></div>{visiblePlayers.slice(3).map((player, index) => <PlayerRow key={player.name} player={player} rank={index + 4} />)}{visiblePlayers.length <= 3 && <div className="empty-state">No players found in this filter.</div>}</div>{players.length > 6 && <button onClick={() => setShowAll(!showAll)} className="view-all">{showAll ? 'Collapse rankings' : 'View all rankings'} <ArrowUpRight className="size-3.5" /></button>}</section>

    <section id="prizes" className="prizes-section page-width"><div><p className="eyebrow"><Gift className="size-3.5" /> 景品 / Rewards vault</p><h2>Goodies for<br /><span>the brave.</span></h2></div><div className="prize-lockup"><div className="prize-icon"><Gift className="size-7" /></div><strong>Coming soon</strong><p>Prize drops, clan rewards, and exclusive event relics will be revealed here.</p><div className="prize-line" /><span className="loading-label">LOADING VAULT <i /></span></div><div className="prize-art"><img src="/oni-mask.png" alt="Oni mask prize artifact" /><span>鬼 · 01</span></div></section>

        <footer className="site-footer page-width"><span>OTAKU&apos;S / DEN · NITRR</span><span><Zap className="inline size-3 text-[#ef493a]" /> Mock data active · Firebase ready</span><span>© 2025</span></footer>
  </main>
}

function TopPlayer({ player, rank }: { player: typeof mockPlayers[number]; rank: number }) { return <motion.article whileHover={{ y: -9, rotate: rank === 1 ? -1 : 1 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }} className={`top-player ${rank === 1 ? 'featured' : ''}`}><div className="player-top"><div className={`rank-badge ${rankStyles[rank - 1]}`}>{rank}</div><div><h3>{player.name}</h3><p>{player.mobile}</p></div><Crown className="crown-icon" /></div><div className="player-bottom"><div><span className="player-label">{rank === 1 ? '現在の王者 · champion' : 'ランキング · ranked'}</span></div><div className="score-block"><span>Score</span><strong>{player.score.toLocaleString()}</strong></div></div><div className="card-watermark">{rank === 1 ? '壱' : rank === 2 ? '弐' : '参'}</div></motion.article> }
function PlayerRow({ player, rank }: { player: typeof mockPlayers[number]; rank: number }) { return <div className="player-row"><span className="row-rank">{String(rank).padStart(2, '0')}</span><div className="identity"><div className="initials" style={{ backgroundColor: `${player.color}20`, color: player.color }}>{player.initials}</div><div><strong className="player-name">{player.name}</strong><small>{player.mobile} · 参加者</small></div></div><span className="archetype hidden sm:block">{rank === 4 ? '第一部' : rank === 5 ? '第二部' : rank === 6 ? '第三部' : '参加者'}</span><strong className="row-score">{player.score.toLocaleString()}</strong></div> }

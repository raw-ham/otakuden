'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown, Crown, Flame, Search, Sparkles, Trophy, Zap } from 'lucide-react'

const heroImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Y9dUvDUhtBRbEePKz6aSiPxfpXA1n1.png'

const mockPlayers = [
  { name: 'Aiko Tanaka', mobile: '•••• 4821', score: 9840, title: 'Sakura Vanguard', color: '#ef4444', initials: 'AT' },
  { name: 'Ren Ishikawa', mobile: '•••• 1108', score: 9310, title: 'Void Walker', color: '#f97316', initials: 'RI' },
  { name: 'Mika Sato', mobile: '•••• 7742', score: 8875, title: 'Moonlit Ronin', color: '#eab308', initials: 'MS' },
  { name: 'Yuki Nakamura', mobile: '•••• 2951', score: 8420, title: 'Spirit Caller', color: '#22c55e', initials: 'YN' },
  { name: 'Kai Mori', mobile: '•••• 6390', score: 7990, title: 'Iron Alchemist', color: '#06b6d4', initials: 'KM' },
  { name: 'Hana Watanabe', mobile: '•••• 5204', score: 7650, title: 'Star Seeker', color: '#8b5cf6', initials: 'HW' },
  { name: 'Sora Fujimoto', mobile: '•••• 8426', score: 7280, title: 'Crimson Blade', color: '#ec4899', initials: 'SF' },
  { name: 'Jun Hayashi', mobile: '•••• 3137', score: 6910, title: 'Dawn Keeper', color: '#64748b', initials: 'JH' },
]

const rankStyles = [
  'bg-[#f7c948] text-[#1b1510] shadow-[0_0_24px_rgba(247,201,72,.28)]',
  'bg-[#b9c5d3] text-[#18212a]',
  'bg-[#c98552] text-[#20130d]',
]

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
    <main className="min-h-screen overflow-hidden bg-[#100f0e] text-[#f6f1e9] selection:bg-[#ed3b2f] selection:text-white">
      <div className="pointer-events-none fixed inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:64px_64px]" />
      <header className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full border border-[#e6ded2]/20 bg-[#e6ded2]/10 text-[#f7c948]"><Crown className="size-4" /></div>
          <div className="font-mono text-[11px] font-bold tracking-[.28em] text-[#f2e9dc]">KAGE / 01</div>
        </div>
        <nav className="hidden items-center gap-9 font-mono text-[10px] uppercase tracking-[.2em] text-[#918a82] md:flex">
          <a className="text-[#f1ece5]" href="#leaderboard">Leaderboard</a><a href="#rules">Rules</a><a href="#about">About event</a>
        </nav>
        <button className="flex items-center gap-2 border border-[#f6f1e9]/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[.18em] text-[#f6f1e9] transition hover:border-[#ef4b40] hover:text-[#ef4b40]">Join event <ArrowUpRight className="size-3" /></button>
      </header>

      <section className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-8 sm:px-10 lg:px-16 lg:pb-24 lg:pt-16">
        <div className="absolute right-[-9%] top-[-11%] hidden h-[520px] w-[57%] bg-cover bg-[center_25%] opacity-45 mix-blend-screen grayscale lg:block" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute right-0 top-0 hidden h-[620px] w-[68%] bg-gradient-to-l from-transparent via-[#100f0e]/20 to-[#100f0e] lg:block" />
        <div className="relative max-w-3xl">
          <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.25em] text-[#ef4b40]"><span className="h-px w-10 bg-[#ef4b40]" /> Season one / 2025</div>
          <h1 className="max-w-2xl font-sans text-[clamp(3.3rem,8vw,7.8rem)] font-black uppercase leading-[.84] tracking-[-.075em] text-[#f6f1e9]">Rise of the<br /><span className="text-[#ef4b40]">Shinobi</span></h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-[#a29a91]">The arena is open. Track the sharpest minds, fastest reflexes, and fiercest spirits in this season&apos;s anime challenge.</p>
        </div>
        <div className="relative mt-14 grid max-w-2xl grid-cols-3 border-y border-[#f6f1e9]/15 py-5">
          <Stat label="Players ranked" value="1,248" /><Stat label="Questions cleared" value="24K+" /><Stat label="Season ends" value="08.24" />
        </div>
      </section>

      <section id="leaderboard" className="relative mx-auto max-w-[1440px] border-t border-[#f6f1e9]/10 px-5 pb-24 pt-10 sm:px-10 lg:px-16">
        <div className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.25em] text-[#ef4b40]"><Trophy className="size-3" /> Live standings</div><h2 className="font-sans text-4xl font-bold tracking-[-.04em] sm:text-5xl">The leaderboard</h2></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-3 border border-[#f6f1e9]/15 bg-[#171615] px-4 py-2.5 text-[#918a82] focus-within:border-[#ef4b40]"><Search className="size-4" /><input aria-label="Search players" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search player" className="w-36 bg-transparent font-mono text-xs text-[#f6f1e9] outline-none placeholder:text-[#6d6862]" /></label>
            <div className="relative"><select aria-label="Filter leaderboard" value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)} className="h-full appearance-none border border-[#f6f1e9]/15 bg-[#171615] px-4 pr-10 font-mono text-xs text-[#d9d0c7] outline-none hover:border-[#ef4b40]"><option>All players</option><option>Top 3</option><option>Rising stars</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2 text-[#8e8780]" /></div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {players.slice(0, 3).map((player, index) => <TopPlayer key={player.name} player={player} rank={index + 1} />)}
        </div>

        <div className="mt-8 overflow-hidden border border-[#f6f1e9]/10 bg-[#151413]">
          <div className="grid grid-cols-[52px_1fr_auto] gap-4 border-b border-[#f6f1e9]/10 px-5 py-3 font-mono text-[9px] uppercase tracking-[.2em] text-[#716b65] sm:grid-cols-[68px_1fr_150px_90px] sm:px-7"><span>Rank</span><span>Player</span><span className="hidden sm:block">Class</span><span className="text-right">Score</span></div>
          {visiblePlayers.slice(3).map((player, index) => <PlayerRow key={player.name} player={player} rank={index + 4} />)}
          {visiblePlayers.length <= 3 && <div className="px-6 py-12 text-center font-mono text-xs text-[#716b65]">No players found in this filter.</div>}
        </div>
        {players.length > 6 && <button onClick={() => setShowAll(!showAll)} className="mx-auto mt-6 flex items-center gap-2 border-b border-[#ef4b40] pb-1 font-mono text-[10px] uppercase tracking-[.2em] text-[#ef4b40] transition hover:text-white">{showAll ? 'Show less' : 'View all rankings'} <ArrowUpRight className="size-3" /></button>}
      </section>

      <footer className="relative border-t border-[#f6f1e9]/10 px-5 py-8 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-[.18em] text-[#716b65] sm:flex-row"><span>Kage / anime challenge league</span><span className="flex items-center gap-2"><span className="size-1.5 animate-pulse rounded-full bg-[#37d67a]" /> Mock data active · Firebase ready</span></div></footer>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="border-r border-[#f6f1e9]/10 px-3 first:pl-0 last:border-0"><div className="font-mono text-[9px] uppercase tracking-[.15em] text-[#716b65]">{label}</div><div className="mt-2 font-sans text-xl font-bold text-[#e9e0d6]">{value}</div></div> }
function TopPlayer({ player, rank }: { player: typeof mockPlayers[number]; rank: number }) { return <article className={`group relative overflow-hidden border border-[#f6f1e9]/10 bg-[#171615] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#ef4b40]/60 ${rank === 1 ? 'lg:-translate-y-4 lg:shadow-[0_20px_60px_rgba(0,0,0,.28)]' : ''}`}><div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#ef4b40]/10 transition group-hover:bg-[#ef4b40]/20" /><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className={`grid size-10 place-items-center rounded-full font-mono text-sm font-bold ${rankStyles[rank - 1]}`}>{rank}</div><div><h3 className="font-semibold text-[#f6f1e9]">{player.name}</h3><p className="font-mono text-[10px] text-[#716b65]">{player.mobile}</p></div></div><Flame className={`size-4 ${rank === 1 ? 'text-[#ef4b40]' : 'text-[#716b65]'}`} /></div><div className="mt-9 flex items-end justify-between"><div><div className="font-mono text-[9px] uppercase tracking-[.18em] text-[#716b65]">{player.title}</div><div className="mt-1 font-mono text-[10px] text-[#c6bdb2]">TOP {rank === 1 ? 'OF THE CLAN' : 'RANKED PLAYER'}</div></div><div className="text-right"><div className="font-mono text-[9px] uppercase tracking-[.18em] text-[#716b65]">Score</div><div className="mt-1 font-sans text-3xl font-black tracking-[-.05em] text-[#f7c948]">{player.score.toLocaleString()}</div></div></div></article> }
function PlayerRow({ player, rank }: { player: typeof mockPlayers[number]; rank: number }) { return <div className="grid grid-cols-[52px_1fr_auto] items-center gap-4 border-b border-[#f6f1e9]/8 px-5 py-4 transition hover:bg-[#1d1b19] sm:grid-cols-[68px_1fr_150px_90px] sm:px-7"><span className="font-mono text-sm text-[#716b65]">{String(rank).padStart(2, '0')}</span><div className="flex items-center gap-3"><div style={{ backgroundColor: `${player.color}22`, color: player.color }} className="grid size-8 place-items-center rounded-full font-mono text-[10px] font-bold">{player.initials}</div><div><div className="font-medium text-[#ddd5cc]">{player.name}</div><div className="font-mono text-[9px] text-[#716b65]">{player.mobile}</div></div></div><span className="hidden font-mono text-[10px] uppercase tracking-[.12em] text-[#918a82] sm:block">{player.title}</span><span className="text-right font-mono text-sm font-bold text-[#f7c948]">{player.score.toLocaleString()}</span></div> }

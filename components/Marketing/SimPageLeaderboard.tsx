import Link from 'next/link'

const leaderboard = [
  { rank: 1, name: 'Sophie T.', value: '£18,340', return: '+83.4%', badge: '🥇' },
  { rank: 2, name: 'Marcus O.', value: '£16,920', return: '+69.2%', badge: '🥈' },
  { rank: 3, name: 'Priya K.',  value: '£15,610', return: '+56.1%', badge: '🥉' },
  { rank: 4, name: 'James R.',  value: '£14,280', return: '+42.8%', badge: null },
  { rank: 5, name: 'Aisha M.',  value: '£13,940', return: '+39.4%', badge: null },
]

export default function SimPageLeaderboard() {
  return (
    <section className="simpage-coming">
      <div className="container">
        <div className="simpage-coming__inner">
          <div className="simpage-coming__copy">
            <div className="section-tag" style={{ color: 'var(--green-mid)' }}>Coming soon</div>
            <h2 className="simpage-coming__headline">Weekly challenges &amp; leaderboards</h2>
            <p className="simpage-coming__sub">
              Every week, a new challenge. A market event, a themed scenario, or a head-to-head
              competition. Build the best portfolio. Climb the board. Learn faster because it actually matters.
            </p>
            <div className="simpage-coming__pills">
              <span className="simpage-coming__pill">🎯 Weekly themes</span>
              <span className="simpage-coming__pill">🏆 Global leaderboard</span>
              <span className="simpage-coming__pill">⚡ Live rankings</span>
              <span className="simpage-coming__pill">🎖️ Badges & rewards</span>
            </div>
          </div>
          <div className="simpage-leaderboard">
            <div className="simpage-lb__header">
              <span className="simpage-lb__title">🏆 This week&apos;s challenge</span>
              <span className="simpage-lb__theme">Tech stocks only</span>
            </div>
            {leaderboard.map(row => (
              <div key={row.rank} className={`simpage-lb__row${row.rank === 1 ? ' simpage-lb__row--top' : ''}`}>
                <span className="simpage-lb__rank">{row.badge ?? `#${row.rank}`}</span>
                <span className="simpage-lb__name">{row.name}</span>
                <span className="simpage-lb__value">{row.value}</span>
                <span className="simpage-lb__return">{row.return}</span>
              </div>
            ))}
            <div className="simpage-lb__you">
              <span className="simpage-lb__rank">#—</span>
              <span className="simpage-lb__name">You</span>
              <span className="simpage-lb__value" style={{ color: 'rgba(255,255,255,0.3)' }}>Join to play</span>
              <span className="simpage-lb__return" style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

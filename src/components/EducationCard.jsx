/**
 * EducationCard — 1080x1080 square asset for IG/FB feed
 * Used for: "What is BingX?", "What is Copy Trading?", etc.
 *
 * Pattern:
 * - Dark elevated background
 * - Brand-blue accent strip or tag at top
 * - Bold Tagalog headline
 * - 4-6 bullet points in Taglish
 * - CTA + referral link
 * - BingX watermark bottom-right
 */
export function EducationCard({
  category = 'BASICS',
  headline,
  bullets = [],
  cta = 'Start trading:',
  referralLink = '[REFERRAL_LINK]',
}) {
  return (
    <div
      className="relative bg-surface-elevated text-text-primary overflow-hidden"
      style={{
        width: 1080,
        height: 1080,
        padding: 80,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top accent strip */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 12, background: '#0058FB' }}
      />

      {/* Category tag */}
      <div
        className="inline-block mb-12"
        style={{
          background: 'rgba(0, 88, 251, 0.15)',
          color: '#0058FB',
          padding: '12px 24px',
          borderRadius: 8,
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: '0.1em',
        }}
      >
        {category}
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: 88,
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          marginBottom: 56,
          maxWidth: '90%',
        }}
      >
        {headline}
      </h1>

      {/* Bullets */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {bullets.map((bullet, i) => (
          <li
            key={i}
            style={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.5,
              marginBottom: 24,
              paddingLeft: 40,
              position: 'relative',
              color: '#FFFFFF',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: '#0058FB',
                fontWeight: 700,
              }}
            >
              ▸
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      {/* CTA at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 80,
          right: 80,
          fontSize: 28,
          fontWeight: 700,
          color: '#9CA3AF',
        }}
      >
        {cta} <span style={{ color: '#0058FB' }}>{referralLink}</span>
      </div>

      {/* Watermark */}
      <img
        src="/assets/logos/bingx-wordmark-white.svg"
        alt="BingX"
        style={{
          position: 'absolute',
          bottom: 32,
          right: 80,
          height: 40,
          opacity: 0.5,
        }}
      />
    </div>
  );
}

// Example usage matching Card 1 from the Content Library plan
export const exampleEducationCard = {
  category: 'BASICS',
  headline: 'Ano ang BingX?',
  bullets: [
    'Global crypto exchange — 20M+ users worldwide',
    'Top 10 sa CoinGecko at CoinMarketCap',
    'Copy Trading — i-follow ang top traders',
    'GCash at Maya deposit supported',
    '50% commission para sa KOL partners',
    '$300M+ Risk Protection Fund',
  ],
  cta: 'Start trading:',
  referralLink: '[REFERRAL_LINK]',
};

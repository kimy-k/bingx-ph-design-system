/**
 * StoryTemplate — 1080x1920 vertical for IG/FB/TikTok Stories
 * Used for: daily polls, tips, market updates, PnL screenshots
 *
 * Variants:
 * - poll: "BTC Long or Short?" with two option boxes
 * - tip: "Tip of the Day" with single insight
 * - update: market update with price ticker
 * - pnl: PnL screenshot frame
 */
export function StoryTemplate({
  variant = 'tip',
  eyebrow,
  title,
  body,
  optionA,
  optionB,
  cta = 'Tap link in bio',
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 1080,
        height: 1920,
        background:
          'linear-gradient(180deg, #0B0E17 0%, #111827 60%, #0B0E17 100%)',
        padding: '160px 80px 120px',
        fontFamily: 'Inter, sans-serif',
        color: '#FFFFFF',
      }}
    >
      {/* Eyebrow / category */}
      {eyebrow && (
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#0058FB',
            letterSpacing: '0.15em',
            marginBottom: 48,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
      )}

      {/* Title */}
      <h1
        style={{
          fontSize: variant === 'poll' ? 96 : 88,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          marginBottom: variant === 'poll' ? 120 : 64,
          maxWidth: '95%',
        }}
      >
        {title}
      </h1>

      {/* Variant-specific content */}
      {variant === 'tip' && body && (
        <p
          style={{
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#E5E7EB',
            maxWidth: '95%',
          }}
        >
          {body}
        </p>
      )}

      {variant === 'poll' && (
        <div style={{ display: 'flex', gap: 32, marginTop: 80 }}>
          <div
            style={{
              flex: 1,
              background: 'rgba(5, 150, 105, 0.15)',
              border: '4px solid #059669',
              borderRadius: 24,
              padding: '64px 32px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 16 }}>📈</div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: '#059669',
              }}
            >
              {optionA || 'LONG'}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(220, 38, 38, 0.15)',
              border: '4px solid #DC2626',
              borderRadius: 24,
              padding: '64px 32px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 80, marginBottom: 16 }}>📉</div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: '#DC2626',
              }}
            >
              {optionB || 'SHORT'}
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: 80,
          right: 80,
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 600,
          color: '#9CA3AF',
        }}
      >
        👆 {cta}
      </div>

      {/* Watermark */}
      <img
        src="/assets/logos/bingx-wordmark-white.svg"
        alt="BingX"
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          height: 48,
          opacity: 0.6,
        }}
      />
    </div>
  );
}

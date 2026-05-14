/**
 * VideoThumbnail — 1280x720 for YouTube
 * Used for: tutorial videos, results videos, comparison videos
 *
 * Pattern:
 * - Text-heavy, high contrast
 * - Large dramatic headline (60-80px equivalent)
 * - Optional badge: LIVE, NEW, HOT
 * - Optional comparison split or number callout
 */
export function VideoThumbnail({
  headline,
  subhead,
  badge,
  highlightWord,
  variant = 'default',
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 1280,
        height: 720,
        background: '#0B0E17',
        fontFamily: 'Inter, sans-serif',
        color: '#FFFFFF',
      }}
    >
      {/* Diagonal accent shape (background visual) */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -200,
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(0, 88, 251, 0.4) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Badge */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 48,
            background:
              badge === 'LIVE'
                ? '#DC2626'
                : badge === 'NEW'
                ? '#059669'
                : '#0058FB',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: 8,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: '0.1em',
          }}
        >
          {badge}
        </div>
      )}

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 48,
          right: 48,
          transform: 'translateY(-50%)',
        }}
      >
        <h1
          style={{
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.6)',
          }}
        >
          {highlightWord ? (
            <>
              {headline.split(highlightWord)[0]}
              <span style={{ color: '#0058FB' }}>{highlightWord}</span>
              {headline.split(highlightWord)[1]}
            </>
          ) : (
            headline
          )}
        </h1>
        {subhead && (
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              fontWeight: 600,
              color: '#9CA3AF',
            }}
          >
            {subhead}
          </div>
        )}
      </div>

      {/* Watermark */}
      <img
        src="/assets/logos/bingx-wordmark-white.svg"
        alt="BingX"
        style={{
          position: 'absolute',
          bottom: 32,
          right: 48,
          height: 32,
          opacity: 0.7,
        }}
      />
    </div>
  );
}

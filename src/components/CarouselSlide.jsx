/**
 * CarouselSlide — 1080x1350 portrait slide for IG/FB carousel
 * Used for multi-slide stories: "5 Reasons to Use BingX", "Start Trading in 5 Steps"
 *
 * Slide types:
 * - hook: title slide (slide 1) — large headline, no body
 * - content: numbered content slide (slides 2-5) — slide number + body text
 * - cta: final slide with CTA + referral link
 */
export function CarouselSlide({
  type = 'content',
  slideNumber,
  totalSlides,
  title,
  body,
  cta,
  referralLink = '[REFERRAL_LINK]',
}) {
  return (
    <div
      className="relative bg-surface-base overflow-hidden"
      style={{
        width: 1080,
        height: 1350,
        padding: 80,
        fontFamily: 'Inter, sans-serif',
        color: '#FFFFFF',
      }}
    >
      {type === 'hook' && (
        <>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#0058FB',
              letterSpacing: '0.15em',
              marginBottom: 32,
              marginTop: 200,
            }}
          >
            SWIPE TO READ →
          </div>
          <h1
            style={{
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            {title}
          </h1>
        </>
      )}

      {type === 'content' && (
        <>
          <div style={{ marginTop: 120 }}>
            <div
              style={{
                fontSize: 200,
                fontWeight: 900,
                color: '#0058FB',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                marginBottom: 24,
              }}
            >
              {String(slideNumber).padStart(2, '0')}
            </div>
            <h2
              style={{
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: 40,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: 36,
                fontWeight: 400,
                lineHeight: 1.4,
                color: '#E5E7EB',
                maxWidth: '95%',
              }}
            >
              {body}
            </p>
          </div>
        </>
      )}

      {type === 'cta' && (
        <div style={{ marginTop: 280, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              marginBottom: 48,
            }}
          >
            {title}
          </h2>
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: '#9CA3AF',
              marginBottom: 64,
              maxWidth: 800,
              margin: '0 auto 64px',
              lineHeight: 1.4,
            }}
          >
            {body}
          </div>
          <div
            style={{
              display: 'inline-block',
              background: '#0058FB',
              padding: '24px 56px',
              borderRadius: 16,
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            {cta || 'Start Trading Now'}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 24,
              fontWeight: 600,
              color: '#9CA3AF',
            }}
          >
            {referralLink}
          </div>
        </div>
      )}

      {/* Slide counter (bottom-left) */}
      {slideNumber && totalSlides && (
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 80,
            fontSize: 22,
            fontWeight: 600,
            color: '#6B7280',
          }}
        >
          {slideNumber} / {totalSlides}
        </div>
      )}

      {/* Watermark */}
      <img
        src="/assets/logos/bingx-wordmark-white.svg"
        alt="BingX"
        style={{
          position: 'absolute',
          bottom: 40,
          right: 80,
          height: 36,
          opacity: 0.5,
        }}
      />
    </div>
  );
}

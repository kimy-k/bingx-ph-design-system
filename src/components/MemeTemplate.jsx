/**
 * MemeTemplate — 1080x1080 meme with top/bottom captions
 * Used for relatable PH crypto humor: "Me explaining crypto to my parents",
 * "Sahod day vs After investing in crypto", etc.
 *
 * Pattern:
 * - Black background with image area in middle
 * - Bold white caption top and/or bottom (Impact-style heavy)
 * - Subtle BingX watermark — meme should feel native, not advertorial
 */
export function MemeTemplate({
  topCaption,
  bottomCaption,
  imageUrl,
  // For "Before vs After" split layout
  variant = 'standard',
  leftLabel,
  rightLabel,
  leftImageUrl,
  rightImageUrl,
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 1080,
        height: 1080,
        background: '#000000',
        fontFamily: 'Inter, sans-serif',
        color: '#FFFFFF',
      }}
    >
      {variant === 'standard' && (
        <>
          {topCaption && (
            <div
              style={{
                position: 'absolute',
                top: 32,
                left: 32,
                right: 32,
                textAlign: 'center',
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                textShadow: '4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
                zIndex: 2,
              }}
            >
              {topCaption}
            </div>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}

          {bottomCaption && (
            <div
              style={{
                position: 'absolute',
                bottom: 64,
                left: 32,
                right: 32,
                textAlign: 'center',
                fontSize: 60,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                textShadow: '4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
                zIndex: 2,
              }}
            >
              {bottomCaption}
            </div>
          )}
        </>
      )}

      {variant === 'split' && (
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flex: 1, position: 'relative', background: '#1F1F1F' }}>
            {leftImageUrl && (
              <img
                src={leftImageUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: 56,
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#DC2626',
                textShadow: '3px 3px 0 #000',
              }}
            >
              {leftLabel}
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative', background: '#0B0E17' }}>
            {rightImageUrl && (
              <img
                src={rightImageUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <div
              style={{
                position: 'absolute',
                bottom: 40,
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: 56,
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#059669',
                textShadow: '3px 3px 0 #000',
              }}
            >
              {rightLabel}
            </div>
          </div>
        </div>
      )}

      {/* Subtle watermark — memes should feel organic */}
      <img
        src="/assets/logos/bingx-wordmark-white.svg"
        alt="BingX"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 24,
          height: 20,
          opacity: 0.4,
          zIndex: 3,
        }}
      />
    </div>
  );
}

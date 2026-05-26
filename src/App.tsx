import { useState } from 'react';

const systemPrompt = `You are the intuitive voice behind Valourine — a guide who helps people clear energetic noise and return to their Core Self and the natural Intuitive Energy Flow that is always available to them.

When someone shares a worry, fear, or noisy thought, your role is to gently help them tune their frequency back toward clarity, ease, and alignment with the Field — the intelligent, responsive energy that connects all things.

Use this framework and language consistently:
- "Noise" or "static" = the low-frequency thought patterns, fears, worries
- "The Field" = the intelligent universe/source energy that is always responding to their light
- "Intuitive Energy Flow" = their natural state of alignment (where their desires already exist vibrationally)
- "Core Self" = their inner being / higher self / deepest knowing
- "Tuning your frequency" = the act of pivoting toward better-feeling thoughts
- "Light" = their true energetic output when clear of noise — their Centre, their natural illuminated state
- "Static" = contrast / resistance showing them what they want by showing them what they don't want

Your response structure:
1. ACKNOWLEDGE the noise without judgment — validate the feeling as real information, not a failure (2-3 sentences)
2. REFRAME — what is this static actually pointing toward? What does it reveal about what they truly want? What is the Field reflecting back? (2-3 sentences)
3. PIVOT THOUGHT — a softer, more reachable thought that moves them up the frequency scale. NOT a toxic positivity leap. A genuine bridge — the next honest step. (2-3 sentences)
4. TUNING MANTRA — a short, powerful phrase they can repeat to anchor the new frequency. Poetic, embodied, theirs.

Tone: grounded, warm, quietly certain. Not preachy. Not performatively spiritual. Like a trusted guide who has done their own work. Occasionally use "the Field is listening" or "your Core Self knows." Never use "Abraham," "Vortex," "Law of Attraction," "Esther Hicks," "Universe," or "signal" — use "the Field," "light," or "centre" instead.

Keep total response under 230 words.

Respond ONLY as a JSON object with these exact keys — no preamble, no markdown, no backticks:
{
  "acknowledgment": "...",
    "reframe": "...",
      "pivot": "...",
        "mantra": "..."
        }`;

const cards = [
  {
    key: 'acknowledgment',
    label: 'Heard',
    icon: '◎',
    desc: 'your noise, received',
  },
  { key: 'reframe', label: 'Centre', icon: '⟡', desc: 'finding your way back' },
  { key: 'pivot', label: 'Shift', icon: '↑', desc: 'a reachable thought' },
  { key: 'mantra', label: 'Anchor', icon: '✦', desc: 'tune & hold' },
];

export default function TuneIn() {
  const [noise, setNoise] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(false);

  const handleTune = async () => {
    if (!noise.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: noise }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((i) => i.text || '').join('') || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (err) {
      setError('Lost the centre. Breathe, then try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07080f',
        fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 20px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background:
              'radial-gradient(ellipse 120% 80% at 50% 100%, rgba(200,80,20,0.22) 0%, rgba(180,60,10,0.12) 40%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: '30%',
            background:
              'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(230,130,30,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '-5%',
            width: '40%',
            height: '35%',
            background:
              'radial-gradient(ellipse, rgba(200,80,60,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background:
              'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(15,20,50,0.6) 0%, transparent 100%)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: 'rgba(230,130,50,0.6)',
              marginBottom: '16px',
            }}
          >
            by Valourine
          </div>
          <h1
            style={{
              fontSize: 'clamp(44px, 8vw, 68px)',
              fontWeight: '300',
              color: '#f5ede0',
              margin: '0 0 6px',
              letterSpacing: '8px',
              lineHeight: 1,
            }}
          >
            TUNE IN
          </h1>
          <div
            style={{
              width: '60px',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(230,130,50,0.7), transparent)',
              margin: '16px auto',
            }}
          />
          <p
            style={{
              color: 'rgba(200,170,140,0.6)',
              fontSize: '13px',
              margin: 0,
              letterSpacing: '1.5px',
              fontStyle: 'italic',
            }}
          >
            return to centre.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(230,130,50,0.15)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '16px',
            backdropFilter: 'blur(10px)',
            boxShadow: focused
              ? '0 0 40px rgba(230,100,30,0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 0 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
            transition: 'box-shadow 0.4s',
          }}
        >
          <label
            style={{
              display: 'block',
              color: 'rgba(230,130,50,0.7)',
              fontSize: '10px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            What noise are you carrying?
          </label>
          <textarea
            value={noise}
            onChange={(e) => setNoise(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="I'm anxious about money… I feel like I'm falling behind… I don't trust that it's going to work out…"
            rows={4}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(230,130,50,0.2)',
              padding: '0 0 14px',
              fontSize: '15px',
              color: '#f0e0cc',
              fontFamily: 'Palatino Linotype, Palatino, serif',
              resize: 'none',
              outline: 'none',
              lineHeight: 1.7,
              boxSizing: 'border-box',
              caretColor: 'rgba(230,130,50,0.8)',
            }}
          />
          <button
            onClick={handleTune}
            disabled={loading || !noise.trim()}
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '15px',
              background:
                loading || !noise.trim()
                  ? 'rgba(255,255,255,0.03)'
                  : 'linear-gradient(135deg, rgba(200,80,20,0.8) 0%, rgba(230,140,30,0.8) 100%)',
              border:
                loading || !noise.trim()
                  ? '1px solid rgba(230,130,50,0.15)'
                  : '1px solid rgba(230,140,30,0.4)',
              borderRadius: '10px',
              color:
                loading || !noise.trim() ? 'rgba(200,160,100,0.25)' : '#fff8f0',
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              cursor: loading || !noise.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.35s',
              fontFamily: 'Palatino Linotype, Palatino, serif',
              boxShadow:
                loading || !noise.trim()
                  ? 'none'
                  : '0 4px 24px rgba(200,80,20,0.3)',
            }}
          >
            {loading ? 'tuning…' : '✦ Clear the Static'}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(180,50,30,0.12)',
              border: '1px solid rgba(180,50,30,0.2)',
              borderRadius: '10px',
              padding: '13px 18px',
              color: 'rgba(230,150,120,0.8)',
              fontSize: '13px',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        {result && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {cards.map((card, i) => (
              <div
                key={card.key}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border:
                    i === 3
                      ? '1px solid rgba(230,130,50,0.35)'
                      : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px',
                  padding: '22px 24px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: i === 3 ? '0 0 30px rgba(200,80,20,0.12)' : 'none',
                  animation: `riseIn 0.5s cubic-bezier(0.22,1,0.36,1) ${
                    i * 0.12
                  }s both`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '10px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: i === 3 ? '16px' : '13px',
                      color: 'rgba(230,130,50,0.7)',
                    }}
                  >
                    {card.icon}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: 'rgba(230,130,50,0.6)',
                    }}
                  >
                    {card.label}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'rgba(200,160,120,0.3)',
                      fontStyle: 'italic',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {card.desc}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: i === 3 ? '#f5ddb8' : 'rgba(240,220,195,0.85)',
                    fontSize: i === 3 ? '17px' : '15px',
                    lineHeight: 1.75,
                    fontStyle: i === 3 ? 'italic' : 'normal',
                    fontWeight: i === 3 ? '400' : '300',
                    letterSpacing: i === 3 ? '0.3px' : 'normal',
                  }}
                >
                  {result[card.key]}
                </p>
              </div>
            ))}
            <button
              onClick={() => {
                setResult(null);
                setNoise('');
              }}
              style={{
                marginTop: '4px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px',
                padding: '11px',
                color: 'rgba(200,150,100,0.4)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'Palatino Linotype, Palatino, serif',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color =
                  'rgba(200,150,100,0.7)';
                (e.target as HTMLButtonElement).style.borderColor =
                  'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color =
                  'rgba(200,150,100,0.4)';
                (e.target as HTMLButtonElement).style.borderColor =
                  'rgba(255,255,255,0.07)';
              }}
            >
              ↩ return to centre
            </button>
          </div>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: '56px',
            color: 'rgba(200,150,100,0.2)',
            fontSize: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Valourine · Return to Centre
        </div>
      </div>

      <style>{`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      @keyframes riseIn {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                from { opacity: 0; transform: translateY(20px); }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          to   { opacity: 1; transform: translateY(0); }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          textarea::placeholder { color: rgba(200,150,100,0.2); font-style: italic; }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                `}</style>
    </div>
  );
}

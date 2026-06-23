/* Growth Hotel Solutions — compiled from Claude Design handoff. React JSX precompiled via the project's bundled Babel (preset:react). Do not edit by hand. */

/* ===== source block 1 ===== */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});

/* ===== source block 2 ===== */
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;

// ============ Navigation context ============
const NavContext = React.createContext({
  route: '/',
  navigate: () => {}
});
window.NavContext = NavContext;
function useNav() {
  return React.useContext(NavContext);
}
window.useNav = useNav;

// ============ Link ============
function L({
  to,
  children,
  className = "",
  arrow = false,
  ...rest
}) {
  const {
    navigate
  } = useNav();
  return /*#__PURE__*/React.createElement("a", _extends({
    href: to,
    className: className,
    onClick: e => {
      e.preventDefault();
      navigate(to);
    }
  }, rest), children, arrow && /*#__PURE__*/React.createElement("span", {
    className: "arrow",
    style: {
      marginLeft: 8
    }
  }, "\u2192"));
}
window.L = L;

// ============ Eyebrow ============
function Eyebrow({
  children,
  num
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, num && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--accent)'
    }
  }, num), /*#__PURE__*/React.createElement("span", null, children));
}
window.Eyebrow = Eyebrow;

// ============ Reveal wrapper ============
function Reveal({
  children,
  delay = 0,
  as: As = "div",
  line = false,
  className = "",
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = delay / 1000 + 's';
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return /*#__PURE__*/React.createElement(As, _extends({
    ref: ref,
    className: (line ? "reveal-line " : "reveal ") + className,
    style: style
  }, rest), line ? /*#__PURE__*/React.createElement("span", null, children) : children);
}
window.Reveal = Reveal;

// ============ Header (two-pill + dropdown) ============
function Header() {
  const {
    route,
    navigate
  } = useNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  const nav = [{
    to: '/',
    label: 'Início'
  }, {
    to: '/servicos',
    label: 'Serviços'
  }, {
    to: '/como-trabalhamos',
    label: 'Método'
  }, {
    to: '/planos',
    label: 'Planos'
  }, {
    to: '/contato',
    label: 'Contato'
  }];

  // Two-pill cluster width — drives dropdown alignment under the MENU pill
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: scrolled ? '14px var(--gutter)' : '24px var(--gutter)',
      background: scrolled ? 'rgba(255, 255, 255, 0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(150%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(150%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'padding 0.5s var(--ease-out-cubic), background 0.45s var(--ease-out-cubic), backdrop-filter 0.45s var(--ease-out-cubic), border-color 0.45s var(--ease-out-cubic)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement(L, {
    to: "/",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoGrowth || "assets/logo-growth-horizontal.png",
    alt: "Growth Hotel Solutions",
    style: {
      display: 'block',
      flexShrink: 0,
      height: "clamp(34px, 4vw, 46px)",
      width: "auto"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-social"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://instagram.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "nav-social-ico",
    "aria-label": "Instagram",
    "data-hover": true
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.997 8.33177C9.97722 8.33177 8.32888 9.98013 8.32888 12C8.32888 14.0199 9.97722 15.6682 11.997 15.6682C14.0169 15.6682 15.6652 14.0199 15.6652 12C15.6652 9.98013 14.0169 8.33177 11.997 8.33177ZM22.9988 12C22.9988 10.481 23.0125 8.97571 22.9272 7.45943C22.8419 5.69824 22.4402 4.13519 21.1523 2.84732C19.8617 1.55669 18.3014 1.15767 16.5403 1.07237C15.0213 0.987059 13.516 1.00082 11.9998 1.00082C10.4808 1.00082 8.97556 0.987059 7.45931 1.07237C5.69815 1.15767 4.13513 1.55945 2.84728 2.84732C1.55668 4.13794 1.15767 5.69824 1.07237 7.45943C0.987059 8.97846 1.00082 10.4837 1.00082 12C1.00082 13.5163 0.987059 15.0243 1.07237 16.5406C1.15767 18.3018 1.55944 19.8648 2.84728 21.1527C4.13788 22.4433 5.69815 22.8423 7.45931 22.9276C8.97831 23.0129 10.4835 22.9992 11.9998 22.9992C13.5188 22.9992 15.024 23.0129 16.5403 22.9276C18.3014 22.8423 19.8645 22.4406 21.1523 21.1527C22.4429 19.8621 22.8419 18.3018 22.9272 16.5406C23.0153 15.0243 22.9988 13.519 22.9988 12ZM11.997 17.6441C8.87374 17.6441 6.35309 15.1234 6.35309 12C6.35309 8.87664 8.87374 6.35594 11.997 6.35594C15.1203 6.35594 17.641 8.87664 17.641 12C17.641 15.1234 15.1203 17.6441 11.997 17.6441ZM17.8722 7.44292C17.1429 7.44292 16.554 6.85402 16.554 6.12478C16.554 5.39554 17.1429 4.80664 17.8722 4.80664C18.6014 4.80664 19.1903 5.39554 19.1903 6.12478C19.1905 6.29794 19.1565 6.46945 19.0904 6.62947C19.0242 6.78949 18.9271 6.93489 18.8047 7.05733C18.6822 7.17978 18.5369 7.27686 18.3768 7.34303C18.2168 7.40919 18.0453 7.44314 17.8722 7.44292Z"
  }))), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "nav-social-ico",
    "aria-label": "WhatsApp",
    "data-hover": true
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.5 1C17.2992 1 22 5.70085 22 11.5C22 17.2991 17.2992 22 11.5 22C9.64443 22.003 7.8215 21.5119 6.21851 20.5772L1.00421 22L2.42381 16.7836C1.48836 15.1801 0.996915 13.3564 1.00001 11.5C1.00001 5.70085 5.70086 1 11.5 1ZM7.92161 6.565L7.71161 6.5734C7.57566 6.58168 7.44279 6.61739 7.32101 6.6784C7.20711 6.7429 7.10313 6.82353 7.01231 6.9178C6.88631 7.03645 6.81491 7.13935 6.73826 7.2391C6.34989 7.74404 6.14078 8.36397 6.14396 9.00099C6.14606 9.51549 6.28046 10.0163 6.49046 10.4846C6.91991 11.4317 7.62656 12.4345 8.55896 13.3637C8.78366 13.5874 9.00416 13.8121 9.24146 14.021C10.4 15.0411 11.7806 15.7767 13.2735 16.1693L13.8699 16.2607C14.0641 16.2712 14.2584 16.2565 14.4537 16.247C14.7595 16.2313 15.0581 16.1485 15.3283 16.0045C15.4658 15.9337 15.6 15.8566 15.7305 15.7735C15.7305 15.7735 15.7756 15.7441 15.8617 15.679C16.0035 15.574 16.0906 15.4994 16.2082 15.3766C16.2954 15.2863 16.371 15.1802 16.4287 15.0595C16.5106 14.8883 16.5925 14.5618 16.6261 14.2898C16.6513 14.0819 16.644 13.9685 16.6408 13.8982C16.6366 13.7858 16.5432 13.6693 16.4413 13.6199L15.8302 13.3459C15.8302 13.3459 14.9167 12.9479 14.3581 12.6938C14.2997 12.6683 14.237 12.6537 14.1733 12.6508C14.1015 12.6434 14.0289 12.6515 13.9604 12.6745C13.892 12.6975 13.8292 12.7349 13.7764 12.7841C13.7712 12.782 13.7008 12.8419 12.9417 13.7617C12.8981 13.8202 12.8381 13.8645 12.7692 13.8888C12.7004 13.9131 12.6259 13.9164 12.5553 13.8982C12.4869 13.8799 12.4198 13.8567 12.3547 13.8289C12.2245 13.7743 12.1794 13.7533 12.0901 13.7155C11.4875 13.4525 10.9295 13.0972 10.4364 12.6623C10.3041 12.5468 10.1812 12.4208 10.0552 12.299C9.64213 11.9034 9.28212 11.4559 8.98421 10.9676L8.92226 10.8679C8.87776 10.8009 8.84179 10.7286 8.81516 10.6526C8.77526 10.4983 8.87921 10.3744 8.87921 10.3744C8.87921 10.3744 9.13436 10.0951 9.25301 9.94389C9.36851 9.79689 9.46616 9.6541 9.52916 9.55225C9.65306 9.35275 9.69191 9.14799 9.62681 8.98945C9.33281 8.27125 9.02831 7.5562 8.71541 6.8464C8.65346 6.7057 8.46971 6.6049 8.30276 6.58495C8.24606 6.57865 8.18936 6.57235 8.13266 6.56815C7.99165 6.56114 7.85035 6.56254 7.70951 6.57235L7.92056 6.56395L7.92161 6.565Z"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "nav-lang",
    "data-hover": true,
    "aria-label": "Idioma"
  }, /*#__PURE__*/React.createElement("span", null, "PT"), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.dispatchEvent(new CustomEvent('open-contact')),
    "data-hover": true,
    className: "nav-pill nav-pill-ghost",
    "aria-label": "Agendar diagn\xF3stico"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-label",
    style: {
      fontSize: "24px",
      fontWeight: 400,
      fontFamily: '"HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      textTransform: 'none',
      letterSpacing: '-0.02em'
    }
  }, "agendar diagn\xF3stico"), /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenuOpen(o => !o),
    "data-hover": true,
    className: "nav-pill nav-pill-dark " + (menuOpen ? "is-open" : ""),
    "aria-expanded": menuOpen,
    "aria-controls": "nav-dropdown"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-label nav-pill-label-stack"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label-state " + (menuOpen ? "out" : "in"),
    style: {
      fontSize: "16px"
    }
  }, "MENU"), /*#__PURE__*/React.createElement("span", {
    className: "label-state " + (menuOpen ? "in" : "out")
  }, "CLOSE")), /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-icon-stack " + (menuOpen ? "open" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-icon-dots"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("span", {
    className: "menu-icon-x"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null))))), /*#__PURE__*/React.createElement("div", {
    id: "nav-dropdown",
    className: "nav-dropdown " + (menuOpen ? "open" : ""),
    "aria-hidden": !menuOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-dropdown-inner"
  }, nav.map((n, i) => {
    const active = n.to === '/' ? route === '/' : route.startsWith(n.to);
    return /*#__PURE__*/React.createElement("a", {
      key: n.to,
      href: n.to,
      onClick: e => {
        e.preventDefault();
        navigate(n.to);
      },
      "data-hover": true,
      className: "nav-dd-link " + (active ? "active" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "nav-dd-arrow",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "100%",
      viewBox: "0 0 45 38",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M24.4118 2L41.5 19.0882L24.4118 36.1765M0 19.0882L40.2794 19.0882",
      stroke: "currentColor",
      strokeWidth: "4.88235"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "nav-dd-label"
    }, n.label));
  })))))), /*#__PURE__*/React.createElement("div", {
    onClick: () => setMenuOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      background: 'rgba(16,17,19,0.45)',
      backdropFilter: 'blur(4px)',
      opacity: menuOpen ? 1 : 0,
      pointerEvents: menuOpen ? 'auto' : 'none',
      transition: 'opacity 0.5s var(--ease-out-cubic)'
    }
  }), /*#__PURE__*/React.createElement("style", null, `
        /* ===== Pill base ===== */
        .nav-pill {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 8px 8px 8px 28px;
          border-radius: 999px;
          font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.6px;
          line-height: 0.9;
          text-transform: uppercase;
          transition: background 0.5s var(--ease-out-cubic),
                      color 0.5s var(--ease-out-cubic),
                      border-color 0.5s var(--ease-out-cubic),
                      transform 0.55s var(--ease-out-expo);
          position: relative;
          transform: scale(1);
          transform-origin: center;
        }
        .nav-pill:hover { transform: scale(1.05); }
        .nav-pill-ghost {
          background: transparent;
          color: var(--fg);
          border: 1px solid transparent;
          padding: 8px 4px;
          gap: 7px;
        }
        .nav-pill-ghost:hover {
          background: transparent;
          color: var(--accent);
          transform: scale(1);
        }
        /* Underline sweep (left → right) */
        .nav-pill-ghost .nav-pill-label {
          position: relative;
        }
        .nav-pill-ghost .nav-pill-label::after {
          content: "";
          position: absolute;
          left: 0; right: 0;
          bottom: -6px;
          height: 1.5px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.75s var(--ease-out-expo);
        }
        .nav-pill-ghost:hover .nav-pill-label::after {
          transform: scaleX(1);
        }
        .nav-pill-dark {
          background: var(--accent);
          color: var(--on-accent);
          border: 1px solid var(--accent);
        }
        .nav-pill-dark:hover { background: var(--accent-deep); border-color: var(--accent-deep); }
        .nav-pill-dark.is-open { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }

        /* Social cluster */
        .nav-social {
          display: flex;
          align-items: center;
          gap: 32px;
          align-self: center;
          margin-right: 30px;
        }
        .nav-social-ico {
          width: 28px; height: 28px;
          color: var(--fg);
          display: inline-flex;
          transition: color 0.3s ease, transform 0.35s var(--ease-out-expo);
        }
        .nav-social-ico svg { width: 100%; height: 100%; display: block; }
        .nav-social-ico:hover { color: var(--accent); transform: translateY(-2px); }
        .nav-lang {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-left: 16px;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--fg);
          transition: color 0.3s ease;
        }
        .nav-lang svg { width: 11px; height: 11px; }
        .nav-lang:hover { color: var(--accent); }
        @media (max-width: 860px) {
          .nav-social { display: none; }
        }

        /* Label crossfade */
        .nav-pill-label { display: inline-block; }
        .nav-pill-label-stack {
          position: relative;
          height: 16px;
          min-width: 56px;
          overflow: hidden;
        }
        .label-state {
          position: absolute; top: 0; left: 0;
          transition: transform 0.45s var(--ease-out-expo), opacity 0.3s ease;
          white-space: nowrap;
        }
        .label-state.in  { transform: translateY(0%);    opacity: 1; }
        .label-state.out { transform: translateY(-120%); opacity: 0; }

        /* ===== Icon circle (badge inside pill) ===== */
        .nav-pill-icon {
          width: 42px; height: 42px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          transition: background 0.5s var(--ease-out-cubic),
                      color 0.5s var(--ease-out-cubic),
                      transform 0.6s var(--ease-out-expo);
        }
        .nav-pill-ghost .nav-pill-icon {
          background: transparent;
          color: var(--accent);
          overflow: hidden;
          position: relative;
        }
        .nav-pill-ghost:hover .nav-pill-icon {
          background: transparent;
          color: var(--accent);
        }

        /* Two-icon swap (treadmill pattern) inside the ghost circle */
        .nav-pill-ghost .icon-out,
        .nav-pill-ghost .icon-in {
          display: block;
          width: 56%;
          will-change: transform;
          transition: transform 0.9s cubic-bezier(0.22, 0.68, 0, 1.3);
          line-height: 0;
        }
        .nav-pill-ghost .icon-out { transform: translate(0, 0); }
        .nav-pill-ghost .icon-in  {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(-220%, 220%);
        }
        .nav-pill-ghost:hover .icon-out { transform: translate(220%, -220%); }
        .nav-pill-ghost:hover .icon-in  { transform: translate(-50%, -50%) translate(0, 0); }
        .nav-pill-dark .nav-pill-icon {
          background: rgba(255, 255, 255, 0.18);
          color: var(--on-accent);
        }
        .nav-pill-dark:hover .nav-pill-icon {
          background: #FFFFFF;
          color: var(--accent);
          transform: rotate(90deg);
        }
        .nav-pill-dark.is-open .nav-pill-icon {
          background: rgba(255, 255, 255, 0.18);
          color: var(--on-accent);
        }
        .nav-pill-dark.is-open:hover .nav-pill-icon {
          background: #FFFFFF;
          color: var(--accent);
          transform: rotate(180deg);
        }
        .nav-pill-icon svg { display: block; }

        /* Menu icon stack — inside the icon-circle */
        .menu-icon-stack {
          position: relative;
          width: 18px;
          height: 18px;
          display: block;
        }
        .menu-icon-dots, .menu-icon-x {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.35s var(--ease-out-cubic),
                      transform 0.5s var(--ease-out-expo);
        }
        .menu-icon-dots {
          flex-direction: column;
          gap: 2px;
        }
        .menu-icon-dots span {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: currentColor;
          display: block;
        }
        .menu-icon-x span {
          position: absolute;
          width: 14px; height: 1.4px;
          background: currentColor;
          display: block;
          border-radius: 1px;
        }
        .menu-icon-x span:nth-child(1) { transform: rotate(45deg); }
        .menu-icon-x span:nth-child(2) { transform: rotate(-45deg); }

        .menu-icon-stack       .menu-icon-dots { opacity: 1; transform: rotate(0deg); }
        .menu-icon-stack       .menu-icon-x    { opacity: 0; transform: rotate(-90deg); }
        .menu-icon-stack.open  .menu-icon-dots { opacity: 0; transform: rotate(90deg); }
        .menu-icon-stack.open  .menu-icon-x    { opacity: 1; transform: rotate(0deg); }

        /* ===== Dropdown panel — SoHub-style ===== */
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          min-width: min(92vw, 460px);
          background: var(--bg-elev-1);
          border: 1px solid rgba(16, 17, 19, 0.08);
          border-radius: 28px;
          padding: 32px 24px;
          box-shadow: 0 24px 60px -20px rgba(16, 17, 19, 0.25);

          opacity: 0;
          transform: translateX(130%);
          pointer-events: none;
          /* Bouncy horizontal slide on open. Snappier ease-in on close. */
          transition: opacity 0.35s ease-out 0.05s,
                      transform 0.75s cubic-bezier(0.22, 0.68, 0, 1.45);
        }
        .nav-dropdown.open {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
          transition: opacity 0.2s ease-out,
                      transform 0.75s cubic-bezier(0.22, 0.68, 0, 1.45);
        }
        .nav-dropdown-inner {
          display: flex; flex-direction: column; gap: 4px;
        }
        .nav-dd-link {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
          padding: 14px 24px;
          border-radius: 18px;
          color: var(--fg);
          font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1;
          letter-spacing: -0.045em;
          transition: background-color 0.2s ease-out;
        }
        .nav-dd-link:hover { background: var(--bg); }
        .nav-dd-link.active .nav-dd-label { color: var(--accent); }
        .nav-dd-arrow {
          width: 0;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          color: currentColor;
          transition: width 0.3s ease-out;
        }
        .nav-dd-arrow svg {
          width: 28px;
          height: auto;
          display: block;
          flex-shrink: 0;
        }
        .nav-dd-link:hover .nav-dd-arrow { width: 28px; }
        .nav-dd-link.active .nav-dd-arrow { width: 28px; color: var(--accent); }

        .nav-dd-label { display: block; }

        /* Mobile / responsive */
        @media (max-width: 700px) {
          .nav-pill { padding: 6px 6px 6px 18px; font-size: 13px; gap: 10px; }
          .nav-pill:hover { transform: scale(1.03); }
          .nav-pill-label-stack { height: 13px; }
          .nav-pill-icon { width: 34px; height: 34px; }
          .nav-dropdown { right: 0; left: auto; min-width: min(92vw, 380px); padding: 24px 16px; }
          .nav-dd-link { font-size: clamp(28px, 8vw, 40px); padding: 10px 18px; }
          .nav-dd-arrow svg { width: 22px; }
          .nav-dd-link:hover .nav-dd-arrow,
          .nav-dd-link.active .nav-dd-arrow { width: 22px; }
        }
        @media (max-width: 480px) {
          .nav-pill-ghost .nav-pill-label { display: none; }
          .nav-pill-ghost { padding: 5px; }
        }
      `));
}
window.Header = Header;

// ============ Contact Modal ============
function ContactModal() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [method, setMethod] = React.useState('whatsapp');
  const [val, setVal] = React.useState('');
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    const onOpen = () => {
      setSent(false);
      setOpen(true);
    };
    window.addEventListener('open-contact', onOpen);
    return () => window.removeEventListener('open-contact', onOpen);
  }, []);
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const methods = [{
    id: 'whatsapp',
    label: 'whatsapp',
    ph: 'seu número de whatsapp',
    ic: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.5 2.8a9 9 0 0 0 3.8 4.3c1.9 1 2.3.9 2.8.8.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z"
    }))
  }, {
    id: 'instagram',
    label: 'instagram',
    ph: 'seu @usuário',
    ic: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17.5",
      cy: "6.5",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }))
  }, {
    id: 'telegram',
    label: 'telegram',
    ph: 'seu @usuário',
    ic: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M21.9 4.3l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13 1.4 11.5c-1.1-.3-1.1-1 .2-1.5l19-7.3c.9-.3 1.7.2 1.3 1.6Z"
    }))
  }, {
    id: 'email',
    label: 'e-mail',
    ph: 'seu e-mail',
    ic: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "5",
      width: "18",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 7l9 6 9-6"
    }))
  }];
  const cur = methods.find(m => m.id === method) || methods[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "cm-overlay " + (open ? "open" : ""),
    onClick: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "cm-card",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "cm-close",
    onClick: () => setOpen(false),
    "aria-label": "Fechar"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 5l14 14M19 5L5 19",
    strokeLinecap: "round"
  }))), !sent ? /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cm-title"
  }, "vamos conversar"), /*#__PURE__*/React.createElement("p", {
    className: "cm-sub"
  }, "preencha o formul\xE1rio e entraremos em contato com voc\xEA."), /*#__PURE__*/React.createElement("label", {
    className: "cm-label"
  }, "seu nome:"), /*#__PURE__*/React.createElement("input", {
    className: "cm-input",
    type: "text",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "qual \xE9 o seu nome?"
  }), /*#__PURE__*/React.createElement("label", {
    className: "cm-label"
  }, "escolha um canal:"), /*#__PURE__*/React.createElement("div", {
    className: "cm-methods"
  }, methods.map(m => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: m.id,
    className: "cm-method " + (method === m.id ? "active" : ""),
    onClick: () => setMethod(m.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "cm-method-ic"
  }, m.ic), /*#__PURE__*/React.createElement("span", null, m.label)))), /*#__PURE__*/React.createElement("input", {
    className: "cm-input",
    type: "text",
    value: val,
    onChange: e => setVal(e.target.value),
    placeholder: cur.ph
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "cm-submit"
  }, /*#__PURE__*/React.createElement("span", null, "agendar diagn\xF3stico"), /*#__PURE__*/React.createElement("span", {
    className: "cm-submit-arrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))) : /*#__PURE__*/React.createElement("div", {
    className: "cm-thanks"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cm-title"
  }, "obrigado!"), /*#__PURE__*/React.createElement("p", {
    className: "cm-sub"
  }, "recebemos seu contato. nossa equipe retornar\xE1 em at\xE9 24h."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cm-submit",
    onClick: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("span", null, "fechar")))), /*#__PURE__*/React.createElement("style", null, `
        .cm-overlay {
          position: fixed; inset: 0; z-index: 9500;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(16px, 4vw, 48px);
          background: rgba(16, 17, 19, 0.45);
          -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
          opacity: 0; visibility: hidden;
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cm-overlay.open { opacity: 1; visibility: visible; }
        .cm-card {
          position: relative;
          width: min(540px, 100%);
          background: #FFFFFF;
          border-radius: clamp(20px, 2.2vw, 30px);
          padding: clamp(28px, 3vw, 46px);
          box-shadow: 0 40px 100px -30px rgba(16,17,19,0.45);
          transform: translateY(24px) scale(0.96);
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0;
          max-height: 92vh; overflow-y: auto;
        }
        .cm-overlay.open .cm-card { transform: translateY(0) scale(1); opacity: 1; }
        .cm-close {
          position: absolute; top: clamp(18px, 2vw, 26px); right: clamp(18px, 2vw, 26px);
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--fg); background: var(--bg-elev-1);
          transition: background 0.3s ease, color 0.3s ease;
        }
        .cm-close:hover { background: #F95738; color: var(--on-accent); }
        .cm-close svg { width: 16px; height: 16px; }
        .cm-title {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300; font-size: clamp(32px, 4.4vw, 54px);
          line-height: 0.95; letter-spacing: -0.045em;
          text-transform: lowercase; color: var(--fg);
        }
        .cm-sub {
          margin-top: 8px;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(14px, 1.1vw, 16px);
          letter-spacing: -0.02em; color: var(--fg); line-height: 1.4;
        }
        .cm-label {
          display: block;
          margin-top: clamp(14px, 1.6vw, 20px); margin-bottom: 8px;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: 13px; letter-spacing: -0.01em; color: var(--fg);
        }
        .cm-input {
          width: 100%;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(15px, 1.2vw, 17px); letter-spacing: -0.02em;
          color: var(--fg);
          background: var(--bg-elev-1);
          border: 1.5px solid transparent; border-radius: 12px;
          padding: 13px 16px;
          outline: none; cursor: text;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .cm-input::placeholder { color: var(--fg-subtle); }
        .cm-input:focus { border-color: #F95738; background: #FFFFFF; }
        .cm-methods {
          display: flex; flex-wrap: nowrap; gap: 8px;
        }
        .cm-method {
          display: inline-flex; align-items: center; justify-content: center; gap: 7px;
          flex: 1 1 0; min-width: 0; white-space: nowrap;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: 13px; letter-spacing: -0.02em;
          color: var(--fg);
          background: var(--bg-elev-1);
          border: 1.5px solid transparent; border-radius: 999px;
          padding: 8px 10px;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .cm-method:hover { background: var(--border); }
        @media (max-width: 520px) {
          .cm-methods { flex-wrap: wrap; }
          .cm-method { flex: 1 1 40%; }
        }
        .cm-method.active { background: #F95738; color: var(--on-accent); }
        .cm-method-ic { width: 15px; height: 15px; display: inline-flex; }
        .cm-method-ic svg { width: 100%; height: 100%; }
        .cm-methods + .cm-input { margin-top: 10px; }
        .cm-submit {
          margin-top: clamp(18px, 2.2vw, 28px);
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          background: #F95738; color: var(--on-accent);
          border-radius: 999px; padding: 19px 28px;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(16px, 1.3vw, 19px); letter-spacing: -0.02em;
          transition: background 0.4s var(--ease-out-cubic), color 0.4s var(--ease-out-cubic);
        }
        .cm-submit:hover { background: var(--fg); color: var(--on-dark); }
        .cm-submit-arrow {
          position: relative; width: 16px; height: 16px; flex-shrink: 0;
          line-height: 0; overflow: hidden;
        }
        .cm-submit-arrow .icon-out, .cm-submit-arrow .icon-in {
          display: block; width: 100%; height: 100%;
          transition: transform 0.6s var(--ease-out-expo); line-height: 0;
        }
        .cm-submit-arrow .icon-out { transform: translate(0, 0); }
        .cm-submit-arrow .icon-in {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) translate(-220%, 220%);
        }
        .cm-submit:hover .cm-submit-arrow .icon-out { transform: translate(220%, -220%); }
        .cm-submit:hover .cm-submit-arrow .icon-in { transform: translate(-50%, -50%) translate(0, 0); }
        .cm-submit-arrow svg { display: block; width: 100%; height: 100%; }
      `));
}
window.ContactModal = ContactModal;

// ============ Footer ============
function Footer() {
  const {
    navigate
  } = useNav();
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("section", {
    className: "cta-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "cta-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cta-eyebrow"
  }, "vamos conversar"), /*#__PURE__*/React.createElement("h2", {
    className: "cta-title"
  }, "sobre o", /*#__PURE__*/React.createElement("br", null), "seu hotel")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140,
    className: "cta-mid"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cta-label"
  }, "escolha como falar:"), /*#__PURE__*/React.createElement("div", {
    className: "cta-links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cta-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-contact'));
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cta-link-ic"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.5 2.8a9 9 0 0 0 3.8 4.3c1.9 1 2.3.9 2.8.8.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "cta-link-tx"
  }, "whatsapp"), /*#__PURE__*/React.createElement("span", {
    className: "cta-link-arrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("a", {
    className: "cta-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-contact'));
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cta-link-ic"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "1.2",
    fill: "currentColor",
    stroke: "none"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "cta-link-tx"
  }, "instagram"), /*#__PURE__*/React.createElement("span", {
    className: "cta-link-arrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("a", {
    className: "cta-link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-contact'));
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cta-link-ic"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 7l9 6 9-6"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "cta-link-tx"
  }, "e-mail"), /*#__PURE__*/React.createElement("span", {
    className: "cta-link-arrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))), /*#__PURE__*/React.createElement("button", {
    className: "cta-btn",
    onClick: () => window.dispatchEvent(new CustomEvent('open-contact'))
  }, "agendar diagn\xF3stico")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260,
    className: "cta-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta-photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop",
    alt: "Equipe Growth Hotel Solutions",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("p", {
    className: "cta-quote"
  }, "Nossa equipe vai oferecer a solu\xE7\xE3o comercial certa para o seu hotel."), /*#__PURE__*/React.createElement("p", {
    className: "cta-quote-by"
  }, "Equipe Growth Hotel Solutions")))), /*#__PURE__*/React.createElement("style", null, `
          .cta-contact { padding: clamp(80px, 12vw, 180px) 0; }
          .cta-grid {
            display: grid;
            grid-template-columns: 1.4fr 0.85fr 0.95fr;
            gap: clamp(40px, 5vw, 90px);
            align-items: start;
          }
          .cta-eyebrow {
            font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 400; font-size: clamp(18px, 1.8vw, 26px);
            letter-spacing: -0.03em; color: var(--fg); display: block;
          }
          .cta-title {
            font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 300; font-size: clamp(48px, 7vw, 130px);
            line-height: 0.9; letter-spacing: -0.045em;
            text-transform: lowercase; color: var(--fg);
            margin-top: clamp(20px, 3vw, 44px);
          }
          .cta-mid { display: flex; flex-direction: column; padding-top: clamp(6px, 1vw, 14px); }
          .cta-label {
            font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 400; font-size: 13px; letter-spacing: -0.01em;
            color: var(--fg-muted); margin-bottom: clamp(18px, 2vw, 28px);
          }
          .cta-links { display: flex; flex-direction: column; gap: clamp(8px, 1vw, 12px); }
          .cta-link {
            display: flex; align-items: center; gap: 10px;
            font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 400; font-size: clamp(17px, 1.4vw, 22px);
            letter-spacing: -0.03em; color: var(--fg);
            transition: color 0.3s var(--ease-out-cubic);
          }
          .cta-link:hover { color: #F95738; }
          .cta-link-tx { position: relative; }
          .cta-link-tx::after {
            content: "";
            position: absolute;
            left: 0; right: 0;
            bottom: -4px;
            height: 1.5px;
            background: currentColor;
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform 0.75s var(--ease-out-expo);
          }
          .cta-link:hover .cta-link-tx::after { transform: scaleX(1); }
          .cta-link-ic { width: clamp(18px, 1.5vw, 22px); height: clamp(18px, 1.5vw, 22px); display: inline-flex; flex-shrink: 0; }
          .cta-link-ic svg { width: 100%; height: 100%; }
          .cta-link-arrow {
            position: relative;
            width: 15px; height: 15px;
            flex-shrink: 0;
            color: #F95738;
            line-height: 0;
            overflow: hidden;
          }
          .cta-link-arrow .icon-out, .cta-link-arrow .icon-in {
            display: block; width: 100%; height: 100%;
            transition: transform 0.6s var(--ease-out-expo);
            line-height: 0;
          }
          .cta-link-arrow .icon-out { transform: translate(0, 0); }
          .cta-link-arrow .icon-in {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%) translate(-220%, 220%);
          }
          .cta-link:hover .cta-link-arrow .icon-out { transform: translate(220%, -220%); }
          .cta-link:hover .cta-link-arrow .icon-in { transform: translate(-50%, -50%) translate(0, 0); }
          .cta-link-arrow svg { display: block; width: 100%; height: 100%; }
          .cta-btn {
            margin-top: clamp(28px, 3.5vw, 48px); align-self: flex-start;
            background: #F95738; color: var(--on-accent);
            border-radius: 999px; padding: 16px 34px;
            font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 400; font-size: clamp(15px, 1.2vw, 18px); letter-spacing: -0.02em;
            transition: background 0.4s var(--ease-out-cubic), color 0.4s var(--ease-out-cubic);
          }
          .cta-btn:hover { background: var(--fg); color: var(--on-dark); }
          .cta-photo {
            width: 100%; height: clamp(180px, 16vw, 240px);
            border-radius: clamp(16px, 1.8vw, 26px); overflow: hidden; background: var(--bg-elev-1);
          }
          .cta-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
          .cta-quote {
            margin-top: clamp(18px, 2vw, 26px);
            font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 400; font-size: clamp(16px, 1.3vw, 20px);
            line-height: 1.3; letter-spacing: -0.03em; color: var(--fg);
          }
          .cta-quote-by {
            margin-top: 8px;
            font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 400; font-size: 13px; letter-spacing: -0.02em; color: #F95738;
          }
          @media (max-width: 900px) {
            .cta-grid { grid-template-columns: 1fr; gap: 48px; }
          }
        `)), /*#__PURE__*/React.createElement("div", {
    className: "marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee-track"
  }, [...Array(2)].map((_, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "marquee-item"
  }, "Revenue"), /*#__PURE__*/React.createElement("span", {
    className: "marquee-item muted"
  }, "Distribui\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
    className: "marquee-item"
  }, "Marketing"), /*#__PURE__*/React.createElement("span", {
    className: "marquee-item muted"
  }, "Reservas"), /*#__PURE__*/React.createElement("span", {
    className: "marquee-item"
  }, "Performance"), /*#__PURE__*/React.createElement("span", {
    className: "marquee-item muted"
  }, "Conte\xFAdo"))))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      padding: 'clamp(48px, 6vw, 84px) var(--gutter) clamp(28px, 3vw, 40px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-left"
  }, /*#__PURE__*/React.createElement(L, {
    to: "/",
    className: "footer-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoGrowth || "assets/logo-growth-horizontal.png",
    alt: "Growth Hotel Solutions"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      navigate('/blog');
    },
    className: "footer-blog",
    "data-hover": true
  }, "veja nosso blog ", /*#__PURE__*/React.createElement("span", {
    className: "footer-blog-arrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-nav-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-social"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://instagram.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "nav-social-ico",
    "aria-label": "Instagram",
    "data-hover": true
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "1.2",
    fill: "currentColor",
    stroke: "none"
  }))), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "nav-social-ico",
    "aria-label": "WhatsApp",
    "data-hover": true
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.5 2.8a9 9 0 0 0 3.8 4.3c1.9 1 2.3.9 2.8.8.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "nav-lang",
    "data-hover": true,
    "aria-label": "Idioma"
  }, /*#__PURE__*/React.createElement("span", null, "PT"), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.dispatchEvent(new CustomEvent('open-contact')),
    "data-hover": true,
    className: "nav-pill nav-pill-ghost",
    "aria-label": "Agendar diagn\xF3stico"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-label",
    style: {
      fontSize: "24px",
      fontWeight: 400,
      fontFamily: '"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif',
      textTransform: 'none',
      letterSpacing: '-0.02em'
    }
  }, "agendar diagn\xF3stico"), /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }),
    "data-hover": true,
    className: "nav-pill nav-pill-dark",
    "aria-label": "Voltar ao topo"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-label",
    style: {
      fontSize: "16px"
    }
  }, "TOPO"), /*#__PURE__*/React.createElement("span", {
    className: "nav-pill-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 19 V5 M6 11 L12 5 L18 11",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-legal"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Growth Hotel Solutions"), /*#__PURE__*/React.createElement("span", null, "Pol\xEDtica de Privacidade"), /*#__PURE__*/React.createElement("span", null, "Hotelaria \xB7 Brasil")), /*#__PURE__*/React.createElement("style", null, `
          .footer-nav{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;}
          .footer-left{display:flex;align-items:center;gap:clamp(20px,3vw,44px);flex-wrap:wrap;}
          .footer-blog{display:inline-flex;align-items:center;gap:8px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(15px,1.2vw,18px);letter-spacing:-0.03em;color:var(--fg);transition:color .3s var(--ease-out-cubic);}
          .footer-blog:hover{color:#F95738;}
          .footer-blog svg{width:100%;height:100%;display:block;}
          .footer-blog-arrow{position:relative;width:14px;height:14px;flex-shrink:0;overflow:hidden;line-height:0;}
          .footer-blog-arrow .icon-out,.footer-blog-arrow .icon-in{display:block;width:100%;height:100%;transition:transform .6s var(--ease-out-expo);line-height:0;}
          .footer-blog-arrow .icon-out{transform:translate(0,0);}
          .footer-blog-arrow .icon-in{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) translate(-220%,220%);}
          .footer-blog:hover .footer-blog-arrow .icon-out{transform:translate(220%,-220%);}
          .footer-blog:hover .footer-blog-arrow .icon-in{transform:translate(-50%,-50%) translate(0,0);}
          .footer-logo{display:flex;align-items:center;flex-shrink:0;}
          .footer-logo img{display:block;height:clamp(34px,4vw,46px);width:auto;}
          .footer-nav-right{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
          .footer-legal{margin-top:clamp(36px,4vw,56px);padding-top:24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:12px;letter-spacing:-0.01em;color:var(--fg-subtle);text-transform:lowercase;}
          @media(max-width:720px){.footer-nav-right .nav-pill-label{display:none;}}
        `)), /*#__PURE__*/React.createElement(ContactModal, null));
}
window.Footer = Footer;

// ============ Photo with subtle parallax & label ============
function Photo({
  src,
  label,
  alt,
  ratio = "4/3",
  style = {},
  className = ""
}) {
  const [errored, setErrored] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "photo " + className,
    style: {
      aspectRatio: ratio,
      ...style
    }
  }, !errored ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || label,
    loading: "lazy",
    onError: () => setErrored(true)
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `repeating-linear-gradient(45deg, var(--bg-elev-1) 0 12px, var(--bg-elev-2) 12px 24px)`
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    className: "photo-label"
  }, label));
}
window.Photo = Photo;

// ============ Count-up number ============
function CountUp({
  to,
  suffix = "",
  duration = 1400,
  format = n => n
}) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          function step(t) {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.3
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, format(val), suffix);
}
window.CountUp = CountUp;

// ============ Big arrow link card (used for "next" sections, pilar cards) ============
function CardLink({
  to,
  num,
  title,
  desc,
  tags,
  big = false
}) {
  const {
    navigate
  } = useNav();
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(to),
    "data-hover": true,
    style: {
      textAlign: 'left',
      padding: big ? 'clamp(32px, 4vw, 56px)' : '32px',
      background: 'var(--bg-elev-1)',
      border: '1px solid var(--border)',
      borderRadius: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: big ? 32 : 24,
      transition: 'background 0.5s var(--ease-out-cubic), border-color 0.5s, transform 0.5s',
      cursor: 'none',
      position: 'relative',
      overflow: 'hidden',
      width: '100%'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--bg-elev-2)';
      e.currentTarget.style.borderColor = 'var(--border-strong)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'var(--bg-elev-1)';
      e.currentTarget.style.borderColor = 'var(--border)';
    }
  }, num && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent)',
      letterSpacing: '0.16em'
    }
  }, "PILAR ", num), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      color: 'var(--fg-muted)'
    },
    className: "arrow"
  }, "\u2197")), /*#__PURE__*/React.createElement("h3", {
    className: "h-display",
    style: {
      fontSize: big ? 'clamp(36px, 4vw, 64px)' : 'clamp(28px, 2.6vw, 40px)',
      lineHeight: 1.05
    }
  }, title), desc && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg-muted)',
      fontSize: big ? 17 : 15,
      lineHeight: 1.5,
      maxWidth: '40ch'
    }
  }, desc), tags && tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 'auto'
    }
  }, tags.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 11,
      padding: '6px 12px',
      borderRadius: 999,
      border: '1px solid var(--border-strong)',
      color: 'var(--fg-muted)',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.06em'
    }
  }, t))));
}
window.CardLink = CardLink;

// ============ Pilar page shared template ============
function PilarPage({
  num,
  title,
  lead,
  sections,
  nextPilar,
  image
}) {
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 'clamp(140px, 18vw, 240px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, {
    num: num
  }, "PILAR ", num)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h1", {
    className: "h-display h-1",
    style: {
      marginTop: 32,
      maxWidth: '14ch'
    }
  }, title)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      marginTop: 40,
      maxWidth: '52ch'
    }
  }, lead))), image && /*#__PURE__*/React.createElement(Reveal, {
    delay: 400,
    className: "container",
    style: {
      marginTop: 80
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: image.src,
    label: image.label,
    ratio: "21/9"
  }))), sections.map((s, i) => /*#__PURE__*/React.createElement("section", {
    key: i,
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container two-col",
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 0.4fr) minmax(0, 0.6fr)',
      gap: 'clamp(40px, 6vw, 100px)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, {
    num: String(i + 1).padStart(2, '0')
  }, s.eyebrow)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h-display h-2",
    style: {
      marginTop: 24
    }
  }, s.title))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, s.body))))), nextPilar && /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(CardLink, _extends({}, nextPilar, {
    big: true
  }))))));
}
window.PilarPage = PilarPage;

// ============ Page transition trigger ============
window.runCurtain = function (cb) {
  const c = document.getElementById('curtain');
  c.classList.remove('in', 'out');
  void c.offsetWidth;
  c.classList.add('in');
  setTimeout(() => {
    cb && cb();
    window.scrollTo(0, 0);
    setTimeout(() => {
      c.classList.remove('in');
    }, 140);
  }, 560);
};

/* ===== source block 3 ===== */
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, Reveal, Eyebrow, Photo, CountUp, L, CardLink, useNav */
const {
  useState: useState_h,
  useEffect: useEffect_h,
  useRef: useRef_h
} = React;

// Hotel imagery (Unsplash — real hotel/architectural photography)
const R = typeof window !== 'undefined' && window.__resources || {};
const HOTEL_IMG = {
  lobby: R.imgLobby || "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80&auto=format&fit=crop",
  facade: R.imgFacade || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80&auto=format&fit=crop",
  pool: R.imgPool || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80&auto=format&fit=crop",
  reception: R.imgReception || "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80&auto=format&fit=crop",
  room: R.imgRoom || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80&auto=format&fit=crop",
  arch: R.imgArch || "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&q=80&auto=format&fit=crop",
  dining: R.imgDining || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&auto=format&fit=crop",
  city: R.imgCity || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80&auto=format&fit=crop",
  detail: R.imgDetail || "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80&auto=format&fit=crop",
  desk: R.imgDesk || "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80&auto=format&fit=crop"
};
window.HOTEL_IMG = HOTEL_IMG;

// ============ Hero ============
function HeroHome() {
  const [scrollPct, setScrollPct] = useState_h(0);
  useEffect_h(() => {
    const onScroll = () => {
      const max = window.innerHeight;
      setScrollPct(Math.min(window.scrollY / max, 1));
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const services = ['conceito', 'estratégia', 'distribuição online', 'marketing & conteúdo', 'gestão de reservas', 'operação comercial', 'anúncios & tráfego'];
  return /*#__PURE__*/React.createElement("section", {
    className: "hero2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero2-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "hero2-headline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row line1"
  }, /*#__PURE__*/React.createElement("span", null, "seu hotel merece")), /*#__PURE__*/React.createElement("div", {
    className: "row line2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "accent",
    style: {
      fontFamily: "HelveticaNeueCyr"
    }
  }, "vender mais."), /*#__PURE__*/React.createElement("p", {
    className: "hero2-sub"
  }, "A sua hist\xF3ria constr\xF3i a nossa."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 180,
    as: "ul",
    className: "hero2-services"
  }, services.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "hero2-hint",
    style: {
      opacity: 1 - scrollPct
    }
  }, "role para ver"), /*#__PURE__*/React.createElement("style", null, `
        .hero2 {
          position: relative;
          min-height: 100vh;
          padding: clamp(120px, 17vh, 190px) var(--gutter) 8vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        .hero2-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start;
          gap: clamp(24px, 5vw, 80px);
          width: 100%;
        }
        .hero2-headline {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-size: clamp(46px, 8.4vw, 168px);
          line-height: 1.12;
          letter-spacing: -0.045em;
          text-transform: lowercase;
          color: var(--fg);
        }
        .hero2-headline .row {
          display: flex;
          align-items: baseline;
          gap: clamp(16px, 2.2vw, 40px);
          flex-wrap: wrap;
        }
        .hero2-headline .row.line2 { align-items: flex-end; }
        .hero2-headline .accent { color: #fff; background: #FF4D2E; padding: 0.02em 0.2em; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
        .hero2-sub {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.55vw, 24px);
          line-height: 1.3;
          letter-spacing: -0.01em;
          text-transform: none;
          color: var(--fg);
          max-width: 14ch;
          padding-bottom: clamp(10px, 1.4vw, 26px);
        }
        .hero2-services {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: clamp(18px, 2.2vw, 34px);
          text-align: right;
          padding-top: clamp(6px, 1vw, 18px);
          white-space: nowrap;
          list-style: none;
        }
        .hero2-services li {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.15vw, 18px);
          letter-spacing: -0.01em;
          color: var(--fg);
        }
        .hero2-hint {
          position: absolute;
          right: var(--gutter);
          bottom: clamp(20px, 4vh, 44px);
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: clamp(14px, 1.1vw, 17px);
          font-weight: 400;
          letter-spacing: -0.01em;
          text-transform: none;
          color: var(--fg-muted);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: opacity 0.2s linear;
          z-index: 3;
          pointer-events: none;
        }
        .hero2-hint::after {
          content: "";
          width: 30px; height: 1px;
          background: var(--fg-muted);
        }
        @media (max-width: 860px) {
          .hero2-grid { grid-template-columns: 1fr; }
          .hero2-services { align-items: flex-start; text-align: left; padding-top: 8px; }
        }
        @media (max-width: 700px) {
          .hero2-headline { font-size: clamp(40px, 12vw, 80px); }
        }
      `));
}
function CTAButton({
  to,
  children,
  variant = "primary"
}) {
  const {
    navigate
  } = useNav();
  return /*#__PURE__*/React.createElement("button", {
    className: `btn btn-${variant}`,
    onClick: () => to === '/contato' ? window.dispatchEvent(new CustomEvent('open-contact')) : navigate(to)
  }, children, " ", /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192"));
}
window.CTAButton = CTAButton;

// ============ Hero scroll-scale feature ============
function HeroFeature() {
  const placeholderRef = useRef_h(null);
  const innerRef = useRef_h(null);
  useEffect_h(() => {
    let mx = 0,
      my = 0; // raw mouse offset (px, around 0)
    let smx = 0,
      smy = 0; // smoothed mouse offset
    let raf = 0;
    const onMouse = e => {
      const w = window.innerWidth,
        h = window.innerHeight;
      mx = (e.clientX / w - 0.5) * 36;
      my = (e.clientY / h - 0.5) * 36;
    };
    window.addEventListener('mousemove', onMouse, {
      passive: true
    });
    const tick = () => {
      smx += (mx - smx) * 0.07;
      smy += (my - smy) * 0.07;
      const placeholder = placeholderRef.current;
      const inner = innerRef.current;
      if (placeholder && inner) {
        const rect = placeholder.getBoundingClientRect();
        const vh = window.innerHeight;
        const pageY = rect.top + window.scrollY;
        const targetTop = vh * 0.10; // where the placeholder finally settles
        const targetScroll = Math.max(1, pageY - targetTop);
        const progress = Math.max(0, Math.min(1, window.scrollY / targetScroll));
        const startScale = 0.235;
        const endScale = 1;
        const p = 1 - Math.pow(1 - progress, 3);
        const scale = startScale + (endScale - startScale) * p;

        // Resting position: small, to the RIGHT of the headline (like the
        // reference laptop). As scroll progresses it lerps to centered + full.
        const vw = window.innerWidth;
        const restX = vw * 0.222;
        const restY = vh * 0.02;
        const finalX = 0;
        const finalOffsetY = rect.top + rect.height / 2 - vh / 2;
        const xPos = restX * (1 - p) + finalX * p;
        const yPos = restY * (1 - p) + finalOffsetY * p;
        inner.style.transform = `translate(-50%, -50%) translate3d(${xPos + smx}px, ${yPos + smy}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero-feature-section"
  }, /*#__PURE__*/React.createElement("div", {
    ref: placeholderRef,
    className: "hero-feature-placeholder"
  }), /*#__PURE__*/React.createElement("div", {
    ref: innerRef,
    className: "hero-feature-frame",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("video", {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "auto",
    poster: "https://images.pexels.com/videos/7966582/achievement-business-computer-contemporary-7966582.jpeg?auto=compress&cs=tinysrgb&h=720&fit=crop&w=1280",
    src: R.heroVideo || "https://videos.pexels.com/video-files/7966582/7966582-uhd_2560_1440_25fps.mp4"
  }), /*#__PURE__*/React.createElement("img", {
    src: "https://images.pexels.com/videos/7966582/achievement-business-computer-contemporary-7966582.jpeg?auto=compress&cs=tinysrgb&h=720&fit=crop&w=1280",
    alt: ""
  })), /*#__PURE__*/React.createElement("style", null, `
        .hero-feature-section {
          position: relative;
          padding: 0 var(--gutter) clamp(80px, 12vw, 160px);
        }
        .hero-feature-placeholder {
          width: min(1200px, 100%);
          margin: 0 auto;
          aspect-ratio: 16 / 10;
        }
        .hero-feature-frame {
          position: fixed;
          top: 50%;
          left: 50%;
          width: min(1200px, calc(100vw - 2 * var(--gutter)));
          aspect-ratio: 16 / 10;
          border-radius: clamp(20px, 2.4vw, 40px);
          overflow: hidden;
          will-change: transform;
          z-index: 1;
          pointer-events: none;
          box-shadow: 0 40px 80px -40px rgba(16, 17, 19, 0.35);
          background: var(--bg-elev-2);
          transform: translate(-50%, -50%) scale(0.34);
        }
        .hero-feature-frame video,
        .hero-feature-frame img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .hero-feature-frame video { z-index: 2; }
        .hero-feature-frame img   { z-index: 1; }
        @media (max-width: 700px) {
          .hero-feature-frame { border-radius: 18px; }
        }
      `));
}
window.HeroFeature = HeroFeature;

// ============ Section: Logos (entre nossos clientes) ============
function LogoStrip() {
  const logos = [{
    src: "assets/logos/meritum-hoteis-logo.webp",
    alt: "M\xE9ritum Hot\xE9is",
    big: true
  }, {
    src: "assets/logos/prize-hoteis-logo.webp",
    alt: "Prize Hot\xE9is",
    big: true
  }, {
    src: "assets/logos/hotel-colonial-iguacu-logo.webp",
    alt: "Hotel Colonial Igua\xE7u"
  }, {
    src: "assets/logos/villa-colonial-gastronomia-eventos-logo.webp",
    alt: "Villa Colonial Gastronomia e Eventos"
  }, {
    src: "assets/logos/blando-logo.webp",
    alt: "Blando",
    invert: true
  }, {
    src: "assets/logos/cliente-rede-hoteleira-logo.webp",
    alt: "Cliente",
    invert: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "logostrip-section",
    "aria-label": "Entre nossos clientes"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "logostrip-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logostrip-label"
  }, "entre nossos clientes"), /*#__PURE__*/React.createElement("div", {
    className: "logostrip-logos"
  }, logos.map((l, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: l.src,
    alt: l.alt,
    className: [l.invert ? "is-invert" : "", l.big ? "is-big" : ""].filter(Boolean).join(" ") || undefined,
    loading: "lazy",
    draggable: "false"
  }))))), /*#__PURE__*/React.createElement("style", null, `
        .logostrip-section {
          padding: clamp(34px, 5vw, 60px) calc(var(--gutter) + clamp(16px, 3vw, 56px));
          margin-bottom: clamp(40px, 7vw, 96px);
        }
        .logostrip-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 4vw, 56px);
          flex-wrap: nowrap;
        }
        .logostrip-label {
          font-family: "HelveticaNeueCyr", system-ui, sans-serif;
          font-size: 15px;
          font-weight: 300;
          letter-spacing: 0.01em;
          color: #000;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .logostrip-logos {
          flex: 1;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 4vw, 60px);
          flex-wrap: wrap;
        }
        .logostrip-logos img {
          height: clamp(34px, 3.8vw, 54px);
          width: auto;
          max-width: 170px;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.5;
          transition: filter 0.4s var(--ease-out-cubic), opacity 0.4s var(--ease-out-cubic);
          user-select: none;
        }
        .logostrip-logos img.is-big {
          height: clamp(42px, 4.6vw, 66px);
          max-width: 200px;
        }
        .logostrip-logos img.is-invert {
          filter: grayscale(1) invert(1);
        }
        .logostrip-logos img:hover {
          filter: grayscale(0);
          opacity: 1;
        }
        .logostrip-logos img.is-invert:hover {
          filter: grayscale(1) invert(1);
          opacity: 0.85;
        }
        @media (max-width: 700px) {
          .logostrip-row { justify-content: center; }
          .logostrip-logos { justify-content: center; gap: 28px 40px; }
        }
      `));
}
window.LogoStrip = LogoStrip;

// ============ Section: Nosso trabalho (editorial card grid) ============
function WorkCard({
  img,
  img2,
  label,
  kicker,
  title,
  sub,
  area,
  h
}) {
  const {
    navigate
  } = useNav();
  const cardRef = useRef_h(null);
  const pillRef = useRef_h(null);
  useEffect_h(() => {
    const card = cardRef.current;
    const pill = pillRef.current;
    if (!card || !pill) return;
    let tx = 0,
      ty = 0; // target (mouse) position within card
    let cx = 0,
      cy = 0; // current (smoothed) pill position
    let inside = false;
    let raf = 0;
    const onEnter = e => {
      const r = card.getBoundingClientRect();
      tx = cx = e.clientX - r.left;
      ty = cy = e.clientY - r.top;
      inside = true;
      card.classList.add('cursor-active');
      const dot = document.getElementById('cursor');
      if (dot) dot.style.opacity = '0';
    };
    const onMove = e => {
      const r = card.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const onLeave = () => {
      inside = false;
      card.classList.remove('cursor-active');
      const dot = document.getElementById('cursor');
      if (dot) dot.style.opacity = '1';
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      pill.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${inside ? 1 : 0.8})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      // Restore the custom cursor on unmount (e.g. clicking a card navigates
      // away before mouseleave fires, which would leave the cursor hidden).
      const dot = document.getElementById('cursor');
      if (dot) dot.style.opacity = '1';
    };
  }, []);
  return /*#__PURE__*/React.createElement("button", {
    ref: cardRef,
    className: "work-card",
    "data-hover": true,
    style: {
      gridArea: area,
      '--card-h': h
    },
    onClick: () => navigate('/case')
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-card-media"
  }, /*#__PURE__*/React.createElement(Photo, {
    src: img,
    label: label,
    ratio: "auto",
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
      border: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "work-card-media-2",
    style: {
      backgroundImage: `url(${img2 || img})`
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "work-overlay"
  })), /*#__PURE__*/React.createElement("span", {
    ref: pillRef,
    className: "work-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "work-pill-label"
  }, "Ver mais detalhes ", /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192"))), /*#__PURE__*/React.createElement("span", {
    className: "work-moon",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "work-text"
  }, kicker && /*#__PURE__*/React.createElement("span", {
    className: "work-kicker"
  }, kicker), /*#__PURE__*/React.createElement("span", {
    className: "work-title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "work-sub"
  }, sub)));
}
function EstudoDeCasoSection() {
  const notes = [{
    img: HOTEL_IMG.desk,
    text: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, "Campanhas sazonais"), " estruturadas para per\xEDodos estrat\xE9gicos.")
  }, {
    img: HOTEL_IMG.detail,
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Comunica\xE7\xE3o comercial alinhada ao ", /*#__PURE__*/React.createElement("strong", null, "site, redes sociais e WhatsApp"), ".")
  }, {
    img: HOTEL_IMG.reception,
    text: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, "Calend\xE1rio promocional"), " orientado por demanda e oportunidade.")
  }, {
    img: HOTEL_IMG.city,
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Acompanhamento de ", /*#__PURE__*/React.createElement("strong", null, "m\xEDdia paga, conte\xFAdo e performance"), ".")
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "work-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "work-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-head-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "work-eyebrow"
  }, "conhe\xE7a o"), /*#__PURE__*/React.createElement("h2", {
    className: "work-headline"
  }, "nosso", /*#__PURE__*/React.createElement("br", null), "trabalho")), /*#__PURE__*/React.createElement("p", {
    className: "work-head-desc"
  }, "Um case real, ", /*#__PURE__*/React.createElement("strong", null, "quatro frentes"), " de crescimento. Opera\xE7\xF5es comerciais completas para hot\xE9is que querem vender melhor. Veja alguns deles:"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0,
    className: "work-reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-grid"
  }, /*#__PURE__*/React.createElement(WorkCard, {
    area: "c1",
    h: "560px",
    img: "assets/piscina-area-lazer-guarda-sois-hotel-colonial-iguacu.webp",
    img2: "assets/piscina-jardim-flores-hotel-colonial-iguacu.webp",
    title: "Hotel Colonial Igua\xE7u",
    sub: "Estrat\xE9gia comercial, marketing e distribui\xE7\xE3o hoteleira."
  }), /*#__PURE__*/React.createElement(WorkCard, {
    area: "c2",
    h: "560px",
    img: "assets/lobby-saguao-area-convivencia-hotel-colonial-iguacu.webp",
    img2: "assets/quarto-apartamento-casal-hotel-colonial-iguacu.webp",
    title: "Presen\xE7a digital",
    sub: "Conte\xFAdo, redes sociais e posicionamento online."
  }), /*#__PURE__*/React.createElement("div", {
    className: "work-notes",
    style: {
      gridArea: 'c3'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "work-statement",
    style: {
      fontSize: "72px"
    }
  }, "Da estrat\xE9gia \xE0 execu\xE7\xE3o, ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontSize: "72px"
    }
  }, "cada\xA0detalhe importa."))), /*#__PURE__*/React.createElement(WorkCard, {
    area: "c4",
    h: "420px",
    img: "assets/fachada-entrada-principal-piscina-hotel-colonial-iguacu.webp",
    img2: "assets/entrada-recepcao-fonte-agua-hotel-colonial-iguacu.webp",
    title: "Marketing conectado \xE0 receita",
    sub: "Da campanha ao atendimento, cada a\xE7\xE3o pensada para gerar oportunidade comercial."
  }), /*#__PURE__*/React.createElement(WorkCard, {
    area: "c5",
    h: "420px",
    img: "assets/lobby-recepcao-area-estar-hotel-colonial-iguacu.webp",
    img2: "assets/entrada-principal-noite-iluminada-hotel-colonial-iguacu.webp",
    title: "Conte\xFAdo & marca",
    sub: "Comunica\xE7\xE3o visual para fortalecer percep\xE7\xE3o, confian\xE7a e desejo de hospedagem."
  }), /*#__PURE__*/React.createElement(WorkCard, {
    area: "c6",
    h: "420px",
    img: "assets/estacionamento-fonte-jardim-hotel-colonial-iguacu.webp",
    img2: "assets/criancas-brincando-piscina-hotel-colonial-iguacu.webp",
    title: "Novos projetos em constru\xE7\xE3o",
    sub: "Opera\xE7\xF5es comerciais para hot\xE9is que querem vender melhor."
  })))), /*#__PURE__*/React.createElement("style", null, `
        .work-section {
          background: var(--bg);
          padding: clamp(72px, 9vw, 130px) 0 clamp(48px, 6vw, 80px);
        }
        .work-head {
          position: relative;
          min-height: clamp(180px, 22vw, 300px);
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .work-head-left {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 20px);
        }
        .work-mark {
          position: absolute;
          top: 0;
          right: 0;
        }
        .work-mark svg {
          width: clamp(46px, 5vw, 74px);
          height: auto;
          display: block;
        }
        .work-head-desc {
          position: absolute;
          right: 0;
          bottom: clamp(4px, 1vw, 14px);
          max-width: 30ch;
          text-align: right;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1vw, 16px);
          line-height: 1.4;
          letter-spacing: -0.02em;
          color: var(--fg);
        }
        .work-head-desc strong {
          font-weight: 400;
          color: #F95738;
        }
        .work-eyebrow {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(20px, 2vw, 30px);
          letter-spacing: -0.03em;
          line-height: 0.85;
          color: rgb(0, 0, 0);
        }
        .work-headline {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-size: clamp(42px, 6.2vw, 100px);
          line-height: 0.9;
          letter-spacing: -0.045em;
          color: rgb(0, 0, 0);
          max-width: none;
        }
        .work-headline .serif {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: 1.18em;
          letter-spacing: -0.045em;
          color: var(--accent);
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(16px, 1.8vw, 28px);
          grid-template-areas:
            "c1 c1 c1 c1 c2 c2"
            "c3 c3 c4 c4 c4 c4"
            "c5 c5 c5 c6 c6 c6";
        }

        /* Lego-style staggered assemble for the work cards */
        .work-reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
        .work-grid > * { opacity: 0; }
        @keyframes legoDrop {
          0%   { opacity: 0; transform: translateY(-58px) scale(0.9); }
          55%  { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .work-reveal.in .work-grid > * {
          animation: legoDrop 0.7s cubic-bezier(0.34, 1.5, 0.52, 1) both;
        }
        .work-reveal.in .work-grid > *:nth-child(1) { animation-delay: 0.04s; }
        .work-reveal.in .work-grid > *:nth-child(2) { animation-delay: 0.13s; }
        .work-reveal.in .work-grid > *:nth-child(3) { animation-delay: 0.10s; }
        .work-reveal.in .work-grid > *:nth-child(4) { animation-delay: 0.20s; }
        .work-reveal.in .work-grid > *:nth-child(5) { animation-delay: 0.27s; }
        .work-reveal.in .work-grid > *:nth-child(6) { animation-delay: 0.34s; }
        .work-reveal.in .work-grid > *:nth-child(7) { animation-delay: 0.40s; }
        @media (prefers-reduced-motion: reduce) {
          .work-grid > * { opacity: 1; }
          .work-reveal.in .work-grid > * { animation: none; }
        }

        /* Image cards */
        .work-card {
          position: relative;
          height: var(--card-h);
          border-radius: 18px;
          overflow: hidden;
          cursor: none;
          text-align: left;
          display: block;
          padding: 0;
          background: var(--bg-elev-2);
        }
        .work-card-media { position: absolute; inset: 0; }
        .work-card-media .photo { width: 100%; height: 100%; }
        .work-card-media img {
          transition: transform 0.7s cubic-bezier(0.22, 0.68, 0, 1);
        }
        .work-card:hover .work-card-media img { transform: scale(1.06) translateY(-4px); }

        /* Second image — diagonal wipe reveal on hover */
        .work-card-media-2 {
          position: absolute;
          inset: 0;
          z-index: 1;
          background-size: cover;
          background-position: center;
          /* hidden: degenerate triangle at bottom-left (3 vertices) */
          clip-path: polygon(0% 100%, 0% 100%, 0% 100%);
          transition: clip-path 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: clip-path;
        }
        .work-card.cursor-active .work-card-media-2,
        .work-card:hover .work-card-media-2 {
          /* revealed: oversized triangle whose hypotenuse is a "/" diagonal
             sweeping from bottom-left toward top-right, covering the whole card */
          clip-path: polygon(0% 100%, 220% 100%, 0% -120%);
        }
        .work-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(16,17,19,0.7) 0%, rgba(16,17,19,0.1) 45%, rgba(16,17,19,0.05) 100%);
          opacity: 0.65;
          transition: opacity 0.45s ease;
          z-index: 2;
        }
        .work-card:hover .work-overlay { opacity: 0.85; }

        .work-pill {
          position: absolute;
          top: 0; left: 0;
          z-index: 4;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: var(--accent);
          color: var(--on-accent);
          box-shadow: 0 12px 30px -10px rgba(16,17,19,0.5);
          opacity: 0;
          pointer-events: none;
          overflow: hidden;
          transform: translate(-50%, -50%) scale(0.8);
          transition: width 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.22s,
                      height 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.22s,
                      opacity 0.3s ease;
          white-space: nowrap;
          will-change: transform, width, opacity;
        }
        .work-pill-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: 15px;
          letter-spacing: -0.045em;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          white-space: nowrap;
        }
        .work-pill-label .arrow { transition: transform 0.4s var(--ease-out-expo); }
        .work-card.cursor-active .work-pill {
          opacity: 1;
          width: 210px;
          height: 58px;
        }
        .work-card.cursor-active .work-pill-label {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s;
        }

        .work-moon {
          position: absolute;
          bottom: 22px; right: 24px;
          width: 20px; height: 10px;
          border-radius: 0 0 20px 20px;
          background: #F5F5F2;
          z-index: 4;
          pointer-events: none;
          transform: rotate(0deg);
          transform-origin: center;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .work-card.cursor-active .work-moon,
        .work-card:hover .work-moon { transform: rotate(90deg); }

        .work-text {
          position: absolute;
          bottom: 22px; left: 24px; right: 56px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: #F5F5F2;
        }
        .work-kicker {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 2px;
        }
        .work-title {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(16px, 1.4vw, 19px);
          letter-spacing: -0.01em;
          text-transform: lowercase;
          line-height: 1.1;
        }
        .work-sub {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: -0.01em;
          text-transform: lowercase;
          line-height: 1.35;
          color: rgba(245,245,242,0.82);
          max-width: 42ch;
        }

        /* Statement (no card) */
        .work-notes {
          height: auto;
          min-height: 420px;
          border-radius: 0;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: clamp(16px, 2vw, 28px) 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .work-statement {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-size: clamp(40px, 5.4vw, 88px);
          line-height: 0.85;
          letter-spacing: -0.045em;
          color: var(--fg);
        }
        .work-statement em { font-style: normal; font-weight: 300; color: var(--accent); }
        .work-notes-title {
          font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(18px, 1.5vw, 22px);
          letter-spacing: -0.05em;
          color: var(--fg);
        }
        .work-notes-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 1.7vw, 22px);
        }
        .work-notes-list li {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .work-note-thumb {
          width: 60px; height: 60px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .work-note-thumb img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .work-note-text {
          font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.1vw, 16px);
          line-height: 1.32;
          letter-spacing: -0.04em;
          color: var(--fg-muted);
        }
        .work-note-text strong { font-weight: 400; color: var(--fg-muted); }

        @media (max-width: 900px) {
          .work-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "c1 c1"
              "c2 c3"
              "c4 c4"
              "c5 c6";
          }
          .work-card, .work-notes { height: 360px; }
          .work-head {
            min-height: 0;
            display: flex;
            flex-direction: column;
            gap: 28px;
          }
          .work-head-left, .work-mark, .work-head-desc {
            position: static;
          }
          .work-mark { order: -1; }
          .work-head-desc { text-align: left; max-width: 46ch; }
        }
        @media (max-width: 600px) {
          .work-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "c1" "c2" "c3" "c4" "c5" "c6";
          }
          .work-card, .work-notes { height: 340px !important; }
          .work-notes { height: auto !important; }
        }
      `));
}
window.EstudoDeCasoSection = EstudoDeCasoSection;

// ============ Section: Estratégia + Acordeão de pilares ============
function EstrategiaSection() {
  const {
    navigate
  } = useNav();
  const items = [{
    n: '01',
    title: 'Revenue & Distribuição',
    body: ['Organizamos tarifas, canais, inventário e posicionamento comercial para que o hotel venda com mais previsibilidade e menos dependência das OTAs.', 'Esse pilar é importante porque uma boa estratégia de distribuição evita vendas sem margem, melhora o controle da ocupação e ajuda o hotel a tomar decisões com base em demanda, períodos e canais.'],
    to: '/servicos/revenue-distribuicao'
  }, {
    n: '02',
    title: 'Content & Social Media',
    body: ['Criamos conteúdo profissional para fortalecer a presença online do hotel, gerar desejo e transformar redes sociais em parte da estratégia comercial.', 'Mais do que postar por estética, o conteúdo precisa comunicar valor, responder dúvidas, apresentar experiências e aproximar o hóspede da reserva direta.'],
    to: '/servicos/conteudo-redes'
  }, {
    n: '03',
    title: 'Marketing & Tráfego Pago',
    body: ['Planejamos campanhas em Google, Meta, Hotel Ads e SEO conectadas ao calendário comercial, aos pacotes e às metas de venda do hotel.', 'Esse pilar é essencial para atrair demanda qualificada, trabalhar remarketing, divulgar ofertas estratégicas e transformar visibilidade em oportunidades reais de reserva.'],
    to: '/servicos/performance-marketing'
  }, {
    n: '04',
    title: 'Central de Reservas & Atendimento',
    body: ['Estruturamos o atendimento multicanal com venda ativa, follow-up, padronização comercial e acompanhamento das oportunidades geradas.', 'Porque não basta receber contatos: é preciso responder rápido, conduzir a conversa, recuperar cotações, oferecer upgrades e transformar interesse em reserva confirmada.'],
    to: '/servicos/central-reservas'
  }];
  const [open, setOpen] = useState_h(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "estrategia-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "estrategia-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "estrategia-left"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "estrategia-headline",
    style: {
      fontSize: "58px",
      lineHeight: "0.95"
    }
  }, "Constru\xEDmos a estrat\xE9gia comercial que transforma hot\xE9is em marcas mais fortes, rent\xE1veis e preparadas para ", /*#__PURE__*/React.createElement("em", {
    className: "serif",
    style: {
      fontSize: "75px"
    }
  }, "vender melhor.")))), /*#__PURE__*/React.createElement("div", {
    className: "estrategia-right"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "acc"
  }, items.map((it, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: it.n,
      className: "acc-item " + (isOpen ? "open" : "")
    }, /*#__PURE__*/React.createElement("button", {
      className: "acc-head",
      onClick: () => setOpen(isOpen ? -1 : i),
      "data-hover": true,
      "aria-expanded": isOpen
    }, /*#__PURE__*/React.createElement("span", {
      className: "acc-title"
    }, it.title), /*#__PURE__*/React.createElement("span", {
      className: "acc-icon",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("span", {
      className: "acc-icon-bar h"
    }), /*#__PURE__*/React.createElement("span", {
      className: "acc-icon-bar v"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "acc-panel",
      style: {
        gridTemplateRows: isOpen ? '1fr' : '0fr'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "acc-panel-inner"
    }, it.body.map((p, j) => /*#__PURE__*/React.createElement("p", {
      key: j,
      className: "acc-text"
    }, p)))));
  })))))), /*#__PURE__*/React.createElement("style", null, `
        .estrategia-section {
          background: transparent;
          padding: clamp(24px, 3.5vw, 56px) 0;
        }
        .estrategia-section .container {
          background: var(--bg-elev-1);
          border-radius: clamp(28px, 3vw, 44px);
          margin-left: clamp(12px, 2vw, 40px);
          margin-right: clamp(12px, 2vw, 40px);
          padding: clamp(48px, 7vw, 120px) clamp(32px, 5vw, 90px);
        }
        .estrategia-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(48px, 7vw, 120px);
          align-items: start;
        }
        .estrategia-headline {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(28px, 3.2vw, 46px);
          line-height: 0.85;
          letter-spacing: -0.045em;
          color: rgb(0, 0, 0);
          max-width: 18ch;
        }
        .estrategia-left .serif {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          color: var(--accent);
        }
        .estrategia-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: clamp(32px, 4vw, 44px);
          color: var(--accent-deep);
          font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
          font-weight: 600;
          font-size: 17px;
          letter-spacing: -0.05em;
          position: relative;
        }
        .estrategia-link-icon {
          display: inline-flex;
          color: var(--accent-deep);
          transition: transform 0.4s cubic-bezier(0.22, 0.68, 0, 1.3);
        }
        .estrategia-link-text { position: relative; }
        .estrategia-link-text::after {
          content: "";
          position: absolute;
          left: 0; bottom: -3px;
          width: 0; height: 1.5px;
          background: var(--accent-deep);
          transition: width 0.4s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .estrategia-link:hover .estrategia-link-icon { transform: translateX(4px) rotate(7deg); }
        .estrategia-link:hover .estrategia-link-text::after { width: 100%; }

        /* Accordion */
        .estrategia-right { display: flex; justify-content: flex-end; }
        .acc { width: 100%; max-width: 540px; }
        .acc-item { border-top: 1px solid var(--border-strong); }
        .acc-item:last-child { border-bottom: 1px solid var(--border-strong); }
        .acc-head {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 18px;
          padding: clamp(22px, 2.4vw, 30px) 0;
          text-align: left;
          cursor: none;
        }
        .acc-title {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(19px, 1.7vw, 24px);
          letter-spacing: -0.03em;
          line-height: 1.05;
          text-transform: lowercase;
          color: var(--fg);
          transition: color 0.3s ease;
        }
        .acc-item.open .acc-title { color: var(--accent-deep); }
        .acc-head:hover .acc-title { color: var(--accent-deep); }
        .acc-icon {
          position: relative;
          width: 20px; height: 20px;
          flex-shrink: 0;
        }
        .acc-icon-bar {
          position: absolute;
          background: var(--fg);
          border-radius: 2px;
          transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1), background 0.3s ease;
        }
        .acc-icon-bar.h { top: 50%; left: 0; width: 100%; height: 1.8px; transform: translateY(-50%); }
        .acc-icon-bar.v { left: 50%; top: 0; width: 1.8px; height: 100%; transform: translateX(-50%); }
        .acc-item.open .acc-icon-bar.v { transform: translateX(-50%) scaleY(0); }
        .acc-item.open .acc-icon-bar { background: var(--accent-deep); }

        .acc-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .acc-panel-inner {
          overflow: hidden;
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.4s ease 0.05s, transform 0.45s var(--ease-out-expo) 0.05s;
        }
        .acc-item.open .acc-panel-inner {
          opacity: 1;
          transform: translateY(0);
        }
        .acc-text {
          font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 0.95vw, 15px);
          line-height: 1.5;
          letter-spacing: -0.03em;
          color: var(--fg);
          max-width: 48ch;
          padding-bottom: 16px;
        }
        .acc-text:first-child { padding-top: 2px; }
        .acc-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 8px 0 28px;
          font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg);
          cursor: none;
        }
        .acc-cta .arrow { transition: transform 0.5s var(--ease-out-expo); }
        .acc-cta:hover { color: var(--accent-deep); }
        .acc-cta:hover .arrow { transform: translateX(6px); }

        @media (max-width: 900px) {
          .estrategia-grid { grid-template-columns: 1fr; gap: 48px; }
          .estrategia-right { justify-content: stretch; }
          .acc { max-width: none; }
          .estrategia-headline { max-width: 22ch; }
        }
      `));
}
window.EstrategiaSection = EstrategiaSection;

// ============ Section 2: Problema ============
function ProblemaSection() {
  const items = [['01', 'Tarifas sem estratégia', 'O preço muda por urgência, não por demanda, ocupação ou canal.'], ['02', 'Dependência de OTAs', 'Comissões altas e pouca captura de hóspedes para venda direta.'], ['03', 'Atendimento pulverizado', 'WhatsApp, telefone, e-mail e reservas sem rotina comercial.'], ['04', 'Marketing sem conversão', 'Conteúdo bonito, mas desconectado das metas de receita.']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)'
    },
    id: "problema"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 0.32fr) minmax(0, 0.68fr)',
      gap: 'clamp(40px, 6vw, 80px)'
    },
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 120,
      alignSelf: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "O CONTEXTO"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "h-display h-2"
  }, "O hotel vende ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "todos os dias")), " \u2014 mas raramente com estrat\xE9gia comercial integrada.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      marginTop: 32
    }
  }, "A opera\xE7\xE3o acontece, mas a venda fica solta entre canais, comiss\xF5es altas e um atendimento que ", /*#__PURE__*/React.createElement("em", {
    className: "serif"
  }, "reage em vez de vender"), ". O resultado \xE9 receita inst\xE1vel e forte depend\xEAncia das OTAs.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 1,
      background: 'var(--border)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      overflow: 'hidden'
    }
  }, items.map(([n, title, desc], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: n,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      padding: 'clamp(28px, 3vw, 40px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minHeight: 240
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--accent)',
      letterSpacing: '0.1em'
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    className: "h-display",
    style: {
      fontSize: 'clamp(22px, 2vw, 32px)',
      lineHeight: 1.1
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg-muted)',
      fontSize: 14,
      lineHeight: 1.5,
      marginTop: 'auto'
    }
  }, desc))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 400
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      padding: 32,
      borderRadius: 16,
      border: '1px dashed var(--border-strong)',
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'clamp(20px, 1.8vw, 28px)',
      lineHeight: 1.4
    }
  }, "Voc\xEA reconhece pelo menos dois desses pontos no seu hotel?", /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 12,
      color: 'var(--accent)',
      fontFamily: 'var(--font-display)'
    }
  }, "\u2193 \xC9 exatamente isso que a Growth organiza.")))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `));
}

// ============ Section 3: Solução (dark editorial — braço comercial) ============
const SOL_IMG = {
  main: R.solMain || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80&auto=format&fit=crop",
  sec: R.solSec || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop"
};
function SolucaoSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sol-section",
    id: "solucao"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sol-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      gridArea: 'title'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sol-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sol-head-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sol-head-eyebrow"
  }, "seu bra\xE7o"), /*#__PURE__*/React.createElement("h2", {
    className: "sol-head-title"
  }, "comercial", /*#__PURE__*/React.createElement("br", null), "externo")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140,
    className: "sol-img-cell",
    style: {
      gridArea: 'photo'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sol-photo sol-photo-main"
  }, /*#__PURE__*/React.createElement("img", {
    src: SOL_IMG.main,
    alt: "Equipe Growth em opera\xE7\xE3o comercial",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sol-photo-overlay"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sol-right",
    style: {
      gridArea: 'content'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "sol-rule"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sol-rule-label"
  }, "A Solu\xE7\xE3o"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h3", {
    className: "sol-statement"
  }, "A Growth n\xE3o faz s\xF3 divulga\xE7\xE3o. Criamos o caminho certo para o ", /*#__PURE__*/React.createElement("em", null, "interesse virar reserva"), ", no momento em que mais importa.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("div", {
    className: "sol-paras"
  }, /*#__PURE__*/React.createElement("p", null, "A Growth Hotel Solutions atua como uma extens\xE3o comercial do hotel. Organiza rotinas, acompanha oportunidades e tira da equipe interna o peso de vender sem m\xE9todo todos os dias."), /*#__PURE__*/React.createElement("p", null, "O hotel mant\xE9m a opera\xE7\xE3o do dia a dia. A Growth assume a const\xE2ncia comercial que exige foco e acompanhamento cont\xEDnuo.")))))), /*#__PURE__*/React.createElement("style", null, `
        .sol-section {
          background: var(--bg);
          color: var(--fg);
          padding: clamp(88px, 11vw, 168px) 0 clamp(80px, 11vw, 160px);
          position: relative;
        }
        .sol-section::before {
          content: "";
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(16,17,19,0.05) 1px, transparent 1px);
          background-size: 26px 26px;
          opacity: 0.5;
          pointer-events: none;
        }
        .sol-section .container {
          position: relative;
          z-index: 1;
          background: var(--bg-elev-1);
          border-radius: clamp(28px, 3vw, 44px);
          padding: clamp(48px, 7vw, 120px) clamp(32px, 5vw, 90px);
          margin-left: clamp(12px, 2vw, 40px);
          margin-right: clamp(12px, 2vw, 40px);
        }
        .sol-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.55fr) minmax(0, 1.45fr);
          column-gap: clamp(40px, 6vw, 110px);
          row-gap: clamp(30px, 3.4vw, 50px);
          align-items: start;
          grid-template-areas:
            "title   title"
            "photo   content";
        }
        .sol-left {
          display: flex; flex-direction: column;
          gap: clamp(26px, 3vw, 44px);
        }
        .sol-head {
          position: relative;
          min-height: clamp(110px, 13vw, 200px);
          margin-bottom: clamp(20px, 3vw, 44px);
        }
        .sol-head-left {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 20px);
        }
        .sol-head-eyebrow {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(20px, 2vw, 30px);
          letter-spacing: -0.03em;
          line-height: 0.85;
          color: var(--fg);
        }
        .sol-head-title {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-size: clamp(42px, 6.2vw, 100px);
          line-height: 0.9;
          letter-spacing: -0.045em;
          color: var(--fg);
        }
        .sol-head-desc {
          position: absolute;
          right: 0;
          bottom: clamp(4px, 1vw, 14px);
          max-width: 30ch;
          text-align: right;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1vw, 16px);
          line-height: 1.4;
          letter-spacing: -0.02em;
          color: var(--fg-muted);
        }
        .sol-head-desc strong {
          font-weight: 400;
          color: #F95738;
        }
        .sol-lead-title {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 50px);
          line-height: 0.96;
          letter-spacing: -0.045em;
          color: var(--fg);
          text-wrap: balance;
          max-width: 22ch;
        }
        .sol-lead-title em { font-style: normal; color: var(--accent); }

        .sol-right {
          display: flex; flex-direction: column;
          gap: clamp(36px, 4vw, 64px);
        }
        .sol-rule {
          border-top: 1px solid var(--border-strong);
          padding-top: 4px;
        }
        .sol-rule-label {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(16px, 1.3vw, 19px);
          letter-spacing: -0.045em;
          color: var(--fg);
        }
        .sol-statement {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(34px, 3.9vw, 58px);
          line-height: 0.96;
          letter-spacing: -0.045em;
          color: var(--fg);
          text-wrap: normal;
        }
        .sol-statement em { font-style: normal; color: var(--accent); }
        .sol-paras {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 3vw, 48px);
          max-width: 780px;
        }
        .sol-paras p {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.05vw, 16px);
          line-height: 1.4;
          letter-spacing: -0.045em;
          color: var(--fg);
          hyphens: none;
        }

        .sol-photo {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .sol-photo img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sol-photo:hover img { transform: scale(1.05); }
        .sol-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(16,17,19,0.30) 0%, rgba(16,17,19,0.05) 45%, rgba(16,17,19,0) 100%);
          transition: opacity 0.5s ease;
        }
        .sol-photo:hover .sol-photo-overlay { opacity: 0.7; }
        .sol-photo-main { aspect-ratio: 4 / 3; border-radius: 3px 3px 28px 3px; }

        /* Main label — editorial credential plate */
        .sol-label {
          position: absolute;
          left: clamp(20px, 2vw, 32px);
          bottom: clamp(20px, 2vw, 32px);
          right: clamp(20px, 2vw, 32px);
          max-width: 400px;
          padding-left: clamp(18px, 1.6vw, 24px);
          border-left: 2px solid var(--accent);
          display: flex; flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          z-index: 2;
        }
        .sol-label-brand {
          font-family: var(--font-mono);
          font-weight: 600; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(244,239,234,0.62);
        }
        .sol-label-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(19px, 1.8vw, 26px);
          line-height: 1.04;
          letter-spacing: -0.035em;
          color: var(--on-dark);
          text-wrap: balance;
        }
        .sol-label-kicker {
          font-family: var(--font-mono);
          font-weight: 500; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent);
          display: inline-flex; align-items: center; gap: 10px;
        }
        .sol-label-kicker::before {
          content: ""; width: 22px; height: 1px;
          background: var(--accent); display: inline-block;
        }

        /* Right column */
        .sol-headline {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 600;
          font-size: clamp(30px, 3.6vw, 50px);
          line-height: 0.85;
          letter-spacing: -0.075em;
          color: var(--fg);
          max-width: none;
        }
        .sol-headline em {
          font-style: normal;
          color: var(--accent);
        }
        .sol-para {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.6;
          letter-spacing: -0.02em;
          color: var(--fg-muted);
          max-width: none;
        }
        .sol-quote {
          padding: 0;
          background: none;
          border: none;
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 500;
          font-size: clamp(15px, 1.3vw, 19px);
          line-height: 1.45;
          letter-spacing: -0.03em;
          color: var(--fg);
          max-width: none;
        }
        .sol-quote em { font-style: normal; color: var(--accent); }

        /* Data grid */
        .sol-data {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border-strong);
          border-left: 1px solid var(--border-strong);
        }
        .sol-data-cell {
          border-bottom: 1px solid var(--border-strong);
          border-right: 1px solid var(--border-strong);
          padding: 22px 24px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .sol-data-key {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 500; font-size: 11px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--accent);
        }
        .sol-data-val {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 600; font-size: clamp(14px, 1.1vw, 17px);
          letter-spacing: -0.03em; color: var(--fg);
        }

        /* Benefits list — bottom-left */
        .sol-bene-cell { align-self: center; }
        .sol-benefits {
          list-style: none;
        }
        .sol-benefits li {
          display: flex; align-items: center; justify-content: space-between;
          gap: 18px;
          padding: 18px 0;
          border-bottom: 1px solid var(--border);
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.1vw, 16px);
          letter-spacing: -0.03em;
          color: var(--fg);
        }
        .sol-benefits li:first-child { border-top: 1px solid var(--border); }
        .sol-benefit-arrow { color: var(--accent); flex-shrink: 0; opacity: 0.85; }

        /* Secondary label */
        .sol-sec-label {
          position: absolute;
          left: 20px; bottom: 20px; right: 20px;
          z-index: 2;
          display: flex; flex-direction: column; gap: 6px;
        }
        .sol-sec-title {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 600; font-size: 15px;
          letter-spacing: -0.03em; color: var(--on-dark);
        }
        .sol-sec-sub {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 400; font-size: 12px;
          letter-spacing: -0.01em; color: rgba(255,255,255,0.7);
          max-width: 36ch;
        }

        @media (max-width: 900px) {
          .sol-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "title"
              "photo"
              "content";
          }
          .sol-head {
            min-height: 0;
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .sol-head-left, .sol-head-desc {
            position: static;
          }
          .sol-head-desc { text-align: left; max-width: 46ch; }
        }
        @media (max-width: 560px) {
          .sol-paras { grid-template-columns: 1fr; }
        }
      `));
}

// ============ Section 4: Pilares preview ============
function PilaresSection() {
  const pilares = [{
    num: '01',
    to: '/servicos/revenue-distribuicao',
    title: 'Revenue Management & Distribuição',
    desc: 'Tarifas, canais e inventário operando com previsibilidade.',
    tags: ['Revenue Management', 'Channel Manager', 'GDS / OTA', 'Tarifação dinâmica']
  }, {
    num: '02',
    to: '/servicos/conteudo-redes',
    title: 'Content & Social Media',
    desc: 'Conteúdo profissional com função comercial — não só estética.',
    tags: ['Redes sociais', 'Fotografia', 'Audiovisual', 'Copywriting']
  }, {
    num: '03',
    to: '/servicos/performance-marketing',
    title: 'Performance Marketing & Tráfego',
    desc: 'Mídia e SEO ligados ao calendário comercial e às metas de venda.',
    tags: ['Google Ads', 'Meta Ads', 'Hotel Ads', 'SEO Hoteleiro']
  }, {
    num: '04',
    to: '/servicos/central-reservas',
    title: 'Central de Reservas & Atendimento',
    desc: 'Atendimento multicanal com venda ativa e padronização comercial.',
    tags: ['Atendimento 24h', 'Venda ativa', 'Upselling', 'CRM']
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)'
    },
    id: "pilares"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 32,
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "COMO ENTREGAMOS")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h-display h-1",
    style: {
      marginTop: 32,
      maxWidth: '16ch'
    }
  }, "Quatro pilares. Uma ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "opera\xE7\xE3o")), " integrada."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      maxWidth: '38ch'
    }
  }, "Cada pilar resolve uma parte da venda hoteleira. Juntos, formam a estrutura que transforma atendimento, marketing e distribui\xE7\xE3o em ", /*#__PURE__*/React.createElement("em", {
    className: "serif"
  }, "receita"), "."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 24
    }
  }, pilares.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.num,
    delay: i * 100
  }, /*#__PURE__*/React.createElement(CardLink, _extends({}, p, {
    big: true
  })))))));
}

// ============ Section 5: Método (editorial process columns) ============
function MetodoSection() {
  const {
    navigate
  } = useNav();
  const steps = [{
    n: '01',
    title: 'Diagnosticar',
    sub: 'Análise · Contexto',
    desc: 'Entendemos o cenário atual do hotel: canais, tarifas, atendimento, marketing, ocupação e oportunidades comerciais.',
    svg: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 120 120",
      fill: "none",
      className: "met-svg"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "50",
      cy: "50",
      r: "32",
      stroke: "currentColor",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "73",
      y1: "73",
      x2: "99",
      y2: "99",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("line", {
      className: "met-sweep2",
      x1: "50",
      y1: "50",
      x2: "50",
      y2: "22",
      stroke: "#F95738",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      className: "met-ping",
      cx: "50",
      cy: "50",
      r: "4.5",
      fill: "#F95738"
    }))
  }, {
    n: '02',
    title: 'Estruturar',
    sub: 'Plano · Prioridades',
    desc: 'Organizamos as prioridades, definimos rotinas, calendário comercial, responsabilidades e pontos de melhoria.',
    svg: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 120 120",
      fill: "none",
      className: "met-svg"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "24",
      y: "30",
      width: "68",
      height: "14",
      rx: "2",
      stroke: "currentColor",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      className: "met-bar2",
      x: "24",
      y: "53",
      width: "44",
      height: "14",
      rx: "2",
      fill: "#F95738"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "24",
      y: "76",
      width: "58",
      height: "14",
      rx: "2",
      stroke: "currentColor",
      strokeWidth: "2"
    }))
  }, {
    n: '03',
    title: 'Executar',
    sub: 'Campanhas · Rotina',
    desc: 'Colocamos as ações em movimento com campanhas, ajustes comerciais, acompanhamento de canais e apoio à venda direta.',
    svg: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 120 120",
      fill: "none",
      className: "met-svg"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "60",
      cy: "60",
      r: "40",
      stroke: "currentColor",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("g", {
      className: "met-launch"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "47",
      y1: "73",
      x2: "73",
      y2: "47",
      stroke: "#F95738",
      strokeWidth: "2.5",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M57 47 L73 47 L73 63",
      stroke: "#F95738",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none"
    })))
  }, {
    n: '04',
    title: 'Acompanhar',
    sub: 'Dados · Evolução',
    desc: 'Monitoramos resultados, oportunidades e indicadores para ajustar a estratégia e manter a operação comercial em evolução.',
    svg: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 120 120",
      fill: "none",
      className: "met-svg"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "24",
      y1: "96",
      x2: "100",
      y2: "96",
      stroke: "currentColor",
      strokeWidth: "2",
      opacity: "0.2"
    }), /*#__PURE__*/React.createElement("path", {
      className: "met-chart",
      d: "M24 84 L48 66 L68 74 L96 34",
      stroke: "#F95738",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      className: "met-ping",
      cx: "96",
      cy: "34",
      r: "6",
      fill: "#F95738"
    }))
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "met-section",
    id: "metodo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proc-head"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 100,
    className: "proc-head-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "proc-eyebrow"
  }, "como a"), /*#__PURE__*/React.createElement("h2", {
    className: "proc-headline"
  }, /*#__PURE__*/React.createElement("strong", null, "Growth"), /*#__PURE__*/React.createElement("br", null), "atua"))), steps.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.n,
    delay: 60,
    className: "proc-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proc-visual"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proc-figure"
  }, s.svg)), /*#__PURE__*/React.createElement("div", {
    className: "proc-text"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "proc-title"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "proc-desc"
  }, s.desc)), /*#__PURE__*/React.createElement("span", {
    className: "proc-step"
  }, /*#__PURE__*/React.createElement("span", {
    className: "proc-step-label"
  }, "etapa"), /*#__PURE__*/React.createElement("span", {
    className: "proc-step-num"
  }, s.n))))), /*#__PURE__*/React.createElement("style", null, `
        .met-section {
          background: var(--bg);
          padding: clamp(56px, 7vw, 100px) 0;
        }

        /* Header */
        .proc-head {
          position: relative;
          min-height: clamp(90px, 10vw, 150px);
          margin-bottom: clamp(36px, 4.5vw, 64px);
        }
        .proc-head-left {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(22px, 3.2vw, 48px);
        }
        .proc-eyebrow {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(20px, 2vw, 30px);
          letter-spacing: -0.03em;
          line-height: 0.85;
          color: var(--fg);
        }
        .proc-headline {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-size: clamp(42px, 6.2vw, 100px);
          line-height: 0.9;
          letter-spacing: -0.045em;
          color: var(--fg);
        }
        .proc-headline strong {
          font-weight: 300;
          color: #F95738;
        }
        .proc-tag {
          display: inline-flex; align-items: center; gap: 11px;
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 700; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--accent);
        }
        .proc-tag::before {
          content: ""; width: 24px; height: 1px;
          background: var(--accent); display: inline-block;
        }
        .proc-h2 {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(28px, 3.4vw, 50px);
          line-height: 0.95; letter-spacing: -0.045em;
          color: var(--fg);
        }
        .proc-h2 em { font-style: normal; color: var(--accent); }
        .proc-lead {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 400; font-size: clamp(14px, 1.05vw, 16px);
          line-height: 1.4; letter-spacing: -0.02em;
          color: var(--fg-muted);
          max-width: 44ch;
        }

        /* Horizontal step bands */
        .proc-band {
          display: grid;
          grid-template-columns: auto minmax(280px, 480px) 1fr;
          gap: clamp(24px, 3.5vw, 64px);
          align-items: center;
          border-top: 1px solid var(--border-strong);
          padding: clamp(20px, 2.4vw, 38px) 0;
        }
        .proc-band .proc-step { justify-self: end; align-items: flex-start; }
        .proc-band-rev {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr) minmax(84px, auto);
        }
        .proc-band-rev .proc-visual { order: 1; }
        .proc-band-rev .proc-text   { order: 2; }
        .proc-band-rev .proc-step   { order: 3; justify-self: end; }
        .proc-text {
          display: flex; flex-direction: column;
          align-items: flex-start;
          gap: clamp(14px, 1.5vw, 20px);
          max-width: 34rem;
        }
        .proc-step {
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 2px;
          margin-top: 6px;
        }
        .proc-step-label {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(13px, 1vw, 15px);
          letter-spacing: -0.02em; text-transform: lowercase;
          color: var(--fg-muted);
        }
        .proc-step-num {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400;
          font-size: clamp(52px, 6.5vw, 96px);
          line-height: 0.82;
          letter-spacing: -0.05em;
          color: #F95738;
        }
        .proc-title {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300;
          font-size: clamp(32px, 4vw, 58px);
          line-height: 0.95; letter-spacing: -0.045em;
          text-transform: lowercase;
          color: var(--fg);
        }
        .proc-sub {
          font-family: "Inter", system-ui, sans-serif;
          font-weight: 700; font-size: 12px;
          letter-spacing: -0.01em; text-transform: uppercase;
          color: var(--accent);
        }
        .proc-desc {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(15px, 1.1vw, 17px);
          line-height: 1.4; letter-spacing: -0.03em;
          color: var(--fg);
          max-width: 42ch;
        }
        .proc-visual {
          display: flex; align-items: center; justify-content: flex-start;
          color: var(--fg);
          position: relative;
        }
        .proc-figure { width: clamp(110px, 12vw, 168px); color: var(--fg); }
        .proc-figure svg { width: 100%; height: auto; }
        .proc-figure svg { width: 100%; height: auto; }

        /* ===== Figure animations ===== */
        .met-svg [class^="met-"] { transform-box: view-box; }
        .met-svg .met-ping { transform-box: fill-box; transform-origin: center; }
        .met-sweep  { transform-origin: 60px 60px; }
        .met-sweep2 { transform-origin: 50px 50px; }
        .met-bar2   { transform-box: fill-box; transform-origin: left center; }
        .met-launch { transform-box: fill-box; transform-origin: center; }
        .met-needle { transform-origin: 60px 60px; }
        .met-cell   { transform-origin: 33.5px 33.5px; }
        .met-chart  { stroke-dasharray: 105; stroke-dashoffset: 0; }
        .met-arc    { stroke-dasharray: 95; stroke-dashoffset: 0; }

        @keyframes metSpin  { to { transform: rotate(360deg); } }
        @keyframes metPing  { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.85); opacity: 0.4; } }
        @keyframes metGauge { from { transform: rotate(-26deg); } to { transform: rotate(16deg); } }
        @keyframes metCell  { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.35; } }
        @keyframes metDraw  { from { stroke-dashoffset: var(--len, 175); } to { stroke-dashoffset: 0; } }
        @keyframes metNudge { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(4px, -4px); } }
        @keyframes metBarW  { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(1.32); } }

        @media (prefers-reduced-motion: no-preference) {
          .met-chart { stroke-dashoffset: 105; }
          .met-arc   { stroke-dashoffset: 95; }
          .proc-band.in .met-sweep  { animation: metSpin 5s linear infinite; }
          .proc-band.in .met-sweep2 { animation: metSpin 4s linear infinite; }
          .proc-band.in .met-bar2   { animation: metBarW 3s ease-in-out infinite; }
          .proc-band.in .met-launch { animation: metNudge 2.4s ease-in-out infinite; }
          .proc-band.in .met-ping   { animation: metPing 2.6s ease-out infinite; }
          .proc-band.in .met-needle { animation: metGauge 3.6s ease-in-out infinite alternate; }
          .proc-band.in .met-cell   { animation: metCell 3s ease-in-out infinite; }
          .proc-band.in .met-chart  { --len: 105; animation: metDraw 1.4s var(--ease-out-expo) 0.25s forwards; }
          .proc-band.in .met-arc    { --len: 95; animation: metDraw 1.1s var(--ease-out-expo) 0.15s forwards; }
        }

        @media (max-width: 820px) {
          .proc-head {
            min-height: 0;
          }
          .proc-head-left {
            position: static;
          }
          .proc-band,
          .proc-band-rev {
            grid-template-columns: 1fr;
            gap: clamp(16px, 4vw, 26px);
          }
          .proc-band-rev .proc-visual,
          .proc-band-rev .proc-text,
          .proc-band-rev .proc-step { order: 0; }
          .proc-band-rev .proc-step { justify-self: start; }
          .proc-band .proc-step { justify-self: start; align-items: flex-start; }
          .proc-step { margin-top: 0; }
        }
      `));
}

// ============ Section 6: KPIs ============
function KPIsSection() {
  const kpis = [{
    value: 100,
    suffix: '%',
    sub: 'Ocupação',
    desc: 'por período'
  }, {
    value: 287,
    prefix: 'R$ ',
    sub: 'ADR',
    desc: 'diária média'
  }, {
    value: 184,
    prefix: 'R$ ',
    sub: 'RevPAR',
    desc: 'receita por UH'
  }, {
    value: 42,
    suffix: '%',
    sub: 'Receita direta',
    desc: 'site + WhatsApp'
  }, {
    value: 28,
    suffix: '%',
    sub: 'Conversão',
    desc: 'cotações em reservas'
  }, {
    value: 4.6,
    suffix: 'x',
    sub: 'ROI',
    desc: 'mídia paga'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'transparent',
      padding: 'clamp(24px, 3.5vw, 56px) 0'
    },
    id: "kpis"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      background: 'var(--bg-elev-1)',
      borderRadius: 'clamp(28px, 3vw, 44px)',
      padding: 'clamp(48px, 7vw, 96px) clamp(32px, 5vw, 80px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 0.4fr) minmax(0, 0.6fr)',
      gap: 'clamp(40px, 6vw, 80px)',
      alignItems: 'flex-start'
    },
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "O QUE MEDIMOS")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h-display h-2",
    style: {
      marginTop: 32
    }
  }, "Terceiriza\xE7\xE3o comercial s\xF3 vale se for ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "medida")), ".")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 250
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      marginTop: 32
    }
  }, "Toda rotina, campanha e atendimento gera dado. Reportamos mensalmente o que importa para a receita do hotel.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 380
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      padding: 24,
      background: 'var(--bg)',
      borderRadius: 12,
      border: '1px solid var(--border)',
      fontSize: 14,
      color: 'var(--fg-muted)',
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      display: 'block',
      marginBottom: 12
    }
  }, "RELAT\xD3RIO MENSAL"), "Resultados \xB7 a\xE7\xF5es executadas \xB7 oportunidades \xB7 riscos \xB7 plano do m\xEAs seguinte."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 1,
      background: 'var(--border)',
      borderRadius: 16,
      overflow: 'hidden'
    },
    className: "kpi-grid"
  }, kpis.map((k, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg)',
      padding: 'clamp(24px, 3vw, 40px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-display",
    style: {
      fontSize: 'clamp(48px, 6vw, 88px)',
      lineHeight: 0.95,
      color: 'var(--fg)'
    }
  }, k.prefix || '', /*#__PURE__*/React.createElement(CountUp, {
    to: k.value,
    format: n => k.value >= 100 ? Math.round(n) : n.toFixed(1)
  }), k.suffix || ''), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg)',
      fontWeight: 500
    }
  }, k.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg-subtle)',
      marginTop: 4,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, k.desc)))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 700px) {
          .kpi-grid { grid-template-columns: 1fr !important; }
        }
      `));
}

// ============ Section 7: Planos preview ============
function PlanosPreviewSection() {
  const {
    navigate
  } = useNav();
  const packs = [{
    name: 'growth start',
    desc: 'Para hotéis que precisam organizar sua operação comercial e presença digital.',
    facts: ['Diagnóstico inicial', 'Revenue Management básico', 'Distribuição em OTAs', 'Gestão de até 2 redes sociais', 'Calendário de conteúdo mensal', 'Relatório mensal de desempenho']
  }, {
    name: 'growth performance',
    desc: 'Para hotéis que desejam aumentar reservas diretas e acelerar resultados.',
    hot: true,
    prefix: 'Tudo do plano Start +',
    facts: ['Revenue Management completo', 'Gestão de até 4 redes sociais', 'Google Ads', 'Meta Ads', 'SEO contínuo do site', 'Google Hotel Ads', 'Relatório de ROI e performance']
  }, {
    name: 'growth partner',
    desc: 'Terceirização completa do marketing e comercial do hotel.',
    prefix: 'Tudo do plano Performance +',
    facts: ['Central de reservas ativa', 'Atendimento comercial WhatsApp', 'CRM e automações', 'Gestão de grupos e eventos', 'Gestão de reputação online', 'Produção de vídeos e reels', 'Dashboard executivo (BI)', 'Gerente de conta dedicado']
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "packs",
    id: "planos"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "packs-head"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 100,
    className: "packs-head-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "packs-eyebrow"
  }, "planos e valores"), /*#__PURE__*/React.createElement("h2", {
    className: "packs-title"
  }, "para crescimento"))), /*#__PURE__*/React.createElement("div", {
    className: "packs-grid"
  }, packs.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.name,
    delay: i * 100,
    className: p.hot ? 'pack-card pack-card-hot' : 'pack-card'
  }, /*#__PURE__*/React.createElement("div", {
    className: "pack-name"
  }, p.name, p.hot && /*#__PURE__*/React.createElement("span", {
    className: "pack-flame",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pack-desc"
  }, p.desc), p.prefix && /*#__PURE__*/React.createElement("div", {
    className: "pack-prefix"
  }, p.prefix), /*#__PURE__*/React.createElement("div", {
    className: "pack-facts"
  }, p.facts.map((f, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    className: "pack-fact"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pack-check"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, f))), p.excludes && p.excludes.map((f, j) => /*#__PURE__*/React.createElement("div", {
    key: 'x' + j,
    className: "pack-fact pack-fact-no"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pack-x"
  }, "\u2715"), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement("button", {
    className: "pack-btn",
    onClick: () => window.dispatchEvent(new CustomEvent('open-contact'))
  }, /*#__PURE__*/React.createElement("span", {
    className: "pack-btn-top"
  }, /*#__PURE__*/React.createElement("span", null, "descubra o valor"), /*#__PURE__*/React.createElement("span", {
    className: "pack-arrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-out"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "icon-in"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18 L18 6 M9 6 L18 6 L18 15",
    stroke: "currentColor",
    strokeWidth: "2.2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("span", {
    className: "pack-btn-bottom"
  }, "e receba uma proposta comercial")))))), /*#__PURE__*/React.createElement("style", null, `
        .packs {
          background: var(--bg);
          padding: clamp(72px, 9vw, 130px) 0 clamp(48px, 6vw, 80px);
        }
        .packs-head {
          position: relative;
          min-height: clamp(80px, 9vw, 150px);
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .packs-head-left {
          position: absolute;
          left: 0; bottom: 0;
          display: flex; flex-direction: column;
          align-items: flex-start;
          gap: clamp(10px, 1.4vw, 20px);
        }
        .packs-eyebrow {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(20px, 2vw, 30px);
          letter-spacing: -0.03em; line-height: 0.85; color: var(--fg);
        }
        .packs-title {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300; font-size: clamp(42px, 6.2vw, 100px);
          line-height: 0.9; letter-spacing: -0.045em;
          text-transform: lowercase; color: var(--fg);
        }
        .packs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 1.8vw, 28px);
          align-items: start;
        }
        .pack-card {
          background: var(--bg);
          border: 3.5px solid var(--fg);
          border-radius: clamp(28px, 3vw, 40px);
          padding: clamp(32px, 3.5vw, 52px);
          display: flex; flex-direction: column;
          gap: clamp(10px, 1.1vw, 13px);
        }
        .pack-card-hot {
          border: 3.5px solid #F95738;
        }
        .pack-name {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 300; font-size: clamp(26px, 2.8vw, 42px);
          line-height: 0.95; letter-spacing: -0.045em;
          text-transform: lowercase; color: var(--fg);
        }
        .pack-card-hot .pack-name { color: #F95738; }
        .pack-flame { display: inline-block; vertical-align: middle; margin-left: 10px; }
        .pack-flame svg { width: clamp(20px, 2vw, 30px); height: auto; fill: #F95738; display: inline-block; vertical-align: middle; }
        .pack-desc {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(15px, 1.1vw, 17px);
          letter-spacing: -0.03em; line-height: 1.4; color: var(--fg);
          text-transform: lowercase;
        }
        .pack-facts {
          display: flex; flex-direction: column;
          gap: clamp(10px, 1.2vw, 14px);
          margin-top: clamp(20px, 2.6vw, 36px);
        }
        .pack-prefix {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(14px, 1vw, 15px);
          letter-spacing: -0.02em; color: #F95738;
          text-transform: lowercase;
          margin-top: -2px;
        }
        .pack-fact {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(14px, 1vw, 15px);
          letter-spacing: -0.02em; color: var(--fg); line-height: 1.3;
          text-transform: lowercase;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .pack-check { color: #F95738; flex-shrink: 0; }
        .pack-fact-no { color: var(--fg-subtle); }
        .pack-x { color: var(--fg-subtle); flex-shrink: 0; }
        .pack-obj {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(13px, 0.95vw, 15px);
          letter-spacing: -0.02em; line-height: 1.4; color: var(--fg-muted);
          margin-top: 6px;
        }
        .pack-obj strong { font-weight: 400; color: var(--fg); }
        .pack-btn {
          margin-top: clamp(28px, 4vw, 56px);
          display: flex; flex-direction: column; align-items: center;
          gap: 4px;
          text-align: center;
          background: #F95738; color: var(--on-accent);
          border-radius: 999px;
          padding: 20px 28px;
          transition: background 0.4s var(--ease-out-cubic), color 0.4s var(--ease-out-cubic);
        }
        .pack-btn:hover { background: var(--fg); color: var(--on-dark); }
        .pack-btn-top {
          display: flex; align-items: center; justify-content: center;
          gap: 10px;
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: clamp(17px, 1.4vw, 21px);
          letter-spacing: -0.03em; line-height: 1;
        }
        .pack-arrow {
          position: relative;
          width: 18px; height: 18px; flex-shrink: 0;
          line-height: 0; overflow: hidden;
        }
        .pack-arrow .icon-out, .pack-arrow .icon-in {
          display: block; width: 100%; height: 100%;
          transition: transform 0.6s var(--ease-out-expo);
          line-height: 0;
        }
        .pack-arrow .icon-out { transform: translate(0, 0); }
        .pack-arrow .icon-in {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) translate(-220%, 220%);
        }
        .pack-btn:hover .pack-arrow .icon-out { transform: translate(220%, -220%); }
        .pack-btn:hover .pack-arrow .icon-in { transform: translate(-50%, -50%) translate(0, 0); }
        .pack-arrow svg { display: block; width: 100%; height: 100%; }
        .pack-btn-bottom {
          font-family: "HelveticaNeueCyr", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-weight: 400; font-size: 12px; letter-spacing: -0.02em;
          opacity: 0.72;
        }
        @media (max-width: 900px) {
          .packs-head { min-height: 0; }
          .packs-head-left { position: static; }
          .packs-grid { grid-template-columns: 1fr; }
        }
      `));
}

// ============ Home page assembly ============
function HomePage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroHome, null), /*#__PURE__*/React.createElement(LogoStrip, null), /*#__PURE__*/React.createElement(HeroFeature, null), /*#__PURE__*/React.createElement(EstrategiaSection, null), /*#__PURE__*/React.createElement(EstudoDeCasoSection, null), /*#__PURE__*/React.createElement(SolucaoSection, null), /*#__PURE__*/React.createElement(MetodoSection, null), /*#__PURE__*/React.createElement(PlanosPreviewSection, null));
}
window.HomePage = HomePage;

/* ===== source block 4 ===== */
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, Reveal, Eyebrow, Photo, L, CardLink, PilarPage, HOTEL_IMG, CTAButton, useNav */
const {
  useState: useState_i,
  useEffect: useEffect_i
} = React;

// ===================== /servicos hub =====================
function ServicosPage() {
  const pilares = [{
    num: '01',
    to: '/servicos/revenue-distribuicao',
    title: 'Revenue Management & Distribuição',
    desc: 'Tarifas, canais e inventário operando com previsibilidade. Operação que reduz venda sem margem e otimiza RevPAR ao longo do ano.',
    tags: ['Mapa tarifário', 'B2B / B2C', 'Paridade', 'RevPAR']
  }, {
    num: '02',
    to: '/servicos/conteudo-redes',
    title: 'Content & Social Media',
    desc: 'Conteúdo profissional com função comercial. Cada peça tem objetivo: gerar desejo, responder dúvidas, fortalecer marca ou levar para reserva.',
    tags: ['Redes', 'Fotografia', 'Audiovisual', 'Copy PT/ES/EN']
  }, {
    num: '03',
    to: '/servicos/performance-marketing',
    title: 'Performance Marketing & Tráfego',
    desc: 'Campanhas que vendem períodos, pacotes e ofertas — não apenas "impulsionar post". Conectadas ao calendário comercial.',
    tags: ['Google Ads', 'Meta Ads', 'Hotel Ads', 'SEO']
  }, {
    num: '04',
    to: '/servicos/central-reservas',
    title: 'Central de Reservas & Atendimento',
    desc: 'Mudança de postura: de responder quando o hóspede chama, para vender, acompanhar, recuperar e converter.',
    tags: ['Atendimento 24h', 'Venda ativa', 'Upselling', 'CRM']
  }];
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 'clamp(140px, 18vw, 240px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "SERVI\xC7OS")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h1", {
    className: "h-display h-1",
    style: {
      marginTop: 32,
      maxWidth: '16ch'
    }
  }, "Quatro pilares que cobrem toda a ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "venda hoteleira")), ".")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      marginTop: 40,
      maxWidth: '60ch'
    }
  }, "Cada pilar pode ser contratado de forma isolada ou em conjunto, conforme o que o hotel precisa organizar primeiro. A maior parte dos clientes come\xE7a por ", /*#__PURE__*/React.createElement("em", {
    className: "serif"
  }, "Revenue"), " ou ", /*#__PURE__*/React.createElement("em", {
    className: "serif"
  }, "Central de Reservas"), " e expande depois.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      gap: 24
    }
  }, pilares.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.num,
    delay: i * 100
  }, /*#__PURE__*/React.createElement(CardLink, _extends({}, p, {
    big: true
  }))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 500
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      padding: 'clamp(32px, 4vw, 56px)',
      background: 'var(--bg-elev-1)',
      borderRadius: 20,
      border: '1px solid var(--border)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "h-display",
    style: {
      fontSize: 'clamp(28px, 2.6vw, 40px)',
      lineHeight: 1.1,
      maxWidth: '20ch'
    }
  }, "N\xE3o tem certeza por onde come\xE7ar?"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      color: 'var(--fg-muted)',
      maxWidth: '40ch'
    }
  }, "Agende um diagn\xF3stico \u2014 sugerimos o ponto de partida.")), /*#__PURE__*/React.createElement(CTAButton, {
    to: "/contato",
    variant: "accent"
  }, "Agendar diagn\xF3stico"))))));
}
window.ServicosPage = ServicosPage;

// ===================== Pilar 1: Revenue =====================
function PilarRevenue() {
  return /*#__PURE__*/React.createElement(PilarPage, {
    num: "01",
    title: "Revenue Management & Distribui\xE7\xE3o",
    lead: "Formata\xE7\xE3o de tarifas, canais e invent\xE1rio para o hotel vender com mais previsibilidade \u2014 e menos venda sem margem.",
    image: {
      src: HOTEL_IMG.desk,
      label: "REVENUE OPERATION"
    },
    sections: [{
      eyebrow: "O QUE ENTREGAMOS",
      title: "Quatro frentes de revenue.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }, [['Mapa tarifário por período', 'Tarifas planejadas por demanda, ocupação e canal — não por urgência.'], ['Estratégia B2B e B2C', 'Distribuição clara entre venda direta, OTAs e parceiros corporativos.'], ['Paridade e competitividade', 'Monitoramento de preços, restrições e disponibilidade.'], ['Otimização de RevPAR', 'Ajuste contínuo para receita por unidade habitacional.']].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: '24px 0',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '48px 1fr',
          gap: 24,
          alignItems: 'flex-start'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--accent)',
          letterSpacing: '0.12em',
          paddingTop: 4
        }
      }, "0", i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
        className: "h-display",
        style: {
          fontSize: 'clamp(20px, 1.8vw, 26px)',
          lineHeight: 1.2
        }
      }, t), /*#__PURE__*/React.createElement("p", {
        style: {
          marginTop: 8,
          fontSize: 14,
          color: 'var(--fg-muted)',
          lineHeight: 1.5
        }
      }, d)))))
    }, {
      eyebrow: "ROTINA OPERACIONAL",
      title: "Cadência semanal, mensal e contínua.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gap: 16
        }
      }, [['SEMANAL', 'Análise de ocupação, pickup, concorrência e canais.'], ['MENSAL', 'Calendário de demanda, eventos e campanhas.'], ['CONTÍNUO', 'Ajuste de tarifas, restrições, disponibilidade e políticas.']].map(([freq, desc], i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: 24,
          borderRadius: 12,
          background: 'var(--bg-elev-1)',
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '120px 1fr',
          gap: 24,
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          letterSpacing: '0.16em'
        }
      }, freq), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          color: 'var(--fg)'
        }
      }, desc))))
    }, {
      eyebrow: "RESULTADO ESPERADO",
      title: "O que muda no hotel.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 'clamp(32px, 4vw, 56px)',
          background: 'var(--bg-elev-1)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 2.4vw, 36px)',
          lineHeight: 1.25
        }
      }, "Melhor ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", {
        style: {
          color: 'var(--accent)'
        }
      }, "di\xE1ria m\xE9dia")), ", distribui\xE7\xE3o mais limpa e menos venda sem margem.")
    }],
    nextPilar: {
      to: '/servicos/conteudo-redes',
      num: '02',
      title: 'Content & Social Media',
      desc: 'Conteúdo profissional com função comercial — não só estética.',
      tags: ['Redes sociais', 'Fotografia', 'Audiovisual', 'Copy']
    }
  });
}
window.PilarRevenue = PilarRevenue;

// ===================== Pilar 2: Conteúdo =====================
function PilarConteudo() {
  return /*#__PURE__*/React.createElement(PilarPage, {
    num: "02",
    title: "Content & Social Media",
    lead: "Conte\xFAdo profissional para aumentar desejo, autoridade e convers\xE3o nos canais digitais do hotel.",
    image: {
      src: HOTEL_IMG.detail,
      label: "CONTENT PRODUCTION"
    },
    sections: [{
      eyebrow: "PRODUÇÃO DE CONTEÚDO",
      title: "Peças com função, não apenas estética.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }
      }, [['Reels & vídeos curtos', 'Roteiros com gancho, ritmo e CTA.'], ['Fotografia', 'Estrutura, gastronomia e experiências.'], ['Copywriting hoteleiro', 'Em PT, ES e EN.'], ['Calendário editorial', 'Datas comerciais e sazonalidade.']].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: 24,
          background: 'var(--bg-elev-1)',
          borderRadius: 12,
          border: '1px solid var(--border)',
          minHeight: 160,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          letterSpacing: '0.14em'
        }
      }, "0", i + 1), /*#__PURE__*/React.createElement("h4", {
        className: "h-display",
        style: {
          fontSize: 22,
          lineHeight: 1.15
        }
      }, t), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          color: 'var(--fg-muted)',
          marginTop: 'auto'
        }
      }, d))))
    }, {
      eyebrow: "PONTO-CHAVE",
      title: "Conteúdo como estratégia comercial.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 'clamp(32px, 4vw, 56px)',
          background: 'var(--bg-elev-1)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 2vw, 30px)',
          lineHeight: 1.35
        }
      }, "O conte\xFAdo deixa de ser apenas postagem e passa a servir \xE0 ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", {
        style: {
          color: 'var(--accent)'
        }
      }, "estrat\xE9gia comercial")), " do hotel.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: '0.7em',
          color: 'var(--fg-muted)',
          fontStyle: 'normal',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.5
        }
      }, "Cada pe\xE7a tem fun\xE7\xE3o: gerar desejo, responder d\xFAvidas, fortalecer marca ou levar para reserva direta."))
    }, {
      eyebrow: "ÁREAS DE COBERTURA",
      title: "Onde operamos.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }, [['Gestão de redes', 'Instagram, TikTok, Facebook — calendário, postagem, métricas, comunidade.'], ['Audiovisual', 'Roteiro, gravação e edição com equipe própria ou em parceria local.']].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: '32px 0',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '40% 1fr',
          gap: 32
        }
      }, /*#__PURE__*/React.createElement("h4", {
        className: "h-display",
        style: {
          fontSize: 'clamp(22px, 2.2vw, 32px)',
          lineHeight: 1.1
        }
      }, t), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 15,
          color: 'var(--fg-muted)',
          lineHeight: 1.5
        }
      }, d))))
    }],
    nextPilar: {
      to: '/servicos/performance-marketing',
      num: '03',
      title: 'Performance Marketing & Tráfego',
      desc: 'Mídia e SEO ligados ao calendário comercial e às metas de venda.',
      tags: ['Google Ads', 'Meta Ads', 'Hotel Ads', 'SEO']
    }
  });
}
window.PilarConteudo = PilarConteudo;

// ===================== Pilar 3: Performance =====================
function PilarPerformance() {
  return /*#__PURE__*/React.createElement(PilarPage, {
    num: "03",
    title: "Performance Marketing & Tr\xE1fego",
    lead: "Campanhas de m\xEDdia e SEO conectadas com calend\xE1rio comercial e metas de venda do hotel.",
    image: {
      src: HOTEL_IMG.city,
      label: "PERFORMANCE OPS"
    },
    sections: [{
      eyebrow: "CANAIS QUE OPERAMOS",
      title: "Quatro frentes de tráfego.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      }, [['Google Ads', 'Busca por intenção de compra, campanhas de marca e termos de destino.'], ['Meta Ads', 'Aquecimento de público, remarketing e campanhas de ofertas.'], ['Hotel Ads / OTA Ads', 'Apoio de visibilidade onde o hóspede compara preços.'], ['SEO Hoteleiro', 'Conteúdo de destino, atrativos, feriados e experiências.']].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: '28px 0',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '48px 1fr 1fr',
          gap: 24,
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--accent)',
          letterSpacing: '0.14em'
        }
      }, "0", i + 1), /*#__PURE__*/React.createElement("h4", {
        className: "h-display",
        style: {
          fontSize: 'clamp(22px, 2.2vw, 30px)',
          lineHeight: 1.1
        }
      }, t), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 14,
          color: 'var(--fg-muted)',
          lineHeight: 1.5
        }
      }, d))))
    }, {
      eyebrow: "PRINCÍPIO",
      title: "Campanha não é boost.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 'clamp(32px, 4vw, 56px)',
          background: 'var(--bg-elev-1)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 2.4vw, 36px)',
          lineHeight: 1.25
        }
      }, "Campanhas devem vender ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", {
        style: {
          color: 'var(--accent)'
        }
      }, "per\xEDodos, pacotes e ofertas")), " \u2014", /*#__PURE__*/React.createElement("br", null), "n\xE3o apenas \"impulsionar post\".")
    }],
    nextPilar: {
      to: '/servicos/central-reservas',
      num: '04',
      title: 'Central de Reservas & Atendimento',
      desc: 'Atendimento multicanal com venda ativa e padronização comercial.',
      tags: ['24h', 'Venda ativa', 'Upselling', 'CRM']
    }
  });
}
window.PilarPerformance = PilarPerformance;

// ===================== Pilar 4: Central Reservas =====================
function PilarReservas() {
  return /*#__PURE__*/React.createElement(PilarPage, {
    num: "04",
    title: "Central de Reservas & Atendimento",
    lead: "Atendimento multicanal com venda ativa, follow-up e padroniza\xE7\xE3o comercial.",
    image: {
      src: HOTEL_IMG.lobby,
      label: "RESERVATIONS DESK"
    },
    sections: [{
      eyebrow: "CANAIS ATENDIDOS",
      title: "Onde o hóspede chega.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16
        }
      }, ['WhatsApp e telefone', 'E-mail e formulários', 'Follow-up de cotações', 'Upselling e grupos'].map((t, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: 24,
          background: 'var(--bg-elev-1)',
          borderRadius: 12,
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minHeight: 100
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          letterSpacing: '0.14em'
        }
      }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 16,
          fontFamily: 'var(--font-display)'
        }
      }, t))))
    }, {
      eyebrow: "MUDANÇA DE POSTURA",
      title: "Antes & depois.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 1,
          background: 'var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--border)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 'clamp(28px, 3vw, 40px)',
          background: 'var(--bg-elev-1)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--fg-subtle)',
          letterSpacing: '0.14em'
        }
      }, "ANTES"), /*#__PURE__*/React.createElement("p", {
        className: "h-display",
        style: {
          fontSize: 'clamp(20px, 1.8vw, 26px)',
          marginTop: 16,
          lineHeight: 1.3,
          color: 'var(--fg-muted)'
        }
      }, "Responder quando o h\xF3spede chama.")), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 'clamp(28px, 3vw, 40px)',
          background: 'var(--bg-elev-2)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          letterSpacing: '0.14em'
        }
      }, "DEPOIS"), /*#__PURE__*/React.createElement("p", {
        className: "h-display",
        style: {
          fontSize: 'clamp(20px, 1.8vw, 26px)',
          marginTop: 16,
          lineHeight: 1.3
        }
      }, /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "Vender, acompanhar, recuperar")), " e converter.")))
    }, {
      eyebrow: "O QUE CONTROLAMOS",
      title: "Indicadores da central.",
      body: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16
        }
      }, ['Tempo de resposta', 'Taxa de conversão', 'Motivo de perda', 'Receita gerada por canal'].map((t, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: 20,
          borderRadius: 12,
          border: '1px solid var(--border-strong)',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14
        }
      }, t))))
    }],
    nextPilar: {
      to: '/servicos',
      num: '←',
      title: 'Voltar para visão geral dos pilares',
      desc: 'Veja os 4 pilares lado a lado e descubra por onde começar.',
      tags: []
    }
  });
}
window.PilarReservas = PilarReservas;

// ===================== /como-trabalhamos =====================
function ComoTrabalhamosPage() {
  const etapas = [{
    num: '01',
    name: 'Diagnóstico',
    duration: '5 a 10 dias',
    desc: 'Mapeamos canais, tarifas, equipe, atendimento e presença digital. Identificamos o que já funciona, o que precisa ser corrigido e onde está a receita não capturada.',
    entrega: 'Relatório com fotografia comercial atual + recomendações.'
  }, {
    num: '02',
    name: 'Plano de ação',
    duration: '1 semana',
    desc: 'A partir do diagnóstico, definimos metas, prioridades, calendário de execução e responsáveis (internos do hotel e da Growth).',
    entrega: 'Plano de 90 dias com marcos mensais.'
  }, {
    num: '03',
    name: 'Implantação',
    duration: '30 dias',
    desc: 'Operamos a entrada: padronização de rotinas, scripts de atendimento, abertura de campanhas, ajuste de distribuição e gestão tarifária.',
    entrega: 'Operação rodando com todos os canais alinhados.'
  }, {
    num: '04',
    name: 'Gestão mensal',
    duration: 'Contínua',
    desc: 'A partir do segundo mês a operação entra em rotina contínua: reuniões mensais, relatórios de performance, ajustes de campanhas e revisão de metas.',
    entrega: 'Relatório mensal + reunião de alinhamento.'
  }];
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 'clamp(140px, 18vw, 240px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "O M\xC9TODO")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h1", {
    className: "h-display h-1",
    style: {
      marginTop: 32,
      maxWidth: '16ch'
    }
  }, "Implanta\xE7\xE3o em ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "4 etapas")), ". Gest\xE3o mensal cont\xEDnua.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      marginTop: 40,
      maxWidth: '60ch'
    }
  }, "Entrar em um hotel exige ordem. Por isso a Growth opera com um processo de entrada em fases \u2014 para reduzir ru\xEDdo, organizar rotina e come\xE7ar a medir resultado ", /*#__PURE__*/React.createElement("em", {
    className: "serif"
  }, "desde o primeiro m\xEAs"), ".")))), etapas.map((e, i) => /*#__PURE__*/React.createElement("section", {
    key: e.num,
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 0.35fr) minmax(0, 0.65fr)',
      gap: 'clamp(40px, 6vw, 100px)'
    },
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--accent)',
      letterSpacing: '0.16em'
    }
  }, "ETAPA ", e.num)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h-display",
    style: {
      fontSize: 'clamp(48px, 6vw, 96px)',
      lineHeight: 0.95,
      marginTop: 20,
      fontStyle: 'italic'
    }
  }, e.name)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'inline-flex',
      padding: '8px 16px',
      borderRadius: 999,
      border: '1px solid var(--border-strong)',
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.1em',
      color: 'var(--fg-muted)'
    }
  }, "DURA\xC7\xC3O \xB7 ", e.duration.toUpperCase()))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'clamp(17px, 1.4vw, 22px)',
      lineHeight: 1.5,
      color: 'var(--fg)'
    }
  }, e.desc)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      padding: 24,
      background: 'var(--bg-elev-1)',
      borderRadius: 12,
      borderLeft: '2px solid var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent)',
      letterSpacing: '0.16em',
      display: 'block',
      marginBottom: 8
    }
  }, "ENTREGA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, e.entrega))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-elev-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "O QUE REPORTAMOS")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h-display h-2",
    style: {
      marginTop: 32,
      maxWidth: '20ch'
    }
  }, "Seis indicadores que ditam o ritmo da opera\xE7\xE3o.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 1,
      background: 'var(--border)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      overflow: 'hidden'
    }
  }, [['Ocupação', 'Por período. Resultado bruto da operação comercial.'], ['ADR', 'Diária média. Indica saúde tarifária ao longo do mês.'], ['RevPAR', 'Receita por unidade habitacional disponível.'], ['Receita direta', 'Site + WhatsApp. Reduz dependência de OTAs.'], ['Conversão', 'Cotações em reservas confirmadas.'], ['ROI', 'Mídia paga. Investimento × retorno.']].map(([t, d], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-elev-1)',
      padding: 'clamp(28px, 3vw, 40px)',
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent)',
      letterSpacing: '0.14em'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("h4", {
    className: "h-display",
    style: {
      fontSize: 'clamp(28px, 2.6vw, 40px)',
      lineHeight: 1.05,
      marginTop: 16
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg-muted)',
      marginTop: 16,
      lineHeight: 1.5
    }
  }, d))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    className: "h-display",
    style: {
      fontSize: 'clamp(40px, 6vw, 88px)',
      lineHeight: 1,
      maxWidth: '20ch',
      margin: '0 auto'
    }
  }, "Pronto para come\xE7ar pelo ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "diagn\xF3stico")), "?")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(CTAButton, {
    to: "/contato",
    variant: "accent"
  }, "Agendar"))))));
}
window.ComoTrabalhamosPage = ComoTrabalhamosPage;

// ===================== /planos =====================
function PlanosPage() {
  const features = [['Revenue Management', true, true, true], ['Distribuição & Canais', true, true, true], ['Relatório mensal', true, true, true], ['Central de Reservas', false, true, true], ['Venda ativa & Follow-up', false, true, true], ['Marketing de conteúdo', false, false, true], ['Performance Marketing', false, false, true]];
  const plans = [{
    name: 'Essencial',
    who: 'Hotéis que precisam organizar canais e tarifas.'
  }, {
    name: 'Comercial',
    who: 'Hotéis que precisam melhorar conversão e follow-up.',
    highlight: true
  }, {
    name: 'Completo',
    who: 'Hotéis que desejam terceirizar a operação comercial.'
  }];
  const faq = [['Posso começar pelo Essencial e expandir depois?', 'Sim. A maioria dos hotéis começa pelo Essencial ou Comercial e amplia o escopo a partir do terceiro mês.'], ['Preciso ter equipe interna?', 'Não obrigatoriamente. A Growth pode operar como única estrutura comercial ou integrar-se a uma equipe já existente.'], ['Qual é o tempo mínimo de contrato?', 'Recomendamos um ciclo inicial de 4 meses (30 dias de implantação + 90 dias de gestão) para medir resultado real.'], ['Atendem hotéis de qual porte?', 'Trabalhamos com hotéis e pousadas a partir de 15 UHs. Para porte menor, indicamos formatos consultivos.'], ['Como é feito o reporte?', 'Relatório mensal escrito + reunião de alinhamento. Indicadores acessíveis de forma contínua.']];
  const [openFaq, setOpenFaq] = useState_i(0);
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 'clamp(140px, 18vw, 240px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "PLANOS")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h1", {
    className: "h-display h-1",
    style: {
      marginTop: 32,
      maxWidth: '18ch'
    }
  }, "Tr\xEAs formatos. Escopo modular conforme a ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "maturidade")), " do hotel.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      marginTop: 40,
      maxWidth: '60ch'
    }
  }, "Voc\xEA pode come\xE7ar pelo mais leve e expandir, ou j\xE1 entrar no formato ", /*#__PURE__*/React.createElement("em", {
    className: "serif"
  }, "Completo"), " se busca terceirizar a opera\xE7\xE3o comercial inteira.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'var(--bg-elev-1)'
    },
    className: "plans-table"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      borderBottom: '1px solid var(--border)'
    }
  }), plans.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 32,
      borderBottom: '1px solid var(--border)',
      borderLeft: '1px solid var(--border)',
      background: p.highlight ? 'var(--bg-elev-2)' : 'transparent',
      position: 'relative'
    }
  }, p.highlight && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.14em',
      color: 'var(--accent)',
      padding: '4px 8px',
      borderRadius: 999,
      border: '1px solid var(--accent)'
    }
  }, "POPULAR"), /*#__PURE__*/React.createElement("h3", {
    className: "h-display",
    style: {
      fontSize: 'clamp(28px, 2.4vw, 36px)',
      fontStyle: 'italic'
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 13,
      color: 'var(--fg-muted)',
      lineHeight: 1.5
    }
  }, p.who))), features.map((f, ri) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: ri
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 32px',
      borderBottom: ri === features.length - 1 ? 'none' : '1px solid var(--border)',
      fontSize: 14
    }
  }, f[0]), [f[1], f[2], f[3]].map((v, ci) => /*#__PURE__*/React.createElement("div", {
    key: ci,
    style: {
      padding: '20px 32px',
      borderBottom: ri === features.length - 1 ? 'none' : '1px solid var(--border)',
      borderLeft: '1px solid var(--border)',
      background: plans[ci].highlight ? 'var(--bg-elev-2)' : 'transparent',
      fontSize: 14,
      color: v ? 'var(--accent)' : 'var(--fg-subtle)'
    }
  }, v ? '●' : '—')))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      borderTop: '1px solid var(--border)'
    }
  }), plans.map((p, ci) => /*#__PURE__*/React.createElement("div", {
    key: ci,
    style: {
      padding: 32,
      borderTop: '1px solid var(--border)',
      borderLeft: '1px solid var(--border)',
      background: p.highlight ? 'var(--bg-elev-2)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(CTAButton, {
    to: "/contato",
    variant: p.highlight ? 'accent' : 'ghost'
  }, "Quero o ", p.name))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 32,
      fontSize: 13,
      color: 'var(--fg-subtle)',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.06em'
    }
  }, "VALORES, PRAZOS E RESPONSABILIDADES S\xC3O DEFINIDOS AP\xD3S O DIAGN\xD3STICO INICIAL. ESCOPO AJUST\xC1VEL DURANTE O CONTRATO.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 0.35fr) minmax(0, 0.65fr)',
      gap: 'clamp(40px, 6vw, 80px)'
    },
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "PERGUNTAS FREQUENTES")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h-display h-2",
    style: {
      marginTop: 32
    }
  }, "D\xFAvidas ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "antes de contratar")), "."))), /*#__PURE__*/React.createElement("div", null, faq.map(([q, a], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenFaq(openFaq === i ? -1 : i),
    style: {
      width: '100%',
      textAlign: 'left',
      padding: '28px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: i === faq.length - 1 ? '1px solid var(--border)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "h-display",
    style: {
      fontSize: 'clamp(20px, 1.8vw, 26px)',
      lineHeight: 1.2
    }
  }, q), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontSize: 24,
      transition: 'transform 0.3s',
      transform: openFaq === i ? 'rotate(45deg)' : 'none'
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: openFaq === i ? 200 : 0,
      overflow: 'hidden',
      transition: 'max-height 0.5s var(--ease-out-expo), opacity 0.5s',
      opacity: openFaq === i ? 1 : 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg-muted)',
      fontSize: 15,
      lineHeight: 1.6,
      paddingTop: 8
    }
  }, a))))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 880px) {
          .plans-table { grid-template-columns: 1fr !important; }
          .plans-table > * { border-left: none !important; border-bottom: 1px solid var(--border) !important; }
        }
      `));
}
window.PlanosPage = PlanosPage;

// ===================== /contato =====================
function ContatoPage() {
  const [form, setForm] = useState_i({
    nome: '',
    email: '',
    whatsapp: '',
    hotel: '',
    cidade: '',
    uhs: '',
    foco: [],
    mensagem: ''
  });
  const [submitted, setSubmitted] = useState_i(false);
  const focos = ['Tarifas e distribuição', 'Marketing e conteúdo', 'Performance / mídia paga', 'Central de reservas e atendimento', 'Ainda não sei — quero diagnóstico'];
  function toggle(f) {
    setForm(s => ({
      ...s,
      foco: s.foco.includes(f) ? s.foco.filter(x => x !== f) : [...s.foco, f]
    }));
  }
  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 'clamp(140px, 18vw, 240px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "CONTATO")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h1", {
    className: "h-display h-1",
    style: {
      marginTop: 32,
      maxWidth: '18ch'
    }
  }, "Vamos conversar sobre ", /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "o seu hotel")), ".")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260
  }, /*#__PURE__*/React.createElement("p", {
    className: "lead light",
    style: {
      marginTop: 40,
      maxWidth: '60ch'
    }
  }, "O diagn\xF3stico comercial \xE9 gratuito e dura cerca de 30 minutos. Ap\xF3s a conversa, enviamos uma proposta com escopo, rotina e investimento mensal sugerido.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 0.6fr) minmax(0, 0.4fr)',
      gap: 'clamp(40px, 6vw, 80px)'
    },
    className: "two-col"
  }, /*#__PURE__*/React.createElement(Reveal, null, !submitted ? /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    },
    className: "form-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nome",
    value: form.nome,
    onChange: v => setForm(s => ({
      ...s,
      nome: v
    })),
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "E-mail",
    type: "email",
    value: form.email,
    onChange: v => setForm(s => ({
      ...s,
      email: v
    })),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    },
    className: "form-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "WhatsApp",
    value: form.whatsapp,
    onChange: v => setForm(s => ({
      ...s,
      whatsapp: v
    }))
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Nome do hotel",
    value: form.hotel,
    onChange: v => setForm(s => ({
      ...s,
      hotel: v
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 16
    },
    className: "form-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Cidade / Estado",
    value: form.cidade,
    onChange: v => setForm(s => ({
      ...s,
      cidade: v
    }))
  }), /*#__PURE__*/React.createElement(Field, {
    label: "N\xFAmero de UHs",
    type: "number",
    value: form.uhs,
    onChange: v => setForm(s => ({
      ...s,
      uhs: v
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg-muted)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 16
    }
  }, "O que voc\xEA quer organizar primeiro?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, focos.map(f => {
    const active = form.foco.includes(f);
    return /*#__PURE__*/React.createElement("button", {
      key: f,
      type: "button",
      onClick: () => toggle(f),
      "data-hover": true,
      style: {
        padding: '10px 18px',
        borderRadius: 999,
        fontSize: 13,
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? 'var(--bg)' : 'var(--fg)',
        border: '1px solid ' + (active ? 'var(--accent)' : 'var(--border-strong)'),
        transition: 'all 0.3s'
      }
    }, f);
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Mensagem (opcional)",
    multiline: true,
    value: form.mensagem,
    onChange: v => setForm(s => ({
      ...s,
      mensagem: v
    }))
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-accent",
    style: {
      alignSelf: 'flex-start',
      marginTop: 16
    }
  }, "Solicitar diagn\xF3stico ", /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'clamp(40px, 5vw, 64px)',
      background: 'var(--bg-elev-1)',
      borderRadius: 20,
      border: '1px solid var(--accent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent)',
      letterSpacing: '0.16em'
    }
  }, "SOLICITA\xC7\xC3O RECEBIDA"), /*#__PURE__*/React.createElement("h3", {
    className: "h-display",
    style: {
      fontSize: 'clamp(32px, 4vw, 56px)',
      marginTop: 20,
      lineHeight: 1
    }
  }, "Obrigado, ", form.nome || 'tudo certo', ".", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("i", null, "Retornamos em at\xE9 24h."))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontSize: 15,
      color: 'var(--fg-muted)',
      lineHeight: 1.6
    }
  }, "Confirma\xE7\xE3o enviada para ", form.email || 'seu e-mail', ". Em breve agendamos sua reuni\xE3o de diagn\xF3stico (30 min)."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'clamp(28px, 3vw, 40px)',
      background: 'var(--bg-elev-1)',
      borderRadius: 16,
      border: '1px solid var(--border)',
      position: 'sticky',
      top: 120
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "h-display",
    style: {
      fontSize: 28,
      fontStyle: 'italic'
    }
  }, "Prefere falar agora?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/55",
    "data-hover": true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.16em',
      color: 'var(--fg-muted)'
    }
  }, "WHATSAPP"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "+55 (00) 0000-0000")), /*#__PURE__*/React.createElement("a", {
    href: "mailto:contato@growthhotelsolutions.com",
    "data-hover": true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.16em',
      color: 'var(--fg-muted)'
    }
  }, "E-MAIL"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "contato@growthhotelsolutions.com"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 32,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '0.16em',
      color: 'var(--fg-muted)'
    }
  }, "O QUE VOC\xCA RECEBE"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Confirmação em até 24h.', 'Agendamento de reunião de diagnóstico (30 min).', 'Relatório comercial + proposta de escopo.', 'Sem compromisso de contratação.'].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '32px 1fr',
      gap: 12,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--accent)'
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", null, t)))))))))), /*#__PURE__*/React.createElement("style", null, `
        @media (max-width: 700px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `));
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  multiline = false
}) {
  const [focus, setFocus] = useState_i(false);
  const has = value && value.length > 0;
  const Tag = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 16,
      top: has || focus ? 8 : 18,
      fontSize: has || focus ? 10 : 14,
      fontFamily: has || focus ? 'var(--font-mono)' : 'var(--font-body)',
      letterSpacing: has || focus ? '0.14em' : '0',
      textTransform: has || focus ? 'uppercase' : 'none',
      color: focus ? 'var(--accent)' : 'var(--fg-muted)',
      transition: 'all 0.25s var(--ease-out-cubic)',
      pointerEvents: 'none'
    }
  }, label, required && '*'), /*#__PURE__*/React.createElement(Tag, {
    type: type,
    value: value,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    required: required,
    rows: multiline ? 4 : undefined,
    style: {
      width: '100%',
      padding: multiline ? '24px 16px 12px' : '24px 16px 8px',
      fontSize: 15,
      fontFamily: 'var(--font-body)',
      background: 'var(--bg-elev-1)',
      border: '1px solid ' + (focus ? 'var(--accent)' : 'var(--border-strong)'),
      borderRadius: 12,
      color: 'var(--fg)',
      outline: 'none',
      transition: 'border 0.3s',
      resize: multiline ? 'vertical' : 'none',
      minHeight: multiline ? 120 : 'auto'
    }
  }));
}
window.ContatoPage = ContatoPage;

// ===================== /case (estudo de caso) =====================
function CaseCompare({
  beforeChart,
  afterChart
}) {
  const [pos, setPos] = React.useState(50);
  const ref = React.useRef(null);
  const dragging = React.useRef(false);
  const update = clientX => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = (clientX - r.left) / r.width * 100;
    setPos(Math.max(2, Math.min(98, p)));
  };
  React.useEffect(() => {
    const move = e => {
      if (dragging.current) update(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "cmp",
    ref: ref,
    onPointerDown: e => {
      dragging.current = true;
      update(e.clientX);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cmp-panel cmp-after"
  }, afterChart, /*#__PURE__*/React.createElement("span", {
    className: "cmp-tag cmp-tag-r"
  }, "depois")), /*#__PURE__*/React.createElement("div", {
    className: "cmp-panel cmp-before",
    style: {
      clipPath: 'inset(0 ' + (100 - pos) + '% 0 0)'
    }
  }, beforeChart, /*#__PURE__*/React.createElement("span", {
    className: "cmp-tag cmp-tag-l"
  }, "antes")), /*#__PURE__*/React.createElement("div", {
    className: "cmp-divider",
    style: {
      left: pos + '%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cmp-handle",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 7l-5 5 5 5M10 7l5 5-5 5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
}
window.CaseCompare = CaseCompare;
function CaseStudyPage() {
  const {
    navigate
  } = useNav();
  const meta = [['Cliente', 'Hotel Colonial Iguaçu'], ['Tipo de projeto', 'Hotelaria · Operação comercial'], ['Local', 'Foz do Iguaçu, Paraná, Brasil'], ['Ano', '2024']];
  const details = [['Visão geral', 'Assumimos a operação comercial completa do hotel: revenue, distribuição, marketing e atendimento. O objetivo era transformar presença digital em reservas diretas e reduzir a dependência das OTAs.'], ['Frentes', 'Revenue management, distribuição multicanal, performance marketing (Google, Meta, Hotel Ads), conteúdo & redes sociais e central de reservas ativa.'], ['Escopo', 'Diagnóstico comercial, reestruturação tarifária, calendário comercial, campanhas sazonais e acompanhamento mensal de metas.'], ['Resultado', 'Crescimento consistente da receita direta, melhor conversão de cotações em reservas e uma operação comercial previsível, medida e em evolução contínua.']];
  const gallery = [['assets/lobby-recepcao-area-estar-hotel-colonial-iguacu.webp', 'Lobby e recepção'], ['assets/quarto-apartamento-casal-hotel-colonial-iguacu.webp', 'Suíte premium'], ['assets/piscina-ar-livre-espreguicadeiras-hotel-colonial-iguacu.webp', 'Área de piscina']];
  return /*#__PURE__*/React.createElement("main", {
    className: "case-page"
  }, /*#__PURE__*/React.createElement("section", {
    className: "container case-top"
  }, /*#__PURE__*/React.createElement("button", {
    className: "case-back",
    onClick: () => navigate('/'),
    "data-hover": true
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 5l-7 7 7 7",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "voltar"), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h1", {
    className: "case-title"
  }, "hotel colonial igua\xE7u")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-meta"
  }, meta.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "case-meta-cell"
  }, /*#__PURE__*/React.createElement("p", {
    className: "case-meta-k"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "case-meta-v"
  }, v))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-hero"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/entrada-recepcao-fonte-agua-hotel-colonial-iguacu.webp",
    alt: "Entrada principal e recep\xE7\xE3o do Hotel Colonial Igua\xE7u com fonte de \xE1gua",
    loading: "lazy"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "container case-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-details-left"
  }, /*#__PURE__*/React.createElement("p", null, "detalhes do projeto")), /*#__PURE__*/React.createElement("div", {
    className: "case-details-rows"
  }, details.map(([k, v], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: k,
    delay: i * 60
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-row"
  }, /*#__PURE__*/React.createElement("p", {
    className: "case-row-k"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "case-row-v"
  }, v)))))), /*#__PURE__*/React.createElement("section", {
    className: "container case-feature"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "case-feature-fig"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-feature-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/lobby-saguao-area-convivencia-hotel-colonial-iguacu.webp",
    alt: "Lobby e recep\xE7\xE3o do Hotel Colonial Igua\xE7u em opera\xE7\xE3o",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("p", {
    className: "case-cap"
  }, "Equipe comercial Growth em opera\xE7\xE3o")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    className: "case-statement"
  }, "uma opera\xE7\xE3o comercial pensada como uma extens\xE3o do hotel \u2014 onde cada campanha, tarifa e atendimento trabalha para transformar interesse em ", /*#__PURE__*/React.createElement("em", null, "reserva confirmada"), "."))), /*#__PURE__*/React.createElement("section", {
    className: "container case-compare-wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "case-cmp-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "case-cmp-title"
  }, "antes & depois"), /*#__PURE__*/React.createElement("p", {
    className: "case-cmp-sub"
  }, "receita gerada por google ads \u2014 out\u2013dez 2024 vs 2025: R$ 112.347 \u2192 R$ 244.883 (+118%). arraste para comparar."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement(CaseCompare, {
    beforeChart: /*#__PURE__*/React.createElement("svg", {
      className: "cmp-svg",
      viewBox: "0 0 400 240",
      preserveAspectRatio: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "210",
      x2: "380",
      y2: "210",
      stroke: "rgba(16,17,19,0.12)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "150",
      x2: "380",
      y2: "150",
      stroke: "rgba(16,17,19,0.06)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "90",
      x2: "380",
      y2: "90",
      stroke: "rgba(16,17,19,0.06)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "20,210 46,210 71,208 97,205 123,193 149,190 174,185 200,181 226,179 251,166 277,163 303,153 329,144 354,127 380,127",
      fill: "none",
      stroke: "#9DA0A5",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "380",
      cy: "127",
      r: "5",
      fill: "#9DA0A5"
    })),
    afterChart: /*#__PURE__*/React.createElement("svg", {
      className: "cmp-svg",
      viewBox: "0 0 400 240",
      preserveAspectRatio: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "210",
      x2: "380",
      y2: "210",
      stroke: "rgba(16,17,19,0.12)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "150",
      x2: "380",
      y2: "150",
      stroke: "rgba(16,17,19,0.06)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "90",
      x2: "380",
      y2: "90",
      stroke: "rgba(16,17,19,0.06)",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "20,210 46,206 71,194 97,190 123,186 149,168 174,159 200,143 226,119 251,97 277,85 303,72 329,40 354,32 380,30",
      fill: "none",
      stroke: "#F95738",
      strokeWidth: "3.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "380",
      cy: "30",
      r: "6",
      fill: "#F95738"
    }))
  }))), /*#__PURE__*/React.createElement("section", {
    className: "container case-compare-wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "case-cmp-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "case-cmp-title"
  }, "fotografia profissional"), /*#__PURE__*/React.createElement("p", {
    className: "case-cmp-sub"
  }, "do material amador \xE0 imagem que vende \u2014 arraste para comparar."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement(CaseCompare, {
    beforeChart: /*#__PURE__*/React.createElement("img", {
      className: "cmp-img",
      style: {
        filter: 'grayscale(0.55) brightness(0.82) contrast(0.9)'
      },
      src: "assets/restaurante-salao-cafe-da-manha-hotel-colonial-iguacu.webp",
      alt: "Antes — foto amadora do restaurante e caf\xE9 da manh\xE3 do Hotel Colonial Igua\xE7u"
    }),
    afterChart: /*#__PURE__*/React.createElement("img", {
      className: "cmp-img",
      src: "assets/cafe-da-manha-buffet-gastronomia-hotel-colonial-iguacu.webp",
      alt: "Depois — caf\xE9 da manh\xE3 buffet do Hotel Colonial Igua\xE7u em fotografia profissional"
    })
  }))), /*#__PURE__*/React.createElement("section", {
    className: "container case-compare-wrap"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "case-cmp-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "case-cmp-title"
  }, "novo site"), /*#__PURE__*/React.createElement("p", {
    className: "case-cmp-sub"
  }, "do site antigo ao novo \u2014 arraste para comparar."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement(CaseCompare, {
    beforeChart: /*#__PURE__*/React.createElement("img", {
      className: "cmp-img",
      style: {
        filter: 'grayscale(0.6) brightness(0.86) sepia(0.22)'
      },
      src: "assets/site-antigo-hotel-colonial-iguacu.webp",
      alt: "Antes — site antigo do Hotel Colonial Igua\xE7u"
    }),
    afterChart: /*#__PURE__*/React.createElement("img", {
      className: "cmp-img",
      src: "assets/site-novo-meritum-hoteis-foz-do-iguacu.webp",
      alt: "Depois — novo site do M\xE9ritum Hot\xE9is em Foz do Igua\xE7u"
    })
  }))), /*#__PURE__*/React.createElement("section", {
    className: "container case-gallery-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-gallery"
  }, gallery.map(([src, cap], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 80,
    className: "case-gfig"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-gimg"
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: cap,
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("p", {
    className: "case-cap"
  }, cap))))), /*#__PURE__*/React.createElement("style", null, `
        .case-page{padding-top:clamp(96px,11vw,150px);padding-bottom:clamp(60px,8vw,110px);}
        .case-page section{padding-top:0!important;padding-bottom:0!important;}
        .case-top{display:flex;flex-direction:column;padding-bottom:clamp(20px,2.5vw,34px);}
        .case-back{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:14px;letter-spacing:-0.02em;color:var(--fg-muted);text-transform:lowercase;margin-bottom:clamp(24px,3vw,40px);transition:color .3s var(--ease-out-cubic);}
        .case-back:hover{color:#F95738;}
        .case-back svg{width:18px;height:18px;}
        .case-title{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:300;font-size:clamp(40px,6vw,96px);line-height:0.95;letter-spacing:-0.045em;color:var(--fg);text-transform:lowercase;margin-bottom:clamp(28px,3.5vw,52px);}
        .case-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(20px,2.5vw,40px);border-top:1px solid var(--border);padding-top:clamp(16px,2vw,26px);margin-bottom:clamp(28px,3.5vw,52px);}
        .case-meta-k{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:-0.01em;color:var(--fg-subtle);text-transform:lowercase;margin-bottom:6px;}
        .case-meta-v{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(14px,1.05vw,16px);letter-spacing:-0.02em;color:var(--fg);}
        .case-hero{border-radius:clamp(20px,3vw,40px);overflow:hidden;border:1px solid var(--border);background:var(--bg-elev-1);aspect-ratio:2/1;}
        .case-hero img{width:100%;height:100%;object-fit:cover;display:block;}
        .case-details{display:grid;grid-template-columns:0.26fr 0.74fr;gap:clamp(24px,3vw,56px);margin-top:clamp(20px,2.5vw,36px);}
        .case-details-left p{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(18px,1.6vw,22px);letter-spacing:-0.03em;color:var(--fg);text-transform:lowercase;}
        .case-row{display:grid;grid-template-columns:0.3fr 0.7fr;gap:clamp(16px,2vw,40px);border-top:1px solid var(--border);padding:clamp(20px,2.4vw,34px) 0;}
        .case-row-k{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(16px,1.2vw,19px);letter-spacing:-0.03em;color:var(--fg);text-transform:lowercase;}
        .case-row-v{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(15px,1.05vw,17px);line-height:1.55;letter-spacing:-0.02em;color:var(--fg-muted);}
        .case-feature{display:grid;grid-template-columns:0.8fr 1fr;gap:clamp(32px,4vw,80px);align-items:start;margin-top:clamp(40px,5vw,72px);}
        .case-feature-img{border-radius:clamp(18px,2.4vw,32px);overflow:hidden;border:1px solid var(--border);background:var(--bg-elev-1);aspect-ratio:3/2;}
        .case-feature-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s var(--ease-out-expo);}
        .case-feature-img:hover img{transform:scale(1.04);}
        .case-cap{margin-top:12px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:-0.01em;color:var(--fg-subtle);text-transform:lowercase;}
        .case-statement{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:300;font-size:clamp(22px,2.6vw,40px);line-height:1.15;letter-spacing:-0.03em;color:var(--fg);text-transform:lowercase;}
        .case-statement em{font-style:normal;color:#F95738;}
        .case-gallery-wrap{margin-top:clamp(40px,5vw,68px);}
        .case-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,1.8vw,28px);}
        .case-gimg{border-radius:clamp(16px,2vw,28px);overflow:hidden;border:1px solid var(--border);background:var(--bg-elev-1);aspect-ratio:3/2;}
        .case-gimg img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s var(--ease-out-expo);}
        .case-gfig:hover .case-gimg img{transform:scale(1.05);}
        .case-cta-wrap{margin-top:clamp(40px,5vw,72px);}
        .case-cta{background:var(--bg-elev-1);border-radius:clamp(28px,3vw,44px);padding:clamp(48px,7vw,110px) clamp(28px,4vw,64px);text-align:center;display:flex;flex-direction:column;align-items:center;}
        .case-cta-title{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:300;font-size:clamp(36px,5.5vw,84px);line-height:0.95;letter-spacing:-0.045em;color:var(--fg);text-transform:lowercase;}
        .case-cta-sub{margin-top:clamp(18px,2vw,28px);max-width:46ch;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(15px,1.2vw,18px);line-height:1.5;letter-spacing:-0.02em;color:var(--fg-muted);text-transform:lowercase;}
        .case-cta-btn{margin-top:clamp(28px,3.5vw,44px);display:inline-flex;align-items:center;gap:12px;background:#F95738;color:var(--on-accent);border-radius:999px;padding:18px 34px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(15px,1.2vw,18px);letter-spacing:-0.02em;transition:background .4s var(--ease-out-cubic),color .4s var(--ease-out-cubic);}
        .case-cta-btn:hover{background:var(--fg);color:var(--on-dark);}
        .case-cta-arrow{position:relative;width:16px;height:16px;flex-shrink:0;overflow:hidden;line-height:0;}
        .case-cta-arrow .icon-out,.case-cta-arrow .icon-in{display:block;width:100%;height:100%;transition:transform .6s var(--ease-out-expo);line-height:0;}
        .case-cta-arrow .icon-out{transform:translate(0,0);}
        .case-cta-arrow .icon-in{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) translate(-220%,220%);}
        .case-cta-btn:hover .case-cta-arrow .icon-out{transform:translate(220%,-220%);}
        .case-cta-btn:hover .case-cta-arrow .icon-in{transform:translate(-50%,-50%) translate(0,0);}
        .case-cta-arrow svg{display:block;width:100%;height:100%;}
        .case-compare-wrap{margin-top:clamp(36px,4.5vw,64px);}
        .case-cmp-head{margin-bottom:clamp(20px,2.5vw,36px);}
        .case-cmp-title{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:300;font-size:clamp(28px,4vw,56px);line-height:1;letter-spacing:-0.045em;color:var(--fg);text-transform:lowercase;}
        .case-cmp-sub{margin-top:10px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(14px,1.05vw,16px);letter-spacing:-0.02em;color:var(--fg-muted);text-transform:lowercase;}
        .cmp{position:relative;width:100%;aspect-ratio:16/8;border-radius:clamp(18px,2.4vw,32px);overflow:hidden;border:1px solid var(--border);background:var(--bg-elev-1);touch-action:none;cursor:ew-resize;user-select:none;}
        .cmp-panel{position:absolute;inset:0;display:block;}
        .cmp-svg{position:absolute;inset:0;width:100%;height:100%;}
        .cmp-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
        .cmp-tag{position:absolute;bottom:16px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:12px;letter-spacing:0.02em;text-transform:lowercase;padding:6px 12px;border-radius:999px;}
        .cmp-tag-l{left:16px;background:rgba(16,17,19,0.08);color:var(--fg);}
        .cmp-tag-r{right:16px;background:#F95738;color:var(--on-accent);}
        .cmp-divider{position:absolute;top:0;bottom:0;width:2px;background:#fff;transform:translateX(-1px);box-shadow:0 0 0 1px rgba(16,17,19,0.12);}
        .cmp-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:#fff;color:var(--fg);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px -8px rgba(16,17,19,0.4);}
        .cmp-handle svg{width:22px;height:22px;}
        @media(max-width:900px){
          .case-meta{grid-template-columns:repeat(2,1fr);}
          .case-details{grid-template-columns:1fr;}
          .case-feature{grid-template-columns:1fr;}
          .case-row{grid-template-columns:1fr;gap:8px;}
          .case-gallery{grid-template-columns:1fr;}
        }
      `));
}
window.CaseStudyPage = CaseStudyPage;

// ===================== /blog =====================
function BlogPage() {
  const {
    navigate
  } = useNav();
  const cats = ['todos', 'dicas', 'cases', 'mercado'];
  const [cat, setCat] = React.useState('todos');
  const posts = [{
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    title: 'como reduzir a dependência das otas e vender mais direto',
    cat: 'dicas',
    date: '12 mai 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    title: '5 erros de revenue management que custam reservas',
    cat: 'dicas',
    date: '28 abr 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
    title: 'case: +40% de receita direta em 6 meses',
    cat: 'cases',
    date: '15 abr 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80&auto=format&fit=crop',
    title: 'google hotel ads: vale a pena para o seu hotel?',
    cat: 'mercado',
    date: '02 abr 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop',
    title: 'o que medir na operação comercial do hotel',
    cat: 'dicas',
    date: '20 mar 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop',
    title: 'tendências de marketing hoteleiro para 2025',
    cat: 'mercado',
    date: '06 mar 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&auto=format&fit=crop',
    title: 'como estruturar um calendário comercial sazonal',
    cat: 'dicas',
    date: '18 fev 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80&auto=format&fit=crop',
    title: 'central de reservas: de cotação a reserva confirmada',
    cat: 'cases',
    date: '04 fev 2025'
  }, {
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80&auto=format&fit=crop',
    title: 'distribuição multicanal sem perder margem',
    cat: 'mercado',
    date: '21 jan 2025'
  }];
  const shown = cat === 'todos' ? posts : posts.filter(p => p.cat === cat);
  return /*#__PURE__*/React.createElement("main", {
    className: "blog-page"
  }, /*#__PURE__*/React.createElement("section", {
    className: "container blog-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "blog-head"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "blog-title"
  }, "blog"), /*#__PURE__*/React.createElement("div", {
    className: "blog-cats"
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: "blog-cat " + (cat === c ? "active" : ""),
    onClick: () => setCat(c),
    "data-hover": true
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "blog-grid"
  }, shown.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.title,
    delay: i % 3 * 70,
    className: "blog-card",
    onClick: () => navigate('/post'),
    "data-hover": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "blog-card-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "blog-card-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "blog-card-title"
  }, p.title), /*#__PURE__*/React.createElement("div", {
    className: "blog-card-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "blog-card-cat"
  }, p.cat), /*#__PURE__*/React.createElement("span", {
    className: "blog-card-date"
  }, p.date), /*#__PURE__*/React.createElement("span", {
    className: "blog-card-arrow"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 17 L17 7 M9 7 H17 V15",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))))))), /*#__PURE__*/React.createElement("style", null, `
        .blog-page{padding-top:clamp(96px,11vw,150px);padding-bottom:clamp(60px,8vw,110px);}
        .blog-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:clamp(16px,2vw,32px);border-bottom:1px solid var(--border);padding-bottom:clamp(20px,2.5vw,34px);margin-bottom:clamp(32px,4vw,56px);}
        .blog-title{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:300;font-size:clamp(40px,6vw,96px);line-height:0.95;letter-spacing:-0.045em;color:var(--fg);text-transform:lowercase;}
        .blog-cats{display:flex;flex-wrap:wrap;gap:clamp(16px,2vw,28px);}
        .blog-cat{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(14px,1.1vw,16px);letter-spacing:-0.02em;color:var(--fg-muted);text-transform:lowercase;position:relative;transition:color .3s var(--ease-out-cubic);}
        .blog-cat::after{content:"";position:absolute;left:0;right:0;bottom:-4px;height:1.5px;background:#F95738;transform:scaleX(0);transform-origin:left center;transition:transform .4s var(--ease-out-cubic);}
        .blog-cat:hover{color:var(--fg);}
        .blog-cat.active{color:#F95738;}
        .blog-cat.active::after{transform:scaleX(1);}
        .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,3vw,48px) clamp(20px,2.4vw,36px);}
        .blog-card{cursor:none;}
        .blog-card-img{border-radius:clamp(14px,1.8vw,22px);overflow:hidden;border:1px solid var(--border);background:var(--bg-elev-1);aspect-ratio:16/10;margin-bottom:clamp(14px,1.6vw,20px);}
        .blog-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s var(--ease-out-expo);}
        .blog-card:hover .blog-card-img img{transform:scale(1.05);}
        .blog-card-title{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(17px,1.4vw,21px);line-height:1.2;letter-spacing:-0.03em;color:var(--fg);text-transform:lowercase;transition:color .3s var(--ease-out-cubic);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.4em;}
        .blog-card:hover .blog-card-title{color:#F95738;}
        .blog-card-meta{display:flex;align-items:center;gap:14px;margin-top:clamp(12px,1.4vw,18px);padding-top:clamp(10px,1.2vw,14px);border-top:1px solid var(--border);font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:13px;letter-spacing:-0.01em;color:var(--fg-muted);text-transform:lowercase;}
        .blog-card-cat{color:#F95738;}
        .blog-card-date{color:var(--fg-subtle);}
        .blog-card-arrow{margin-left:auto;width:16px;height:16px;color:var(--fg);transition:transform .45s var(--ease-out-expo);}
        .blog-card-arrow svg{width:100%;height:100%;}
        .blog-card:hover .blog-card-arrow{transform:translate(3px,-3px);color:#F95738;}
        @media(max-width:900px){.blog-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:600px){.blog-grid{grid-template-columns:1fr;}}
      `));
}
window.BlogPage = BlogPage;

// ===================== /post (artigo) =====================
function ArticlePage() {
  const {
    navigate
  } = useNav();
  const [copied, setCopied] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", {
    className: "post-page"
  }, /*#__PURE__*/React.createElement("article", {
    className: "container post-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "post-back",
    onClick: () => navigate('/blog'),
    "data-hover": true
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 5l-7 7 7 7",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "blog"), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "post-cat"
  }, "cases"), /*#__PURE__*/React.createElement("p", {
    className: "post-date"
  }, "12 mai 2025"), /*#__PURE__*/React.createElement("h1", {
    className: "post-title"
  }, "como reduzir a depend\xEAncia das otas e vender mais direto"), /*#__PURE__*/React.createElement("div", {
    className: "post-share"
  }, /*#__PURE__*/React.createElement("button", {
    className: "post-share-btn",
    "data-hover": true,
    onClick: () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 12h8M12 8v8",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    strokeWidth: "1.6"
  })), copied ? 'link copiado' : 'compartilhar'))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-hero"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=80&auto=format&fit=crop",
    alt: "Hotel Colonial Igua\xE7u",
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 60
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-body"
  }, /*#__PURE__*/React.createElement("p", null, "Durante anos, muitos hot\xE9is constru\xEDram sua ocupa\xE7\xE3o quase inteiramente sobre as OTAs. \xC9 um caminho r\xE1pido para preencher quartos \u2014 mas caro: a cada reserva, parte relevante da di\xE1ria volta para a plataforma em comiss\xF5es, e o relacionamento com o h\xF3spede fica do lado de fora."), /*#__PURE__*/React.createElement("p", null, "Reduzir essa depend\xEAncia n\xE3o significa abandonar os canais de distribui\xE7\xE3o. Significa reequilibrar a opera\xE7\xE3o: usar as OTAs como vitrine e transformar parte dessa demanda em ", /*#__PURE__*/React.createElement("em", null, "reservas diretas"), ", onde a margem e o relacionamento ficam com o hotel."), /*#__PURE__*/React.createElement("h2", null, "o ponto de partida \xE9 o diagn\xF3stico"), /*#__PURE__*/React.createElement("p", null, "Antes de investir em m\xEDdia ou redesenhar o site, \xE9 preciso entender de onde v\xEAm as reservas, qual o custo real de cada canal e onde est\xE1 a receita que n\xE3o est\xE1 sendo capturada. Esse mapa orienta todas as decis\xF5es seguintes."), /*#__PURE__*/React.createElement("h2", null, "tr\xEAs frentes que movem o ponteiro"), /*#__PURE__*/React.createElement("p", null, "Revenue management consistente, um site r\xE1pido e otimizado para convers\xE3o, e campanhas de performance conectadas ao calend\xE1rio comercial. Juntas, essas frentes criam um fluxo previs\xEDvel de reservas diretas \u2014 medido, ajustado e crescente m\xEAs a m\xEAs."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-duo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-duo-img post-duo-tall"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1100&q=80&auto=format&fit=crop",
    alt: "Su\xEDte",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "post-duo-img post-duo-wide"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1100&q=80&auto=format&fit=crop",
    alt: "Piscina",
    loading: "lazy"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "post-nav"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "post-nav-link",
    onClick: e => {
      e.preventDefault();
      navigate('/blog');
    },
    "data-hover": true
  }, /*#__PURE__*/React.createElement("span", {
    className: "post-nav-ar"
  }, "\u2190"), /*#__PURE__*/React.createElement("span", null, "artigo anterior")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "post-nav-link post-nav-next",
    onClick: e => {
      e.preventDefault();
      navigate('/blog');
    },
    "data-hover": true
  }, /*#__PURE__*/React.createElement("span", null, "pr\xF3ximo artigo"), /*#__PURE__*/React.createElement("span", {
    className: "post-nav-ar"
  }, "\u2192")))), /*#__PURE__*/React.createElement("style", null, `
        .post-page{padding-top:clamp(96px,11vw,150px);padding-bottom:clamp(60px,8vw,110px);}
        .post-wrap{max-width:920px;margin:0 auto;}
        .post-back{display:inline-flex;align-items:center;gap:8px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:14px;letter-spacing:-0.02em;color:var(--fg-muted);text-transform:lowercase;margin-bottom:clamp(28px,3.5vw,48px);transition:color .3s var(--ease-out-cubic);}
        .post-back:hover{color:#F95738;}
        .post-back svg{width:18px;height:18px;}
        .post-cat{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:13px;letter-spacing:0.02em;color:#F95738;text-transform:lowercase;margin-bottom:10px;}
        .post-date{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:13px;letter-spacing:-0.01em;color:var(--fg-subtle);text-transform:lowercase;margin-bottom:clamp(16px,2vw,26px);}
        .post-title{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:300;font-size:clamp(34px,5vw,72px);line-height:1.0;letter-spacing:-0.045em;color:var(--fg);text-transform:lowercase;}
        .post-share{margin-top:clamp(22px,2.6vw,34px);padding-bottom:clamp(28px,3.5vw,46px);border-bottom:1px solid var(--border);}
        .post-share-btn{display:inline-flex;align-items:center;gap:10px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:14px;letter-spacing:-0.02em;color:var(--fg);text-transform:lowercase;transition:color .3s var(--ease-out-cubic);}
        .post-share-btn:hover{color:#F95738;}
        .post-share-btn svg{width:20px;height:20px;}
        .post-hero{margin-top:clamp(32px,4vw,56px);border-radius:clamp(18px,2.4vw,32px);overflow:hidden;border:1px solid var(--border);background:var(--bg-elev-1);aspect-ratio:16/9;}
        .post-hero img{width:100%;height:100%;object-fit:cover;display:block;}
        .post-body{margin-top:clamp(36px,4.5vw,64px);}
        .post-body p{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(16px,1.25vw,19px);line-height:1.65;letter-spacing:-0.02em;color:var(--fg);margin-bottom:clamp(18px,2vw,26px);}
        .post-body em{font-style:normal;color:#F95738;}
        .post-body h2{font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(22px,2.4vw,32px);line-height:1.1;letter-spacing:-0.04em;color:var(--fg);text-transform:lowercase;margin:clamp(28px,3.5vw,48px) 0 clamp(12px,1.4vw,18px);}
        .post-duo{margin-top:clamp(36px,4.5vw,64px);display:grid;grid-template-columns:0.9fr 1.1fr;gap:clamp(16px,2vw,28px);align-items:stretch;}
        .post-duo-img{border-radius:clamp(16px,2vw,26px);overflow:hidden;border:1px solid var(--border);background:var(--bg-elev-1);}
        .post-duo-tall{aspect-ratio:3/4;}
        .post-duo-wide{aspect-ratio:4/3;align-self:center;}
        .post-duo-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .post-nav{margin-top:clamp(48px,6vw,90px);padding-top:clamp(24px,3vw,38px);border-top:1px solid var(--border);display:flex;justify-content:space-between;gap:16px;}
        .post-nav-link{display:inline-flex;align-items:center;gap:10px;font-family:"HelveticaNeueCyr","Inter","Helvetica Neue",Helvetica,Arial,sans-serif;font-weight:400;font-size:clamp(14px,1.1vw,16px);letter-spacing:-0.02em;color:var(--fg-muted);text-transform:lowercase;transition:color .3s var(--ease-out-cubic);}
        .post-nav-link:hover{color:#F95738;}
        .post-nav-ar{color:#F95738;}
        @media(max-width:700px){.post-duo{grid-template-columns:1fr;}}
      `));
}
window.ArticlePage = ArticlePage;

/* ===== source block 5 ===== */
/* global React, ReactDOM, Header, Footer, HomePage, ServicosPage, PilarRevenue, PilarConteudo, PilarPerformance, PilarReservas, ComoTrabalhamosPage, PlanosPage, ContatoPage, NavContext, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle */
const {
  useState: useStateA,
  useEffect: useEffectA,
  useRef: useRefA
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "ink",
  "bg": "snow",
  "grain": true,
  "cursor": true
} /*EDITMODE-END*/;

// Full palette definitions — each rewrites the whole CSS-var set
const PALETTES = {
  original: {
    label: 'Navy/Gold',
    vars: {
      '--bg': '#F4EFEA',
      '--bg-elev-1': '#EAE3DA',
      '--bg-elev-2': '#0D1B2A',
      '--bg-deep': '#1E3A5F',
      '--fg': '#0D1B2A',
      '--fg-muted': '#5A6877',
      '--fg-subtle': '#A0A8B0',
      '--accent': '#D4AF37',
      '--accent-deep': '#A38628',
      '--on-accent': '#0D1B2A',
      '--on-dark': '#F4EFEA',
      '--border': 'rgba(13, 27, 42, 0.10)',
      '--border-strong': 'rgba(13, 27, 42, 0.20)'
    }
  },
  ink: {
    label: 'Coral',
    vars: {
      '--bg': '#FAFAF7',
      '--bg-elev-1': '#F1EFEA',
      '--bg-elev-2': '#101113',
      '--bg-deep': '#1E2024',
      '--fg': '#101113',
      '--fg-muted': '#5E6166',
      '--fg-subtle': '#9DA0A5',
      '--accent': '#FF4D2E',
      '--accent-deep': '#D63516',
      '--on-accent': '#FFFFFF',
      '--on-dark': '#FAFAF7',
      '--border': 'rgba(16, 17, 19, 0.10)',
      '--border-strong': 'rgba(16, 17, 19, 0.20)'
    }
  },
  growth: {
    label: 'Green',
    vars: {
      '--bg': '#EFF1EC',
      '--bg-elev-1': '#E3E7DF',
      '--bg-elev-2': '#102A1E',
      '--bg-deep': '#1F3D2F',
      '--fg': '#0F1E16',
      '--fg-muted': '#56635A',
      '--fg-subtle': '#97A39A',
      '--accent': '#16A34A',
      '--accent-deep': '#0F7A37',
      '--on-accent': '#FFFFFF',
      '--on-dark': '#EFF1EC',
      '--border': 'rgba(15, 30, 22, 0.10)',
      '--border-strong': 'rgba(15, 30, 22, 0.20)'
    }
  },
  dark: {
    label: 'Dark',
    vars: {
      '--bg': '#0D1B2A',
      '--bg-elev-1': '#122538',
      '--bg-elev-2': '#1E3A5F',
      '--bg-deep': '#1E3A5F',
      '--fg': '#F5F5F2',
      '--fg-muted': '#A8B4C2',
      '--fg-subtle': '#5A6877',
      '--accent': '#F59E0B',
      '--accent-deep': '#C77F08',
      '--on-accent': '#0D1B2A',
      '--on-dark': '#F5F5F2',
      '--border': 'rgba(245, 245, 242, 0.10)',
      '--border-strong': 'rgba(245, 245, 242, 0.20)'
    }
  }
};
function App() {
  const [route, setRoute] = useStateA('/');
  const [transitioning, setTransitioning] = useStateA(false);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette via CSS vars
  useEffectA(() => {
    const p = PALETTES[t.palette] || PALETTES.original;
    const root = document.documentElement;
    Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    // Background variant overrides surface tones (skip on dark palette)
    if (t.palette !== 'dark') {
      const b = BACKGROUNDS[t.bg] || BACKGROUNDS.warm;
      Object.entries(b.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    }
    document.body.style.cursor = t.cursor ? 'none' : 'auto';
    const cursorEl = document.getElementById('cursor');
    if (cursorEl) cursorEl.style.display = t.cursor ? 'block' : 'none';
  }, [t.palette, t.bg, t.cursor]);
  useEffectA(() => {
    // Toggle grain
    const styleId = '__grain-off';
    let s = document.getElementById(styleId);
    if (!t.grain) {
      if (!s) {
        s = document.createElement('style');
        s.id = styleId;
        s.textContent = 'body::after { display: none !important; }';
        document.head.appendChild(s);
      }
    } else if (s) s.remove();
  }, [t.grain]);
  useEffectA(() => {
    // Italic display toggle (legacy — display emphasis stays upright by default)
    return;
  }, []);
  function navigate(to) {
    if (to === route) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    setTransitioning(true);
    window.runCurtain(() => {
      setRoute(to);
      window.scrollTo(0, 0);
      setTimeout(() => setTransitioning(false), 100);
    });
  }

  // Scroll progress bar
  const [scrollPct, setScrollPct] = useStateA(0);
  useEffectA(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, [route]);
  let Page;
  switch (route) {
    case '/':
      Page = HomePage;
      break;
    case '/servicos':
      Page = ServicosPage;
      break;
    case '/servicos/revenue-distribuicao':
      Page = PilarRevenue;
      break;
    case '/servicos/conteudo-redes':
      Page = PilarConteudo;
      break;
    case '/servicos/performance-marketing':
      Page = PilarPerformance;
      break;
    case '/servicos/central-reservas':
      Page = PilarReservas;
      break;
    case '/como-trabalhamos':
      Page = ComoTrabalhamosPage;
      break;
    case '/planos':
      Page = PlanosPage;
      break;
    case '/contato':
      Page = ContatoPage;
      break;
    case '/case':
      Page = CaseStudyPage;
      break;
    case '/blog':
      Page = BlogPage;
      break;
    case '/post':
      Page = ArticlePage;
      break;
    default:
      Page = HomePage;
  }
  return /*#__PURE__*/React.createElement(NavContext.Provider, {
    value: {
      route,
      navigate
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: 2,
      background: 'var(--accent)',
      width: scrollPct * 100 + '%',
      zIndex: 200,
      transition: 'width 0.1s linear'
    }
  }), /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", {
    key: route
  }, /*#__PURE__*/React.createElement(Page, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Paleta de cores"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Palette",
    value: t.palette,
    onChange: v => setTweak('palette', v),
    options: [{
      value: 'original',
      label: 'Navy/Gold'
    }, {
      value: 'ink',
      label: 'Coral'
    }, {
      value: 'growth',
      label: 'Green'
    }, {
      value: 'dark',
      label: 'Dark'
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Fundo"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Background",
    value: t.bg,
    onChange: v => setTweak('bg', v),
    options: [{
      value: 'warm',
      label: 'Warm'
    }, {
      value: 'snow',
      label: 'Snow'
    }, {
      value: 'mist',
      label: 'Mist'
    }, {
      value: 'clay',
      label: 'Clay'
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Visual style"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Film grain",
    value: t.grain,
    onChange: v => setTweak('grain', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Custom cursor",
    value: t.cursor,
    onChange: v => setTweak('cursor', v)
  })));
}

// Background variants (light palettes only) — swap the paper/surface tones
const BACKGROUNDS = {
  warm: {
    label: 'Warm',
    vars: {
      '--bg': '#F0EBE3',
      '--bg-elev-1': '#E7E0D5',
      '--on-dark': '#F0EBE3',
      '--border': 'rgba(13,27,42,0.10)',
      '--border-strong': 'rgba(13,27,42,0.20)'
    }
  },
  snow: {
    label: 'Snow',
    vars: {
      '--bg': '#FFFFFF',
      '--bg-elev-1': '#F6F6F6',
      '--on-dark': '#FFFFFF',
      '--border': 'rgba(13,27,42,0.09)',
      '--border-strong': 'rgba(13,27,42,0.18)'
    }
  },
  mist: {
    label: 'Mist',
    vars: {
      '--bg': '#ECEDEF',
      '--bg-elev-1': '#E2E4E8',
      '--on-dark': '#ECEDEF',
      '--border': 'rgba(13,27,42,0.10)',
      '--border-strong': 'rgba(13,27,42,0.18)'
    }
  },
  clay: {
    label: 'Clay',
    vars: {
      '--bg': '#EDE6DD',
      '--bg-elev-1': '#E2D9CC',
      '--on-dark': '#EDE6DD',
      '--border': 'rgba(13,27,42,0.11)',
      '--border-strong': 'rgba(13,27,42,0.20)'
    }
  }
};

// Helper: darken a hex color
function darken(hex, amount) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const dr = Math.max(0, Math.round(r * (1 - amount)));
  const dg = Math.max(0, Math.round(g * (1 - amount)));
  const db = Math.max(0, Math.round(b * (1 - amount)));
  return '#' + [dr, dg, db].map(x => x.toString(16).padStart(2, '0')).join('');
}

// Mount once loader finishes
function mount() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(/*#__PURE__*/React.createElement(App, null));
}

// Wait for app:ready event from loader, then mount
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mount();
} else {
  document.addEventListener('DOMContentLoaded', mount);
}
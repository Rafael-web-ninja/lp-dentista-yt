import React, { useState } from 'react';
import { HARMONY_PROTOCOLS, HarmonyProtocol } from '../data/clinicData';
import { Sliders, Eye, ArrowUpRight, Sparkles } from 'lucide-react';

interface BeforeAfterSimulatorProps {
  onOpenBooking: (defaultTreatment?: string) => void;
}

export const BeforeAfterSimulator: React.FC<BeforeAfterSimulatorProps> = ({
  onOpenBooking,
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<HarmonyProtocol>(
    HARMONY_PROTOCOLS[0]
  );
  const [sliderPos, setSliderPos] = useState<number>(54);
  const [showDSDGuides, setShowDSDGuides] = useState<boolean>(true);

  const renderDentalArchSVG = (mode: 'before' | 'after', protocol: HarmonyProtocol) => {
    const isBefore = mode === 'before';
    const toothFill = isBefore ? protocol.shadeBefore : protocol.shadeAfter;
    const diastemaGap =
      isBefore && protocol.incisalEdgeCurve === 'diastema' ? 7 : 0;
    const lateralRotation =
      isBefore && protocol.incisalEdgeCurve === 'worn' ? 5 : 0;
    const centralHeight =
      isBefore && protocol.incisalEdgeCurve === 'flat' ? 68 : isBefore ? 72 : 82;

    return (
      <svg
        viewBox="0 0 640 360"
        className="w-full h-full select-none"
        aria-label={
          isBefore
            ? `Condição anatômica inicial: ${protocol.title}`
            : `Planejamento digital reabilitador: ${protocol.title}`
        }
      >
        <defs>
          <linearGradient id={`gingiva-${mode}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97C7A" />
            <stop offset="100%" stopColor="#E69593" />
          </linearGradient>

          <linearGradient id={`enamel-${mode}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={toothFill} />
            <stop offset="78%" stopColor={toothFill} />
            <stop
              offset="100%"
              stopColor={isBefore ? '#D8CEB8' : '#E5E7EB'}
            />
          </linearGradient>

          <linearGradient id={`lipFrame-${mode}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B2594B" />
            <stop offset="50%" stopColor="#9E4739" />
            <stop offset="100%" stopColor="#7D3226" />
          </linearGradient>
        </defs>

        {/* Studio Soft Background */}
        <rect
          width="640"
          height="360"
          fill={isBefore ? '#E8E6E1' : '#141414'}
        />

        {/* Oral Cavity Interior Backdrop */}
        <path
          d="M80,175 Q320,85 560,175 Q520,285 320,295 Q120,285 80,175 Z"
          fill="#260E0C"
        />

        {/* Gingival Architecture (Upper Gum Scallop) */}
        <path
          d="M95,165 Q320,90 545,165 L535,120 Q320,65 105,120 Z"
          fill={`url(#gingiva-${mode})`}
        />

        {/* UPPER DENTAL ARCH: 8 Anterior/Premolar Visible Teeth */}
        <g>
          {/* Left First Premolar (14) */}
          <path
            d="M128,148 C134,132 156,132 162,148 L160,196 C152,204 136,202 130,192 Z"
            fill={`url(#enamel-${mode})`}
            stroke="#C7C2B8"
            strokeWidth="1.2"
          />

          {/* Left Canine (13) */}
          <path
            d={`M162,142 C170,122 198,122 204,142 L202,${
              isBefore ? 204 : 212
            } Q182,${isBefore ? 208 : 220} 162,198 Z`}
            fill={`url(#enamel-${mode})`}
            stroke="#C7C2B8"
            strokeWidth="1.2"
          />

          {/* Left Lateral Incisor (12) */}
          <g
            transform={`rotate(${lateralRotation} 232 175)`}
          >
            <path
              d={`M205,138 C214,120 248,120 256,138 L254,${
                isBefore ? 205 : 215
              } C242,${isBefore ? 208 : 220} 216,${
                isBefore ? 208 : 218
              } 205,204 Z`}
              fill={`url(#enamel-${mode})`}
              stroke="#C7C2B8"
              strokeWidth="1.2"
            />
          </g>

          {/* Left Central Incisor (11) */}
          <path
            d={`M257,132 C268,110 308,110 ${318 - diastemaGap},132 L${
              317 - diastemaGap
            },${142 + centralHeight} C302,${146 + centralHeight} 270,${
              146 + centralHeight
            } 257,${138 + centralHeight} Z`}
            fill={`url(#enamel-${mode})`}
            stroke="#C7C2B8"
            strokeWidth="1.3"
          />

          {/* Right Central Incisor (21) */}
          <path
            d={`M${322 + diastemaGap},132 C332,110 372,110 383,132 L383,${
              138 + centralHeight
            } C370,${146 + centralHeight} 338,${146 + centralHeight} ${
              323 + diastemaGap
            },${142 + centralHeight} Z`}
            fill={`url(#enamel-${mode})`}
            stroke="#C7C2B8"
            strokeWidth="1.3"
          />

          {/* Right Lateral Incisor (22) */}
          <g
            transform={`rotate(${-lateralRotation} 408 175)`}
          >
            <path
              d={`M384,138 C392,120 426,120 435,138 L435,204 C424,${
                isBefore ? 208 : 218
              } 398,${isBefore ? 208 : 220} 386,${
                isBefore ? 205 : 215
              } Z`}
              fill={`url(#enamel-${mode})`}
              stroke="#C7C2B8"
              strokeWidth="1.2"
            />
          </g>

          {/* Right Canine (23) */}
          <path
            d={`M436,142 C442,122 470,122 478,142 L478,198 Q458,${
              isBefore ? 208 : 220
            } 438,${isBefore ? 204 : 212} Z`}
            fill={`url(#enamel-${mode})`}
            stroke="#C7C2B8"
            strokeWidth="1.2"
          />

          {/* Right First Premolar (24) */}
          <path
            d="M478,148 C484,132 506,132 512,148 L510,192 C504,202 488,204 480,196 Z"
            fill={`url(#enamel-${mode})`}
            stroke="#C7C2B8"
            strokeWidth="1.2"
          />

          {/* Natural Enamel Surface Micro-Texture & Specular Light Reflections (After State) */}
          {!isBefore && (
            <g opacity="0.75">
              <path
                d="M272,146 L272,208 M298,142 L298,210 M342,142 L342,210 M368,146 L368,208"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M222,150 L222,202 M418,150 L418,202"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>

        {/* Lower Arch Subtle Visible Tops */}
        <path
          d="M175,244 Q320,264 465,244 L455,272 Q320,292 185,272 Z"
          fill={isBefore ? '#DED6C1' : '#F2F0EA'}
          opacity="0.88"
        />

        {/* Soft Lip Framing Contour */}
        <path
          d="M60,175 Q190,95 285,112 Q320,120 355,112 Q450,95 580,175 Q455,132 320,134 Q185,132 60,175 Z"
          fill={`url(#lipFrame-${mode})`}
          opacity="0.9"
        />
        <path
          d="M60,175 Q185,268 320,272 Q455,268 580,175 Q465,310 320,316 Q175,310 60,175 Z"
          fill={`url(#lipFrame-${mode})`}
          opacity="0.9"
        />

        {/* Optional Digital Smile Design (DSD) Calibration Overlay */}
        {showDSDGuides && (
          <g>
            {/* Facial Midline */}
            <line
              x1="320"
              y1="45"
              x2="320"
              y2="315"
              stroke="#FF7518"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Ideal Smile Curve Arc */}
            <path
              d="M145,196 Q320,254 495,196"
              fill="none"
              stroke="#FF7518"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Golden Proportion Vertical Calipers */}
            <line
              x1="257"
              y1="95"
              x2="257"
              y2="250"
              stroke={isBefore ? '#0D0D0D' : '#FFFFFF'}
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <line
              x1="383"
              y1="95"
              x2="383"
              y2="250"
              stroke={isBefore ? '#0D0D0D' : '#FFFFFF'}
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <line
              x1="205"
              y1="105"
              x2="205"
              y2="240"
              stroke={isBefore ? '#0D0D0D' : '#FFFFFF'}
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <line
              x1="435"
              y1="105"
              x2="435"
              y2="240"
              stroke={isBefore ? '#0D0D0D' : '#FFFFFF'}
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            {/* DSD Proportion Callout */}
            <text
              x="328"
              y="72"
              fill="#FF7518"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              LINHA MÉDIA · PROPORÇÃO 1.618
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <section
      id="antes-depois"
      className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D]/60 mb-3">
            <span>Estudo Anatômico & Simulação</span>
            <span aria-hidden="true">·</span>
            <span>Digital Smile Design</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] text-balance leading-[1.06]">
            Previsibilidade clínica{' '}
            <span className="text-[#FF7518]">antes e depois</span> do preparo.
          </h2>
        </div>

        {/* Protocol Switcher Tabs (Interactive Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E6E6E6] rounded-2xl self-start">
          {HARMONY_PROTOCOLS.map((protocol, idx) => {
            const active = selectedProtocol.id === protocol.id;
            return (
              <button
                key={protocol.id}
                type="button"
                onClick={() => setSelectedProtocol(protocol)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#0D0D0D] text-white shadow-sm'
                    : 'text-[#0D0D0D]/70 hover:text-[#0D0D0D]'
                }`}
              >
                0{idx + 1}. {protocol.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 7 Columns: Interactive Before/After Slider Canvas */}
        <div className="lg:col-span-7 bg-white rounded-[32px] p-4 sm:p-6 border border-black/8 flex flex-col justify-between">
          {/* Top Bar inside Simulator */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 px-1">
            <div className="flex items-center gap-3 text-xs font-bold text-[#0D0D0D]/70">
              <span>{selectedProtocol.code}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#FF7518]">{selectedProtocol.title}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowDSDGuides((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                showDSDGuides
                  ? 'bg-[#FF7518]/10 border-[#FF7518] text-[#FF7518]'
                  : 'border-black/15 text-[#0D0D0D]/70 hover:text-[#0D0D0D]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showDSDGuides ? 'Guias 3D Ativas' : 'Mostrar Guias 3D'}</span>
            </button>
          </div>

          {/* Interactive Comparison Viewport */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden select-none border border-black/10">
            {/* Layer 1: AFTER (Planned Digital Smile) full width */}
            <div className="absolute inset-0">
              {renderDentalArchSVG('after', selectedProtocol)}
            </div>

            {/* Layer 2: BEFORE (Initial Anatomy) clipped by sliderPos */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              {renderDentalArchSVG('before', selectedProtocol)}
            </div>

            {/* Vertical Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#FF7518] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FF7518] text-white shadow-lg flex items-center justify-center border-2 border-white">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            {/* Quiet Corner Labels */}
            <div className="absolute bottom-3 left-4 text-[11px] font-bold tracking-tight text-[#0D0D0D] bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md pointer-events-none">
              Anatomia Inicial
            </div>
            <div className="absolute bottom-3 right-4 text-[11px] font-bold tracking-tight text-white bg-[#0D0D0D]/85 backdrop-blur-sm px-2.5 py-1 rounded-md pointer-events-none">
              Planejamento Sorria+ 3D
            </div>

            {/* Accessible Range Input Covering Viewport */}
            <input
              type="range"
              min={5}
              max={95}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Controle deslizante de comparação antes e depois"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
            />
          </div>

          {/* Bottom Slider Instruction & Ethical Note */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#0D0D0D]/60 px-1">
            <span>
              Arraste o cursor horizontalmente para comparar a anatomia inicial e o
              planejamento digital.
            </span>
            <span className="font-mono-tabular font-semibold text-[#0D0D0D]">
              Simulação: {sliderPos}%
            </span>
          </div>
        </div>

        {/* Right 5 Columns: Technical Parameters & Clinical Breakdown */}
        <div className="lg:col-span-5 bg-[#0D0D0D] text-white rounded-[32px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <span className="text-xs font-medium text-white/50">
                  Protocolo Clínico Selecionado
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
                  {selectedProtocol.title}
                </h3>
              </div>
              <Sparkles className="w-6 h-6 text-[#FF7518] shrink-0" />
            </div>

            <p className="text-sm text-white/75 leading-relaxed mt-5">
              {selectedProtocol.description}
            </p>

            {/* Tabular Anatomical Parameters Table */}
            <div className="mt-6 space-y-3">
              <div className="text-xs font-semibold text-white/50">
                Parâmetros de Harmonia Avaliados
              </div>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {selectedProtocol.parameters.map((param) => (
                  <div
                    key={param.label}
                    className="py-3 grid grid-cols-12 gap-2 items-center text-xs sm:text-sm font-mono-tabular"
                  >
                    <span className="col-span-4 text-white/60 font-sans font-medium">
                      {param.label}
                    </span>
                    <span className="col-span-4 text-white/50 line-through">
                      {param.before}
                    </span>
                    <span className="col-span-4 text-[#FF7518] font-semibold text-right">
                      {param.after}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-white/55 leading-relaxed max-w-[240px]">
              Estudo técnico ilustrativo (CFO). Cada planejamento é individualizado após avaliação presencial.
            </p>
            <button
              type="button"
              onClick={() => onOpenBooking(selectedProtocol.title)}
              className="px-5 py-3 rounded-full bg-[#FF7518] hover:bg-[#ff8533] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Agendar Meu Test Drive 3D</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

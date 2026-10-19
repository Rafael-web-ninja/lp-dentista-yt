import React, { useState } from 'react';
import { ArrowUpRight, Heart, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroVisualCompositionProps {
  onOpenBooking: (defaultTreatment?: string) => void;
  onScrollToSimulator: () => void;
}

const CHAT_SNIPPETS = [
  {
    q: 'O resultado fica natural?',
    a: 'Você aprova antes no Mockup 3D!',
  },
  {
    q: 'Precisa usar molde de massa?',
    a: 'Zero massa! Escaneamento digital em 5 min.',
  },
  {
    q: 'Quanto tempo dura a avaliação?',
    a: '1 hora exclusiva com planejamento 3D.',
  },
];

export const HeroVisualComposition: React.FC<HeroVisualCompositionProps> = ({
  onOpenBooking,
  onScrollToSimulator,
}) => {
  const [likedCard, setLikedCard] = useState(false);
  const [chatIndex, setChatIndex] = useState(0);

  const currentChat = CHAT_SNIPPETS[chatIndex];

  const handleCycleChat = () => {
    setChatIndex((prev) => (prev + 1) % CHAT_SNIPPETS.length);
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto lg:ml-auto pt-4 sm:pt-8 pb-4 px-2 sm:px-6 select-none">
      {/* ===================================================================
          MAIN ORANGE ROUNDED BLOCK (#FF7518) WITH REAL PHOTOGRAPH
      ==================================================================== */}
      <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.9] bg-[#FF7518] rounded-[36px] sm:rounded-[44px] shadow-[0_24px_65px_rgba(255,117,24,0.24)] overflow-hidden">
        {/* Subtle warm studio radial lighting inside container */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(circle at 65% 35%, rgba(255,185,120,0.25) 0%, rgba(255,117,24,0) 70%)',
          }}
        />

        {/* Real Photograph: Elegant Woman with Natural Radiant Smile */}
        <img
          src="/images/hero_woman_smile_orange.jpg"
          alt="Mulher elegante sorrindo com dentes brancos e naturais em consulta estética na Sorria+"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />

        {/* Subtle Bottom Vignette Gradient to anchor the base */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FF7518]/90 via-[#FF7518]/30 to-transparent pointer-events-none z-10" />

        {/* ===================================================================
            FLOATING CARD 1: FROSTED GLASS 100% 3D CARD
            Responsive positioning: On mobile, hugs bottom-left neatly so face is 100% clear.
        ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onClick={onScrollToSimulator}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onScrollToSimulator();
          }}
          aria-label="Abrir Simulador de Harmonia Dental 3D"
          className="group absolute z-20 cursor-pointer transition-all duration-200
                     /* Mobile: Compact glass pill at bottom-left corner */
                     bottom-3 left-3 sm:bottom-[22%] sm:-left-6 lg:-left-12
                     p-3 sm:p-4 lg:p-5 rounded-[22px] sm:rounded-[28px]
                     backdrop-blur-xl bg-white/70 hover:bg-white/85
                     border border-white/80 shadow-[0_16px_40px_rgba(13,13,13,0.14)]
                     max-w-[145px] sm:max-w-[180px]"
        >
          {/* Ascending 3-Bar Icon (matching reference) */}
          <div className="flex items-end gap-1 h-5 sm:h-7 mb-1.5 sm:mb-2.5">
            <span className="w-1.5 sm:w-2 h-2 sm:h-3 rounded-full bg-white shadow-xs" />
            <span className="w-1.5 sm:w-2.5 h-3.5 sm:h-5 rounded-full bg-white shadow-xs" />
            <span className="w-1.5 sm:w-2.5 h-5 sm:h-7 rounded-full bg-white shadow-xs" />
          </div>

          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0D0D0D] leading-none font-mono-tabular">
                100%
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-[#0D0D0D]/80 mt-1 leading-tight">
                Planejamento
                <br />
                Digital 3D
              </p>
            </div>

            <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white text-[#0D0D0D] flex items-center justify-center shadow-xs group-hover:bg-[#0D0D0D] group-hover:text-white transition-colors shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
        </motion.div>

        {/* ===================================================================
            FLOATING CARD 2: REAL AVATAR CHAT BUBBLES
            Responsive positioning: Neatly placed at top right without covering eyes or mouth.
        ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute z-20 flex flex-col items-end sm:items-start gap-1.5 sm:gap-2
                     top-3 right-3 sm:top-[10%] sm:-right-4 lg:-right-8"
        >
          {/* Bubble 1: Patient Question with Real Avatar */}
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md pl-1.5 pr-3 sm:pr-4 py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-black/5">
            <img
              src="/images/patient_avatar.jpg"
              alt="Paciente"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0 border border-black/10"
            />
            <span className="text-[11px] sm:text-xs font-bold text-[#0D0D0D] whitespace-nowrap">
              {currentChat.q}
            </span>
          </div>

          {/* Bubble 2: Doctor Answer with Real Avatar (hidden on tiny screens to avoid any crowding, visible on sm:) */}
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md pl-1.5 pr-4 py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-black/5">
            <img
              src="/images/doctor_avatar.jpg"
              alt="Especialista Sorria+"
              className="w-7 h-7 rounded-full object-cover shrink-0 border border-black/10"
            />
            <span className="text-xs font-bold text-[#0D0D0D] whitespace-nowrap">
              {currentChat.a}
            </span>
          </div>

          {/* Bubble 3: Interactive '...' button to cycle questions */}
          <button
            type="button"
            onClick={handleCycleChat}
            title="Ver próxima pergunta frequente"
            aria-label="Alternar dúvida clínica"
            className="bg-white/95 hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md border border-black/5 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
          </button>
        </motion.div>
      </div>

      {/* =====================================================================
          FLOATING CARD 3: REAL ALIGNER TREATMENT CARD
          RESPONSIVE FIX:
          - On mobile (< sm:): Anchored immediately below the orange block with clean margin,
            so the smiling woman is 100% visible and unblocked above!
          - On desktop (sm: and lg:): Floats on the bottom-right with -3deg tilt, matching reference!
      ====================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ rotate: 0, y: -4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="/* Mobile: Clean anchored card below photo */
                   relative mt-3 mx-auto w-full max-w-[340px]
                   /* Tablet & Desktop: Floating tilted card */
                   sm:absolute sm:mt-0 sm:w-[245px] lg:w-[270px]
                   sm:-right-4 lg:-right-10 sm:bottom-[4%] lg:bottom-[8%]
                   sm:rotate-[-3deg] sm:hover:rotate-0
                   z-30 bg-white rounded-[26px] sm:rounded-[28px] p-4 sm:p-5
                   shadow-[0_20px_55px_rgba(13,13,13,0.14)] border border-black/8"
      >
        {/* Card Header: Smile Curve + Heart Button */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 36 16"
              className="w-7 h-3.5 text-[#0D0D0D]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2,4 C11,14 25,14 34,2"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="33" cy="3" r="2.2" fill="#FF7518" />
            </svg>
            <span className="text-[10px] font-bold text-[#FF7518] uppercase tracking-wider">
              Destaque
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLikedCard((prev) => !prev)}
            aria-label="Salvar tratamento nos favoritos"
            className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
              likedCard
                ? 'bg-[#FF7518]/10 border-[#FF7518] text-[#FF7518]'
                : 'border-black/10 text-[#0D0D0D]/60 hover:text-[#0D0D0D]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${likedCard ? 'fill-[#FF7518]' : ''}`} />
          </button>
        </div>

        <div className="mb-2.5">
          <h3 className="text-sm sm:text-[15px] font-extrabold text-[#0D0D0D] tracking-tight leading-tight">
            Alinhador Invisível 3D
          </h3>
          <p className="text-[11px] text-[#0D0D0D]/55 font-medium">
            Ortodontia Transparente Sob Medida
          </p>
        </div>

        {/* Real Photograph: Person Wearing Clear Invisible Aligner */}
        <div className="relative w-full h-28 sm:h-32 rounded-2xl overflow-hidden mb-3 bg-[#F3F3F3] border border-black/5">
          <img
            src="/images/aligner_case.jpg"
            alt="Pessoa sorrindo com alinhador ortodôntico transparente invisível"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0D0D0D]/80 backdrop-blur-xs text-[10px] font-bold text-white">
            100% Removível
          </div>
        </div>

        {/* Bottom Row: Label + Black Pill CTA Button */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] font-medium text-[#0D0D0D]/50">
              Fluxo Escaneado
            </span>
            <span className="text-sm sm:text-base font-extrabold text-[#0D0D0D] tracking-tight">
              Previsível 3D
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking('Alinhadores Invisíveis 3D')}
            className="px-3.5 py-2 rounded-full bg-[#0D0D0D] hover:bg-[#FF7518] text-white text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar</span>
          </button>
        </div>
      </motion.div>

      {/* ===================================================================
          HANDWRITTEN ANNOTATIONS (Visible on larger screens to preserve mobile cleanliness)
      ==================================================================== */}
      <div className="hidden lg:block absolute -left-12 bottom-[14%] z-20 -rotate-12 pointer-events-none">
        <p className="font-handwriting text-[25px] leading-[0.95] text-[#0D0D0D]/80 font-bold">
          Sorria
          <br />
          Com Leveza
          <br />
          Viva Melhor
        </p>
        <svg viewBox="0 0 90 18" className="w-20 h-4 mt-1 text-[#0D0D0D]/70" fill="none">
          <path
            d="M4,12 Q42,4 84,8 M14,16 Q48,10 74,13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="hidden lg:flex items-end gap-1.5 absolute -right-6 -bottom-2 z-20 -rotate-6 pointer-events-none">
        <p className="font-handwriting text-[22px] leading-[0.95] text-[#0D0D0D]/75 font-bold">
          Mais Que Estética
          <br />
          Saúde Real
        </p>
        <svg viewBox="0 0 32 32" className="w-6 h-6 text-[#0D0D0D]/70 mb-0.5" fill="none">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="13" r="1.3" fill="currentColor" />
          <circle cx="20" cy="13" r="1.3" fill="currentColor" />
          <path
            d="M11,18.5 Q16,23 21,18.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

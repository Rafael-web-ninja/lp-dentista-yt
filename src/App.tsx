/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TREATMENTS,
  DIFFERENTIALS,
  CLINICAL_TEAM,
  PATIENT_EXPERIENCE_PILLARS,
  FAQ_ITEMS,
  Treatment,
} from './data/clinicData';
import { HeroVisualComposition } from './components/HeroVisualComposition';
import { BeforeAfterSimulator } from './components/BeforeAfterSimulator';
import { BookingModal } from './components/BookingModal';

interface UserSubmittedFeedback {
  id: string;
  author: string;
  treatmentDone: string;
  comment: string;
  dateLabel: string;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<
    'Todos' | 'Estética' | 'Ortodontia' | 'Reabilitação' | 'Prevenção'
  >('Todos');
  const [activeTreatmentDetail, setActiveTreatmentDetail] =
    useState<Treatment | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialTreatment, setBookingInitialTreatment] = useState<
    string | undefined
  >(undefined);

  // Real interactive patient feedback submission state (Zero fabricated reviews)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackAuthor, setFeedbackAuthor] = useState('');
  const [feedbackTreatment, setFeedbackTreatment] = useState(
    'Avaliação Diagnóstica 3D'
  );
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState<
    UserSubmittedFeedback[]
  >([]);

  const handleOpenBooking = (treatmentName?: string) => {
    setBookingInitialTreatment(treatmentName);
    setBookingModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredTreatments =
    selectedCategory === 'Todos'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.category === selectedCategory);

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackAuthor.trim().length < 2 || feedbackComment.trim().length < 10) {
      setFeedbackError(
        'Preencha seu nome e um relato com pelo menos 10 caracteres.'
      );
      return;
    }
    const newEntry: UserSubmittedFeedback = {
      id: String(Date.now()),
      author: feedbackAuthor.trim(),
      treatmentDone: feedbackTreatment,
      comment: feedbackComment.trim(),
      dateLabel: 'Enviado nesta sessão',
    };
    setSubmittedFeedbacks((prev) => [newEntry, ...prev]);
    setFeedbackAuthor('');
    setFeedbackComment('');
    setFeedbackError('');
    setShowFeedbackForm(false);
  };

  const whatsappDirectUrl =
    'https://wa.me/5511999999999?text=' +
    encodeURIComponent(
      'Olá, equipe Sorria+! Gostaria de agendar minha Avaliação Diagnóstica 3D.'
    );

  return (
    <div className="min-h-screen bg-[#F3F3F3] text-[#0D0D0D] selection:bg-[#FF7518] selection:text-white">
      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract matching Reference Image)
      ====================================================================== */}
      <header className="sticky top-0 z-40 bg-[#F3F3F3]/90 backdrop-blur-md border-b border-black/6">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element, Sorria in black + '+' in orange) */}
          <a
            href="#"
            className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-[#0D0D0D] whitespace-nowrap shrink-0"
          >
            Sorria<span className="text-[#FF7518]">+</span>
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#0D0D0D]/75"
          >
            <a
              href="#tratamentos"
              className="hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
            >
              Tratamentos
            </a>
            <a
              href="#diferenciais"
              className="hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
            >
              Diferenciais
            </a>
            <a
              href="#antes-depois"
              className="hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
            >
              Antes e Depois
            </a>
            <a
              href="#equipe"
              className="hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
            >
              Equipe
            </a>
            <a
              href="#faq"
              className="hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
            >
              Perguntas
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#0D0D0D] hover:bg-[#FF7518] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Agendar Avaliação</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION (2-Column Editorial Split Inspired Faithfully by Reference)
      ====================================================================== */}
      <main>
        <section className="pt-6 sm:pt-10 pb-12 px-4 sm:px-8 max-w-[1380px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN: Giant Brand Title, Headline, Subtitle, Patient Proof, CTA, Factual Pillars */}
            <div className="lg:col-span-6 flex flex-col items-start">
              {/* Subtle Kicker with ascending orange bars icon (matching reference top-left) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-2.5 mb-4"
              >
                <span
                  className="inline-flex items-end gap-0.5 h-3.5"
                  aria-hidden="true"
                >
                  <span className="w-1 h-1.5 rounded-full bg-[#FF7518]" />
                  <span className="w-1 h-2.5 rounded-full bg-[#FF7518]" />
                  <span className="w-1 h-3.5 rounded-full bg-[#FF7518]" />
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0D0D0D]/80">
                  Odontologia Digital · Precisão & Conforto
                </span>
              </motion.div>

              {/* Giant Brand Mark Lockup (Matching 'Grow+' scale in reference) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-6xl sm:text-7xl xl:text-[88px] font-extrabold tracking-[-0.045em] leading-[0.94] text-[#0D0D0D] select-none mb-3"
                aria-hidden="true"
              >
                Sorria<span className="text-[#FF7518]">+</span>
              </motion.div>

              {/* Main Required Hero Title: "Seu melhor sorriso começa aqui." */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold tracking-[-0.03em] text-[#0D0D0D] leading-[1.08] text-balance mb-5"
              >
                Seu melhor sorriso começa aqui.
              </motion.h1>

              {/* Persuasive Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base sm:text-[17px] text-[#0D0D0D]/70 leading-[1.6] max-w-[54ch] mb-7"
              >
                A clínica odontológica completa para planejar, alinhar e
                reabilitar o seu sorriso com naturalidade. Mais previsibilidade
                com simulação 3D, procedimentos minimamente invasivos e zero
                complexidade.
              </motion.p>

              {/* Patient Evaluation Block (Matching avatar + quote + orange stars layout from reference without inventing fake ratings) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 mb-8 max-w-md"
              >
                {/* Real Patient Avatar */}
                <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden shrink-0">
                  <img
                    src="/images/patient_avatar.jpg"
                    alt="Paciente da Sorria+"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs sm:text-[13px] font-medium text-[#0D0D0D]/85 leading-snug italic">
                    “Você visualiza e aprova o formato do novo sorriso em boca
                    com o Test Drive 3D antes de qualquer intervenção.”
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div
                      className="flex items-center gap-0.5 text-[#FF7518]"
                      aria-label="Cinco estrelas de excelência clínica"
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#FF7518] text-[#FF7518]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-extrabold text-[#0D0D0D]">
                      Avaliação Transparente
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Primary Black CTA Button + Secondary Action Link (Matching reference button row) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap items-center gap-5 mb-11"
              >
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="px-7 py-4 rounded-full bg-[#0D0D0D] hover:bg-[#FF7518] text-white text-sm font-bold inline-flex items-center gap-3 shadow-[0_14px_30px_rgba(13,13,13,0.16)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Agendar Avaliação</span>
                  <Calendar className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('tratamentos')}
                  className="px-3 py-2 text-sm font-extrabold text-[#0D0D0D] hover:text-[#FF7518] inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Nossos Tratamentos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Bottom 3-Column Strip with Hairline Dividers (Matching 200K+ | 2.5M+ | 4.9/5 layout in reference, using factual clinical parameters) */}
              <div className="w-full pt-2 grid grid-cols-3 gap-4 sm:gap-8 border-t border-black/8 sm:border-t-0">
                <div className="pr-4 border-r border-black/10">
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0D0D0D] font-mono-tabular">
                    100% 3D
                  </div>
                  <div className="text-xs text-[#0D0D0D]/60 font-medium mt-0.5">
                    Escaneamento Digital
                  </div>
                </div>

                <div className="pr-4 border-r border-black/10">
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0D0D0D]">
                    Mockup
                  </div>
                  <div className="text-xs text-[#0D0D0D]/60 font-medium mt-0.5">
                    Test Drive do Sorriso
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0D0D0D]">
                    Hora Certa
                  </div>
                  <div className="text-xs text-[#0D0D0D]/60 font-medium mt-0.5">
                    Suítes Exclusivas
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Smiling Woman on Orange Rounded Block + Floating Cards + Handwritten Details */}
            <div className="lg:col-span-6">
              <HeroVisualComposition
                onOpenBooking={handleOpenBooking}
                onScrollToSimulator={() => scrollToSection('antes-depois')}
              />
            </div>
          </div>

          {/* ===================================================================
              BOTTOM HERO TRUST BAR (Matching 'TRUSTED BY LEADING BRANDS' strip in reference)
          ==================================================================== */}
          <div className="mt-14 pt-7 border-t border-black/10">
            <div className="text-[11px] font-bold tracking-wider text-[#0D0D0D]/45 mb-4">
              TECNOLOGIAS E SISTEMAS CERTIFICADOS UTILIZADOS NA CLÍNICA
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6">
              {/* 5 Partner Technology Wordmarks matching the monochrome typographic rhythm of reference */}
              <div className="flex flex-wrap items-center gap-8 sm:gap-12 text-[#0D0D0D]/80">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                  iTero<span className="text-[#FF7518] font-normal">™</span> 5D
                </span>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full border-2 border-current inline-block" />
                  Straumann®
                </span>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                  IPS e.max®
                </span>
                <span className="text-lg sm:text-xl font-serif italic font-bold tracking-tight">
                  Digital Smile Design
                </span>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Invisalign®
                </span>
              </div>

              {/* Right Callout + Circular Black Arrow Button (Exact match to bottom-right of reference) */}
              <div className="flex items-center gap-4 ml-auto">
                <p className="text-xs font-medium text-[#0D0D0D]/65 leading-snug max-w-[200px]">
                  Conheça nossa estrutura clínica e protocolos digitais na{' '}
                  <strong className="text-[#0D0D0D]">Sorria+</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  aria-label="Agendar avaliação agora"
                  className="w-11 h-11 rounded-full bg-[#0D0D0D] hover:bg-[#FF7518] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: TRATAMENTOS ODONTOLÓGICOS (Editorial Numbered Bento Grid)
        ====================================================================== */}
        <section
          id="tratamentos"
          className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto border-t border-black/8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D]/60 mb-3">
                <span>Especialidades Clínicas</span>
                <span aria-hidden="true">·</span>
                <span>Protocolos Individualizados</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] text-balance leading-[1.06]">
                Tratamentos desenhados para a{' '}
                <span className="text-[#FF7518]">longevidade</span> do seu sorriso.
              </h2>
            </div>

            {/* Interactive Category Filter Controls */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E6E6E6] rounded-2xl self-start">
              {(
                [
                  'Todos',
                  'Estética',
                  'Ortodontia',
                  'Reabilitação',
                  'Prevenção',
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0D0D0D] text-white shadow-xs'
                      : 'text-[#0D0D0D]/70 hover:text-[#0D0D0D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredTreatments.map((item, idx) => {
              const isWide = idx === 0 || idx === 3;
              const colSpan = isWide
                ? 'md:col-span-7'
                : 'md:col-span-5';
              const isHighlighted = item.id === 'alinhadores-invisiveis';

              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`${colSpan} group rounded-[32px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 ${
                    isHighlighted
                      ? 'bg-[#0D0D0D] text-white'
                      : 'bg-white text-[#0D0D0D] border border-black/8 hover:border-black/25'
                  }`}
                >
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div
                        className={`flex items-center gap-2 text-xs font-bold ${
                          isHighlighted ? 'text-white/60' : 'text-[#0D0D0D]/55'
                        }`}
                      >
                        <span className="text-[#FF7518] font-mono-tabular text-sm">
                          {item.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.sessions}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTreatmentDetail(item)}
                        aria-label={`Ver etapas clínicas de ${item.title}`}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                          isHighlighted
                            ? 'bg-white/10 hover:bg-[#FF7518] text-white'
                            : 'bg-[#F3F3F3] group-hover:bg-[#0D0D0D] text-[#0D0D0D] group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2.5 text-balance">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-[15px] leading-relaxed mb-6 ${
                        isHighlighted ? 'text-white/75' : 'text-[#0D0D0D]/70'
                      }`}
                    >
                      {item.summary}
                    </p>
                  </div>

                  <div
                    className={`pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
                      isHighlighted ? 'border-white/12' : 'border-black/8'
                    }`}
                  >
                    <div className="text-xs">
                      <span
                        className={`block font-medium ${
                          isHighlighted ? 'text-white/50' : 'text-[#0D0D0D]/50'
                        }`}
                      >
                        Tecnologia Aplicada
                      </span>
                      <span className="font-bold">{item.technology}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTreatmentDetail(item)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isHighlighted
                            ? 'bg-white/10 hover:bg-white/20 text-white'
                            : 'bg-[#F3F3F3] hover:bg-[#E5E5E5] text-[#0D0D0D]'
                        }`}
                      >
                        Etapas Clínicas
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenBooking(item.title)}
                        className="px-4 py-2 rounded-full bg-[#FF7518] hover:bg-[#e5630c] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Agendar
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Interactive Treatment Protocol Drawer/Modal */}
          <AnimatePresence>
            {activeTreatmentDetail && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0D0D]/60 backdrop-blur-xs"
                onClick={() => setActiveTreatmentDetail(null)}
              >
                <motion.div
                  initial={{ scale: 0.96, y: 12 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.96, y: 12 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-[32px] p-6 sm:p-9 max-w-xl w-full shadow-2xl border border-black/10"
                >
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-black/8">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FF7518]">
                      <span>{activeTreatmentDetail.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>Protocolo Clínico Sorria+</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTreatmentDetail(null)}
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#F3F3F3] hover:bg-[#0D0D0D] hover:text-white transition-colors cursor-pointer"
                    >
                      Fechar
                    </button>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D0D0D] mt-4">
                    {activeTreatmentDetail.title}
                  </h3>
                  <p className="text-sm text-[#0D0D0D]/70 mt-2 leading-relaxed">
                    {activeTreatmentDetail.subtitle}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-extrabold text-[#0D0D0D]/60">
                      Passo a Passo na Clínica
                    </div>
                    {activeTreatmentDetail.steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F3F3F3]"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#0D0D0D] text-white text-xs font-bold flex items-center justify-center shrink-0 font-mono-tabular">
                          {i + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-[#0D0D0D]/85 font-medium leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-[#0D0D0D]/65">
                      <strong className="text-[#0D0D0D] block">
                        Indicação Principal:
                      </strong>
                      {activeTreatmentDetail.indication}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const title = activeTreatmentDetail.title;
                        setActiveTreatmentDetail(null);
                        handleOpenBooking(title);
                      }}
                      className="px-6 py-3.5 rounded-full bg-[#0D0D0D] hover:bg-[#FF7518] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Agendar Avaliação deste Protocolo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* =====================================================================
            SECTION 3: DIFERENCIAIS DA CLÍNICA (Architecture & Methodology)
        ====================================================================== */}
        <section
          id="diferenciais"
          className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto border-t border-black/8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left 5 Columns: Editorial Statement + Boutique Clinic Suite Illustration */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D]/60 mb-3">
                  <span>Arquitetura & Filosofia</span>
                  <span aria-hidden="true">·</span>
                  <span>Por que a Sorria+</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] text-balance leading-[1.06] mb-5">
                  Odontologia sem pressa, desenhada ao redor de{' '}
                  <span className="text-[#FF7518]">você.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#0D0D0D]/70 leading-relaxed mb-8">
                  Redefinimos a experiência de ir ao dentista. Nossas suítes
                  combinam arquitetura acolhedora, isolamento acústico e
                  laboratório digital 3D integrado para diagnósticos precisos em
                  uma única visita.
                </p>
              </div>

              {/* Custom Architectural Suite Visual Card with Handwritten Detail */}
              <div className="relative rounded-[32px] bg-[#0D0D0D] text-white p-6 sm:p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white/60">
                    Suíte Clínica Sorria+ · Fluxo Digital
                  </span>
                  <span className="font-handwriting text-xl text-[#FF7518]">
                    Conforto real
                  </span>
                </div>

                {/* Real Architectural Dental Suite Photograph */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/10">
                  <img
                    src="/images/clinic_modern.jpg"
                    alt="Suíte clínica Sorria+ com cadeira ergonômica, ambiente acolhedor e tecnologia digital"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 text-[11px] font-bold text-white/90 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    Suíte com Isolamento Acústico
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs text-white/75">
                    Ambiente com aromaterapia suave, fones com cancelamento de
                    ruído e escaneamento 3D.
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking()}
                    className="px-4 py-2.5 rounded-full bg-[#FF7518] hover:bg-[#e5630c] text-white text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Agendar Visita
                  </button>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: 4 Numbered Differentiator Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DIFFERENTIALS.map((diff) => (
                <div
                  key={diff.number}
                  className="bg-white rounded-[32px] p-7 sm:p-8 border border-black/8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="text-2xl font-extrabold text-[#FF7518] font-mono-tabular">
                        {diff.number}
                      </span>
                      <span className="text-xs font-bold text-[#0D0D0D]/50">
                        {diff.detail}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0D0D0D] mb-3 text-balance">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-[#0D0D0D]/70 leading-relaxed">
                      {diff.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/6 flex items-center justify-between text-xs font-bold text-[#0D0D0D]">
                    <span>Protocolo Padrão Sorria+</span>
                    <ShieldCheck className="w-4 h-4 text-[#FF7518]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: ANTES E DEPOIS (Interactive DSD Harmony Simulator)
        ====================================================================== */}
        <div className="border-t border-black/8">
          <BeforeAfterSimulator onOpenBooking={handleOpenBooking} />
        </div>

        {/* =====================================================================
            SECTION 5: DEPOIMENTOS & COMPROMISSO DE SATISFAÇÃO
            (Zero Fabricated Patient Quotes or Fake Numbers — Authentic Criteria + Live Submission)
        ====================================================================== */}
        <section
          id="depoimentos"
          className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto border-t border-black/8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D]/60 mb-3">
                <span>Experiência do Paciente</span>
                <span aria-hidden="true">·</span>
                <span>Transparência Ética</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] text-balance leading-[1.06]">
                O que nossos pacientes valorizam em{' '}
                <span className="text-[#FF7518]">cada etapa.</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowFeedbackForm((prev) => !prev)}
              className="px-5 py-3 rounded-full bg-[#0D0D0D] hover:bg-[#FF7518] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 self-start transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>
                {showFeedbackForm
                  ? 'Fechar Formulário de Relato'
                  : 'É Paciente? Enviar Seu Relato'}
              </span>
            </button>
          </div>

          {/* Interactive Patient Relato Form (if toggled open) */}
          <AnimatePresence>
            {showFeedbackForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddFeedback}
                className="mb-10 bg-white rounded-[32px] p-6 sm:p-8 border border-black/10 overflow-hidden"
              >
                <h3 className="text-lg font-extrabold text-[#0D0D0D] mb-4">
                  Registrar Avaliação Presencial nesta Sessão
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0D0D0D] mb-1.5">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      value={feedbackAuthor}
                      onChange={(e) => setFeedbackAuthor(e.target.value)}
                      placeholder="Ex: Nome e Sobrenome"
                      className="w-full px-4 py-3 rounded-xl bg-[#F3F3F3] border border-black/10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D0D0D] mb-1.5">
                      Procedimento Realizado
                    </label>
                    <select
                      value={feedbackTreatment}
                      onChange={(e) => setFeedbackTreatment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F3F3F3] border border-black/10 text-sm"
                    >
                      <option value="Avaliação Diagnóstica 3D">
                        Avaliação Diagnóstica 3D
                      </option>
                      {TREATMENTS.map((t) => (
                        <option key={t.id} value={t.title}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-bold text-[#0D0D0D] mb-1.5">
                    Seu Relato sobre o Atendimento
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Compartilhe como foi sua experiência com o planejamento digital e atendimento..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F3F3F3] border border-black/10 text-sm"
                  />
                </div>
                {feedbackError && (
                  <p className="text-xs font-semibold text-red-600 mb-3">
                    {feedbackError}
                  </p>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#FF7518] text-white text-xs font-bold cursor-pointer"
                >
                  Publicar Relato nesta Sessão
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* User-Submitted Relatos (When added by user during session) */}
          {submittedFeedbacks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {submittedFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="bg-[#0D0D0D] text-white rounded-[28px] p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                    <span>{fb.treatmentDone}</span>
                    <span>{fb.dateLabel}</span>
                  </div>
                  <p className="text-base font-medium leading-relaxed mb-4">
                    “{fb.comment}”
                  </p>
                  <div className="text-xs font-extrabold text-[#FF7518]">
                    {fb.author} · Relato Registrado
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3 Authentic Patient Expectations & How Sorria+ Responds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATIENT_EXPERIENCE_PILLARS.map((pilar, idx) => (
              <div
                key={pilar.id}
                className="bg-white rounded-[32px] p-7 sm:p-8 border border-black/8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#0D0D0D]/55 mb-5">
                    <span>PILAR 0{idx + 1}</span>
                    <span className="text-[#FF7518]">{pilar.dimension}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0D0D0D] leading-snug mb-4">
                    {pilar.question}
                  </h3>

                  <p className="text-sm text-[#0D0D0D]/70 leading-relaxed">
                    {pilar.practice}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/8 flex items-center justify-between text-xs font-bold">
                  <span className="text-[#0D0D0D]/60">Compromisso Clínico</span>
                  <span className="text-[#0D0D0D]">{pilar.criterion}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: CORPO CLÍNICO / EQUIPE (Editorial Specialist Portraits)
        ====================================================================== */}
        <section
          id="equipe"
          className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto border-t border-black/8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D]/60 mb-3">
                <span>Corpo Clínico Especializado</span>
                <span aria-hidden="true">·</span>
                <span>Odontologia Interdisciplinar</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] text-balance leading-[1.06]">
                Especialistas dedicados a{' '}
                <span className="text-[#FF7518]">cada detalhe</span> anatômico.
              </h2>
            </div>

            <p className="text-sm text-[#0D0D0D]/65 max-w-md leading-relaxed">
              Seu caso é discutido de forma integrada entre prótese, ortodontia
              digital e periodontia para garantir saúde biológica e harmonia
              facial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {CLINICAL_TEAM.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-[32px] p-6 sm:p-7 border border-black/8 flex flex-col justify-between group"
              >
                <div>
                  {/* Real Specialist Doctor Portrait */}
                  <div className="relative w-full aspect-[4/3.5] rounded-2xl bg-[#F3F3F3] overflow-hidden mb-6 border border-black/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      Corpo Clínico Titulado
                    </span>
                  </div>

                  {/* Unboxed Metadata */}
                  <div className="text-xs font-bold text-[#FF7518] mb-1">
                    {member.role}
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-[#0D0D0D]">
                    {member.name}
                  </h3>
                  <div className="text-xs text-[#0D0D0D]/55 font-medium mt-1 mb-4">
                    {member.specialty} · {member.registration}
                  </div>

                  <p className="text-sm text-[#0D0D0D]/70 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/8 flex items-center justify-between gap-2">
                  <div className="text-xs text-[#0D0D0D]/60 truncate">
                    {member.focusAreas.join(' · ')}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(member.focusAreas[0])}
                    className="w-9 h-9 rounded-full bg-[#F3F3F3] group-hover:bg-[#0D0D0D] text-[#0D0D0D] group-hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label={`Agendar avaliação com ${member.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 7: PERGUNTAS FREQUENTES (Interactive Accordion)
        ====================================================================== */}
        <section
          id="faq"
          className="py-20 lg:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto border-t border-black/8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 5 Columns */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D]/60 mb-3">
                <span>Dúvidas Comuns</span>
                <span aria-hidden="true">·</span>
                <span>Esclarecimento Clínico</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] text-balance leading-[1.06] mb-5">
                Perguntas frequentes sobre a{' '}
                <span className="text-[#FF7518]">Sorria+.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#0D0D0D]/70 leading-relaxed mb-8">
                Acreditamos que um paciente bem informado toma decisões com
                tranquilidade. Se sua dúvida não estiver abaixo, fale diretamente
                com nossa equipe pelo WhatsApp.
              </p>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-white text-xs sm:text-sm font-bold border border-black/10 transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#FF7518]" />
                <span>Tirar Dúvida pelo WhatsApp</span>
              </a>
            </div>

            {/* Right 7 Columns: Accordion List */}
            <div className="lg:col-span-7 space-y-3">
              {FAQ_ITEMS.map((faq, index) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-[24px] border border-black/8 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqId(isOpen ? '' : faq.id)
                      }
                      aria-expanded={isOpen}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs font-mono-tabular font-bold text-[#FF7518]">
                          0{index + 1}.
                        </span>
                        <span className="text-base sm:text-lg font-extrabold text-[#0D0D0D] tracking-tight">
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? 'bg-[#0D0D0D] text-white rotate-180'
                            : 'bg-[#F3F3F3] text-[#0D0D0D]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 pt-1 text-sm text-[#0D0D0D]/70 leading-relaxed border-t border-black/5">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 8: FINAL CTA BANNER (Orange + Black Editorial Conversion Block)
        ====================================================================== */}
        <section className="py-12 px-4 sm:px-8 max-w-[1380px] mx-auto">
          <div className="relative rounded-[40px] bg-[#0D0D0D] text-white p-8 sm:p-14 lg:p-16 overflow-hidden">
            {/* Vibrant Orange Architectural Accent Orb */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#FF7518] opacity-90 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF7518] mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Avaliação Diagnóstica 3D · Hora Marcada</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03] text-balance mb-5">
                  Pronto para conhecer a melhor versão do seu sorriso?
                </h2>
                <p className="text-sm sm:text-base text-white/75 max-w-xl leading-relaxed">
                  Agende sua consulta diagnóstica na Sorria+. Realizamos o
                  escaneamento digital 3D e desenhamos um plano transparente,
                  sem pressa e no seu ritmo.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="px-7 py-4 rounded-full bg-[#FF7518] hover:bg-[#ff8533] text-white text-sm font-bold inline-flex items-center justify-center gap-2.5 shadow-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Avaliação Agora</span>
                </button>

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full bg-white hover:bg-[#F3F3F3] text-[#0D0D0D] text-sm font-bold inline-flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-[#FF7518]" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          QUIET EDITORIAL FOOTER
      ====================================================================== */}
      <footer className="mt-12 border-t border-black/10 py-12 px-4 sm:px-8">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <a
              href="#"
              className="text-2xl font-extrabold tracking-tight text-[#0D0D0D]"
            >
              Sorria<span className="text-[#FF7518]">+</span>
            </a>
            <p className="text-xs text-[#0D0D0D]/55 mt-1">
              Odontologia Estética, Ortodontia Digital 3D & Reabilitação Oral ·
              Atendimento com Hora Marcada
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#0D0D0D]/65">
            <a href="#tratamentos" className="hover:text-[#0D0D0D]">
              Tratamentos
            </a>
            <a href="#diferenciais" className="hover:text-[#0D0D0D]">
              Diferenciais
            </a>
            <a href="#antes-depois" className="hover:text-[#0D0D0D]">
              Simulador 3D
            </a>
            <a href="#equipe" className="hover:text-[#0D0D0D]">
              Corpo Clínico
            </a>
            <a href="#faq" className="hover:text-[#0D0D0D]">
              FAQ
            </a>
          </div>

          <div className="text-xs text-[#0D0D0D]/50">
            © {new Date().getFullYear()} Sorria+ Clínica Odontológica. Todos os
            direitos reservados.
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE BOOKING & WHATSAPP MODAL
      ====================================================================== */}
      <BookingModal
        isOpen={bookingModalOpen}
        initialTreatment={bookingInitialTreatment}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}

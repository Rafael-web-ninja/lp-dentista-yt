import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { TREATMENTS } from '../data/clinicData';

interface BookingModalProps {
  isOpen: boolean;
  initialTreatment?: string;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialTreatment,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState(
    initialTreatment || 'Avaliação Diagnóstica 3D Geral'
  );
  const [period, setPeriod] = useState<'Manhã' | 'Tarde' | 'Horário Estendido'>('Manhã');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTreatment) {
      setTreatment(initialTreatment);
    }
  }, [initialTreatment]);

  if (!isOpen) return null;

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDigits = phone.replace(/\D/g, '');
    if (name.trim().length < 3) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (cleanDigits.length < 10) {
      setError('Por favor, informe um telefone ou WhatsApp válido com DDD.');
      return;
    }
    setError('');

    // Dispara registro na API Express preservada no backend
    try {
      fetch('/api/agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanDigits,
          treatment,
          period,
          notes: notes.trim()
        })
      }).catch((err) => {
        console.warn('API sync warning:', err);
      });
    } catch (err) {
      console.warn('API error:', err);
    }

    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá, equipe Sorria+! Meu nome é ${name || '[Seu Nome]'}. Gostaria de agendar uma avaliação para *${treatment}* (Preferência: ${period}).${
      notes ? ` Observação: ${notes}` : ''
    }`
  );
  const whatsappHref = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0D0D]/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-booking-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-black/10 max-h-[92vh] overflow-y-auto">
        {/* Top Close Row */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-black/8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D]/55">
              <span>Concierge Sorria+</span>
              <span aria-hidden="true">·</span>
              <span>Hora Marcada</span>
            </div>
            <h3
              id="modal-booking-title"
              className="text-2xl font-extrabold tracking-tight text-[#0D0D0D] mt-1"
            >
              Agendar Avaliação Diagnóstica
            </h3>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Fechar janela de agendamento"
            className="w-10 h-10 rounded-full bg-[#F3F3F3] hover:bg-[#0D0D0D] text-[#0D0D0D] hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#FF7518]/15 text-[#FF7518] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-[#0D0D0D]">
                Solicitação de Horário Registrada
              </h4>
              <p className="text-sm text-[#0D0D0D]/70 max-w-md mx-auto leading-relaxed">
                Recebemos seus dados, <strong>{name}</strong>. Nossa equipe de
                concierge confirmará a disponibilidade para{' '}
                <strong>{treatment}</strong> no período da{' '}
                <strong>{period.toLowerCase()}</strong>.
              </p>
            </div>

            <div className="bg-[#F3F3F3] rounded-2xl p-4 text-left text-xs space-y-1.5 text-[#0D0D0D]/80 font-mono-tabular">
              <div>PACIENTE: {name}</div>
              <div>WHATSAPP: {phone}</div>
              <div>INTERESSE: {treatment}</div>
              <div>PERÍODO: {period}</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FF7518] hover:bg-[#e5630c] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Finalizar Agora no WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#0D0D0D] text-white text-xs sm:text-sm font-bold hover:bg-[#262626] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label
                htmlFor="booking-name"
                className="block text-xs font-bold text-[#0D0D0D] mb-1.5"
              >
                Seu Nome Completo
              </label>
              <input
                id="booking-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ex: Mariana Albuquerque"
                className="w-full px-4 py-3 rounded-xl bg-[#F3F3F3] border border-black/10 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#FF7518] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="booking-phone"
                className="block text-xs font-bold text-[#0D0D0D] mb-1.5"
              >
                WhatsApp / Telefone com DDD
              </label>
              <input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 rounded-xl bg-[#F3F3F3] border border-black/10 text-sm text-[#0D0D0D] font-mono-tabular focus:outline-none focus:border-[#FF7518] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="booking-treatment"
                className="block text-xs font-bold text-[#0D0D0D] mb-1.5"
              >
                Especialidade ou Tratamento de Interesse
              </label>
              <select
                id="booking-treatment"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F3F3F3] border border-black/10 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#FF7518] transition-colors"
              >
                <option value="Avaliação Diagnóstica 3D Geral">
                  Avaliação Diagnóstica 3D Geral
                </option>
                {TREATMENTS.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-bold text-[#0D0D0D] mb-1.5">
                Período de Preferência
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['Manhã', 'Tarde', 'Horário Estendido'] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPeriod(slot)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all whitespace-nowrap truncate cursor-pointer ${
                      period === slot
                        ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                        : 'bg-[#F3F3F3] text-[#0D0D0D]/75 border-black/10 hover:border-black/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-notes"
                className="block text-xs font-bold text-[#0D0D0D] mb-1.5"
              >
                Observação Opcional (Sensibilidade, urgência ou objetivo)
              </label>
              <input
                id="booking-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Gostaria de simular lentes sem desgaste"
                className="w-full px-4 py-3 rounded-xl bg-[#F3F3F3] border border-black/10 text-sm text-[#0D0D0D] focus:outline-none focus:border-[#FF7518] transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-600 bg-red-50 px-3.5 py-2.5 rounded-xl border border-red-200">
                {error}
              </p>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#0D0D0D] hover:bg-[#FF7518] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Solicitar Agendamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-[#F3F3F3] hover:bg-[#E5E5E5] text-[#0D0D0D] text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#FF7518]" />
                <span>WhatsApp Direto</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#0D0D0D]/55 pt-1">
              <Clock className="w-3.5 h-3.5 text-[#FF7518]" />
              <span>Atendimento com hora marcada · Sem filas de espera</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export interface Treatment {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Estética' | 'Ortodontia' | 'Reabilitação' | 'Prevenção';
  summary: string;
  indication: string;
  technology: string;
  sessions: string;
  steps: string[];
  featured?: boolean;
}

export interface HarmonyProtocol {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  initialCondition: string;
  plannedOutcome: string;
  parameters: {
    label: string;
    before: string;
    after: string;
  }[];
  shadeBefore: string;
  shadeAfter: string;
  alignmentOffset: number; // degrees/px for visual dental arch simulator
  incisalEdgeCurve: 'flat' | 'worn' | 'diastema';
}

export interface TeamSpecialist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  registration: string;
  bio: string;
  focusAreas: string[];
  accentColor: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'lentes-porcelana',
    number: '01.',
    title: 'Lentes em Porcelana Ultrafinas',
    subtitle: 'Laminados cerâmicos artesanais com preservação máxima da estrutura dental',
    category: 'Estética',
    summary:
      'Confeccionadas em dissilicato de lítio e feldspática estratificada, as lentes corrigem formato, proporção e textura superficial mantendo a translucidez natural do esmalte.',
    indication: 'Desgastes incisais, diastemas, alterações de forma ou restaurações extensas antigas.',
    technology: 'Digital Smile Design (DSD) + Impressão 3D para Mockup (Test Drive)',
    sessions: 'Planejamento + 2 a 3 sessões clínicas',
    steps: [
      'Fotografia estúdio, vídeo dinâmico da fala e escaneamento intraoral 3D.',
      'Prova do Mockup (Test Drive do Sorriso) diretamente em boca antes de qualquer preparo.',
      'Cimentação adesiva guiada sob isolamento absoluto e magnificação óptica.'
    ],
    featured: true,
  },
  {
    id: 'alinhadores-invisiveis',
    number: '02.',
    title: 'Alinhadores Invisíveis 3D',
    subtitle: 'Movimentação ortodôntica previsível, removível e sem bráquetes metálicos',
    category: 'Ortodontia',
    summary:
      'Placas transparentes termoplásticas desenhadas sob medida por software tridimensional. Você visualiza cada etapa do alinhamento antes mesmo de usar o primeiro par.',
    indication: 'Apinhamentos leves a complexos, espaçamentos, mordida cruzada e recidivas ortodônticas.',
    technology: 'Scanner iTero™ 5D + Planejamento Virtual Estagiado',
    sessions: 'Acompanhamento presencial ou híbrido a cada 4 a 6 semanas',
    steps: [
      'Escaneamento digital em 5 minutos, sem uso de massas ou moldes desconfortáveis.',
      'Simulação 3D interativa mostrando a posição final planejada para cada dente.',
      'Entrega dos jogos sequenciais com orientações de uso e higiene simplificada.'
    ],
    featured: true,
  },
  {
    id: 'reabilitacao-implantes',
    number: '03.',
    title: 'Implantes Guiados & Reabilitação',
    subtitle: 'Cirurgia guiada por computador para recuperação funcional e estética gengival',
    category: 'Reabilitação',
    summary:
      'Planejamento virtual sobre tomografia computadorizada somada ao escaneamento intraoral, permitindo instalação precisa com mínimo trauma tecidual e pós-operatório tranquilo.',
    indication: 'Ausências dentárias unitárias ou múltiplas e substituição de próteses instáveis.',
    technology: 'Guia Cirúrgico Impresso em 3D + Componentes em Zircônia',
    sessions: 'Planejamento tomográfico + etapa cirúrgica com hora estendida',
    steps: [
      'Fusão digital entre a tomografia 3D e o escaneamento da arcada.',
      'Instalação guiada com precisão submilimétrica, frequentemente sem incisões amplas.',
      'Prótese provisória imediata (quando indicada clinicamente) e coroa definitiva cerâmica.'
    ],
  },
  {
    id: 'clareamento-guiado',
    number: '04.',
    title: 'Clareamento Clínico Controlado',
    subtitle: 'Protocolo personalizado com controle de sensibilidade e remineralização',
    category: 'Estética',
    summary:
      'Combinação equilibrada entre sessões em consultório e moldeiras ultrafinas personalizadas, precedida por protocolo dessensibilizante para preservar o conforto.',
    indication: 'Escurecimento fisiológico, pigmentação alimentar ou preparo prévio à reabilitação estética.',
    technology: 'Espectrofotometria Digital de Cor + Gel Dessensibilizante',
    sessions: '2 a 3 semanas de acompanhamento supervisionado',
    steps: [
      'Mapeamento cromático inicial e avaliação de trincas ou retrações gengivais.',
      'Aplicação de barreira protetora gengival e terapia dessensibilizante prévia.',
      'Polimento final do esmalte para estabilidade duradoura do brilho.'
    ],
  },
  {
    id: 'plastica-gengival',
    number: '05.',
    title: 'Estética Rosa & Microcirurgia Gengival',
    subtitle: 'Harmonia do contorno gengival para valorizar a proporção dos dentes',
    category: 'Reabilitação',
    summary:
      'Refinamento delicado da arquitetura gengival para corrigir assimetrias no zênite dental ou exposição gengival excessiva ao sorrir, utilizando instrumentação microcirúrgica.',
    indication: 'Sorriso gengival, coroas clínicas curtas ou desnível na margem gengival anterior.',
    technology: 'Magnificação Óptica + Guia Periodontal Digital',
    sessions: 'Sessão única com recuperação rápida',
    steps: [
      'Medição digital da proporção altura/largura dos dentes anteriores.',
      'Confecção de guia milimetrado personalizado para simetria exata.',
      'Remodelamento delicado com cicatrização assistida.'
    ],
  },
  {
    id: 'prevencao-checkup',
    number: '06.',
    title: 'Check-up Digital & Profilaxia Guiada',
    subtitle: 'Diagnóstico preventivo de alta definição e remoção suave de biofilme',
    category: 'Prevenção',
    summary:
      'Inspeção detalhada com câmera intraoral de alta magnificação e tecnologia NIRI (infravermelho próximo) para detectar alterações precoces sem radiação desnecessária.',
    indication: 'Manutenção periódica da saúde gengival, longevidade de lentes/implantes e prevenção.',
    technology: 'Câmera Intraoral HD + Ultrassom Piezoelétrico Aquecido',
    sessions: 'Sessão de 60 minutos em ambiente de relaxamento',
    steps: [
      'Registro fotográfico e escaneamento comparativo de desgaste dental.',
      'Evidenciação seletiva do biofilme e remoção suave com jato de eritritol/bicarbonato ultrafino.',
      'Plano preventivo individualizado de acordo com sua rotina.'
    ],
  },
];

export const DIFFERENTIALS = [
  {
    number: '01.',
    title: 'Test Drive do Sorriso (Mockup 3D)',
    description:
      'Você não precisa imaginar o resultado: projetamos o novo formato em 3D e aplicamos uma resina provisória sobre os seus dentes para você aprovar no espelho e em vídeo antes de iniciar.',
    detail: 'Previsibilidade estética real',
  },
  {
    number: '02.',
    title: 'Zero Massas de Moldagem',
    description:
      'Substituímos as antigas moldagens desconfortáveis por escaneamento óptico intraoral que captura milhares de imagens por segundo com conforto imediato.',
    detail: 'Fluxo 100% digital',
  },
  {
    number: '03.',
    title: 'Odontologia Minimamente Invasiva',
    description:
      'Nossa filosofia clínica prioriza a preservação da estrutura natural do esmalte. Trabalhamos com magnificação óptica para preparos ultraconservadores e adesão de alta performance.',
    detail: 'Biomimética dental',
  },
  {
    number: '04.',
    title: 'Consultas Exclusivas Sem Espera',
    description:
      'Agenda desenhada com intervalos amplos entre pacientes. Você é atendido pontualmente em suítes com isolamento acústico, música ambiente selecionada e conforto ergonômico.',
    detail: 'Hospitalidade clínica',
  },
];

export const HARMONY_PROTOCOLS: HarmonyProtocol[] = [
  {
    id: 'protocolo-lentes',
    code: 'ESTUDO ANATÔMICO 01',
    title: 'Reanatomização com Lentes Cerâmicas',
    category: 'Proporção & Textura',
    description:
      'Demonstração técnica de como o restabelecimento da borda incisal e o fechamento de pequenos espaços devolvem a jovialidade da curva do sorriso mantendo microtextura natural.',
    initialCondition: 'Bordas incisais planas por desgaste fisiológico e diastema central discreto.',
    plannedOutcome: 'Curvatura incisal acompanhando o lábio inferior, fechamento de diastema e translucidez natural.',
    parameters: [
      { label: 'Proporção Central', before: '88% (Curto)', after: '78% (Proporção Áurea)' },
      { label: 'Curva Incisal', before: 'Plana / Invertida', after: 'Convexa Harmônica' },
      { label: 'Referência de Cor', before: 'Escala Vita A2', after: 'Escala Vita B1 Natural' },
    ],
    shadeBefore: '#EAE2CE',
    shadeAfter: '#FBFBF9',
    alignmentOffset: 4,
    incisalEdgeCurve: 'diastema',
  },
  {
    id: 'protocolo-alinhadores',
    code: 'ESTUDO ANATÔMICO 02',
    title: 'Alinhamento & Expansão do Corredor Bucal',
    category: 'Ortodontia Digital',
    description:
      'Simulação biomecânica do alinhamento dos incisivos laterais e expansão suave da arcada com alinhadores transparentes, ampliando a plenitude do sorriso.',
    initialCondition: 'Rotação suave nos incisivos laterais e corredor bucal estreito.',
    plannedOutcome: 'Alinhamento tridimensional do arco dental e reflexão simétrica de luz.',
    parameters: [
      { label: 'Simetria de Arco', before: 'Assimetria Lateral', after: 'Arco Parabólico Contínuo' },
      { label: 'Eixo Axial Dental', before: 'Desvio de 6°', after: 'Alinhado (0°)' },
      { label: 'Preservação de Esmalte', before: 'Estrutura Íntegra', after: '100% Preservada' },
    ],
    shadeBefore: '#F2EDE0',
    shadeAfter: '#F8F7F2',
    alignmentOffset: 10,
    incisalEdgeCurve: 'worn',
  },
  {
    id: 'protocolo-clareamento',
    code: 'ESTUDO ANATÔMICO 03',
    title: 'Clareamento Clínico + Acabamento Incisal',
    category: 'Conservadora',
    description:
      'Protocolo conservador que associa clareamento supervisionado à remodelação aditiva sutil em resina composta nanoparticulada nas pontas dos caninos e incisivos.',
    initialCondition: 'Saturação cromática amarelada e microfraturas de esmalte nas bordas.',
    plannedOutcome: 'Luminosidade elevada com preservação total da estrutura dental sadia.',
    parameters: [
      { label: 'Luminosidade (Valor)', before: 'Médio-Baixo (A3)', after: 'Alto Valor Natural (B1)' },
      { label: 'Borda Incisal', before: 'Micro-irregularidades', after: 'Halo Incisal Definido' },
      { label: 'Desgaste Dental', before: 'Nenhum', after: 'Zero Desgaste (Aditivo)' },
    ],
    shadeBefore: '#E5D8B9',
    shadeAfter: '#FAF9F5',
    alignmentOffset: 2,
    incisalEdgeCurve: 'flat',
  },
];

export const CLINICAL_TEAM: TeamSpecialist[] = [
  {
    id: 'dra-helena',
    name: 'Dra. Helena Vasconcelos',
    role: 'Diretora Clínica · Reabilitação & Estética',
    specialty: 'Especialista em Prótese Dentária e Dentística Restauradora',
    registration: 'CRO-SP · Corpo Clínico Sorria+',
    bio: 'Dedica-se ao planejamento estético reabilitador guiado por fluxo digital e cerâmicas ultrafinas, com foco na naturalidade anatômica e longevidade biológica.',
    focusAreas: ['Lentes em Porcelana', 'Digital Smile Design', 'Reabilitação Oral Adesiva'],
    accentColor: '#FF7518',
    image: '/images/dentist_female_1.jpg',
  },
  {
    id: 'dr-rafael',
    name: 'Dr. Rafael Montenegro',
    role: 'Coordenador de Ortodontia Digital',
    specialty: 'Especialista e Mestre em Ortodontia',
    registration: 'CRO-SP · Corpo Clínico Sorria+',
    bio: 'Atua exclusivamente com sistemas de alinhadores transparentes e biomecânica digital tridimensional para tratamentos discretos e previsíveis.',
    focusAreas: ['Alinhadores Invisíveis', 'Escaneamento 3D', 'Orto-Reabilitação'],
    accentColor: '#0D0D0D',
    image: '/images/dentist_male_1.jpg',
  },
  {
    id: 'dra-camila',
    name: 'Dra. Camila Alencar',
    role: 'Implantodontia & Estética Periodontal',
    specialty: 'Especialista em Periodontia e Cirurgia Plástica Gengival',
    registration: 'CRO-SP · Corpo Clínico Sorria+',
    bio: 'Especialista em microcirurgia plástica periodontal e implantes guiados por computador, integrando a saúde gengival à arquitetura do sorriso.',
    focusAreas: ['Implantes Guiados', 'Plástica Gengival', 'Microcirurgia Óptica'],
    accentColor: '#FF7518',
    image: '/images/dentist_female_2.jpg',
  },
];

export const PATIENT_EXPERIENCE_PILLARS = [
  {
    id: 'pilar-1',
    dimension: 'Clareza no Diagnóstico',
    question: '“Eu consigo ver como meu sorriso vai ficar antes de começar?”',
    practice:
      'Toda jornada começa com fotografia clínica e escaneamento 3D. Apresentamos o projeto na tela e realizamos o Test Drive físico em boca para decisão compartilhada.',
    criterion: 'Aprovação Prévia pelo Paciente',
  },
  {
    id: 'pilar-2',
    dimension: 'Conforto & Controle de Ansiedade',
    question: '“Tenho receio de procedimentos odontológicos demorados.”',
    practice:
      'Utilizamos anestesia computadorizada sem dor, protocolos minimamente invasivos e sessões planejadas com pausas programadas em suíte privativa.',
    criterion: 'Protocolo de Conforto Sensorial',
  },
  {
    id: 'pilar-3',
    dimension: 'Naturalidade Estética',
    question: '“Não quero um sorriso artificial ou padronizado.”',
    practice:
      'Cada lente ou restauração é desenhada respeitando o formato do rosto, a linha do lábio, a textura superficial e a translucidez incisal de um dente natural.',
    criterion: 'Customização Facial Individual',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Estética Dental',
    question: 'Para colocar lentes de contato dental é preciso desgastar muito os dentes?',
    answer:
      'Não. Na odontologia adesiva contemporânea praticada na Sorria+, trabalhamos com planejamento digital aditivo. Em muitos casos de dentes pequenos ou com espaços, o preparo é mínimo ou apenas um micro-refinamento superficial de esmalte (0,2 mm a 0,4 mm), preservando a estrutura sadia.',
  },
  {
    id: 'faq-2',
    category: 'Planejamento 3D',
    question: 'Como funciona o Test Drive do Sorriso (Mockup)?',
    answer:
      'Após o escaneamento intraoral 3D e as fotografias do seu rosto, desenhamos o novo formato dos dentes no software. Imprimimos um modelo 3D e transferimos esse desenho para a sua boca com uma resina provisória removível — sem desgastar nada. Assim você se vê no espelho, grava vídeos sorrindo e aprova cada detalhe antes de iniciar.',
  },
  {
    id: 'faq-3',
    category: 'Ortodontia',
    question: 'Os alinhadores invisíveis funcionam para casos além de pequenos ajustes?',
    answer:
      'Sim. Com o planejamento biomecânico digital e recursos de precisão (attachments da cor do dente e elásticos discretos), os alinhadores tratam desde pequenos desalinhamentos até casos complexos de mordida cruzada, sobremordida e preparo para reabilitação oral.',
  },
  {
    id: 'faq-4',
    category: 'Primeira Consulta',
    question: 'O que está incluído na Avaliação Diagnóstica na Sorria+?',
    answer:
      'Nossa consulta de avaliação tem duração estendida para ouvir suas expectativas com calma. Realizamos protocolo fotográfico, escaneamento digital 3D da arcada, inspeção clínica detalhada e apresentação de um plano de tratamento claro, com etapas e cronograma.',
  },
  {
    id: 'faq-5',
    category: 'Conforto',
    question: 'O clareamento dental causa sensibilidade intensa?',
    answer:
      'Personalizamos a concentração do gel clareador de acordo com a espessura do seu esmalte e aplicamos protocolos dessensibilizantes e remineralizantes antes e durante o tratamento, reduzindo drasticamente qualquer desconforto.',
  },
  {
    id: 'faq-6',
    category: 'Atendimento',
    question: 'A clínica atende convênios ou trabalha no formato particular?',
    answer:
      'Para garantir tempo exclusivo por sessão, materiais cerâmicos de excelência e laboratório próprio digital, nosso atendimento é particular. Emitimos toda a documentação técnica e notas fiscais detalhadas para que você solicite o reembolso junto ao seu plano de saúde ou seguro odontológico.',
  },
];

/**
 * en / ar messages — each locale is fully in one language. Keys: t('a.b.c') in I18nContext.
 */
export const MESSAGES = {
  en: {
    nav: {
      home: 'Home', overview: 'About, Vision & Mission', values: 'Values',
      divisions: 'Divisions', services: 'Services', strategy: 'Strategy & Presence',
      contact: 'Contact', contactCta: 'Contact Us',
    },
    lang: { en: 'EN', ar: 'AR' },
    a11y: {
      logo: 'NAWA logo',
      toArabic: 'Switch to Arabic',
      toEnglish: 'Switch to English',
      expandService: 'Show details for',
      collapseService: 'Hide details for',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      mainNav: 'Main navigation',
    },
    slideFooter: { brand: 'NAWA Holding' },
    hero: {
      holding: 'Holding Company',
      tagline: 'Building Value… Shaping the Future',
      scroll: 'Scroll to explore',
    },
    overview: {
      title: 'Company Overview',
      bodyParagraphs: [
        'Nawa Holding Company is an investment and business development firm headquartered in Riyadh, Saudi Arabia. The company operates with a strategic vision focused on building high-quality investments that deliver sustainable growth and long-term value.',
        'Nawa adopts a disciplined and forward-thinking approach to managing and developing businesses, with a strong emphasis on value creation and consistent performance.',
        'Nawa applies a structured, forward-looking approach to managing and growing businesses, with a clear focus on value creation and stable performance.',
      ],
      infoBlockTitle: 'At a glance',
      info: [
        { k: 'Headquartered', v: 'Riyadh, Saudi Arabia' },
        { k: 'Sector Focus', v: 'Multi-sector Investment' },
        { k: 'Focus', v: 'Sustainable Long-term Growth' },
      ],
    },
    vision: {
      title: 'Vision',
      para: 'To be a benchmark in smart investment and a trusted partner in creating opportunities and driving sustainable growth, aligned with modern economic directions, including Saudi Vision 2030.',
    },
    mission: {
      title: 'Mission',
      para: 'To maximize value through well-structured investments, strategic partnerships, and a professional approach that balances growth with sustainability.',
    },
    values: {
      h2: 'Core Values',
      sub: 'The principles that guide every decision',
      items: [
        { name: 'Excellence', desc: 'Striving for the highest standards of performance' },
        { name: 'Transparency', desc: 'Clear and honest engagement in all dealings' },
        { name: 'Sustainability', desc: 'Building long-term, impactful investments' },
        { name: 'Innovation', desc: 'Thinking beyond conventional frameworks' },
        { name: 'Trust', desc: 'The foundation of every successful partnership' },
      ],
    },
    divisions: {
      h2: 'Our Divisions',
      sub: 'Diverse sectors, one shared vision',
      items: [
        {
          title: 'Real Estate Development Sector',
          desc: 'This sector focuses on real estate development from concept to execution, including planning, design, construction management, and project marketing. It aims to create high-value real estate projects that generate sustainable investment returns.',
        },
        {
          title: 'Creative Production Sector',
          desc: 'This sector specializes in creative content production, including videos, visual campaigns, and design, supporting brands and projects through high-quality content that enhances their presence and impact.',
        },
        {
          title: 'Advertising & Marketing Sector',
          desc: 'This sector focuses on planning and executing advertising and marketing campaigns across various channels, aiming to increase brand awareness and deliver measurable results through strategic initiatives.',
        },
      ],
    },
    services: {
      h2: 'Our Services',
      sub: 'Explore what we offer. Tap each service to read more.',
      list: [
        {
          title: 'Investment management and development',
          desc: 'We design and manage investment portfolios, identify opportunities, and support asset growth through disciplined analysis and a focus on long-term value creation for stakeholders.',
        },
        {
          title: 'Strategic advisory',
          desc: 'We work with leaders on market context, options, and clear roadmaps that match risk appetite, governance, and growth goals—turning direction into decisions you can act on.',
        },
        {
          title: 'Project development',
          desc: 'We guide initiatives from idea through planning and delivery: feasibility, scope, coordination with partners, and follow-through so projects stay aligned, timely, and fit for purpose.',
        },
        {
          title: 'Partnership structuring',
          desc: 'We help design joint ventures, commercial terms, and governance so roles, risks, and rewards are transparent, balanced, and built for long-term partnership.',
        },
        {
          title: 'Business restructuring',
          desc: 'When change is required, we support operational, capital, and organisational realignment—improving clarity, efficiency, and resilience while respecting compliance and your strategic priorities.',
        },
      ],
    },
    strategy: {
      h2: 'Strategy',
      intro: 'Nawa Holding adopts a balanced investment approach based on:',
      pillars: [
        'Careful selection of opportunities',
        'Effective risk management',
        'Sustainable growth development',
        'Long-term relationship building',
      ],
      presenceTitle: 'Presence & Impact',
      presenceBody: 'The company focuses on developing investments that contribute to positive economic impact and create growth opportunities through a clear vision and a value-driven approach.',
    },
    contact: {
      h2: 'Contact',
      intro: 'We believe the greatest success is built through partnerships, and we look forward to working with you.',
      p: 'Riyadh, Saudi Arabia',
      form: {
        name: 'Full Name', namePh: 'Your full name',
        email: 'Email Address', emailPh: 'your@email.com',
        phone: 'Phone Number', phonePh: '+966 5X XXX XXXX',
        subject: 'Subject', subjectPh: 'How can we help?',
        message: 'Message', messagePh: 'Tell us about your project or inquiry…',
        send: 'Send Message',
        sending: 'Sending…',
        success: 'Message sent!',
        error: 'Something went wrong. Please try again.',
      },
    },
    footer: {
      holding: 'Holding Company',
      tagline: 'Building Value… Shaping the Future',
      colCompany: 'Company',
      colBusiness: 'Business',
      colConnect: 'Connect',
      linkOverview: 'About, Vision & Mission',
      linkValues: 'Values',
      linkDivisions: 'Divisions',
      linkServices: 'Services',
      linkStrategy: 'Strategy & Presence',
      linkContact: 'Contact Us',
      rights: 'All rights reserved.',
      location: 'Riyadh, Kingdom of Saudi Arabia',
      copyright: 'NAWA Holding Company. All rights reserved.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية', overview: 'من نحن، الرؤية والرسالة', values: 'القيم',
      divisions: 'القطاعات', services: 'الخدمات', strategy: 'الاستراتيجية والحضور',
      contact: 'اتصل', contactCta: 'اتصل بنا',
    },
    lang: { en: 'EN', ar: 'AR' },
    a11y: {
      logo: 'شعار نوا',
      toArabic: 'التبديل إلى العربية',
      toEnglish: 'التبديل إلى الإنجليزية',
      expandService: 'إظهار تفاصيل',
      collapseService: 'إخفاء تفاصيل',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      mainNav: 'التنقل الرئيسي',
    },
    slideFooter: { brand: 'نوا هولدينج' },
    hero: {
      holding: 'شركة قابضة',
      tagline: 'نمو القيمة... تشكيل المستقبل',
      scroll: 'مرّر لاستكشاف الصفحة',
    },
    overview: {
      title: 'من نحن',
      bodyParagraphs: [
        'شركة نواة القابضة هي شركة استثمار وتطوير أعمال مقرها الرياض، المملكة العربية السعودية.',
        'تعمل الشركة برؤية استراتيجية تركز على بناء استثمارات عالية الجودة تحقق نمواً مستداماً وقيمة طويلة الأمد.',
        'تعتمد نواة نهجاً منظماً واستشرافياً في إدارة وتطوير الأعمال، مع تركيز واضح على خلق القيمة وتحقيق أداء مستقر.',
      ],
      infoBlockTitle: 'لمحة سريعة',
      info: [
        { k: 'المقر', v: 'الرياض، المملكة العربية السعودية' },
        { k: 'نطاق القطاع', v: 'استثمار متعدد القطاعات' },
        { k: 'التركيز', v: 'نمو مستدام طويل الأمد' },
      ],
    },
    vision: {
      title: 'الرؤية',
      para: 'أن نكون مرجعاً في الاستثمار الذكي وشريكاً موثوقاً في خلق الفرص ودفع عجلة النمو المستدام، بما يتماشى مع التوجهات الاقتصادية الحديثة بما فيها رؤية السعودية 2030.',
    },
    mission: {
      title: 'الرسالة',
      para: 'تعظيم القيمة من خلال استثمارات مدروسة، وشراكات استراتيجية، ونهج احترافي يوازن بين النمو والاستدامة.',
    },
    values: {
      h2: 'القيم الأساسية',
      sub: 'المبادئ التي توجه قراراتنا',
      items: [
        { name: 'التميز', desc: 'السعي لتحقيق أعلى معايير الأداء' },
        { name: 'الشفافية', desc: 'وضوح وصدق في جميع التعاملات' },
        { name: 'الاستدامة', desc: 'بناء استثمارات ذات أثر طويل الأمد' },
        { name: 'الابتكار', desc: 'التفكير خارج الأطر التقليدية' },
        { name: 'الثقة', desc: 'أساس كل شراكة ناجحة' },
      ],
    },
    divisions: {
      h2: 'قطاعاتنا',
      sub: 'قطاعات متنوعة برؤية موحّدة',
      items: [
        {
          title: 'قطاع التطوير العقاري',
          desc: 'يركز هذا القطاع على تطوير المشاريع العقارية من الفكرة إلى التنفيذ، بما يشمل التخطيط، التصميم، إدارة البناء، وتسويق المشاريع. يهدف إلى إنشاء مشاريع عقارية ذات قيمة عالية تحقق عوائد استثمارية مستدامة.',
        },
        {
          title: 'قطاع الإنتاج الفني',
          desc: 'يعنى هذا القطاع بإنتاج المحتوى الإبداعي مثل الفيديوهات، الحملات البصرية، والتصاميم، لدعم العلامات التجارية والمشاريع بطريقة احترافية تعزز حضورها وتأثيرها.',
        },
        {
          title: 'قطاع الدعاية والإعلان',
          desc: 'يركّز هذا القطاع على تخطيط وتنفيذ الحملات الإعلانية والتسويقية عبر مختلف القنوات، بهدف زيادة الوعي بالعلامة التجارية وتحقيق نتائج ملموسة من خلال استراتيجيات مدروسة.',
        },
      ],
    },
    services: {
      h2: 'خدماتنا',
      sub: 'استعرض عروضنا. اضغط على كل خدمة لعرض شرحٍ مفصّل.',
      list: [
        {
          title: 'إدارة وتطوير الاستثمارات',
          desc: 'نصمم ونُدير محافظ الاستثمار ونستكشف الفرص وندعم نمو الأصول عبر تحليل منضبط وتركيز على خلق قيمة طويلة الأمد لأصحاب المصلحة.',
        },
        {
          title: 'الاستشارات الاستراتيجية',
          desc: 'نُرافق القيادات بفهم السياق وخيارات التنفيذ وخارطات طريق واضحة تُوازن بين الشهية للمخاطر والحوكمة والنمو—من التوجه إلى القرار القابل للتنفيذ.',
        },
        {
          title: 'تطوير المشاريع',
          desc: 'نقود المبادرات من الفكرة حتى التسليم: الجدوى، نطاق العمل، تنسيق الأطراف، والمتابعة لضبط الجدول والتكامل والجودة بما يلائم أهداف المشروع.',
        },
        {
          title: 'هيكلة الشراكات',
          desc: 'نساعد في صياغة المشاريع المشتركة والشروط والحوكمة بحيث تكون الأدوار والمخاطر والمكاسب واضحة ومتوازنة ومبنية لشراكات مستدامة.',
        },
        {
          title: 'إعادة هيكلة الأعمال',
          desc: 'عند الحاجة لإعادة التوازن، ندعم إعادة ترتيب العمليات والهيكل الرأسمالي والتنظيمي—لرفع الكفاءة والوضوح والمرونة مع مراعاة الامتثال والأولويات الاستراتيجية.',
        },
      ],
    },
    strategy: {
      h2: 'الاستراتيجية',
      intro: 'تعتمد شركة نواة القابضة نهجاً استثمارياً متوازناً يرتكز على:',
      pillars: [
        'اختيار الفرص بعناية',
        'إدارة فعالة للمخاطر',
        'تطوير نمو مستدام',
        'بناء علاقات طويلة الأمد',
      ],
      presenceTitle: 'الحضور والتأثير',
      presenceBody: 'تركز الشركة على تطوير استثمارات تسهم في تحقيق أثر اقتصادي إيجابي وخلق فرص للنمو، من خلال رؤية واضحة ونهج قائم على القيمة.',
    },
    contact: {
      h2: 'تواصل معنا',
      intro: 'نؤمن أن أعظم النجاحات تُبنى عبر الشراكات، ونتطلع إلى العمل معكم.',
      p: 'الرياض، المملكة العربية السعودية',
      form: {
        name: 'الاسم الكامل', namePh: 'اسمك الكامل',
        email: 'البريد الإلكتروني', emailPh: 'بريدك@مثال.com',
        phone: 'رقم الهاتف', phonePh: '+966 5X XXX XXXX',
        subject: 'الموضوع', subjectPh: 'كيف يمكننا مساعدتك؟',
        message: 'الرسالة', messagePh: 'أخبرنا عن مشروعك أو استفسارك…',
        send: 'إرسال الرسالة',
        sending: 'جارٍ الإرسال…',
        success: 'تم الإرسال! سنتواصل معك قريباً.',
        error: 'حدث خطأ، يرجى المحاولة مرة أخرى.',
      },
    },
    footer: {
      holding: 'شركة قابضة',
      tagline: 'نمو القيمة... تشكيل المستقبل',
      colCompany: 'الشركة',
      colBusiness: 'الأعمال',
      colConnect: 'تواصل',
      linkOverview: 'من نحن، الرؤية والرسالة',
      linkValues: 'القيم',
      linkDivisions: 'القطاعات',
      linkServices: 'الخدمات',
      linkStrategy: 'الاستراتيجية والحضور',
      linkContact: 'اتصل بنا',
      rights: 'جميع الحقوق محفوظة.',
      location: 'الرياض، المملكة العربية السعودية',
      copyright: 'شركة نوا هولدينج. جميع الحقوق محفوظة.',
    },
  },
};

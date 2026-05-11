export type Callout = {
  type: 'key' | 'tip' | 'example'
  text: string
}

export type QuizCheckpoint = {
  type: 'quiz'
  question: string
  options: { text: string; correct: boolean }[]
  explanation: string
}

export type ConfidenceCheckpoint = {
  type: 'confidence'
  prompt: string
  fuzzyNote?: string
}

export type ReflectionCheckpoint = {
  type: 'reflection'
  prompt: string
  reveal: string
}

export type Checkpoint = QuizCheckpoint | ConfidenceCheckpoint | ReflectionCheckpoint

export type Section = {
  heading?: string
  paragraphs: string[]
  list?: string[]
  callout?: Callout
  checkpoint?: Checkpoint
}

export type Lesson = {
  num: number
  slug: string
  title: string
  duration: string
  intro: string
  sections: Section[]
  keyTakeaways: string[]
}

export const lessons: Lesson[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Lesson 1
  // ─────────────────────────────────────────────────────────────────────────
  {
    num: 1,
    slug: 'lesson-1',
    title: 'What is an ISA — and why does it matter?',
    duration: '6 min',
    intro: '"ISA" is one of those acronyms that gets thrown around constantly — by banks, financial journalists, and probably your parents. But most people who have one couldn\'t tell you exactly what it does or why it matters. In this lesson, we start from scratch.',
    sections: [
      {
        heading: 'The acronym — and what it actually means',
        paragraphs: [
          'ISA stands for Individual Savings Account. But that name is a bit misleading — because an ISA isn\'t really an account in the way a bank account is. It\'s a tax wrapper.',
          'Think of an ISA as a container. You put money into the container, and everything inside it is sheltered from UK tax. You can put cash in, or you can put investments in. The wrapper is what makes it special, not the contents.',
        ],
      },
      {
        heading: 'How tax normally works on savings and investments',
        paragraphs: [
          'Without an ISA, HMRC takes a cut of your financial returns in three main ways:',
        ],
        list: [
          'Interest income — if you earn interest on savings, it\'s taxed as income above your Personal Savings Allowance (£500 for higher-rate taxpayers, £1,000 for basic rate)',
          'Capital gains — if you sell an investment for a profit above the annual CGT allowance, you\'re taxed on the gain',
          'Dividends — if your shares or funds pay dividends above the dividend allowance (£500 per year), you pay dividend tax',
        ],
        callout: {
          type: 'example',
          text: 'You invest £10,000 outside an ISA. Over 20 years it grows to £38,000. HMRC may want a share of that £28,000 gain. Inside an ISA, that same growth is 100% yours.',
        },
      },
      {
        heading: 'What an ISA actually does',
        paragraphs: [
          'Inside an ISA, all three of those taxes disappear. Interest is tax-free. Capital gains are tax-free. Dividends are tax-free. You don\'t even have to mention it on your self-assessment tax return — HMRC already knows it\'s sheltered.',
          'An ISA doesn\'t change what you invest in. It changes how it\'s taxed. The same fund inside an ISA and outside an ISA performs identically in market terms — but the ISA version lets you keep 100% of the returns.',
        ],
        callout: {
          type: 'key',
          text: 'An ISA is a tax wrapper — not an investment itself. Think of it as a protective shell you put around your money or investments. Everything inside is sheltered from UK tax, permanently.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'What does an ISA actually do?',
          options: [
            { text: 'It gives you a higher interest rate than a standard savings account', correct: false },
            { text: 'It shelters your money from UK tax on interest, gains, and dividends', correct: true },
            { text: 'It\'s a government account run by HMRC', correct: false },
          ],
          explanation: 'An ISA is a tax wrapper — not a special account or a guaranteed rate. The same investment inside an ISA grows entirely tax-free; outside an ISA, you\'d pay tax on any gains, interest, or dividends above the relevant allowances.',
        },
      },
      {
        heading: 'The four types of ISA',
        paragraphs: [
          'There are four ISA types available to UK adults. Each serves a different purpose:',
        ],
        list: [
          'Cash ISA — like a tax-free savings account; pays interest',
          'Stocks & Shares ISA — you invest in stocks, funds, or ETFs; returns are tax-free',
          'Lifetime ISA (LISA) — for buying your first home or retirement; comes with a 25% government bonus',
          'Innovative Finance ISA — peer-to-peer lending; higher risk; not recommended for beginners',
        ],
        callout: {
          type: 'tip',
          text: 'You can\'t go back and use missed ISA allowances. Each tax year\'s £20,000 is use-it-or-lose-it. The earlier you start, the more years of tax-free compounding you lock in.',
        },
      },
    ],
    keyTakeaways: [
      'An ISA is a tax wrapper — it shelters your money from income tax, capital gains tax, and dividend tax',
      'Everything inside an ISA grows entirely tax-free — and you don\'t declare it on your tax return',
      'There are four types: Cash ISA, Stocks & Shares ISA, Lifetime ISA, and Innovative Finance ISA',
      'Each tax year gives you a £20,000 allowance — it\'s use-it-or-lose-it; unused allowance doesn\'t roll over',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Lesson 2
  // ─────────────────────────────────────────────────────────────────────────
  {
    num: 2,
    slug: 'lesson-2',
    title: 'Cash ISA vs Stocks & Shares ISA',
    duration: '8 min',
    intro: 'These are the two most common ISAs — and choosing between them is one of the most important financial decisions a young person makes. One is safe and predictable. The other carries more risk but far more long-term potential. Here\'s how to think about it.',
    sections: [
      {
        heading: 'The Cash ISA',
        paragraphs: [
          'A Cash ISA works exactly like a regular savings account — except the interest you earn is completely tax-free. You put money in, it earns interest, and you pay zero tax on those earnings.',
          'You can get easy-access Cash ISAs (withdraw anytime) or fixed-rate Cash ISAs (locked in for 1–5 years in exchange for a higher rate). Your money is protected by the FSCS up to £85,000 per institution.',
        ],
        callout: {
          type: 'example',
          text: 'Saving for a holiday or a car in the next year or two? A Cash ISA makes perfect sense. You get tax-free interest without any investment risk. The number in your account will only ever go up.',
        },
      },
      {
        heading: 'The Stocks & Shares ISA',
        paragraphs: [
          'A Stocks & Shares ISA lets you invest in stocks, ETFs, funds, bonds — and all growth, dividends, and capital gains inside are completely tax-free.',
          'Unlike a Cash ISA, returns are not guaranteed. The value of your investments goes up and down with the market. In a bad year, you might see your balance fall 20–30%. In a good decade, it might triple.',
          'Historically, a globally diversified index fund has returned around 7–10% per year on average — far above inflation and above any Cash ISA rate.',
        ],
        callout: {
          type: 'key',
          text: 'A Stocks & Shares ISA is for long-term money — money you won\'t need for at least 5 years. The longer your time horizon, the more the maths favours investing over cash.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'Which ISA is generally better for money you won\'t need for 10+ years?',
          options: [
            { text: 'Cash ISA — it\'s protected and you always know what you\'ll get', correct: false },
            { text: 'Stocks & Shares ISA — historically higher returns over long time horizons', correct: true },
            { text: 'They perform the same over 10 years', correct: false },
          ],
          explanation: 'Over long time horizons, equities have historically outperformed cash by a significant margin. Cash ISAs protect your money in the short term but rarely beat inflation meaningfully over 10+ years. The risk of being in cash too long is the slow erosion of your purchasing power.',
        },
      },
      {
        heading: 'The real cost of choosing cash over the long term',
        paragraphs: [
          'The numbers tell the story. Suppose you invest £5,000 today and leave it alone for 20 years:',
        ],
        list: [
          'Cash ISA at 4% average interest: ~£10,955',
          'Stocks & Shares ISA at 7% average return: ~£19,348',
          'Difference: ~£8,393 — almost double the final pot',
        ],
        callout: {
          type: 'example',
          text: 'These figures aren\'t a guarantee — stock markets can and do fall. But over every 20-year period in history, a globally diversified fund has delivered positive real returns. Time in the market is the key variable.',
        },
      },
      {
        heading: 'Can you have both?',
        paragraphs: [
          'Yes — since April 2024, you can hold multiple ISA types in the same tax year and split your £20,000 allowance however you like.',
          'You could put £10,000 into a Cash ISA for a house deposit you\'re building, and £10,000 into a Stocks & Shares ISA for long-term investing. Both sit within the same £20,000 annual limit.',
          'Note: if you also have a Lifetime ISA, the £4,000 you contribute there counts toward your overall £20,000 cap.',
        ],
        checkpoint: {
          type: 'reflection',
          prompt: 'If you had £3,000 to put in an ISA today and you won\'t need it for 8 years, which type would you choose — and why?',
          reveal: 'Most financial guidance points to a Stocks & Shares ISA for an 8-year time horizon. Cash might feel safer, but inflation steadily erodes its real value. A globally diversified fund has a strong historical track record over periods of 5+ years — and the ISA wrapper means you keep every penny of the growth.',
        },
      },
    ],
    keyTakeaways: [
      'Cash ISA = tax-free interest; low risk; best for short-term saving (under 5 years)',
      'Stocks & Shares ISA = tax-free investment growth; higher risk but significantly higher long-term potential',
      'Since April 2024 you can hold multiple ISA types in the same tax year and split your allowance freely',
      'Time horizon is the key decision: under 5 years → Cash ISA; 5+ years → Stocks & Shares ISA worth considering',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Lesson 3
  // ─────────────────────────────────────────────────────────────────────────
  {
    num: 3,
    slug: 'lesson-3',
    title: 'The Lifetime ISA — the 25% government bonus',
    duration: '10 min',
    intro: 'The Lifetime ISA is one of the most generous government savings schemes ever created — and one of the least understood. Every pound you put in gets topped up by 25p from the government. That\'s a guaranteed 25% return before your money does anything else. Here\'s exactly how it works — and the one important catch.',
    sections: [
      {
        heading: 'What is the Lifetime ISA?',
        paragraphs: [
          'The Lifetime ISA — usually called the LISA — was introduced in 2017 for UK residents aged 18–39. You can save up to £4,000 per tax year, and the government adds a 25% bonus on top of everything you put in, up to £1,000 per year.',
          'That bonus is paid monthly by HMRC directly into your LISA. It\'s real money — not a voucher, not a tax rebate. Free cash, added to your account.',
          'The LISA is designed for two specific purposes only: buying your first home, or retiring from age 60.',
        ],
      },
      {
        heading: 'The 25% bonus — in plain numbers',
        paragraphs: [
          'The maths is straightforward:',
        ],
        list: [
          'Put in £1,000 → government adds £250 → you have £1,250',
          'Put in £4,000 → government adds £1,000 → you have £5,000',
          'Max out every year for 10 years → £40,000 in + £10,000 bonus = £50,000 (before any investment growth)',
        ],
        callout: {
          type: 'key',
          text: 'The 25% bonus is calculated on your contributions, not the total. Put in £4,000, get £1,000 free. That\'s a guaranteed 25% return on your own money before your investments do anything at all.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'If you put £2,400 into a Lifetime ISA, how much will the government add?',
          options: [
            { text: '£240 — it\'s a 10% bonus', correct: false },
            { text: '£600 — it\'s a 25% bonus', correct: true },
            { text: '£1,000 — that\'s the maximum bonus', correct: false },
          ],
          explanation: 'The government adds 25% of whatever you contribute. 25% of £2,400 = £600. The maximum bonus per tax year is £1,000, which you receive when you contribute the full £4,000.',
        },
      },
      {
        heading: 'Using the LISA to buy your first home',
        paragraphs: [
          'If you\'re buying your first home, the LISA can be used toward the purchase — but there are rules:',
        ],
        list: [
          'The property must cost £450,000 or less',
          'Your LISA must have been open for at least 12 months before you use it',
          'The money goes directly to your solicitor at completion — you can\'t withdraw it yourself',
          'You must be a first-time buyer (never owned property before, anywhere in the world)',
        ],
        callout: {
          type: 'tip',
          text: 'Open your LISA as soon as possible — even with a small deposit of £1. The 12-month clock starts on the day you open it. You don\'t need to contribute much initially; it\'s the opening date that matters.',
        },
      },
      {
        heading: 'Using the LISA for retirement',
        paragraphs: [
          'From age 60, you can withdraw the full LISA balance — contributions, bonus, and any investment growth — completely tax-free, for any reason.',
          'Think of it as a pension alternative that gives you the bonus upfront rather than as a tax rebate on contributions. For basic-rate taxpayers, the 25% bonus is broadly equivalent to pension tax relief.',
          'Unlike a pension, you can\'t access a LISA before 60 without a penalty (more on that next). But as a supplement to a workplace pension, it\'s a powerful tool.',
        ],
      },
      {
        heading: 'The withdrawal penalty — this is the important catch',
        paragraphs: [
          'If you withdraw for any reason other than buying a qualifying first home or reaching age 60, you pay a 25% penalty on the entire withdrawal amount — your contributions and the bonus.',
          'The net result is that you get back slightly less than you put in. Specifically, you lose about 6.25% of your original contributions — not a disaster, but it means the LISA is not a flexible savings account.',
        ],
        callout: {
          type: 'example',
          text: 'You have £5,000 in your LISA (£4,000 you put in + £1,000 bonus). You withdraw it for a non-qualifying reason. The 25% penalty = £1,250. You receive £3,750 — £250 less than you contributed. The LISA is only a good deal if you use it for what it\'s designed for.',
        },
        checkpoint: {
          type: 'reflection',
          prompt: 'If you withdraw £5,000 from a LISA for a non-qualifying reason, approximately how much do you get back after the penalty?',
          reveal: '£3,750. The 25% withdrawal penalty applies to the entire amount — your contributions plus the government bonus. So £5,000 × 75% = £3,750. You\'d end up with less than you put in, which is why it\'s important to only open a LISA if you\'re confident about using it for its intended purpose.',
        },
      },
    ],
    keyTakeaways: [
      'The Lifetime ISA gives a 25% government bonus on up to £4,000 per year — that\'s up to £1,000 free annually',
      'It can only be used for: buying your first home (under £450,000), or retirement from age 60',
      'Open it early — even with £1 — because the 12-month waiting period starts on the day you open it',
      'Withdrawing for any other reason triggers a 25% penalty on the whole amount, leaving you slightly worse off than you started',
      'Available only to UK residents aged 18–39',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Lesson 4
  // ─────────────────────────────────────────────────────────────────────────
  {
    num: 4,
    slug: 'lesson-4',
    title: 'Your £20,000 annual allowance explained',
    duration: '7 min',
    intro: 'Every UK adult over 18 gets a fresh £20,000 ISA allowance every tax year — £20,000 you can shelter from tax, completely and permanently. But the rules around how it works are worth understanding properly, because getting it wrong can cause real problems.',
    sections: [
      {
        heading: 'What is the annual ISA allowance?',
        paragraphs: [
          'Each tax year, every UK adult can put up to £20,000 into ISAs. This is your ISA allowance. It applies across all your ISAs combined — not per ISA.',
          'The UK tax year runs from 6 April to 5 April. On 6 April each year, your allowance resets to a fresh £20,000. Any unused allowance from the previous year is gone — it doesn\'t roll over.',
        ],
        callout: {
          type: 'key',
          text: 'Your ISA allowance is per person, not per household. A couple can shelter up to £40,000 per year combined — £20,000 each, using their own separate allowances.',
        },
      },
      {
        heading: 'How to split the allowance across ISA types',
        paragraphs: [
          'You can spread your £20,000 across multiple ISA types in any combination you like. The only rule is that the total across all ISAs in a tax year must not exceed £20,000.',
          'One important detail: if you have a Lifetime ISA, your £4,000 LISA contribution counts toward your overall £20,000 total — it\'s not separate.',
        ],
        list: [
          '£4,000 LISA + £16,000 Stocks & Shares ISA = £20,000 ✓',
          '£10,000 Cash ISA + £10,000 Stocks & Shares ISA = £20,000 ✓',
          '£20,000 Stocks & Shares ISA = £20,000 ✓',
          '£4,000 LISA + £20,000 Stocks & Shares ISA = £24,000 ✗ (over the limit)',
        ],
        callout: {
          type: 'example',
          text: 'Junior ISAs (for under-18s) have a separate allowance — currently £9,000 per year — and don\'t count against your adult £20,000 limit.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'You contribute £4,000 to your Lifetime ISA this tax year. How much can you put into other ISAs?',
          options: [
            { text: '£20,000 — the LISA has a completely separate allowance', correct: false },
            { text: '£16,000 — the LISA contribution counts toward the £20,000 total', correct: true },
            { text: '£6,000 — the LISA counts double because of the government bonus', correct: false },
          ],
          explanation: 'The LISA\'s £4,000 contribution counts toward your overall £20,000 ISA allowance. So £20,000 − £4,000 = £16,000 left for any other ISA type that tax year.',
        },
      },
      {
        heading: 'Use it or lose it',
        paragraphs: [
          'This is one of the most important ISA rules — and the one most people learn too late.',
          'If you don\'t use your allowance before midnight on 5 April, it\'s gone forever. You can\'t "catch up" the following year — each year\'s allowance is entirely fresh and self-contained.',
          'You also can\'t contribute more than your remaining allowance to make up for previous years. If you\'ve never used an ISA before, you still only get £20,000 this year — not £20,000 per year you\'ve missed.',
        ],
        callout: {
          type: 'tip',
          text: 'Don\'t panic-invest just to use the allowance. But if you have cash sitting in a current account you won\'t need for a while, transferring it into your ISA before 5 April is almost always worth doing.',
        },
      },
      {
        heading: 'Transferring old ISAs — keeping your history',
        paragraphs: [
          'You can transfer an old ISA to a new provider without losing its tax-free status — and without using up any of your current year\'s allowance. Transfers are completely separate from contributions.',
          'Always use the official transfer process: contact the new provider and ask to transfer in. They handle the paperwork. Never withdraw your ISA money and re-deposit it — that would count as a new contribution (using your current year\'s allowance) and the old balance would lose its ISA status.',
        ],
        checkpoint: {
          type: 'reflection',
          prompt: 'You have £8,000 in an old Cash ISA from three years ago earning 1.5% interest. A new provider offers 4.5%. How do you move it without losing the tax-free status or eating into your annual allowance?',
          reveal: 'Use an ISA transfer — contact the new provider and ask to transfer the existing ISA in. They handle the process; the money moves tax-free, keeps its ISA status, and doesn\'t count against your current year\'s £20,000 allowance. Never withdraw and re-deposit — you\'d lose the tax wrapper on the old money and use up allowance you might want for new contributions.',
        },
      },
    ],
    keyTakeaways: [
      'The annual ISA allowance is £20,000 per person — it resets on 6 April each year',
      'This limit is shared across all your ISA types combined; LISA contributions count toward the £20,000',
      'Unused allowance is lost — it does not carry over to the following year',
      'Transfer old ISAs using the official transfer process to preserve their tax-free status without using your current allowance',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Lesson 5
  // ─────────────────────────────────────────────────────────────────────────
  {
    num: 5,
    slug: 'lesson-5',
    title: 'How to choose the right ISA for your situation',
    duration: '9 min',
    intro: 'You now know what each ISA does and how the allowance works. The harder question is: given where you actually are in life right now — your age, goals, and timeline — which ISA should you open first? This lesson gives you a framework to decide.',
    sections: [
      {
        heading: 'The three questions to ask first',
        paragraphs: [
          'Before choosing an ISA type, answer these three questions honestly:',
        ],
        list: [
          'When will I need this money? (short-term vs long-term)',
          'What am I saving for? (house, retirement, general wealth, no specific goal)',
          'How do I feel about the value going up and down?',
        ],
        callout: {
          type: 'key',
          text: 'Time horizon is the single most important variable. If you genuinely don\'t know when you\'ll need the money, assume long-term — and lean toward a Stocks & Shares ISA.',
        },
      },
      {
        heading: 'If you need the money in under 5 years',
        paragraphs: [
          'A Cash ISA is the right choice. You get the tax-free interest without exposing your money to market risk. If the value has to be there in two years for a holiday, car, or anything else time-sensitive, you can\'t afford a 30% market drop the month before you need it.',
          'Shop around — Cash ISA rates vary significantly between providers. Easy-access versions let you withdraw anytime; fixed-rate versions pay more in exchange for locking the money in for 1–5 years.',
        ],
        callout: {
          type: 'example',
          text: 'Good Cash ISA providers to compare: Marcus by Goldman Sachs, Chip, Paragon, Aldermore, and Trading 212 (cash savings product). Use MoneySavingExpert\'s best-buy tables to find the current top rates.',
        },
      },
      {
        heading: 'If you\'re saving for your first home',
        paragraphs: [
          'Open a Lifetime ISA first — if you\'re under 40 and have never owned property. The 25% government bonus is the best guaranteed return available anywhere.',
          'You can contribute up to £4,000 a year to the LISA, then use the remaining allowance for a Cash ISA (if you want low-risk savings) or a Stocks & Shares ISA (for longer-term money).',
          'One important constraint: the home must cost £450,000 or less. If you\'re targeting a property above that price, the LISA can\'t be used for it — though it can still be held for retirement.',
        ],
        callout: {
          type: 'tip',
          text: 'Even if buying a home feels years away, open a LISA today with £1. The 12-month waiting period starts from the day you open it — not the day you start contributing properly.',
        },
      },
      {
        heading: 'If you have money you won\'t need for 5+ years',
        paragraphs: [
          'A Stocks & Shares ISA is the standard recommendation. Invest in a low-cost, globally diversified index fund — one that tracks thousands of companies across the world — and leave it alone.',
          'Don\'t try to pick individual stocks. A global index fund outperforms most active fund managers over long periods, at a fraction of the cost.',
          'Good beginner platforms for a Stocks & Shares ISA: Vanguard Investor, InvestEngine, Trading 212, Freetrade.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'You\'re 22, renting, no immediate plans to buy a property, and you have £1,500 you won\'t need for at least 7 years. What\'s the best ISA for this money?',
          options: [
            { text: 'Cash ISA — it\'s safer and the number never goes down', correct: false },
            { text: 'Stocks & Shares ISA — long time horizon, better growth potential', correct: true },
            { text: 'Lifetime ISA — always the best choice for someone under 40', correct: false },
          ],
          explanation: 'With a 7-year horizon and no immediate home purchase, a Stocks & Shares ISA gives your money the best historical chance to grow. Cash ISAs rarely beat inflation over long periods. A LISA is only beneficial if you plan to buy a home under £450,000 or want a retirement top-up — not automatically right for everyone under 40.',
        },
      },
      {
        heading: 'If you\'re genuinely unsure',
        paragraphs: [
          'You don\'t have to choose one ISA and stick to it forever. You can have multiple. A common starting setup for a young person is:',
        ],
        list: [
          'Lifetime ISA — open it now, contribute what you can, lock in the bonus',
          'Stocks & Shares ISA — for everything else you can invest long-term',
          'Cash ISA — optional, for any short-term savings you want to keep tax-free',
        ],
        callout: {
          type: 'key',
          text: 'The "perfect" ISA choice matters far less than actually starting. Opening any ISA today — even with a small amount — beats theorising about which one to open for another year.',
        },
        checkpoint: {
          type: 'confidence',
          prompt: 'Do you feel confident choosing the right ISA type for your own situation?',
          fuzzyNote: 'Here\'s the short version: under 5 years → Cash ISA. Over 5 years → Stocks & Shares ISA. Buying a first home → open a LISA first. Genuinely unsure → Stocks & Shares ISA + LISA is a solid starting combination. You don\'t need to be perfect — you just need to start.',
        },
      },
    ],
    keyTakeaways: [
      'Under 5 years: Cash ISA. Over 5 years: Stocks & Shares ISA. First-time buyer: open a LISA first',
      'You can hold multiple ISA types — they complement each other, not compete',
      'A global index fund is a sensible default for a Stocks & Shares ISA — low cost, diversified, proven track record',
      'Starting with any ISA today beats spending months deciding which is theoretically perfect',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Lesson 6
  // ─────────────────────────────────────────────────────────────────────────
  {
    num: 6,
    slug: 'lesson-6',
    title: 'Opening your first ISA — a practical walkthrough',
    duration: '12 min',
    intro: 'Everything so far has been theory. This lesson is practical. We\'re going to walk through exactly what you need to open an ISA — the documents, the platforms, the decisions — so you can go from "I should open an ISA" to "I have opened my ISA" today.',
    sections: [
      {
        heading: 'What you need before you start',
        paragraphs: [
          'Opening an ISA is straightforward. Here\'s what you need:',
        ],
        list: [
          'UK residency — you must be resident in the UK for tax purposes',
          'Age 18+ for a Cash ISA, Stocks & Shares ISA, or Innovative Finance ISA; 18–39 for a Lifetime ISA',
          'Your National Insurance number — most platforms ask for this when you sign up',
          'A UK bank account to link and fund the ISA',
          'An email address and phone number for verification',
        ],
        callout: {
          type: 'key',
          text: 'You don\'t need much money to start. Most platforms have no minimum contribution, or a very low one (£1–£25). The account can sit open with a small amount while you build your savings habit.',
        },
      },
      {
        heading: 'Choosing a platform for a Cash ISA',
        paragraphs: [
          'Cash ISAs are available from most banks, building societies, and savings apps. The main thing to compare is the interest rate — and whether it\'s easy-access or fixed-rate.',
          'Easy-access Cash ISAs let you withdraw whenever you want. Fixed-rate Cash ISAs lock your money in for a set period (1–5 years) in exchange for a higher rate.',
        ],
        callout: {
          type: 'tip',
          text: 'Use MoneySuperMarket or Moneyfactscompare to find the best Cash ISA rates right now. Rates change frequently — the best deal today might not be the best deal in six months.',
        },
      },
      {
        heading: 'Choosing a platform for a Stocks & Shares ISA',
        paragraphs: [
          'This is the most important platform decision for most long-term investors. The key things to compare are: platform fee (usually an annual percentage of your balance) and fund charges (the OCF — Ongoing Charge Figure — of the fund you invest in).',
          'These fees come directly out of your returns every year. A platform charging 0.45% vs 0.15% might seem like a small difference — but on £20,000 over 20 years, it\'s thousands of pounds.',
        ],
        list: [
          'Vanguard Investor — simple interface, own funds only, low costs (great for beginners)',
          'InvestEngine — £0 platform fee, wide fund selection, very low cost overall',
          'Trading 212 — no minimum, fractional shares, easy to use app',
          'Freetrade — app-first, simple, some charges for premium features',
          'Hargreaves Lansdown — comprehensive but higher fees; better for larger portfolios',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'What\'s the most important factor when comparing Stocks & Shares ISA platforms?',
          options: [
            { text: 'Which one has the best-looking app', correct: false },
            { text: 'The annual platform fee and fund charges (OCF)', correct: true },
            { text: 'Whether the platform has "ISA" in its name', correct: false },
          ],
          explanation: 'Platform fees and fund charges reduce your returns every single year — quietly and automatically. A difference of 0.3% per year might sound tiny, but compounded over 20 years on a growing balance, it adds up to a significant sum. Always compare total costs before opening an account.',
        },
      },
      {
        heading: 'Choosing a platform for a Lifetime ISA',
        paragraphs: [
          'Fewer platforms offer LISAs than other ISA types. The main options are:',
        ],
        list: [
          'Moneybox — the most popular LISA app; offers cash and stocks & shares versions; simple to use',
          'AJ Bell — Stocks & Shares LISA; lower fees at larger balances',
          'Hargreaves Lansdown — Stocks & Shares LISA; comprehensive but pricier',
        ],
        callout: {
          type: 'example',
          text: 'Moneybox is the go-to for most first-time LISA openers. It\'s app-based, straightforward, and offers both a cash version (if you\'re buying soon) and a stocks version (if you\'re investing long-term).',
        },
      },
      {
        heading: 'The step-by-step process',
        paragraphs: [
          'Here\'s exactly how to open an ISA — from decision to done:',
        ],
        list: [
          'Step 1: Decide which ISA type you\'re opening first (use Lesson 5 if unsure)',
          'Step 2: Compare 2–3 platforms on fees, rates, and minimum investment',
          'Step 3: Download the app or go to the provider\'s website',
          'Step 4: Create an account — you\'ll need your NI number and may need to verify ID',
          'Step 5: Fund the ISA — transfer money from your linked bank account',
          'Step 6: If it\'s a Stocks & Shares ISA or LISA, choose what to invest in (or use auto-invest)',
          'Step 7: Set up a regular contribution if you can — even £25/month is a meaningful start',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Do you feel ready to open your first ISA?',
          fuzzyNote: 'You don\'t need to make the perfect choice. Pick one provider that looks simple and sign up. Vanguard Investor for a Stocks & Shares ISA, or Moneybox for a LISA, are both excellent starting points. You can always transfer to a different provider later if you change your mind — it\'s straightforward and doesn\'t affect your tax-free status.',
        },
      },
      {
        heading: 'After you\'ve opened it',
        paragraphs: [
          'You don\'t need to report your ISA to HMRC — that\'s already handled by your provider. It won\'t appear anywhere on your tax return.',
          'Set up a regular payment if you can. Even a small standing order on payday treats ISA saving like a bill — something that just happens automatically, before you spend the money on anything else.',
          'Resist the urge to check your balance every day. Markets move, balances fluctuate, and checking obsessively leads to anxiety and bad decisions. A quarterly or biannual check is plenty.',
        ],
        callout: {
          type: 'tip',
          text: 'You\'ve completed ISAs & Tax-Free Saving. The natural next step is Stocks, ETFs & Funds — which goes deeper on what to actually put inside your Stocks & Shares ISA and how to build a portfolio.',
        },
        checkpoint: {
          type: 'reflection',
          prompt: 'What\'s one thing that has been stopping you from opening an ISA until now — and does it still feel like a real barrier?',
          reveal: 'Most people say: "I didn\'t know how" or "I thought I needed a lot of money." Hopefully this course has shown that neither is true. The process takes about 10 minutes. You can start with £1. The barrier is almost always just not knowing where to begin — and now you do.',
        },
      },
    ],
    keyTakeaways: [
      'All you need to open an ISA: UK residency, NI number, a linked bank account — that\'s it',
      'For Cash ISA: compare rates on MoneySuperMarket or Moneyfactscompare',
      'For Stocks & Shares ISA: Vanguard Investor and InvestEngine are great starting points for beginners',
      'For a Lifetime ISA: Moneybox is the most popular app for first-time openers',
      'Set up a regular contribution, even a small one — consistency beats timing every time',
    ],
  },
]

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find(l => l.slug === slug)
}

export function getAdjacentLessons(slug: string): { prev: Lesson | null; next: Lesson | null } {
  const idx = lessons.findIndex(l => l.slug === slug)
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  }
}

import type { Lesson } from '@/lib/lessons/investing-from-scratch'
export type { Callout, QuizCheckpoint, ConfidenceCheckpoint, ReflectionCheckpoint, Checkpoint, Section, Lesson } from '@/lib/lessons/investing-from-scratch'

export const lessons: Lesson[] = [
  {
    num: 1,
    slug: 'lesson-1',
    title: 'Why pensions matter even at 19',
    duration: '8 min',
    intro: 'Pensions are the financial product that almost everyone knows they should care about and almost no one under 30 actually does. This lesson makes the case — with real numbers — for why starting now is one of the highest-value financial decisions you can make.',
    sections: [
      {
        heading: 'What a pension actually is',
        paragraphs: [
          'A pension is an investment account with a specific purpose: providing you with income in retirement. It works like any other investment account — you put money in, it gets invested, and it (hopefully) grows over time.',
          'What makes it special is the tax treatment. In the UK, contributions to a pension attract income tax relief from the government. If you\'re a basic-rate taxpayer, every £80 you put into a pension costs you just £80 — but your pension receives £100. The government tops it up by 25%.',
          'Inside the pension, that money can grow completely free of UK income tax and capital gains tax — just like an ISA. The difference is when you can access it: currently 57 (rising to 57 in 2028), not whenever you want.',
        ],
        callout: {
          type: 'key',
          text: 'The core pension advantage: tax relief on the way in + tax-free growth inside. If you pay income tax, you get an immediate 25% boost to every contribution. Nothing else in UK personal finance does this.',
        },
      },
      {
        heading: 'The number that changes everything',
        paragraphs: [
          'Here\'s the calculation most people never see. Assume a 7% average annual return:',
        ],
        list: [
          'Start at 20, invest £100/month for 10 years (then stop): pot at 65 = ~£264,000',
          'Start at 30, invest £100/month for 35 years (until 65): pot at 65 = ~£173,000',
          'The person who started at 20 invested for only 10 years. The person who started at 30 invested for 35 years. Yet the early starter ends up with ~£90,000 more.',
        ],
        callout: {
          type: 'example',
          text: 'This is compound interest at work over long periods. The money you put in at 20 has 45 years to compound. Money put in at 50 has only 15. The early years are worth far more than the later ones — which is exactly why the financial services industry doesn\'t shout about this: they make more money when you engage with complex pension products later in life.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'Person A invests £100/month from age 20 to 30, then stops. Person B invests £100/month from age 30 to 65. Who ends up with more money at 65? (assume 7% annual return)',
          options: [
            { text: 'Person B — they invested for 35 years vs 10', correct: false },
            { text: 'Person A — the 10 years of early compounding outweighs 35 years starting later', correct: true },
            { text: 'They end up with roughly the same amount', correct: false },
          ],
          explanation: 'Person A ends up with significantly more (~£264k vs ~£173k) despite investing for far fewer years. This is the power of starting early. The money invested at 20–30 has decades of compounding that no amount of catching up can fully replicate.',
        },
      },
      {
        heading: 'Why people don\'t start — and why those reasons don\'t hold',
        paragraphs: [
          '"I\'ll sort it out when I\'m older." The maths shows this is one of the most expensive decisions you can make. Every year you delay is compounding lost forever — not just delayed.',
          '"I can\'t afford to." You can put as little as £20/month into a pension. That is less than most people spend on subscriptions they barely use.',
          '"Pensions are too complicated." This course exists to fix that. By the end of lesson 2, you\'ll understand more about pensions than most people twice your age.',
          '"I might need the money." This is a valid concern. Pensions are locked until 57, which is why ISAs and pensions should both be part of the plan — not one or the other. But the tax relief on pensions is so generous that you\'d be giving up real free money by ignoring them entirely.',
        ],
        checkpoint: {
          type: 'reflection',
          prompt: 'Before this lesson, how often did you think about your pension?',
          reveal: 'Most young people rarely or never think about pensions — which is understandable but financially costly. The good news: you\'re now in the small minority who has started. Every lesson from here gives you a concrete piece of knowledge to act on.',
        },
      },
      {
        heading: 'The state pension: not a plan',
        paragraphs: [
          'The UK State Pension pays a maximum of £11,502.40 per year (2024/25) — about £960/month. The full new state pension requires 35 qualifying years of National Insurance contributions.',
          'This is a baseline, not a retirement income. The average UK retirement is 20+ years. Trying to live on £960/month in London or any major city would require extremely frugal living.',
          'The state pension age is currently 66 and rising — to 67 by 2028 and likely to 68 in the 2030s. You cannot rely on it as your primary retirement income plan.',
        ],
        callout: {
          type: 'key',
          text: 'The state pension gives you a floor, not a ceiling. Most people need 2–3× the state pension to maintain a comfortable lifestyle in retirement. Building that gap requires your own contributions — ideally starting in your 20s.',
        },
      },
    ],
    keyTakeaways: [
      'A pension is a tax-advantaged investment account — basic-rate taxpayers get 25% tax relief on every contribution',
      'Starting at 20 with small amounts beats starting at 30 with large ones — compound interest is time-sensitive',
      'The state pension (max ~£11,500/year) is a baseline, not a retirement plan',
      'The most common reasons for delaying (cost, complexity, accessibility) don\'t hold up under scrutiny',
    ],
  },

  {
    num: 2,
    slug: 'lesson-2',
    title: 'Workplace pensions and auto-enrolment — the free money explained',
    duration: '12 min',
    intro: 'In 2012, the UK government introduced auto-enrolment — a policy that automatically puts eligible workers into a workplace pension. It is genuinely one of the best financial policies the UK has ever introduced. If you\'re in or approaching employment, this lesson could be the most valuable 12 minutes you spend this year.',
    sections: [
      {
        heading: 'What is auto-enrolment?',
        paragraphs: [
          'Auto-enrolment means that if you\'re an eligible worker, your employer must automatically sign you up to a workplace pension. You don\'t have to ask. You don\'t have to do anything.',
          'You can opt out — but doing so means you give up your employer\'s contributions. More on why this is a very expensive decision shortly.',
          'Eligibility criteria: you must be aged 22 or over, earn more than £10,000/year, and be working in the UK. Even if you earn below the threshold, you can ask to be enrolled — your employer won\'t be required to contribute, but you\'ll still benefit from tax relief.',
        ],
      },
      {
        heading: 'The minimum contribution rules',
        paragraphs: [
          'Under current rules, a minimum of 8% of your qualifying earnings must be paid into your workplace pension. But crucially, this 8% is split:',
        ],
        list: [
          'You contribute: at least 5% of qualifying earnings (including tax relief)',
          'Your employer contributes: at least 3% of qualifying earnings',
          'Total: minimum 8%',
        ],
        callout: {
          type: 'key',
          text: 'Your employer\'s contribution is free money added to your pension on top of your salary. If you opt out of your workplace pension, you lose this immediately. There is no other financial product in the UK that guarantees an instant 3%+ return before your money has been invested at all.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'You earn £28,000/year. Your employer offers a workplace pension with 5% employee + 5% employer contributions. You opt out. What do you lose per year?',
          options: [
            { text: 'Nothing — you keep your full salary', correct: false },
            { text: 'Approximately £1,400 in employer contributions, plus tax relief on your own contributions', correct: true },
            { text: 'Only the tax relief — around £350', correct: false },
          ],
          explanation: '5% employer contribution on £28,000 = £1,400/year — gone the moment you opt out. Plus you lose the government top-up on your own contributions. Opting out of a workplace pension with employer matching is turning down part of your pay.',
        },
      },
      {
        heading: 'Qualifying earnings: what does that actually mean?',
        paragraphs: [
          'Auto-enrolment contributions are calculated on "qualifying earnings" — which in 2024/25 means earnings between £6,240 and £50,270 per year.',
          'This band is called the qualifying earnings band. If you earn £25,000, your qualifying earnings are £25,000 − £6,240 = £18,760. The minimum 8% is applied to this figure, not your whole salary.',
          'However, many employers calculate contributions on your full salary — this is better for you. Check your employment contract or pension scheme documentation.',
        ],
      },
      {
        heading: 'Employer matching: don\'t leave it on the table',
        paragraphs: [
          'Many employers offer more than the legal minimum — and some will match contributions beyond the basic level. For example:',
        ],
        list: [
          'Employer matches up to 5% — if you put in 5%, they put in 5%',
          'Employer matches up to 10% — if you put in 10%, they put in 10%',
          'Employer offers a defined contribution scheme at 8% + 8% — regardless of your own contribution',
        ],
        callout: {
          type: 'tip',
          text: 'Always contribute enough to get the maximum employer match. If your employer matches up to 5% and you only contribute 3%, you\'re leaving 2% of your salary on the table. That\'s money being given to you that you\'re choosing not to take.',
        },
      },
      {
        heading: 'How workplace pensions are invested',
        paragraphs: [
          'Most workplace pension schemes offer a default investment fund — usually a multi-asset fund that automatically reduces risk as you approach retirement (called a "lifestyle" or "target date" fund).',
          'You can usually choose other funds within the scheme. Many schemes now offer index-tracker options at very low cost. If yours does, switching to a low-cost global index fund from the default is often sensible — defaults are sometimes expensive actively managed funds.',
          'To see what your pension is invested in, log in to your pension provider\'s portal. The main UK workplace pension providers are Nest, The People\'s Pension, Aviva, Legal & General, and Scottish Widows.',
        ],
        checkpoint: {
          type: 'reflection',
          prompt: 'If you\'re currently employed (or about to be): do you know whether you\'re enrolled in a workplace pension, who your provider is, and how much your employer contributes?',
          reveal: 'Most people don\'t know this — including many experienced workers. Your payslip should show pension deductions, and your employer\'s HR team can tell you the provider and contribution rates. If you\'re not yet employed, set a reminder to check these things on your first week of work.',
        },
      },
      {
        heading: 'The Nest pension: what students often encounter first',
        paragraphs: [
          'Nest (National Employment Savings Trust) is the UK government-backed workplace pension scheme. Many first employers and part-time employers use Nest as their auto-enrolment provider.',
          'If you work part-time as a student, you might already be contributing to Nest without realising it. Log in at nestpensions.org.uk to see your balance and transfer old pots if you have them.',
          'Small amounts accumulated through student or part-time jobs are worth checking — the early compounding, even on modest sums, adds up over 40+ years.',
        ],
      },
    ],
    keyTakeaways: [
      'Auto-enrolment automatically signs eligible workers (22+, earning £10k+) into a workplace pension',
      'Minimum contributions: at least 5% from you, 3% from your employer — 8% total on qualifying earnings',
      'Employer contributions are free money — opting out is turning down part of your pay',
      'Always contribute enough to get the maximum employer match; check what your employer actually offers',
    ],
  },

  {
    num: 3,
    slug: 'lesson-3',
    title: 'What is a SIPP? Taking control of your own pension',
    duration: '11 min',
    intro: 'A workplace pension is set up by your employer. But what if you\'re self-employed, a freelancer, or want more control over where your pension is invested? That\'s where a SIPP comes in. Understanding the difference could save you thousands over a working lifetime.',
    sections: [
      {
        heading: 'SIPP: the basics',
        paragraphs: [
          'SIPP stands for Self-Invested Personal Pension. It\'s a pension you open yourself — not through an employer — that gives you full control over where the money is invested.',
          'Like all UK pensions, contributions attract tax relief and the money grows free of income tax and capital gains tax inside the wrapper. The rules about when you can access it (currently 55, rising to 57 in 2028) are the same as workplace pensions.',
          'The key difference from a workplace pension: there\'s no employer contribution to a SIPP. You\'re funding it entirely yourself (plus the government\'s tax relief top-up).',
        ],
        callout: {
          type: 'key',
          text: 'Tax relief on a SIPP works the same as any other pension: basic-rate taxpayers contribute £80 and the government adds £20, making £100 in the pension. Higher-rate taxpayers can reclaim an additional 20% through their self-assessment tax return.',
        },
      },
      {
        heading: 'Who should consider a SIPP?',
        paragraphs: [],
        list: [
          'Self-employed people: no employer to provide a workplace pension, so a SIPP is the main vehicle for pension saving',
          'Freelancers and contractors: same as above',
          'Employees who want more investment choice: workplace pension funds are limited; a SIPP offers access to thousands of ETFs and funds',
          'Anyone with old workplace pensions to consolidate: a SIPP can hold multiple old workplace pensions in one place',
          'Higher earners who want to maximise tax relief: contribute up to the Annual Allowance (currently £60,000 or 100% of earnings, whichever is lower)',
        ],
      },
      {
        heading: 'SIPP vs workplace pension: when does each win?',
        paragraphs: [
          'The workplace pension wins when:',
        ],
        list: [
          'Your employer contributes — this is free money you can\'t get elsewhere',
          'The default investment options are reasonable and low-cost',
          'You want simplicity — contributions deducted directly from payroll',
        ],
      },
      {
        paragraphs: [
          'The SIPP wins when:',
        ],
        list: [
          'You\'re self-employed or the employer doesn\'t contribute',
          'Your workplace pension investment options are poor or expensive',
          'You want to consolidate old pensions into one place',
          'You want to hold specific ETFs or funds not available in your workplace scheme',
        ],
        callout: {
          type: 'tip',
          text: 'For most employees, the answer is both. Max the workplace pension first (to capture employer contributions), then use a SIPP for any additional contributions beyond what the employer matches.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'You\'re self-employed and earn £40,000/year. Which pension vehicle makes most sense?',
          options: [
            { text: 'A workplace pension — it\'s always better', correct: false },
            { text: 'A SIPP — there\'s no employer to contribute to a workplace pension', correct: true },
            { text: 'No pension — just use an ISA instead', correct: false },
          ],
          explanation: 'Self-employed people have no access to employer contributions, so a workplace pension isn\'t an option. A SIPP gives you the same tax relief (25% top-up for basic-rate taxpayers) and tax-free growth. ISAs are useful but lack the tax relief on contributions — ignoring a SIPP means leaving a 25% government top-up on the table.',
        },
      },
      {
        heading: 'SIPP providers in the UK',
        paragraphs: [
          'Several platforms offer good SIPPs for UK investors. Key considerations: annual platform fee, investment options available, and ease of use.',
        ],
        list: [
          'Vanguard SIPP — 0.15% platform fee (capped at £375/year). Limited to Vanguard funds only but excellent for low-cost index investing.',
          'Hargreaves Lansdown SIPP — 0.45% fee (capped at £200/year for shares/ETFs). Wide investment choice, very reputable, good for larger pots.',
          'AJ Bell SIPP — 0.25% fee (capped at £120/year for shares/ETFs). Strong choice of ETFs and funds.',
          'InvestEngine SIPP — no platform fee for DIY investing. Commission-free ETFs. Good for cost-conscious investors.',
          'Nutmeg SIPP — managed pension service, higher fees but fully hands-off. Suited to those who don\'t want to pick funds.',
        ],
        callout: {
          type: 'tip',
          text: 'Platform fee caps matter more as your SIPP grows. A 0.45% platform fee on a £10,000 SIPP = £45/year. On a £300,000 SIPP = £900/year (before any cap). Review platform costs as your pot grows — and don\'t be afraid to transfer to a cheaper provider.',
        },
      },
      {
        heading: 'The Annual Allowance and how contributions work',
        paragraphs: [
          'You can contribute up to the Annual Allowance into pensions each tax year. For 2024/25 this is £60,000 or 100% of your UK earnings — whichever is lower.',
          'This includes your own contributions AND employer contributions. For most people on moderate incomes, this limit is never reached.',
          'Contributions are made as gross amounts into the SIPP. The tax relief happens in two ways:',
        ],
        list: [
          'Basic-rate tax relief: most SIPP providers claim this automatically on your behalf. You pay £800, the provider claims £200 from HMRC and adds it to your SIPP.',
          'Higher and additional-rate relief: must be claimed yourself via self-assessment tax return. If you pay 40% income tax, you get another 20% back on top — meaning a £1,000 pension contribution effectively costs you £600.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Clear on when a SIPP makes sense and how the tax relief works?',
          fuzzyNote: 'Core point: a SIPP is your own pension — you open it, you choose the investments, you receive the government top-up. For basic-rate taxpayers, every £80 paid in becomes £100 in the SIPP. For higher-rate taxpayers, the effective cost is even lower after claiming the additional relief through self-assessment.',
        },
      },
    ],
    keyTakeaways: [
      'A SIPP is a self-opened pension with full investment control — same tax relief and rules as workplace pensions',
      'Key use cases: self-employed, freelance, consolidating old pensions, or wanting better investment options',
      'For employees: max the workplace pension first (employer contributions), then use a SIPP for extras',
      'UK SIPP providers: Vanguard (lowest cost for index funds), HL and AJ Bell (broader choice), InvestEngine (fee-free ETF option)',
    ],
  },

  {
    num: 4,
    slug: 'lesson-4',
    title: 'The Lifetime ISA — a pension alternative for first-time buyers',
    duration: '9 min',
    intro: 'The Lifetime ISA (LISA) is one of the more unusual products in UK personal finance — a hybrid between an ISA and a pension that\'s particularly useful for two goals: buying your first home and saving for retirement. In this lesson, we explain exactly how it works, who it suits, and the important restrictions.',
    sections: [
      {
        heading: 'What is a Lifetime ISA?',
        paragraphs: [
          'A Lifetime ISA is a savings and investment account available to UK residents aged 18–39. You can open one up to the day before your 40th birthday.',
          'The headline benefit: the government adds a 25% bonus on everything you save, up to a maximum of £4,000 per year. That means up to £1,000 in free government money every tax year.',
          'The money can only be used for two purposes: buying your first home (on a property worth up to £450,000) or retirement from age 60. Any other withdrawal incurs a 25% penalty — which effectively claws back the bonus and then some.',
        ],
        callout: {
          type: 'key',
          text: '25% government bonus on up to £4,000/year = up to £1,000 free per year. Over 10 years of saving £4,000/year, the government adds £10,000 in bonuses alone — before any investment returns.',
        },
      },
      {
        heading: 'LISA vs pension: how do they compare?',
        paragraphs: [
          'Both offer 25% government top-ups for basic-rate taxpayers. But the mechanics differ significantly:',
        ],
        list: [
          'Access age: LISA from 60; pension from 57 (currently)',
          'Flexibility: LISA can be used for first home purchase; pension cannot',
          'Employer contributions: pension has employer matching; LISA does not',
          'Tax on withdrawal: pension income is taxable in retirement; LISA withdrawals are completely tax-free',
          'Contribution limits: LISA max £4,000/year; pension Annual Allowance is £60,000/year',
        ],
        callout: {
          type: 'example',
          text: 'If you put £4,000 into a LISA: government adds £1,000 = £5,000 in the account. If you put £4,000 into a pension: government adds £1,000 = £5,000. So far, identical for basic-rate taxpayers. Differences emerge at withdrawal: pension income is taxed; LISA withdrawals are tax-free. For higher-rate taxpayers, pensions are better (more tax relief on the way in).',
        },
        checkpoint: {
          type: 'quiz',
          question: 'You\'re 26, saving for your first home in the next 4 years. You have £4,000 to invest. Which account is better?',
          options: [
            { text: 'A regular Stocks & Shares ISA', correct: false },
            { text: 'A Lifetime ISA — you get a 25% government bonus on your contributions', correct: true },
            { text: 'A standard pension — higher tax relief', correct: false },
          ],
          explanation: 'For a first home purchase, the LISA is the best vehicle. You get a 25% bonus on contributions, the money can be accessed at purchase, and inside a stocks-and-shares LISA the investments can also grow tax-free. A pension can\'t be used for house purchases, and a regular ISA offers no government bonus.',
        },
      },
      {
        heading: 'The 25% withdrawal penalty: what it actually means',
        paragraphs: [
          'The LISA is designed for two uses. Use it for anything else and you pay a 25% penalty on the withdrawal amount. This sounds like "you just lose the bonus" — but it\'s worse than that.',
          'If you put in £100, the government adds £25, giving you £125. If you withdraw early, the penalty is 25% of £125 = £31.25. You get £93.75 back from your original £100. You lose £6.25 of your own money, not just the bonus.',
          'This is why the LISA is only suitable for money you\'re genuinely happy to lock away until age 60 — or for a first home purchase. Don\'t treat it as a flexible savings account.',
        ],
        callout: {
          type: 'tip',
          text: 'Think of the LISA\'s three rules: (1) first home purchase only on properties up to £450,000; (2) retirement from 60; (3) terminal illness. Everything else incurs the penalty. Make sure your planned use falls clearly into one of these categories before contributing.',
        },
      },
      {
        heading: 'Stocks & Shares LISA vs Cash LISA',
        paragraphs: [
          'Like regular ISAs, LISAs come in two forms:',
        ],
        list: [
          'Cash LISA: your money earns interest. Lower risk but limited growth potential. Better if you\'re buying in 1–3 years.',
          'Stocks & Shares LISA: your money is invested in funds or ETFs. Higher potential growth, but value can fall. Better if you\'re buying in 5+ years or using it for retirement.',
        ],
      },
      {
        paragraphs: [
          'For retirement use with a 20–30+ year horizon, a Stocks & Shares LISA makes sense. For a home purchase in under 3 years, the risk of a market fall right before you need the money argues for cash.',
        ],
      },
      {
        heading: 'Should you use a LISA alongside a pension?',
        paragraphs: [
          'For most young people, the answer is yes — but in the right order:',
        ],
        list: [
          '1. Max your workplace pension to get all employer matching — this is your highest-return first step',
          '2. Open a LISA if you\'re buying a first home — the £1,000/year bonus is significant',
          '3. Continue SIPP contributions if you have more to invest and want additional pension savings',
          '4. ISA for everything else — flexible, accessible, tax-efficient for shorter-term goals',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Do you feel clear on what the LISA is for and who it suits?',
          fuzzyNote: 'Key point: the LISA\'s 25% bonus is identical to basic-rate pension tax relief, but the LISA has a strict withdrawal penalty for non-qualified uses. It\'s best for first-time buyers (property up to £450k) or as a retirement supplement. Don\'t contribute money you might need before 60 or before buying a home.',
        },
      },
    ],
    keyTakeaways: [
      'Lifetime ISA: 25% government bonus on up to £4,000/year = up to £1,000 free per year',
      'Can only be used for: first home (property ≤£450k) or retirement from age 60; any other use incurs a penalty',
      'The 25% penalty effectively claws back more than the bonus — don\'t use a LISA as a flexible pot',
      'Stack: workplace pension (employer match) → LISA (first home/retirement) → SIPP → regular ISA',
    ],
  },

  {
    num: 5,
    slug: 'lesson-5',
    title: 'How much do you actually need to retire?',
    duration: '14 min',
    intro: 'This is the question most people avoid because the answer feels abstract and far away. But having a number — even a rough one — completely changes how you save. This lesson gives you the tools to work out what retirement actually costs, what pot size you need, and what that means for how much to save today.',
    sections: [
      {
        heading: 'The Retirement Living Standards',
        paragraphs: [
          'The Pensions and Lifetime Savings Association (PLSA) publishes annual Retirement Living Standards — benchmarks for what different retirement lifestyles actually cost in the UK. The 2024/25 figures for a single person:',
        ],
        list: [
          'Minimum standard: £14,400/year — covers essentials with some social activities, no car, basic holidays',
          'Moderate standard: £31,300/year — greater financial security, one foreign holiday, some social activities and subscriptions',
          'Comfortable standard: £43,100/year — more financial freedom, two foreign holidays, regular activities, car ownership',
        ],
        callout: {
          type: 'key',
          text: 'The State Pension currently pays up to £11,502/year. At the Minimum standard of £14,400/year, you only need to supplement by ~£3,000/year from your own savings. At the Comfortable standard, you need an additional ~£31,600/year — which requires a very substantial pension pot.',
        },
      },
      {
        heading: 'The 4% rule: how to size your pot',
        paragraphs: [
          'The "4% rule" is a widely-used rule of thumb for retirement planning. It says: if you withdraw 4% of your portfolio each year, your money should last 30 years (historically, it has).',
          'Working backwards: to generate £X per year, you need a pot of 25× that amount.',
        ],
        list: [
          'Need £10,000/year from investments → need a pot of £250,000',
          'Need £20,000/year from investments → need a pot of £500,000',
          'Need £30,000/year from investments → need a pot of £750,000',
        ],
        callout: {
          type: 'example',
          text: 'You want the Moderate standard (£31,300/year). State pension covers ~£11,500. You need £19,800/year from your own savings. At the 4% rule, that requires a pot of £19,800 × 25 = £495,000. That\'s the target. Everything in this course is about helping you get there.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'You want £25,000/year from your pension in retirement. The state pension covers £11,500. You need £13,500/year from your own savings. Using the 4% rule, what pot do you need?',
          options: [
            { text: '£135,000', correct: false },
            { text: '£337,500', correct: true },
            { text: '£540,000', correct: false },
          ],
          explanation: '£13,500 × 25 = £337,500. That\'s the pot needed to sustainably withdraw £13,500/year for 30 years under the 4% rule. Sounds large — but achieved over a 40-year working life with compound growth, it\'s entirely reachable with consistent saving.',
        },
      },
      {
        heading: 'Working backwards: how much to save per month',
        paragraphs: [
          'Once you have a target pot, you can work out the monthly contribution needed to hit it. Assume a 5% real annual return (i.e., after inflation) inside a pension:',
        ],
        list: [
          'Target £250,000 in 40 years → save ~£190/month',
          'Target £250,000 in 30 years → save ~£310/month',
          'Target £500,000 in 40 years → save ~£375/month',
          'Target £500,000 in 30 years → save ~£615/month',
        ],
        callout: {
          type: 'tip',
          text: 'Remember: these are your contributions. Tax relief and employer contributions reduce what you personally need to put in. At 5% employee + 5% employer, you\'re putting in half and your employer is putting in the other half. Your effective contribution toward a £500,000 pot over 40 years might only need to be ~£190/month from your own pocket.',
        },
      },
      {
        heading: 'Inflation and real vs nominal returns',
        paragraphs: [
          'A £500,000 pot in 2064 will not buy the same lifestyle as £500,000 does today. At 2.5% inflation for 40 years, today\'s £500,000 purchasing power requires a nominal pot of about £1.35 million in 2064.',
          'This sounds alarming but it works both ways: your investments should also grow in nominal terms. The 5% real return assumption already accounts for this — it means 5% above inflation, not before it.',
          'The practical implication: use today\'s money values for your target, and use real (inflation-adjusted) return assumptions in your calculations. Don\'t compare a nominal pension forecast from 2064 to today\'s spending figures.',
        ],
      },
      {
        heading: 'Pension drawdown vs annuity',
        paragraphs: [
          'When you reach retirement age, you have a choice about how to access your pension pot:',
        ],
        list: [
          'Drawdown: keep the money invested and withdraw as needed. Flexible and can continue growing, but you carry the investment risk. Most common approach under modern pension rules.',
          'Annuity: exchange your pot for a guaranteed income for life, provided by an insurance company. No investment risk, but inflexible and no growth. Rates have improved significantly with rising interest rates.',
          '25% tax-free lump sum: you can take up to 25% of your pension (up to £268,275 lifetime limit) as a tax-free lump sum when you access it. The rest is taxable as income when withdrawn.',
        ],
        callout: {
          type: 'key',
          text: 'Most modern financial planners lean toward drawdown for flexibility — but a blend of drawdown and a small annuity (to cover essential expenses as guaranteed income) is increasingly popular. You don\'t need to decide now — but knowing the options exists helps you plan.',
        },
        checkpoint: {
          type: 'reflection',
          prompt: 'Based on the PLSA standards and the 4% rule: what retirement lifestyle do you want, and what pot does that suggest you\'re targeting?',
          reveal: 'There\'s no universal right answer — it depends on your lifestyle expectations, where you plan to live, and how much you rely on the state pension. But having even a rough number (e.g. "I want the Moderate standard, so I\'m targeting roughly £500k") is dramatically more useful than no number at all. That target drives every savings decision from here.',
        },
      },
      {
        heading: 'The complete picture: pulling it all together',
        paragraphs: [
          'You\'ve now covered everything in this course. Here\'s how it fits together:',
        ],
        list: [
          'Start early — compounding makes early contributions worth more than later, larger ones',
          'Max the workplace pension first — employer contributions are free money you can\'t get elsewhere',
          'Use a SIPP for additional savings and if you\'re self-employed',
          'Consider a LISA if you\'re a first-time buyer — the 25% bonus matches pension tax relief with added flexibility for property purchase',
          'Target a pot of 25× your annual income need from investments (4% rule)',
          'Consistent monthly contributions into low-cost index funds do the rest',
        ],
        callout: {
          type: 'tip',
          text: 'You\'ve finished the course. The single most valuable next action: if you\'re employed, log in to your workplace pension, confirm the contribution rates, and make sure you\'re claiming the full employer match. If you\'re self-employed, open a SIPP today. Both take under 30 minutes and could be worth hundreds of thousands of pounds over a lifetime.',
        },
      },
    ],
    keyTakeaways: [
      'PLSA standards: Minimum £14,400/year, Moderate £31,300/year, Comfortable £43,100/year (single person, 2024/25)',
      '4% rule: divide your required annual income (above the state pension) by 4% = the pot you need (or multiply by 25)',
      'Consistent monthly contributions into low-cost pension funds across a 40-year career make these targets achievable',
      'At retirement: drawdown (flexible, invested) vs annuity (guaranteed income) — most use drawdown; 25% can be taken tax-free',
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

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
  {
    num: 1,
    slug: 'lesson-1',
    title: 'What is investing — and what it isn\'t',
    duration: '5 min',
    intro: 'Most people think they know what investing is — until someone asks them to explain it. Then it gets fuzzy. Is it the stock market? Buying property? Starting a business? In this lesson, we clear up the definition so you start on solid ground.',
    sections: [
      {
        heading: 'The one-sentence definition',
        paragraphs: [
          'Investing means putting your money into something with the expectation of making a profit over time.',
          'That\'s it. There\'s no maths formula. No secret handshake. Just: money in → hopefully more money out, later.',
          'The key word is "time". Investing isn\'t a get-rich-quick scheme. It\'s a get-richer-slowly scheme. And slowly, over years and decades, is how real wealth is built.',
        ],
      },
      {
        heading: 'What investing is NOT',
        paragraphs: [
          'Investing is not gambling. When you gamble, the odds are designed to work against you — the house always wins in the long run. When you invest, you\'re betting that companies and economies will grow over time. Historically, they have.',
          'Investing is not speculating. Speculation means buying something purely because you hope the price will go up, with no underlying logic. Buying a meme stock because "everyone\'s talking about it" is speculating. Buying a low-cost global fund because you expect the world economy to grow over 30 years is investing.',
          'Investing is not the same as saving. Saving means keeping money safe in cash — in a bank account or ISA. Saving protects your money. Investing grows it, but with some risk. We cover this properly in Lesson 5.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'Which of these is actually investing — rather than gambling or speculation?',
          options: [
            { text: 'Buying a lottery ticket hoping to win big', correct: false },
            { text: 'Buying a global index fund and holding it for 20 years', correct: true },
            { text: 'Buying a rare sneaker collection because the price might go up', correct: false },
          ],
          explanation: 'Investing means backing something with real, underlying logic — like the long-term growth of global economies. Gambling relies on chance; speculation relies on price hope alone.',
        },
      },
      {
        heading: 'What can you actually invest in?',
        paragraphs: [
          'There are several main asset classes — categories of things people invest in. Each has a different risk profile and return expectation. We\'ll explore them properly in Lesson 6, but here\'s the overview:',
        ],
        list: [
          'Stocks — small ownership stakes in companies (Apple, Tesco, Barclays, etc.)',
          'Bonds — loans you make to governments or companies, in exchange for interest',
          'Funds & ETFs — collections of many investments bundled together',
          'Property — buying physical real estate or shares in property companies',
        ],
      },
      {
        heading: 'Why does investing exist?',
        paragraphs: [
          'Companies need money to grow. Instead of only borrowing from banks, they sell small pieces of themselves (shares) to the public. You buy a share → you own a tiny slice of the company → if the company does well, your slice is worth more.',
          'Governments and companies also borrow money by issuing bonds. You lend them money → they pay you interest over time.',
          'Investing exists because both sides benefit: companies get capital to grow, and you get a return on your money.',
        ],
      },
    ],
    keyTakeaways: [
      'Investing means putting money into something with the expectation of earning a return over time',
      'It\'s not gambling, not speculation, and not the same as saving',
      'You can invest in stocks, bonds, funds, and property',
      'Companies offer investments because they need capital to grow — and investors benefit from that growth',
    ],
  },

  {
    num: 2,
    slug: 'lesson-2',
    title: 'Why your money loses value sitting still',
    duration: '7 min',
    intro: 'Here\'s something most people never get taught in school: if you have £1,000 in your current account today, it\'s worth less next year. Not because you spent it. Not because the bank took it. Because of inflation — a quiet, invisible force that chips away at your purchasing power every single year.',
    sections: [
      {
        heading: 'What is inflation?',
        paragraphs: [
          'Inflation is the rate at which prices rise over time. A basket of groceries that costs £100 today might cost £103 next year. The goods didn\'t get better — they just cost more.',
          'The UK government targets an inflation rate of 2% per year. In practice, inflation has been much higher recently — peaking above 11% in 2022, and averaging around 3–4% over the long run.',
        ],
      },
      {
        heading: 'The real cost of doing nothing',
        paragraphs: [
          'If inflation is 3% and your savings account pays 1% interest, you\'re effectively losing 2% of your money\'s value every year.',
          'Example: you put £10,000 in a current account paying 0% interest. After 10 years of 3% inflation, that £10,000 only buys what £7,374 would buy today. You haven\'t lost a single pound in nominal terms — but you\'ve lost £2,626 in real purchasing power.',
        ],
        callout: {
          type: 'example',
          text: '"Purchasing power" is just a way of saying "what your money can actually buy". If prices double but your savings don\'t grow, your money buys half as much. That\'s purchasing power falling.',
        },
        checkpoint: {
          type: 'reflection',
          prompt: 'If inflation runs at 3% and your savings earn 1% interest, your money grows by ___ in real terms each year.',
          reveal: '−2%. Even though the number in your account goes up, your real purchasing power shrinks by 2% every year. That\'s the silent cost of leaving money in cash.',
        },
      },
      {
        heading: 'Why cash isn\'t as safe as it feels',
        paragraphs: [
          'Current accounts feel safe because the number never goes down. But that psychological safety is an illusion. You\'re losing ground every year without noticing.',
          'This is sometimes called the "inflation tax" — a silent reduction in your wealth that nobody explicitly charges you.',
          'Even a good savings account paying 4–5% (available in 2024) roughly keeps pace with inflation — it doesn\'t build real wealth.',
        ],
      },
      {
        heading: 'What can outpace inflation?',
        paragraphs: [
          'Historically, stocks have returned around 7–10% per year on average. After accounting for inflation, that\'s around 5–7% in real terms.',
          'This is why investing — not just saving — is how people build wealth over the long term.',
          'Does this mean you should never have cash savings? No. Cash plays an important role, and we cover this in Lesson 5. But cash alone isn\'t enough.',
        ],
        callout: {
          type: 'key',
          text: 'The Bank of England\'s target is 2% inflation per year. Over 30 years at 2%, prices roughly double. That means £100,000 in cash today would only buy what £55,000 buys now.',
        },
        checkpoint: {
          type: 'confidence',
          prompt: 'Making sense so far?',
          fuzzyNote: 'The key idea: inflation is a silent, ongoing reduction in what your money can buy. Even if your balance stays the same, it buys less each year. Investing is the main way to stay ahead of it.',
        },
      },
    ],
    keyTakeaways: [
      'Inflation is the gradual rise in prices — currently targeted at 2% per year in the UK',
      'Money sitting in cash loses purchasing power every year, even if the balance doesn\'t change',
      'Even good savings accounts often fail to keep pace with inflation over the long term',
      'Investments that historically return 7–10% per year outpace inflation by a wide margin',
    ],
  },

  {
    num: 3,
    slug: 'lesson-3',
    title: 'Risk and return — the relationship that drives everything',
    duration: '8 min',
    intro: 'Every financial decision you\'ll ever make involves a trade-off between risk and return. This isn\'t complicated — it\'s actually intuitive once you understand it. And once you do, you\'ll be able to see through a lot of bad financial advice.',
    sections: [
      {
        heading: 'The fundamental rule',
        paragraphs: [
          'Higher potential return always comes with higher risk. There are no exceptions.',
          'If someone offers you something that guarantees high returns with no risk, it is a scam. This isn\'t pessimism — it\'s a law of how financial markets work.',
          'Why? Because if a truly risk-free investment paid 10% per year, everyone would pour money into it. Demand would drive the price up until the return fell. Markets are competitive — riskier investments must offer higher returns to attract investors.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'A friend shows you an investment promising 15% annual returns with "zero risk". What is it?',
          options: [
            { text: 'A great opportunity — worth looking into', correct: false },
            { text: 'Almost certainly a scam', correct: true },
            { text: 'Probably safe if a well-known company is behind it', correct: false },
          ],
          explanation: 'Zero risk + high return is impossible in real markets. If it genuinely existed, everyone would pile in — driving the return down to near-zero. High returns always carry real risk. This is a foundational truth of investing.',
        },
      },
      {
        heading: 'What does "risk" actually mean?',
        paragraphs: [
          'In investing, risk usually means the chance that your investment loses value — either temporarily or permanently.',
        ],
        list: [
          'Volatility risk: the value goes up and down (stocks can swing 30% in a year). This is normal and mostly recovers over time.',
          'Permanent loss risk: a company goes bankrupt and you lose your investment entirely. This is why you don\'t put all your money in one stock.',
          'Inflation risk: your money grows too slowly to keep up with inflation. This is the risk of being too cautious.',
        ],
      },
      {
        heading: 'Time horizon changes everything',
        paragraphs: [
          'If you need the money in one year, you can\'t afford much risk. A stock market crash could halve your money right before you need it.',
          'If you have 20 years, short-term crashes don\'t matter much. History shows that stock markets have always recovered and gone on to new highs, given enough time. The FTSE 100 has survived the 2008 financial crisis, the 2020 pandemic, and many other shocks.',
          'Rule of thumb: money you\'ll need within 3–5 years should stay in cash. Money you won\'t need for 5+ years can be invested.',
        ],
        callout: {
          type: 'example',
          text: 'Imagine two people investing £10,000 in UK stocks during the 2008 financial crisis. Person A panics and sells at the bottom in March 2009 — locking in a 45% loss. Person B holds on. By 2013, markets had fully recovered. By 2024, they were significantly higher. Risk is only permanent if you make it permanent by selling at the wrong time.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'You\'re saving for a car you need to buy in 18 months. Where should this money go?',
          options: [
            { text: 'A global index fund — better returns than cash', correct: false },
            { text: 'A cash savings account', correct: true },
            { text: 'A mix of stocks and bonds', correct: false },
          ],
          explanation: 'With an 18-month horizon, you can\'t afford a market crash right before you need the money. Short-term goals belong in cash — always. Investing is for money you genuinely won\'t need for 5+ years.',
        },
      },
      {
        heading: 'The risk spectrum',
        paragraphs: [
          'Different investments sit at different points on the risk-return spectrum:',
        ],
        list: [
          'Cash savings accounts — lowest risk, lowest return (roughly keeping pace with inflation at best)',
          'Government bonds (gilts) — low-medium risk, low-medium return',
          'Corporate bonds — medium risk, medium return',
          'Global index funds — medium risk over the short term, historically strong over the long term',
          'Individual stocks — higher risk, higher potential return',
          'Speculative assets (crypto, meme stocks) — very high risk, unpredictable return',
        ],
      },
      {
        heading: 'Diversification: the only free lunch in investing',
        paragraphs: [
          'Spreading your money across many different investments reduces risk without necessarily reducing return. This is called diversification.',
          'If you own shares in 500 companies and one goes bankrupt, you\'ve lost 0.2% of your portfolio. If you own shares in only one company and it goes bankrupt, you\'ve lost everything.',
          'This is why most financial guidance recommends funds — collections of many investments — rather than picking individual stocks.',
        ],
      },
    ],
    keyTakeaways: [
      'Higher potential returns always come with higher risk — no exceptions',
      '"Risk" means volatility risk, permanent loss risk, and inflation risk',
      'Time horizon matters: the longer your horizon, the more short-term volatility you can absorb',
      'Diversification — spreading across many investments — reduces risk without sacrificing return',
    ],
  },

  {
    num: 4,
    slug: 'lesson-4',
    title: 'Compound interest — and why starting early changes everything',
    duration: '10 min',
    intro: 'Einstein allegedly called compound interest "the eighth wonder of the world". Whether he actually said that is debatable. What isn\'t debatable is the maths. Once you understand compound interest, you\'ll never look at money — or time — the same way again.',
    sections: [
      {
        heading: 'The basic idea',
        paragraphs: [
          'Simple interest: you earn interest only on your original investment.',
          'Compound interest: you earn interest on your investment AND on the interest you\'ve already earned. The returns snowball.',
          'Year 1: £1,000 grows to £1,070 (7% return). Year 2: you earn 7% on £1,070 — not just £1,000. You now have £1,145. Year 3: 7% on £1,145 = £1,225.',
          'The difference looks small early on. Over decades, it becomes transformative.',
        ],
      },
      {
        heading: 'The numbers that should make your jaw drop',
        paragraphs: [
          'Say you invest £5,000 at age 20 and never add another penny. At a 7% average annual return:',
        ],
        list: [
          'Age 30: ~£9,836',
          'Age 40: ~£19,348',
          'Age 50: ~£38,061',
          'Age 60: ~£74,872',
          'Age 65: ~£105,477',
        ],
        callout: {
          type: 'key',
          text: 'Now imagine your friend starts at 30, also with £5,000. By age 65, they have ~£53,739. You have almost double — despite investing the exact same amount, just 10 years earlier. Time in the market matters more than the amount you invest.',
        },
        checkpoint: {
          type: 'reflection',
          prompt: 'Two people each invest £5,000. One starts at 20, one at 30. Neither adds anything else. By 65, the difference between them is roughly ___.',
          reveal: '£51,738. The person who started at 20 ends up with ~£105,477. The person who started at 30 ends up with ~£53,739. The same amount of money, but 10 extra years of compounding nearly doubles the outcome.',
        },
      },
      {
        heading: 'The Rule of 72',
        paragraphs: [
          'A useful mental shortcut: divide 72 by your annual return to see how many years it takes to double your money.',
        ],
        list: [
          'At 7% return: 72 ÷ 7 = ~10 years to double',
          'At 10% return: 72 ÷ 10 = ~7 years to double',
          'At 2% (typical cash savings): 72 ÷ 2 = 36 years to double',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'Your investment earns 6% per year. Using the Rule of 72, roughly how long to double your money?',
          options: [
            { text: '6 years', correct: false },
            { text: '12 years', correct: true },
            { text: '18 years', correct: false },
          ],
          explanation: '72 ÷ 6 = 12. That\'s it. The Rule of 72 is a quick mental tool you\'ll use forever — try it with different return rates and see how dramatically the doubling time changes.',
        },
      },
      {
        heading: 'What happens when you add regular contributions?',
        paragraphs: [
          'The examples above assumed a one-off investment. If you also invest £100 per month, the effect is even more dramatic.',
          'Starting at 20, investing £100/month at 7% for 45 years → roughly £350,000 by age 65.',
          'Starting at 30, investing £100/month at 7% for 35 years → roughly £170,000 by age 65.',
          'Same monthly amount. Ten-year head start. More than twice the outcome.',
        ],
      },
      {
        heading: 'The honest caveat',
        paragraphs: [
          'These examples assume a steady 7% return every year. Real investments don\'t work like that — some years are +20%, some are −30%. But over the long run, global stock markets have averaged around this return.',
          'Inflation also reduces your real returns. In inflation-adjusted terms, expect more like 4–5% per year.',
          'Still — even at 4% real return, the compound effect over 40 years is transformative.',
        ],
      },
    ],
    keyTakeaways: [
      'Compound interest means earning returns on your returns — the effect snowballs over time',
      'Starting 10 years earlier is often worth more than doubling the amount you invest',
      'The Rule of 72: divide 72 by your return rate to find how many years to double your money',
      'Regular monthly contributions amplify the compound effect dramatically',
    ],
  },

  {
    num: 5,
    slug: 'lesson-5',
    title: 'Saving vs investing — when to do which',
    duration: '6 min',
    intro: 'Now that you understand why investing can grow your money faster than saving, you might be tempted to move everything out of your savings account. Don\'t. Saving and investing serve different purposes — and knowing when to do each is one of the most important financial skills you can develop.',
    sections: [
      {
        heading: 'Saving: what it\'s for',
        paragraphs: [
          'Cash savings are for money you might need soon, or money you can\'t afford to lose.',
          'Before you invest anything, you should have an emergency fund — typically 3–6 months of essential living expenses — in a cash savings account. This protects you from needing to sell investments at the wrong time if something unexpected happens.',
          'Short-term goals (next 1–3 years) — a holiday, moving costs, a rental deposit — should also stay in cash.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'Before you start investing, what should you have sorted first?',
          options: [
            { text: 'A good stock to buy', correct: false },
            { text: 'An emergency fund covering 3–6 months of expenses', correct: true },
            { text: 'At least £5,000 saved up', correct: false },
          ],
          explanation: 'Emergency fund first — always. Without it, an unexpected expense could force you to sell investments at exactly the wrong time (like a market dip). The size of your starting investment matters far less than having a safety net underneath it.',
        },
      },
      {
        heading: 'Investing: what it\'s for',
        paragraphs: [
          'Investing is for money you won\'t need for at least 5 years, ideally longer.',
          'Why 5 years? Because stock markets can fall significantly in the short term. Historically, every major drop has recovered within 3–5 years — but if you need the money during the dip, you\'re forced to sell at a loss.',
          'Long-term goals — building wealth, retirement, buying a home in a decade — are investing goals.',
        ],
        callout: {
          type: 'tip',
          text: 'A sensible starting order: 1) Clear high-interest debt (credit cards) → 2) Build 3–6 months of emergency cash → 3) Start investing.',
        },
      },
      {
        heading: 'When you have both short and long-term goals',
        paragraphs: [
          'Split your money. Cash for short-term goals, investments for long-term goals. This isn\'t complicated — it\'s just being intentional about which pot each pound belongs in.',
          'What if inflation is eating your savings? That\'s frustrating, but keeping short-term money in cash is still the right call. A temporary inflation loss beats a potential 30% investment loss if markets crash right before you need the money.',
        ],
      },
      {
        heading: 'The opportunity cost of over-saving',
        paragraphs: [
          'Many young people keep far more in cash than they need to — because it feels safe. But for money with a 10+ year horizon, that "safety" is actually a slow loss.',
          'Example: £20,000 in a savings account for 20 years at 2% interest, while inflation runs at 3%, means you\'re losing 1% of purchasing power per year. Over 20 years, that adds up to a meaningful sum.',
          'The goal isn\'t to be reckless with money — it\'s to be intentional. Every pound should be doing the job it\'s best suited for.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Feel clear on when to save vs when to invest?',
          fuzzyNote: 'The simple rule: anything you\'ll need in under 3–5 years → save. Anything you won\'t touch for 5+ years → invest. It\'s not about the amount — it\'s about the timeline.',
        },
      },
    ],
    keyTakeaways: [
      'Build an emergency fund (3–6 months of expenses) in cash before investing anything',
      'Save for goals that are less than 3–5 years away; invest for goals that are 5+ years out',
      'Don\'t invest money you might need in the short term — a crash could force you to sell at a loss',
      'Keeping too much in cash long-term has a real cost: inflation erodes your purchasing power',
    ],
  },

  {
    num: 6,
    slug: 'lesson-6',
    title: 'Stocks, bonds, funds and ETFs — what they actually are',
    duration: '12 min',
    intro: 'Stocks, bonds, funds, ETFs — these four terms get thrown around constantly in financial content, and almost nobody explains what they actually are. This lesson fixes that. By the end, you\'ll understand what each one is, how they differ, and which is most relevant to you as a beginner.',
    sections: [
      {
        heading: 'Stocks (also called shares or equities)',
        paragraphs: [
          'A stock is a tiny ownership stake in a company. When a company wants to raise money to grow, it sells pieces of itself to the public. Each piece is a share.',
          'Owning shares entitles you to a slice of the company\'s profits (paid as dividends) and future growth in value. If the company does well, your shares are worth more. If it struggles, your shares fall.',
          'Stocks can be volatile — a single company\'s stock can swing 50% or more in a year. One bad earnings report, one scandal, and you can lose a lot quickly.',
        ],
        callout: {
          type: 'example',
          text: 'When Apple launched the iPhone in 2007, its share price was around $4 (adjusted for splits). By 2024, it was over $180. £1,000 invested then would be worth roughly £45,000. But not all stories end well — plenty of "sure things" have gone to zero.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'A company has 10 million shares total. You own 1,000 of them. What do you own?',
          options: [
            { text: '1% of the company', correct: false },
            { text: '0.01% of the company', correct: true },
            { text: '1,000 shares with a fixed £1 each', correct: false },
          ],
          explanation: '1,000 ÷ 10,000,000 = 0.01%. A tiny slice — but you\'re a real part-owner. If the company doubles in value, your shares double in value too. That\'s the power of equity ownership.',
        },
      },
      {
        heading: 'Bonds',
        paragraphs: [
          'A bond is a loan. When you buy a government bond, you\'re lending money to the government. When you buy a corporate bond, you\'re lending to a company.',
          'In return, you receive regular interest payments (called "coupon payments") and get your original money back when the bond matures.',
          'UK government bonds are called "gilts". They\'re considered very safe — the UK government is unlikely to default on its debts.',
          'Bonds are generally lower risk than stocks, but deliver lower returns. They\'re often used to balance a portfolio — when stocks fall, bonds tend to hold their value or rise.',
        ],
      },
      {
        heading: 'Funds',
        paragraphs: [
          'A fund is a collection of many investments bundled together. Instead of buying shares in one company, you buy a slice of a fund that holds shares in 50, 100, or even thousands of companies.',
          'This gives you built-in diversification. If one company in the fund goes bust, it barely affects the whole fund.',
        ],
        list: [
          'Active funds: a fund manager picks which stocks to buy, trying to beat the market. Higher fees. Evidence shows most active funds underperform their benchmark index over time.',
          'Index funds: instead of trying to beat the market, they track it. A FTSE 100 index fund holds all 100 FTSE 100 companies in proportion. Low fees. Returns that match the market.',
        ],
      },
      {
        heading: 'ETFs (Exchange-Traded Funds)',
        paragraphs: [
          'An ETF is essentially an index fund that trades on a stock exchange like a share — meaning you can buy and sell it at any point during the trading day, rather than just at end-of-day prices.',
          'The most popular ETFs for beginners track a global index — like the MSCI World (stocks from 23 developed countries) or the S&P 500 (the 500 largest US companies).',
          'Popular UK brokers offer ETFs from providers like Vanguard, iShares, and HSBC.',
        ],
        callout: {
          type: 'tip',
          text: 'For most beginners, a single global index ETF — like Vanguard FTSE All-World or iShares Core MSCI World — is a sensible starting point. You get instant diversification across thousands of companies and countries, with very low fees (typically 0.07–0.22% per year).',
        },
        checkpoint: {
          type: 'quiz',
          question: 'Why do most beginners start with an index ETF rather than picking individual stocks?',
          options: [
            { text: 'ETFs are guaranteed to make money', correct: false },
            { text: 'One ETF can hold thousands of companies — instant diversification', correct: true },
            { text: 'Individual stocks are too expensive for beginners', correct: false },
          ],
          explanation: 'Diversification is the key. One global ETF can hold 3,000+ companies across 50+ countries. If any single company fails, it barely affects you. No stock-picking research needed, and fees are tiny.',
        },
      },
      {
        heading: 'How they compare',
        paragraphs: [
          'Each asset type occupies a different risk-return position:',
        ],
        list: [
          'Individual stocks — high risk, high potential return; requires research and conviction',
          'Active funds — medium risk, uncertain return relative to the market; higher fees',
          'Index funds / ETFs — medium risk, market-matching return; low fees; best starting point for most beginners',
          'Bonds (gilts) — lower risk, lower return; useful for stability and balance',
        ],
      },
    ],
    keyTakeaways: [
      'Stocks are ownership stakes in companies — high risk and return potential',
      'Bonds are loans to governments or companies — lower risk, lower return, good for stability',
      'Funds bundle many investments together, providing built-in diversification',
      'ETFs are funds that trade on exchanges — a global index ETF is the simplest starting point for most beginners',
    ],
  },

  {
    num: 7,
    slug: 'lesson-7',
    title: 'How to think about your first investment',
    duration: '9 min',
    intro: 'You now understand what investing is, why inflation matters, how compound interest works, and what the main investment types are. The natural question is: where do I actually start? This lesson gives you a mental framework — so you don\'t overthink it, don\'t take unnecessary risks, and don\'t make the classic beginner mistakes.',
    sections: [
      {
        heading: 'Start with your time horizon',
        paragraphs: [
          'Before deciding what to invest in, ask: when will I need this money?',
        ],
        list: [
          'Under 3 years → keep it in cash',
          '3–5 years → consider low-risk investments (bonds, cautious funds), but cash may still be safer',
          '5–10 years → index funds are appropriate',
          '10+ years → you can take more risk; time smooths out volatility',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'You have £3,000 you\'re confident you won\'t need for at least 10 years. Where does it go?',
          options: [
            { text: 'A high-interest savings account', correct: false },
            { text: 'A global index fund inside a Stocks & Shares ISA', correct: true },
            { text: 'Split across a few individual stocks you know', correct: false },
          ],
          explanation: 'With a 10-year horizon, an index fund is the right tool. You have time to ride out volatility, and a global fund gives you diversified exposure to world economic growth. An ISA keeps all gains tax-free.',
        },
      },
      {
        heading: 'How much risk is right for you?',
        paragraphs: [
          'Beyond time horizon, risk tolerance is also personal. Two people with 20-year horizons might still have different comfort levels — and that\'s fine.',
          'Ask yourself: if my investment dropped 30% overnight, would I panic and sell? If yes, you might want a more cautious approach. Panic-selling during a dip is the single most common way people lock in unnecessary losses.',
        ],
        list: [
          'Low risk: bonds and cash',
          'Medium risk: balanced index fund (mix of stocks and bonds)',
          'Higher risk: all-equity global index fund',
        ],
        callout: {
          type: 'tip',
          text: 'If you\'re unsure what risk level is right for you, "medium" is rarely wrong. A global index fund with a 15+ year horizon has historically always produced positive returns.',
        },
      },
      {
        heading: 'The case for simplicity',
        paragraphs: [
          'The financial industry wants you to think investing is complicated. Complicated products justify higher fees.',
          'The evidence says otherwise. Academic research consistently shows that simple, low-cost index funds outperform the majority of actively managed funds over the long run.',
          'The simplest possible portfolio for a UK beginner: one global index ETF, inside a Stocks & Shares ISA, bought monthly, never sold.',
          'You don\'t need to pick stocks. You don\'t need to time the market. You just need to start and stay consistent.',
        ],
      },
      {
        heading: 'Common beginner mistakes to avoid',
        paragraphs: [],
        list: [
          'Waiting for the "right time" to invest — there\'s no such thing. Time in the market beats timing the market.',
          'Investing money you\'ll need soon — emergency fund and short-term savings in cash first.',
          'Putting everything in one stock — if it goes bust, you lose everything. Use funds.',
          'Chasing last year\'s winner — the best-performing fund last year often underperforms next year.',
          'Checking your portfolio every day — markets go up and down. Obsessive checking leads to emotional decisions. Check quarterly at most.',
          'Selling during a crash — every crash in history has been followed by a recovery. Selling locks in your loss permanently.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Feeling ready to think about your first real investment?',
          fuzzyNote: 'No rush. The key insight is this: simplicity wins. One global index ETF, bought regularly, held for years. That\'s the strategy that works — and it\'s available to everyone.',
        },
      },
      {
        heading: 'How much should you start with?',
        paragraphs: [
          'The best answer: whatever you can genuinely afford not to touch for 5+ years.',
          'Some UK platforms let you start with £1. Apps like Freetrade, Trading 212, and InvestEngine allow very small starting amounts.',
          'Don\'t wait until you have "enough". The habit of investing regularly matters more than the starting amount. £50 per month, every month, for 30 years, does more than a single £10,000 investment today.',
        ],
      },
    ],
    keyTakeaways: [
      'Time horizon is the most important factor — it determines how much risk you can take',
      'Simplicity wins: one global index ETF is a legitimate long-term strategy for most beginners',
      'Avoid the classic mistakes: waiting for the right time, over-concentrating, selling in crashes',
      'Start small and start now — the habit and consistency matter more than the amount',
    ],
  },

  {
    num: 8,
    slug: 'lesson-8',
    title: 'Your next steps — getting started in the UK',
    duration: '8 min',
    intro: 'This is the final lesson. You\'ve done the hard work — you understand what investing is, how it works, and how to think about it. Now it\'s time to translate that into action. This lesson gives you the concrete, practical steps to start investing in the UK.',
    sections: [
      {
        heading: 'Step 1: Choose your account type',
        paragraphs: [
          'In the UK, your first investing decision should be: which account do I use?',
          'The answer for most beginners is a Stocks & Shares ISA. Money inside an ISA grows completely free of UK income tax and capital gains tax. You have an annual allowance of £20,000. For most people, this should be the default.',
          'A General Investment Account (GIA) has no contribution limit but no tax protection. Use this once you\'ve used your ISA allowance, or for short-term investing.',
          'For retirement specifically, a SIPP (Self-Invested Personal Pension) gives you income tax relief on contributions — a £80 contribution gets topped up to £100 by HMRC if you\'re a basic-rate taxpayer. We cover pensions in depth in a separate course.',
        ],
        callout: {
          type: 'key',
          text: 'ISA first, always. Tax-free growth is one of the best advantages available to UK investors — and it\'s completely free to use. Don\'t invest in a GIA before you\'ve used your ISA allowance.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'As a UK investor starting out, which account should you open first?',
          options: [
            { text: 'A General Investment Account (GIA)', correct: false },
            { text: 'A Stocks & Shares ISA', correct: true },
            { text: 'A SIPP', correct: false },
          ],
          explanation: 'Stocks & Shares ISA first — all growth and income inside it is 100% tax-free. A GIA has no such protection, and a SIPP locks your money away until retirement. ISA is the default for most UK investors under 50.',
        },
      },
      {
        heading: 'Step 2: Choose a platform',
        paragraphs: [
          'There are several good UK investing platforms for beginners. Here are the main options:',
        ],
        list: [
          'Vanguard Investor — best for simple, low-cost index fund investing. Platform fee: 0.15% (capped at £375/year). Minimum monthly investment: £100.',
          'InvestEngine — commission-free ETF platform, free ISA. Excellent for beginners who want ETFs only.',
          'Trading 212 — commission-free, fractional shares, no minimum investment. ISA available.',
          'Freetrade — commission-free trading. ISA available on paid plan (£5.99/month). Good ETF and stock selection.',
          'Hargreaves Lansdown — the UK\'s largest platform, very reputable. Higher fees than the others but comprehensive tools.',
        ],
      },
      {
        heading: 'Step 3: Choose what to buy',
        paragraphs: [
          'You don\'t need to pick stocks. A single, low-cost global index ETF is a completely legitimate starting investment.',
          'Popular choices for UK beginners:',
        ],
        list: [
          'Vanguard FTSE All-World UCITS ETF (VWRL) — tracks 3,500+ companies across 50+ countries. Annual cost: 0.22%.',
          'iShares Core MSCI World UCITS ETF (IWDA) — tracks 1,400+ companies in 23 developed markets. Annual cost: 0.20%.',
          'Vanguard LifeStrategy 80% Equity — a fund with a built-in mix of stocks and bonds, rebalanced automatically.',
        ],
      },
      {
        heading: 'Step 4: Set up a regular investment',
        paragraphs: [
          'The best way to invest is automatically and regularly. Investing the same amount each month — regardless of prices — is called pound-cost averaging. You naturally buy more shares when prices are low and fewer when they\'re high.',
          'Set up a direct debit or auto-invest on your chosen platform. Even £25 per month is a meaningful start.',
          'Treat it like a bill — automated, non-optional, and easy to forget about day-to-day.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'You\'ve nearly finished the course. How are you feeling about actually getting started?',
          fuzzyNote: 'Completely normal to still feel unsure — this is a lot of new information. The action plan in the next section breaks it down to 5 simple steps. Start there, and remember: the first £1 you invest is the most important one.',
        },
      },
      {
        heading: 'Your complete action plan',
        paragraphs: [
          'Here\'s the whole thing, distilled to five steps:',
        ],
        list: [
          'Build your emergency fund — 3–6 months of expenses in a cash savings account.',
          'Open a Stocks & Shares ISA on one of the platforms above.',
          'Choose one global index fund or ETF.',
          'Set up a regular monthly investment.',
          'Don\'t touch it. Don\'t panic-sell. Keep contributing. Wait.',
        ],
        callout: {
          type: 'tip',
          text: 'You\'ve completed Investing from Scratch. The next course — ISAs & Tax-Free Saving — goes deeper on how to use your ISA allowance to its full potential. That\'s the natural next step.',
        },
      },
    ],
    keyTakeaways: [
      'Open a Stocks & Shares ISA first — tax-free growth is the #1 advantage for UK investors',
      'Good beginner platforms: Vanguard Investor, InvestEngine, Trading 212, Freetrade, Hargreaves Lansdown',
      'Choose one global index fund — VWRL or IWDA are popular, simple options',
      'Set up a monthly direct debit and leave it alone — consistency beats everything',
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

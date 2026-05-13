import type { Lesson } from '@/lib/lessons/investing-from-scratch'
export type { Callout, QuizCheckpoint, ConfidenceCheckpoint, ReflectionCheckpoint, Checkpoint, Section, Lesson } from '@/lib/lessons/investing-from-scratch'

export const lessons: Lesson[] = [
  {
    num: 1,
    slug: 'lesson-1',
    title: 'What is a stock? Owning a piece of a company',
    duration: '6 min',
    intro: 'You\'ve probably heard the word "stock" hundreds of times without ever being told what it actually means. It\'s not complicated. A stock is ownership — a small slice of a real company. In this lesson, we build that from the ground up.',
    sections: [
      {
        heading: 'Companies need money to grow',
        paragraphs: [
          'Every business needs capital to operate — to hire staff, build products, expand into new markets. Small businesses borrow from banks or use their founders\' savings. But when a company wants to grow very fast, those options often aren\'t enough.',
          'The solution is to sell pieces of the company to outside investors. Each piece is called a share (or stock). In exchange for cash, investors get a proportional slice of the company — including a share of its future profits and growth.',
          'This process of selling shares to the public for the first time is called an IPO — an Initial Public Offering. Once listed, those shares trade on a stock exchange and anyone can buy or sell them.',
        ],
      },
      {
        heading: 'What does owning a share actually mean?',
        paragraphs: [
          'If a company has 1,000,000 shares outstanding and you own 100 of them, you own 0.01% of the company. That\'s a real ownership stake — not just a certificate.',
          'As a shareholder, you are entitled to two potential forms of return:',
        ],
        list: [
          'Capital growth: if the company becomes more valuable, your shares are worth more than you paid for them',
          'Dividends: many companies pay shareholders a portion of their profits, usually quarterly or annually — this is called a dividend',
        ],
        callout: {
          type: 'example',
          text: 'Say you buy 50 shares in Tesco at £2.50 each. You\'ve invested £125. Tesco earns strong profits and its share price rises to £3.20. Your 50 shares are now worth £160 — a £35 gain. Tesco also pays a dividend of £0.10 per share, so you receive £5. Total return: £40 on a £125 investment.',
        },
      },
      {
        heading: 'What makes a share price go up or down?',
        paragraphs: [
          'Share prices are set by supply and demand. If more people want to buy a share than sell it, the price rises. If more want to sell, the price falls.',
          'Demand is driven by expectations. If investors believe a company will grow profits in the future, they want to own it — and they\'ll pay more for the privilege. Share prices reflect collective forecasts about a company\'s future, not just its current state.',
          'This is why a company can have a high share price even if it\'s not yet profitable (think Tesla in its early years, or Amazon), and why a company with strong current profits can see its share price fall if its future prospects look uncertain.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'A company has 10 million shares. You buy 1,000 at £5 each. What have you done?',
          options: [
            { text: 'Lent the company £5,000', correct: false },
            { text: 'Bought a 0.01% ownership stake in the company for £5,000', correct: true },
            { text: 'Guaranteed yourself a £5,000 return', correct: false },
          ],
          explanation: 'Buying shares is ownership, not lending. 1,000 ÷ 10,000,000 = 0.01%. You now own a tiny but real slice of the company — which means you benefit from its growth, but also absorb losses if it struggles.',
        },
      },
      {
        heading: 'The upside and the downside',
        paragraphs: [
          'Stocks offer the highest long-term returns of any mainstream asset class. Over the past century, global stocks have returned roughly 7–10% per year on average. But those averages hide enormous year-to-year swings.',
          'In a single year, a stock can double — or fall 70%. Individual company stocks carry what\'s called "specific risk": the risk that this particular company fails, regardless of how the broader market is doing.',
          'This is why owning lots of different stocks (or a fund that holds many) is so important. It\'s covered in depth later in this course.',
        ],
        callout: {
          type: 'key',
          text: 'UK shares are often described as "equities" — this just means the same thing. When you see references to "global equities" or "equity funds", they\'re talking about stocks from around the world.',
        },
      },
    ],
    keyTakeaways: [
      'A stock is a small ownership stake in a company — buying shares makes you a part-owner',
      'Shareholders benefit from capital growth (rising share price) and dividends (profit distributions)',
      'Share prices are driven by supply and demand, which reflects expectations about a company\'s future',
      'Individual stocks carry high specific risk — one bad company can wipe out your entire investment in it',
    ],
  },

  {
    num: 2,
    slug: 'lesson-2',
    title: 'How stock markets work — buyers, sellers and prices',
    duration: '8 min',
    intro: 'Every day you hear "the FTSE 100 fell 1.2% today" or "markets are up on strong jobs data". But what does that actually mean? What is a stock market, how do prices get set, and who\'s doing all this buying and selling? This lesson answers exactly that.',
    sections: [
      {
        heading: 'What is a stock exchange?',
        paragraphs: [
          'A stock exchange is an organised marketplace where buyers and sellers come together to trade shares. The two most famous are the London Stock Exchange (LSE) and the New York Stock Exchange (NYSE).',
          'The exchange doesn\'t own the shares. It just provides the infrastructure — the rules, the systems, the price-discovery mechanism — that allows millions of trades to happen safely and transparently each day.',
          'In the UK, the main stock market index is the FTSE 100 — a measure of the combined market value of the 100 largest companies listed on the London Stock Exchange. When people say "the market is up", they often mean an index like this has risen.',
        ],
      },
      {
        heading: 'Buyers, sellers and how prices are set',
        paragraphs: [
          'For every share you buy, someone else must sell it. The price is wherever a willing buyer and a willing seller agree.',
          'In practice, this happens through an order book. Buyers submit "bids" — the maximum price they\'re willing to pay. Sellers submit "asks" — the minimum price they\'ll accept. The exchange automatically matches them up.',
          'The difference between the best bid and the best ask at any moment is called the spread. A narrow spread means the market is liquid — it\'s easy to buy or sell quickly without affecting the price. A wide spread means the opposite.',
        ],
        callout: {
          type: 'example',
          text: 'The best bid on a share is £10.00. The best ask is £10.03. If you buy at market price, you\'ll pay £10.03. The seller accepts £10.00. The £0.03 difference is the spread — small for a large company\'s shares, but worth knowing about.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'The FTSE 100 falls 2% in a day. What has actually happened?',
          options: [
            { text: 'The London Stock Exchange has lost 2% of its money', correct: false },
            { text: 'The combined market value of the 100 largest UK-listed companies has fallen by 2%', correct: true },
            { text: '2% of UK companies have gone bankrupt', correct: false },
          ],
          explanation: 'The FTSE 100 is a price index — it tracks the total market value of its constituents. A 2% fall means investors collectively valued those 100 companies 2% lower by the end of the day than they did at the start. No money is "lost" in the sense that no company has failed.',
        },
      },
      {
        heading: 'What moves markets?',
        paragraphs: [
          'Prices move when expectations change. Anything that causes investors to revise their view of a company\'s or economy\'s future affects share prices:',
        ],
        list: [
          'Company results: a profit higher than expected → price rises; a miss → price falls',
          'Economic data: strong GDP or jobs numbers often boost confidence; weak data depresses it',
          'Interest rate changes: rising rates make borrowing more expensive and can reduce company profits — markets often fall on rate rise announcements',
          'Geopolitical events: wars, elections, and policy changes create uncertainty, which usually sends prices down',
          'Sentiment and speculation: sometimes prices move on mood alone, not fundamentals',
        ],
      },
      {
        heading: 'Market hours and what happens outside them',
        paragraphs: [
          'The London Stock Exchange is open Mon–Fri, 8am–4:30pm UK time. During this window, shares trade continuously.',
          'Outside these hours, no live trading happens — but news still breaks. This is why a company announcing bad results at 6pm might see its share price gap down sharply when markets open the next morning.',
          'For most long-term investors, exact trading times matter very little. You\'re not trying to buy at the precise right moment — you\'re building a position over months and years.',
        ],
        callout: {
          type: 'tip',
          text: 'As a long-term investor, market-timing is mostly noise. Studies consistently show that missing just the 10 best trading days in a decade — days you\'d likely miss if you tried to time the market — significantly reduces your overall return.',
        },
      },
      {
        heading: 'Primary and secondary markets',
        paragraphs: [
          'When a company floats (IPO), it raises money by selling shares directly to investors for the first time. This is the primary market — money goes to the company.',
          'After the IPO, those shares trade on the stock exchange between investors. This is the secondary market — the company doesn\'t receive anything when its existing shares change hands. You\'re buying from another investor, not the company itself.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Clear on how stock markets actually work?',
          fuzzyNote: 'Core idea: a stock exchange is a marketplace where buyers and sellers agree on prices. Prices move when expectations change. The FTSE 100 is a measure of the market value of 100 large UK companies — when people say "the market moved", this is usually what they mean.',
        },
      },
    ],
    keyTakeaways: [
      'Stock exchanges are organised marketplaces — the LSE and NYSE are the most famous',
      'Prices are set where buyers and sellers agree — via bids and asks in an order book',
      'The FTSE 100 tracks the combined value of the 100 largest LSE-listed companies',
      'Prices move when expectations change — driven by company results, economic data, interest rates, and sentiment',
    ],
  },

  {
    num: 3,
    slug: 'lesson-3',
    title: 'What is a fund? Pooling money to spread risk',
    duration: '7 min',
    intro: 'Most people hear "fund" and assume it\'s just a fancy investment term. In reality, a fund is one of the most useful inventions in personal finance — a way for ordinary investors to own a small piece of hundreds of companies without needing to buy them individually.',
    sections: [
      {
        heading: 'The basic idea',
        paragraphs: [
          'A fund pools money from thousands of investors and uses it to buy a collection of investments — typically shares, bonds, or both.',
          'When you invest in a fund, you don\'t own shares in the underlying companies directly. Instead, you own units (or shares) in the fund itself. The fund manager holds the underlying assets on your behalf.',
          'This structure gives individual investors access to a diversified portfolio they couldn\'t easily build on their own. Buying shares in 100 different companies one at a time would cost a fortune in trading fees and require significant capital. A fund lets you access that same diversification for as little as £100.',
        ],
        callout: {
          type: 'example',
          text: 'Imagine 10,000 investors each put £1,000 into a fund. The fund now has £10 million to invest. It uses that to buy shares in 200 companies. Each investor effectively owns a tiny slice of all 200 companies — for just £1,000.',
        },
      },
      {
        heading: 'Active vs passive funds',
        paragraphs: [
          'The most important distinction in funds is whether they\'re actively or passively managed.',
        ],
        list: [
          'Active funds: a professional fund manager selects which stocks to buy and sell, trying to deliver returns above a market benchmark. Higher fees — typically 0.5–1.5% per year.',
          'Passive funds (index funds): instead of picking stocks, the fund simply tracks an index — buying all (or a representative sample) of its constituents in proportion. Much lower fees — typically 0.05–0.25% per year.',
        ],
        callout: {
          type: 'key',
          text: 'Evidence consistently shows that most active funds underperform their benchmark index over long periods, especially after fees. This is the central argument for passive investing — covered fully in Lesson 6.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'What\'s the main advantage of investing in a fund rather than buying individual shares yourself?',
          options: [
            { text: 'Funds are guaranteed to make money', correct: false },
            { text: 'Instant diversification — one investment spreads your money across many companies', correct: true },
            { text: 'Funds are always managed by experts who beat the market', correct: false },
          ],
          explanation: 'Diversification is the key benefit. A single fund can hold hundreds of companies — so one company going bust barely affects you. No guarantees, no market-beating promise: just the risk-reducing power of spreading your money widely.',
        },
      },
      {
        heading: 'How fund pricing works',
        paragraphs: [
          'Traditional funds (unit trusts and OEICs — Open-Ended Investment Companies — the most common fund types in the UK) are priced once a day, at close of market.',
          'When you buy or sell units, you transact at that day\'s price — called the Net Asset Value (NAV). This is simply the total value of all the fund\'s investments divided by the number of units outstanding.',
          'ETFs work differently: they trade throughout the day on a stock exchange, like a share. We cover ETFs in detail in Lesson 5.',
        ],
      },
      {
        heading: 'Understanding fund charges',
        paragraphs: [
          'Every fund charges an annual fee for managing your money. This is expressed as a percentage and called the Ongoing Charges Figure (OCF) or Total Expense Ratio (TER) — they\'re the same thing.',
          'The OCF is deducted directly from the fund\'s assets, so you never write a cheque. But it compounds over time — a 1% annual charge on a 30-year investment is far more damaging than it looks.',
          'Rule of thumb: for passive funds, look for an OCF below 0.25%. For active funds, question whether any performance justifies an OCF above 0.5%.',
        ],
        checkpoint: {
          type: 'reflection',
          prompt: 'A fund has an OCF of 1.2% and another has 0.15%. Both track the same index. Over 30 years on a £10,000 investment, which one do you think performs better?',
          reveal: 'The 0.15% fund — by a significant margin. The 1.2% fund charges 8× more per year. On a 7% gross return, that gap compounds dramatically: after 30 years, the cheap fund might deliver ~£56,000 while the expensive one returns ~£40,000. Same market, different fees — a £16,000 difference.',
        },
      },
    ],
    keyTakeaways: [
      'A fund pools money from many investors to buy a diversified collection of investments',
      'Active funds try to beat the market (higher fees); passive index funds track the market (lower fees)',
      'Traditional funds price once daily at NAV; ETFs trade throughout the day on an exchange',
      'Fund charges (OCF/TER) compound over time — even small differences significantly affect long-term returns',
    ],
  },

  {
    num: 4,
    slug: 'lesson-4',
    title: 'Index funds — the simple, low-cost approach',
    duration: '9 min',
    intro: 'The index fund is one of the most important financial innovations of the past 50 years. It allows ordinary investors to match market returns at almost zero cost — and evidence shows this beats the majority of professional fund managers over time. Here\'s how and why.',
    sections: [
      {
        heading: 'What is an index?',
        paragraphs: [
          'A stock market index is a list of companies, grouped by defined criteria, used to measure the performance of a segment of the market.',
          'Common examples:',
        ],
        list: [
          'FTSE 100 — the 100 largest companies listed on the London Stock Exchange by market capitalisation',
          'S&P 500 — the 500 largest US companies',
          'MSCI World — ~1,400 large and mid-cap companies across 23 developed countries',
          'MSCI All Country World Index (ACWI) — extends MSCI World to include emerging markets (China, India, Brazil, etc.)',
        ],
        callout: {
          type: 'key',
          text: 'Indices are weighted by market capitalisation. A larger company makes up a larger proportion of the index. Apple has a much bigger weight in the S&P 500 than a small regional bank — and so changes in Apple\'s share price affect the index much more.',
        },
      },
      {
        heading: 'What is an index fund?',
        paragraphs: [
          'An index fund is a fund that aims to replicate the performance of a specific index — not beat it, just match it.',
          'To do this, the fund simply buys all (or a statistically representative sample) of the companies in the index, weighted in proportion to the index. No active stock picking. No judgement calls. Just systematic replication.',
          'Because there are no highly paid analysts or portfolio managers making decisions, the costs are minimal. Most index funds charge 0.05–0.20% per year — compared to 0.5–1.5% for active funds.',
        ],
      },
      {
        heading: 'Why low cost matters more than it seems',
        paragraphs: [
          'A 1% annual fee sounds trivial. Over a single year, £10,000 at 1% cost = £100. Easy to ignore.',
          'But fees compound just like returns. After 30 years, a 1% annual fee on a 7% gross return leaves you with roughly £57,000 instead of £76,000 — a £19,000 difference on a £10,000 investment. That\'s the cost of 1% extra fees per year.',
          'This is why Warren Buffett — arguably the world\'s greatest investor — has repeatedly recommended low-cost index funds for almost everyone.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'An index fund charges 0.15% per year. An active fund charges 1.2%. Both track the same FTSE 100. Over 20 years, what determines which performs better for you?',
          options: [
            { text: 'Whichever fund has the better fund manager', correct: false },
            { text: 'The difference in fees, which compounds annually', correct: true },
            { text: 'Which fund was launched first', correct: false },
          ],
          explanation: 'If both track the same market, their gross returns will be almost identical. The only meaningful difference is cost. The 1.2% fund is 8× more expensive — and that gap compounds every year.',
        },
      },
      {
        heading: 'How index funds are constructed',
        paragraphs: [
          'The most common construction method is full replication: the fund buys every single security in the index in proportion to its weight. Simple, transparent, and cost-effective for large indices like the S&P 500.',
          'For very large or illiquid indices (like the MSCI ACWI with 2,800+ stocks), funds use optimised sampling: they buy a representative subset that closely mimics the index\'s behaviour without needing to hold every tiny stock.',
          'Either way, the tracking error — the difference between the fund\'s return and the index\'s return — is usually tiny for well-run index funds.',
        ],
      },
      {
        heading: 'The major providers',
        paragraphs: [
          'The three biggest index fund providers globally are Vanguard, BlackRock (iShares), and State Street (SPDR). In the UK, you\'ll encounter Vanguard and iShares most often:',
        ],
        list: [
          'Vanguard — founded by John Bogle, the inventor of the index fund. Known for rock-bottom fees and investor-friendly structure.',
          'iShares (BlackRock) — the world\'s largest ETF provider. Very wide range of funds at very low costs.',
          'HSBC — offers UK-listed index funds at competitive prices, popular on UK platforms.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Clear on what an index fund is and why fees matter?',
          fuzzyNote: 'Core idea: an index fund tracks a market index (like the FTSE 100 or MSCI World) automatically, without stock-picking. Because there\'s no expensive active management, fees are tiny — and lower fees mean more of the market\'s return stays with you.',
        },
      },
    ],
    keyTakeaways: [
      'A stock market index measures the performance of a defined group of companies (FTSE 100, S&P 500, MSCI World)',
      'An index fund replicates its target index without stock-picking — low cost, systematic, transparent',
      'The annual fee (OCF) compounds over decades: a 1% difference in fees can cost tens of thousands of pounds over 30 years',
      'Major UK-available providers: Vanguard, iShares (BlackRock), HSBC',
    ],
  },

  {
    num: 5,
    slug: 'lesson-5',
    title: 'ETFs explained — funds you can trade like stocks',
    duration: '8 min',
    intro: 'You now know what index funds are. An ETF — Exchange-Traded Fund — is essentially an index fund with one extra feature: it trades on a stock exchange throughout the day, just like a share. This sounds like a minor technical detail, but it has real implications for how you invest.',
    sections: [
      {
        heading: 'ETF vs traditional index fund',
        paragraphs: [
          'Traditional index funds (unit trusts, OEICs) price once per day at their Net Asset Value. When you place a buy order, your transaction executes at that day\'s closing price — you might not know the exact price until after the fact.',
          'ETFs trade continuously on a stock exchange during market hours, just like shares. You can buy or sell at any moment and know the price immediately. The same platforms you\'d use to buy Tesco shares are used to buy ETFs.',
          'For long-term investors, this difference is mostly irrelevant — you\'re not going to be trading in and out. But for tax, cost, and platform compatibility reasons, most UK investors use ETFs rather than traditional index funds.',
        ],
        callout: {
          type: 'tip',
          text: 'In practice, the terms "index fund" and "ETF" are often used interchangeably. Almost all ETFs are index-tracking, and most index funds are now available as ETFs. The important thing is the low-cost passive strategy — not the wrapper.',
        },
      },
      {
        heading: 'Physical vs synthetic ETFs',
        paragraphs: [
          'There are two ways an ETF can track an index:',
        ],
        list: [
          'Physical ETF: actually buys and holds the underlying shares. If it tracks the FTSE 100, it holds shares in all 100 companies. Simple, transparent, and lower counterparty risk. Most ETFs you\'ll encounter are physical.',
          'Synthetic ETF: uses financial contracts (derivatives, called swaps) with a bank to replicate index returns, without buying the underlying shares. Can be more efficient for hard-to-access markets, but introduces counterparty risk — if the bank defaults, there\'s a problem.',
        ],
        callout: {
          type: 'key',
          text: 'For beginners, stick to physically-replicated ETFs. They\'re simple, transparent, and the most widely available. You\'ll see "Physical" or "Acc" (accumulating) labelled on most popular ETFs from Vanguard and iShares.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'What is the main practical difference between a traditional index fund and an ETF for a long-term investor?',
          options: [
            { text: 'ETFs always charge lower fees than index funds', correct: false },
            { text: 'ETFs trade on stock exchanges throughout the day; traditional funds price once daily', correct: true },
            { text: 'ETFs are riskier because they\'re traded more actively', correct: false },
          ],
          explanation: 'The key mechanical difference is intraday trading. For long-term investors, this rarely matters in practice. The more important distinction is cost and how the fund tracks its index. Both can have very low fees if you choose well.',
        },
      },
      {
        heading: 'The bid-ask spread',
        paragraphs: [
          'Because ETFs trade on an exchange, they have a bid-ask spread — the difference between the price to buy and the price to sell at any moment.',
          'For very popular, liquid ETFs (like Vanguard FTSE All-World), spreads are tiny — often less than 0.05%. For smaller, less-traded ETFs, spreads can be wider, adding to your effective cost.',
          'When comparing ETFs, look at both the OCF (annual cost) and the typical spread. A fund with a slightly higher OCF but near-zero spread might be cheaper overall if you\'re buying in large amounts or trading frequently.',
        ],
      },
      {
        heading: 'Accumulating vs distributing ETFs',
        paragraphs: [
          'ETFs come in two dividend-handling flavours, usually labelled "Acc" or "Dist" (or "Inc"):',
        ],
        list: [
          'Accumulating (Acc): dividends from the underlying holdings are automatically reinvested within the fund. Your unit price grows. No cash arrives in your account. This is more tax-efficient inside an ISA and requires no action from you.',
          'Distributing (Dist/Inc): dividends are paid out as cash to your account. You then decide whether to reinvest them. Outside an ISA, these may trigger dividend tax.',
        ],
        callout: {
          type: 'tip',
          text: 'Inside a Stocks & Shares ISA: use accumulating (Acc) ETFs. Dividends are reinvested automatically, compound over time, and generate no tax. Outside an ISA, distributing funds can work if you want income — but accumulating is simpler for long-term growth.',
        },
      },
      {
        heading: 'Popular ETFs for UK investors',
        paragraphs: [
          'These are the ETFs you\'ll encounter most often on UK platforms:',
        ],
        list: [
          'Vanguard FTSE All-World UCITS ETF (VWRL/VWRP) — ~3,700 companies across 50+ countries. OCF: 0.22%. VWRL distributes, VWRP accumulates.',
          'iShares Core MSCI World UCITS ETF (IWDA) — ~1,400 companies in 23 developed markets. OCF: 0.20%. Accumulating.',
          'iShares Core S&P 500 UCITS ETF (CSPX) — 500 largest US companies. OCF: 0.07%. Accumulating.',
          'Vanguard FTSE 100 UCITS ETF (VUKE) — 100 largest UK companies. OCF: 0.09%. Distributing.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Do you understand how ETFs work and which type suits a long-term ISA investor?',
          fuzzyNote: 'Key points: ETFs trade on exchanges (vs once-daily for traditional funds). For most UK investors, an accumulating (Acc) physically-replicated ETF tracking a broad global index is the right starting point. Stick to large, well-known providers — Vanguard and iShares are the most popular.',
        },
      },
    ],
    keyTakeaways: [
      'An ETF is a fund that trades on a stock exchange throughout the day, unlike traditional funds that price once daily',
      'Physical ETFs hold the actual underlying shares; synthetic ETFs use swaps — stick to physical for simplicity',
      'Accumulating (Acc) ETFs automatically reinvest dividends — better for long-term compounding inside an ISA',
      'Top UK choices: VWRP (global, Acc), IWDA (developed markets, Acc), CSPX (US, Acc)',
    ],
  },

  {
    num: 6,
    slug: 'lesson-6',
    title: 'Active vs passive investing — what the evidence says',
    duration: '11 min',
    intro: 'The most important debate in investing isn\'t which stock to buy. It\'s whether anyone — including professional fund managers — can reliably beat the market at all. This lesson looks at what decades of data say, and why the answer matters for how you invest your money.',
    sections: [
      {
        heading: 'The case for active management',
        paragraphs: [
          'The appeal of active management is obvious. Hire brilliant analysts. Study companies obsessively. Find undervalued stocks before anyone else does. Sell before they fall.',
          'Some managers have done exactly this. Warren Buffett at Berkshire Hathaway has delivered extraordinary long-term returns. Peter Lynch averaged 29% per year running Fidelity\'s Magellan Fund in the 1980s. The skill exists.',
          'Active managers argue markets are inefficient — meaning share prices don\'t always reflect true underlying value. A good analyst can spot the gap and profit.',
        ],
      },
      {
        heading: 'The data: what actually happens',
        paragraphs: [
          'The S&P Indices Versus Active (SPIVA) scorecard is published twice yearly and measures how many actively managed funds outperform their benchmark index after fees. The results are consistently damning for active managers.',
        ],
        list: [
          'Over 1 year: roughly 55–65% of active funds underperform their benchmark',
          'Over 5 years: ~75–80% underperform',
          'Over 15 years: ~85–90% underperform',
        ],
        callout: {
          type: 'key',
          text: 'The longer the time period, the worse active funds look. This isn\'t a bad year or a bad decade — it\'s a structural pattern that has held across markets, geographies, and fund categories for 50+ years.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'According to long-term SPIVA data, what percentage of active fund managers underperform their benchmark index over 15 years?',
          options: [
            { text: 'Around 30%', correct: false },
            { text: 'Around 55%', correct: false },
            { text: 'Around 85–90%', correct: true },
          ],
          explanation: 'Roughly 85–90% of active funds underperform their benchmark over 15-year periods. This is one of the most replicated findings in financial research. The odds of picking a winning active fund in advance are very low.',
        },
      },
      {
        heading: 'Why active funds struggle to win',
        paragraphs: [
          'Several structural factors explain why active outperformance is so rare:',
        ],
        list: [
          'Costs: a 1% annual fee must be overcome before any outperformance can benefit investors. The index fund sets the hurdle very low (0.05–0.20%); active funds set it high.',
          'The market is the competition: active fund managers are competing against each other. For every manager who finds a cheap stock, another is selling it. The market price already reflects the collective judgement of thousands of professional analysts.',
          'Survivorship bias: failed funds close and disappear from databases. Performance statistics only count funds that survived — systematically overstating average active fund returns.',
          'Skill vs luck: short-term outperformance is often luck. Most managers who beat the market for 3 years don\'t sustain it for 10.',
        ],
        callout: {
          type: 'example',
          text: 'Imagine 1,000 fund managers each flip a coin 10 times. Through pure luck, some will get 8 or 9 heads in a row. If you only see the results after the fact, those managers look skilled. Financial markets work similarly — distinguishing skill from luck requires 20+ years of data, and few investors have the patience to wait.',
        },
      },
      {
        heading: 'When active might make sense',
        paragraphs: [
          'The case for passive is overwhelming for mainstream markets (US, UK, global). But there are some niches where active can add value:',
        ],
        list: [
          'Emerging markets: less analyst coverage and less efficient pricing means skilled managers have more opportunity to find mispriced stocks',
          'Small-cap stocks: same logic — fewer eyes on smaller companies',
          'Specialist strategies (e.g. impact investing or thematic funds) where the goal isn\'t purely to beat an index',
        ],
        callout: {
          type: 'tip',
          text: 'Even in these cases, the cost drag of active management is real. If you do choose an active fund, make sure the OCF is justified by a credible long-term track record — not just 3–5 years.',
        },
      },
      {
        heading: 'The rational conclusion',
        paragraphs: [
          'For the vast majority of investors — including most professionals — a passive index fund strategy delivers better outcomes than active stock picking.',
          'This isn\'t defeatist. Owning the entire market means you capture all the growth of global capitalism. You\'ll match the market return, minus a tiny cost. Over time, that beats most active strategies.',
          'Passive investing doesn\'t mean settling. It means being rational about where the evidence points.',
        ],
        checkpoint: {
          type: 'reflection',
          prompt: 'If 85–90% of professional fund managers underperform the index over 15 years, what does that tell you about stock-picking as a strategy for most investors?',
          reveal: 'That picking stocks or picking active managers is a game most people lose — including most professionals. The market is extremely competitive. The simplest, most evidence-backed approach is to stop trying to beat the market, buy a low-cost index fund, and let the market do the work.',
        },
      },
    ],
    keyTakeaways: [
      'SPIVA data shows ~85–90% of active fund managers underperform their benchmark over 15 years',
      'Structural reasons: high fees, efficient markets, survivorship bias, and luck vs skill confusion',
      'Active management may add value in less efficient markets (emerging, small-cap) but the evidence is weaker',
      'The rational default for most investors is a low-cost passive index strategy',
    ],
  },

  {
    num: 7,
    slug: 'lesson-7',
    title: 'Diversification — why spreading your bets matters',
    duration: '8 min',
    intro: 'There\'s a famous saying in investing: "Don\'t put all your eggs in one basket." It sounds like a cliché. But diversification — spreading your money across many different investments — is one of the few strategies that genuinely reduces risk without sacrificing expected return. Here\'s how it works.',
    sections: [
      {
        heading: 'Two types of risk',
        paragraphs: [
          'When you invest in stocks, you face two broad types of risk:',
        ],
        list: [
          'Specific risk (also called idiosyncratic or unsystematic risk): risk specific to a single company. A CEO scandal. A product recall. A bankruptcy. This affects only that company.',
          'Market risk (also called systematic risk): risk that affects the entire market — a recession, a financial crisis, a pandemic. No single stock is immune.',
        ],
      },
      {
        paragraphs: [
          'The crucial insight: specific risk can be diversified away. Market risk cannot.',
        ],
        callout: {
          type: 'example',
          text: 'If you own only Wirecard (the German payments company that committed massive fraud and collapsed in 2020), you lose everything. If you own 500 companies and Wirecard is one of them, your portfolio falls 0.2%. Specific risk: eliminated by diversification. Market risk: unavoidable, but it\'s also the source of your returns.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'You own shares in 400 different global companies. One of them goes bankrupt. What happens to your portfolio?',
          options: [
            { text: 'It falls dramatically — any bankruptcy is catastrophic', correct: false },
            { text: 'It falls by roughly 0.25% — barely noticeable', correct: true },
            { text: 'It\'s completely unaffected because you\'re diversified', correct: false },
          ],
          explanation: '1 stock out of 400 represents 0.25% of your portfolio. If that company becomes worthless, your loss is around 0.25%. Diversification doesn\'t eliminate all losses, but it contains them to a manageable level. Market-wide events still affect you, but no single company can wipe you out.',
        },
      },
      {
        heading: 'How many stocks do you need?',
        paragraphs: [
          'Academic research (starting with Harry Markowitz\'s Modern Portfolio Theory in the 1950s) showed that most specific risk is eliminated by holding 20–30 stocks from different industries.',
          'But "different industries" matters. Owning 30 oil companies doesn\'t help much — they all move together. True diversification means different sectors, geographies, and company sizes.',
          'For most investors, a single global index ETF holding 1,000–3,500 companies is more diversification than you\'ll ever need.',
        ],
      },
      {
        heading: 'Asset class diversification',
        paragraphs: [
          'Diversification isn\'t just about holding many stocks. Different asset classes have different risk profiles and don\'t always move together:',
        ],
        list: [
          'Stocks: high return, high volatility, good long-term growth',
          'Bonds: lower return, lower volatility, tend to hold value when stocks fall',
          'Property: medium return, inflation-linked, illiquid',
          'Cash: lowest return, highest stability, inflation erosion risk',
        ],
        callout: {
          type: 'key',
          text: 'Correlation is the key concept. Two assets are positively correlated if they tend to move together; negatively correlated if they move in opposite directions. Stocks and bonds have historically had low or negative correlation — mixing them smooths out portfolio volatility.',
        },
      },
      {
        heading: 'Geographic diversification',
        paragraphs: [
          'Owning only UK stocks is a common mistake among UK investors. The UK makes up roughly 4% of the global stock market by value. Concentrating all your money in 4% of the world\'s companies is the opposite of diversification.',
          'A global index fund like VWRP (Vanguard FTSE All-World) holds companies across North America (~60%), Europe (~15%), Japan (~6%), Emerging Markets (~10%), and more. This spreads your risk across economies, currencies, and political systems.',
          'That said, some UK investors hold a small "home bias" for practical reasons — dividends in GBP, familiarity with UK companies, absence of currency conversion costs. This is reasonable, but don\'t let it dominate your portfolio.',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Is the logic of diversification clear?',
          fuzzyNote: 'Key point: diversification eliminates company-specific risk without reducing expected returns. The more uncorrelated your investments, the smoother the ride. A global index ETF does this automatically — you get diversification across thousands of companies and dozens of countries.',
        },
      },
      {
        heading: 'The cost of over-diversification',
        paragraphs: [
          'Owning 10 different global ETFs that all track similar indices isn\'t more diversified — it\'s just more complicated and potentially more expensive.',
          'True diversification adds uncorrelated assets. Adding a fourth global fund barely changes your risk profile. Adding bonds or property to an all-equity portfolio genuinely does.',
          'For beginners: one or two funds is plenty. One global equity ETF + one bond fund (if you want lower volatility) gives you all the diversification you practically need.',
        ],
      },
    ],
    keyTakeaways: [
      'Specific risk (company-level) can be diversified away; market risk (economy-wide) cannot',
      'Most specific risk is eliminated by holding 20–30 uncorrelated stocks — a global ETF holds thousands',
      'Asset class diversification (stocks + bonds) reduces volatility — they don\'t always move together',
      'Geographic diversification protects against any single country\'s economic or political problems',
    ],
  },

  {
    num: 8,
    slug: 'lesson-8',
    title: 'How to read a fund factsheet — what to actually look for',
    duration: '10 min',
    intro: 'Every fund you\'ll encounter has a factsheet — a document that tells you everything you need to know about it. Most people ignore these or find them intimidating. By the end of this lesson, you\'ll know exactly what to look for and what to skip.',
    sections: [
      {
        heading: 'What is a fund factsheet?',
        paragraphs: [
          'A fund factsheet (also called a Key Investor Information Document, or KIID, in EU/UK regulatory language) is a short standardised document that all funds must publish.',
          'It covers: what the fund does, what it invests in, what its costs are, what its past performance looks like, and what the key risks are. Typically 1–4 pages.',
          'You\'ll find factsheets on the fund provider\'s website (Vanguard, iShares, etc.) or on your investing platform\'s fund information page.',
        ],
      },
      {
        heading: 'What to look for: the important bits',
        paragraphs: [
          'Here\'s what matters in a factsheet, and what to do with each:',
        ],
        list: [
          'Fund objective — what the fund aims to do (e.g. "track the FTSE All-World index"). Make sure this matches what you want.',
          'Benchmark — the index the fund tracks or is measured against. You want the fund\'s returns to closely match this.',
          'OCF/TER — the annual cost. Lower is better. For passive funds: excellent below 0.10%, good below 0.25%, question anything above 0.40%.',
          'Fund size (AUM) — Assets Under Management. Larger funds tend to be more liquid and less likely to be wound up. Look for funds with at least £500m–£1bn AUM.',
          'Holdings breakdown — what the fund actually holds. Check if the geographical and sector allocation makes sense for your goals.',
          'Tracking error/tracking difference — for index funds, how closely the fund matched its index. Smaller is better.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'You\'re comparing two ETFs tracking the MSCI World index. Fund A has an OCF of 0.20%, Fund B has 0.07%. Both have similar fund sizes. What should you do?',
          options: [
            { text: 'Choose Fund A because it\'s older and more established', correct: false },
            { text: 'Choose Fund B — lower fees on an identical strategy means more return for you', correct: true },
            { text: 'Wait to see which one performs better this year', correct: false },
          ],
          explanation: 'When two funds track the same index, cost is the main differentiator. Fund B is almost 3× cheaper per year. That gap compounds over decades. Don\'t pay more for the same market exposure.',
        },
      },
      {
        heading: 'What to ignore: past performance',
        paragraphs: [
          'Every factsheet includes a past performance chart. It\'s legally required to include the warning: "Past performance is not a reliable indicator of future results."',
          'This isn\'t just legal boilerplate — it\'s genuinely true. Studies consistently show that funds which topped performance charts in one 5-year period are no more likely to top them in the next.',
          'The past performance of an index fund tells you almost nothing useful. What you want is for it to closely track its benchmark at low cost. That\'s the repeatable characteristic — not raw returns.',
        ],
        callout: {
          type: 'key',
          text: 'The single most reliable predictor of future fund performance is cost. Low fees are persistent and structural. High past performance is not. Choose on cost and strategy — not on which fund had the best year.',
        },
      },
      {
        heading: 'Risk ratings and what they actually mean',
        paragraphs: [
          'Factsheets include a risk/reward indicator — a scale from 1 (lowest risk/return) to 7 (highest). This is based on historical price volatility.',
          'A global equity ETF will typically sit at 5–6. A bond fund at 2–3. Cash at 1.',
          'This rating reflects short-term price swings, not long-term risk of loss. A "6" equity fund is highly volatile but historically has delivered strong long-term returns. For a 20-year horizon, a "6" may actually carry less risk of inflation erosion than a "2" bond fund.',
          'Use risk ratings as context, not gospel.',
        ],
      },
      {
        heading: 'Putting it together: what to check before you buy',
        paragraphs: [],
        list: [
          '1. Does the fund objective match what I want to hold?',
          '2. What is the OCF? Is it below 0.25% for a passive fund?',
          '3. Is the fund large enough (>£500m AUM) to be stable?',
          '4. Is the tracking difference small? Is it a physical fund?',
          '5. Does the holdings breakdown match my intended diversification?',
        ],
        checkpoint: {
          type: 'reflection',
          prompt: 'You\'re looking at an active fund with a 5-year return of 12% per year and an OCF of 1.5%. A passive MSCI World ETF returned 10% per year over the same period with a 0.20% OCF. Which is actually better?',
          reveal: 'After fees, the active fund returned ~10.5% net (12% − 1.5%). The passive ETF returned ~9.8% net (10% − 0.20%). In this case the active fund won — by about 0.7% per year. But: (1) past 5-year performance is not reliable for future returns; (2) SPIVA data shows this kind of outperformance rarely persists; (3) your decision should weight the probability of continued outperformance against the certainty of paying 7.5× more in fees.',
        },
      },
    ],
    keyTakeaways: [
      'Fund factsheets (KIIDs) contain: fund objective, benchmark, OCF, fund size, holdings, and past performance',
      'The most important metric is cost (OCF) — it\'s the only truly predictive indicator of future relative performance',
      'Past performance is not a reliable predictor — don\'t choose funds based on last year\'s returns',
      'Check: OCF below 0.25% for passive funds, AUM above £500m, physical replication, close tracking difference',
    ],
  },

  {
    num: 9,
    slug: 'lesson-9',
    title: 'Costs and fees — the silent killer of long-term returns',
    duration: '9 min',
    intro: 'Fees are the most underestimated enemy of long-term investing. Unlike a market crash, which is dramatic and visible, fees quietly chip away at your wealth every single year without sending you an invoice. This lesson shows you exactly how much they cost — and how to minimise them.',
    sections: [
      {
        heading: 'The three layers of cost',
        paragraphs: [
          'When you invest, you face costs at three different levels:',
        ],
        list: [
          '1. Platform fee: charged by the provider where you hold your account (Hargreaves Lansdown, Trading 212, Vanguard, etc.). Usually a percentage of your portfolio or a flat monthly fee.',
          '2. Fund OCF: charged by the fund provider (Vanguard, iShares, etc.) for managing the fund. Deducted from the fund\'s assets — you don\'t pay separately.',
          '3. Trading costs: charged when you buy or sell. Many platforms now offer commission-free ETF trades, but watch for currency conversion fees (FX spread) on non-GBP assets.',
        ],
        callout: {
          type: 'key',
          text: 'Your total cost of investing = platform fee + fund OCF + trading costs. Even if you choose a 0.07% ETF, a 0.45% platform fee makes your all-in cost 0.52%. Always calculate the total.',
        },
      },
      {
        heading: 'The compound effect of fees',
        paragraphs: [
          'A 1% annual fee sounds trivial. Over a single year on £10,000, it\'s £100. But fees compound in the same way returns do — they grow on your growing balance.',
        ],
        list: [
          '£10,000 invested for 30 years at 7% gross, with 0.15% annual cost → ~£72,000',
          '£10,000 invested for 30 years at 7% gross, with 1.15% annual cost → ~£54,000',
          'The difference: ~£18,000 lost to fees on a £10,000 initial investment',
        ],
        callout: {
          type: 'example',
          text: 'That £18,000 difference represents 180% of your original investment — destroyed by a 1% fee difference. This is why the financial industry is full of 1%+ products: that 1% is their entire business model, and it compounds enormously at scale.',
        },
        checkpoint: {
          type: 'quiz',
          question: 'Your platform charges 0.45%/year and your fund OCF is 0.20%/year. What is your total annual cost?',
          options: [
            { text: '0.20% — the fund cost is what matters', correct: false },
            { text: '0.45% — only the platform cost is real', correct: false },
            { text: '0.65% — both costs apply to your portfolio', correct: true },
          ],
          explanation: 'Both costs are real and compound on your portfolio. Platform fee + fund OCF = 0.65% total annual drag. This is still reasonable — but it illustrates why you need to think about both layers, not just one.',
        },
      },
      {
        heading: 'Platform fee comparison',
        paragraphs: [
          'UK investing platform fees vary significantly, and the best platform depends on your portfolio size:',
        ],
        list: [
          'Trading 212 ISA — no platform fee, no trading commission on ETFs. Best for small portfolios.',
          'InvestEngine — no platform fee for DIY ETF investing. Commission-free. Excellent for cost-conscious beginners.',
          'Vanguard Investor — 0.15% platform fee (capped at £375/year). Best for larger portfolios using Vanguard funds only.',
          'Freetrade — free plan has basic features; Plus plan (£5.99/month) for ISA and more ETFs. Fixed fee becomes cheaper as portfolio grows.',
          'Hargreaves Lansdown — 0.45% fee (capped at £45/year for ETFs). Very reputable, great tools, but expensive for large portfolios.',
        ],
        callout: {
          type: 'tip',
          text: 'A percentage platform fee suits small portfolios (cheaper in absolute terms). A capped or flat fee suits large portfolios. At £50,000+, platforms with percentage fees become expensive. Review your platform choice as your portfolio grows.',
        },
      },
      {
        heading: 'What to do about fees',
        paragraphs: [
          'You can\'t eliminate fees, but you can minimise them by making a few deliberate choices:',
        ],
        list: [
          'Choose low-cost index ETFs — target OCF below 0.20% for broad market exposure',
          'Compare platform fees before opening an account — model your total cost at your expected portfolio size',
          'Use an ISA — this doesn\'t reduce fees directly, but it eliminates dividend and capital gains tax, increasing your net return',
          'Avoid frequent trading — every transaction may trigger a fee or spread cost; long-term buy-and-hold minimises this',
          'Watch for FX fees — buying USD-denominated ETFs on a UK platform often incurs a 0.5–1.5% currency conversion fee',
        ],
        checkpoint: {
          type: 'confidence',
          prompt: 'Do you have a clear picture of where investing costs come from and how to minimise them?',
          fuzzyNote: 'Three layers: platform fee + fund OCF + trading costs. All three compound over time. Key actions: choose a zero/low platform fee provider for your portfolio size, pick ETFs with OCF below 0.20%, avoid unnecessary trading, use accumulating ETFs inside an ISA.',
        },
      },
    ],
    keyTakeaways: [
      'Three cost layers: platform fee + fund OCF + trading costs — all compound on your growing balance',
      'A 1% annual fee difference on a 30-year investment can cost tens of thousands of pounds',
      'Best platforms for low cost: Trading 212, InvestEngine (beginners); Vanguard Investor (mid-large portfolios)',
      'Minimise fees: low-OCF ETFs, appropriate platform, ISA wrapper, buy-and-hold, avoid FX costs',
    ],
  },

  {
    num: 10,
    slug: 'lesson-10',
    title: 'Building your first simple portfolio',
    duration: '14 min',
    intro: 'You\'ve covered everything: what stocks are, how markets work, what funds and ETFs do, why passive beats active, the power of diversification, how to read a factsheet, and the impact of fees. This final lesson brings it all together. Here\'s how to actually build a simple, evidence-based portfolio that suits a UK investor.',
    sections: [
      {
        heading: 'Start with the goal, not the product',
        paragraphs: [
          'Before picking any fund, answer three questions:',
        ],
        list: [
          '1. What is this money for? (retirement, home deposit, wealth building — each has a different time horizon)',
          '2. When will I need it? (under 3 years → cash; 3–5 years → cautious; 5+ years → can invest fully)',
          '3. How would I react to a 30% fall? (if panic-selling is likely, reduce equity allocation)',
        ],
      },
      {
        paragraphs: [
          'This determines your asset allocation — the split between stocks and bonds. Everything else follows from this.',
        ],
        callout: {
          type: 'tip',
          text: 'A useful starting point: subtract your age from 110. That\'s a rough percentage to hold in equities. At 21: ~89% equities. At 55: ~55% equities. This is a crude heuristic, not financial advice — but it captures the logic that younger investors can take more risk.',
        },
      },
      {
        heading: 'The one-fund portfolio',
        paragraphs: [
          'The simplest possible approach: one global equity ETF inside a Stocks & Shares ISA.',
          'Vanguard FTSE All-World Acc (VWRP) or iShares Core MSCI World Acc (IWDA) gives you instant, automated exposure to thousands of companies across dozens of countries. Dividends reinvest automatically. Annual cost: 0.20–0.22%.',
          'This is not a compromise or a starter solution. It is a genuinely excellent long-term strategy that beats the majority of professional investors over time. You can stop here and be well-positioned.',
        ],
        checkpoint: {
          type: 'quiz',
          question: 'You\'re 22 years old, have a 30-year investment horizon, and want the simplest possible strategy. Which option makes most sense?',
          options: [
            { text: 'A mix of 15 carefully selected individual stocks across sectors', correct: false },
            { text: 'One global equity index ETF (accumulating) inside a Stocks & Shares ISA', correct: true },
            { text: 'An active managed fund recommended by your bank', correct: false },
          ],
          explanation: 'For a long time horizon with a beginner\'s knowledge base, one global index ETF inside an ISA is optimal. It\'s diversified across thousands of companies, accumulates dividends automatically, is tax-efficient, and has tiny costs. Individual stocks require ongoing research; bank-recommended active funds typically underperform and overcharge.',
        },
      },
      {
        heading: 'Adding bonds: the two-fund portfolio',
        paragraphs: [
          'If you want to reduce portfolio volatility — because your time horizon is shorter, or you know you\'d struggle with a 40% drawdown — add a bond fund alongside your equity ETF.',
          'Common bond ETF choices for UK investors:',
        ],
        list: [
          'Vanguard Global Bond Index Fund — diversified global government and corporate bonds. OCF: 0.15%.',
          'iShares Core UK Gilts UCITS ETF (IGLT) — UK government bonds only. OCF: 0.07%.',
          'Vanguard LifeStrategy range — pre-built funds at fixed equity/bond splits (20%, 40%, 60%, 80%, 100%). One fund solution for mixed portfolios.',
        ],
        callout: {
          type: 'example',
          text: 'Two examples of simple two-fund portfolios:\n— Aggressive (30+ year horizon): 90% VWRP + 10% IGLT\n— Balanced (10–20 year horizon): 70% VWRP + 30% Global Bond Fund\nOr skip the complexity entirely: Vanguard LifeStrategy 80% Equity does this for you in one fund.',
        },
      },
      {
        heading: 'Rebalancing',
        paragraphs: [
          'Over time, your portfolio drifts. If stocks rise strongly, your 80/20 equity/bond split might become 88/12. Rebalancing means selling some of what has grown and buying what has lagged, returning to your target allocation.',
          'For most investors, rebalancing once a year is enough. Many platforms offer automatic rebalancing — or you can simply direct new contributions to whichever asset is underweight.',
          'Don\'t over-engineer this. For a simple one or two-fund portfolio, annual rebalancing takes 15 minutes.',
        ],
      },
      {
        heading: 'A complete beginner portfolio: step by step',
        paragraphs: [
          'Here\'s everything you need to get started:',
        ],
        list: [
          '1. Open a Stocks & Shares ISA on Trading 212, InvestEngine, or Vanguard Investor',
          '2. Set up a monthly auto-invest (even £25–£50 counts — start small and increase over time)',
          '3. Buy: VWRP (global equity, accumulating) — this alone is a complete portfolio',
          '4. Optional addition: 10–20% in IGLT or a Vanguard LifeStrategy bond fund if you want less volatility',
          '5. Once a year: check allocation, rebalance if needed, increase monthly contribution if possible',
          '6. Otherwise: do nothing. Don\'t check prices daily. Don\'t panic-sell. Just let it compound.',
        ],
        callout: {
          type: 'key',
          text: 'The best portfolio is the one you\'ll actually stick with through a 40% crash. That means low cost, diversified, and simple enough that you understand what you own. Complexity doesn\'t add returns — it adds anxiety and fees.',
        },
        checkpoint: {
          type: 'confidence',
          prompt: 'Do you feel ready to build your first real portfolio?',
          fuzzyNote: 'If not, that\'s fine — this is a lot to absorb. The concrete starting action is simple: open a Stocks & Shares ISA, set up a small monthly contribution into VWRP, and forget about it for a month. You can refine the strategy later. Starting is everything.',
        },
      },
      {
        heading: 'What comes next',
        paragraphs: [
          'This course has given you the foundation to understand and choose investment vehicles. The next natural step is learning how to maximise the tax efficiency of those investments — which means going deep on ISAs, Lifetime ISAs, and SIPPs.',
          'The ISAs & Tax-Free Saving course covers all of this: the £20,000 annual allowance, what types of assets you can hold, the Lifetime ISA for first-time buyers, and how pensions interact with ISAs.',
          'You don\'t need to rush. The most important step is starting. Even £50 per month in a global index ETF inside an ISA is a genuinely transformative habit — and you now have all the knowledge you need to do it well.',
        ],
      },
    ],
    keyTakeaways: [
      'Start with your goal, time horizon, and risk tolerance — asset allocation follows from these',
      'A single global equity ETF (VWRP or IWDA) inside an ISA is a complete, excellent portfolio',
      'Adding bonds reduces volatility — Vanguard LifeStrategy funds offer pre-built equity/bond mixes',
      'Rebalance annually, automate contributions, and hold through volatility — consistency beats cleverness',
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

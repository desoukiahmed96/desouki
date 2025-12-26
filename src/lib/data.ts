// Portfolio data based on Abd Elrahman Desouki's profile
export const portfolioData = {
    personal: {
        name: "AbdElrahman Desouki",
        shortName: "Desouki",
        title: "Accountant | Odoo ERP Specialist",
        tagline: "Bridging Finance & Technology",
        email: "desoukicol@gmail.com",
        phone: "+20 106 695 4021",
        location: "Cairo, Egypt",
        nationality: "Egyptian",
    },

    hero: {
        headline: ["I Transform", "Business Chaos", "Into Digital Order"],
        subheadline:
            "Accountant by training. ERP architect by passion. I build systems that make businesses run smoother, faster, and smarter.",
    },

    about: {
        intro:
            "I started my career crunching numbers and balancing ledgers. But I quickly realized that true financial efficiency isn't just about accuracy—it's about systems.",
        story: [
            "My journey began in the traditional world of accounting—meticulous journal entries, trial balances, and financial reports. But I saw something others missed: the friction. The manual processes. The disconnected data.",
            "That's when I discovered Odoo ERP, and everything changed. I learned to translate complex business workflows into streamlined digital systems that actually work. Now I help businesses bridge the gap between financial operations and modern technology.",
            "Today, I blend my accounting expertise with ERP implementation skills and AI-driven automation. I don't just manage numbers—I architect the systems that generate them.",
        ],
        strengths: [
            "Strong analytical mindset",
            "Detail-oriented with high accuracy",
            "Business-oriented thinking",
            "Fast learner with high adaptability",
            "Passion for systems and optimization",
            "Bridge between accounting and technology",
        ],
    },

    skills: {
        accounting: {
            title: "Accounting & Finance",
            description: "Core financial expertise with a focus on accuracy and compliance",
            items: [
                { name: "Financial Accounting & Bookkeeping", level: 95 },
                { name: "General Ledger Management", level: 90 },
                { name: "Trial Balance & Financial Reporting", level: 90 },
                { name: "Journal Entries & Adjustments", level: 95 },
                { name: "Accounts Payable & Receivable", level: 90 },
                { name: "Data Accuracy & Reconciliation", level: 95 },
            ],
        },
        erp: {
            title: "Odoo ERP Expertise",
            description: "End-to-end business system implementation and optimization",
            items: [
                { name: "Accounting Module", level: 95 },
                { name: "Sales & Purchase Management", level: 90 },
                { name: "Inventory & Warehouse", level: 85 },
                { name: "Manufacturing (MRP)", level: 80 },
                { name: "Point of Sale (POS)", level: 85 },
                { name: "Human Resources (HR)", level: 80 },
            ],
        },
        technical: {
            title: "Technical & Digital",
            description: "Modern tools and methodologies for business optimization",
            items: [
                { name: "ERP Functional Analysis", level: 90 },
                { name: "Business Workflow Design", level: 85 },
                { name: "AI-Assisted Productivity", level: 80 },
                { name: "Automation-Oriented Thinking", level: 85 },
                { name: "Digital Documentation", level: 90 },
                { name: "System Configuration", level: 85 },
            ],
        },
    },

    experience: [
        {
            id: 1,
            title: "Odoo ERP Implementation Training",
            organization: "Professional Development",
            period: "Dec 2020 – Jan 2021",
            type: "training",
            problem:
                "Needed to bridge the gap between traditional accounting and modern ERP systems.",
            solution:
                "Completed intensive training covering full business cycle implementation across Sales, Purchase, Inventory, Accounting, Manufacturing, POS, HR, and Website modules.",
            impact:
                "Gained hands-on experience with real-world business cases including Manufacturing Company and Corporate Enterprise scenarios. Mastered data flow between departments and ERP automation logic.",
            highlights: [
                "Full business cycle implementation",
                "Real-world case studies",
                "Cross-departmental data flow",
                "ERP automation alignment",
            ],
        },
        {
            id: 2,
            title: "Accountant",
            organization: "Commercial Trading Companies",
            period: "Oct 2017 – Sep 2019",
            type: "work",
            problem:
                "Trading companies needed accurate financial records and timely reporting to maintain operations and compliance.",
            solution:
                "Managed complete accounting records including daily transactions, monthly/annual trial balances, and financial reports using American Journal, Subsidiary Ledgers, and General Ledger systems.",
            impact:
                "Ensured data consistency and compliance with accounting standards. Supported closing procedures and contributed to reliable financial reporting that informed business decisions.",
            highlights: [
                "Daily transaction management",
                "Monthly & annual trial balances",
                "Financial report preparation",
                "Standards compliance",
            ],
        },
    ],

    education: {
        degree: "Bachelor's Degree in Accounting & Finance",
        institution: "Ain Shams University – Faculty of Commerce",
        graduation: "May 2020",
        focus: [
            "Financial Accounting",
            "Cost Accounting",
            "Management Accounting",
            "Auditing",
            "Financial Analysis",
            "Business Law & Economics",
        ],
    },

    languages: [
        { name: "Arabic", level: "Native", percentage: 100 },
        { name: "English", level: "Intermediate (B1)", percentage: 70 },
        { name: "German", level: "Basic to Intermediate (A2-B1)", percentage: 45 },
    ],

    interests: [
        { name: "Boxing & Fitness", icon: "boxing" },
        { name: "Reading & Writing", icon: "book" },
        { name: "Technology & Digital Systems", icon: "tech" },
        { name: "Business Process Improvement", icon: "process" },
        { name: "ERP Systems & Automation", icon: "erp" },
    ],

    cta: {
        headline: "Let's Build Something Together",
        subheadline:
            "Looking for someone who understands both the numbers and the systems? Let's talk about how I can help optimize your business operations.",
    },
};

export type PortfolioData = typeof portfolioData;

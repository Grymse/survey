import { countries } from "./countries";

type Meta = {
    title?: string;
    subtitle?: string;
    required?: boolean,
}

type Input = {
    id: number,
}

export type RadioInputType = {
    type: 'RadioInput',
    options?: string[];
    shuffle?: boolean,
} & Input & Meta;

export type DropDownInputType = {
    type: 'DropDownInput',
    options?: string[];
    required?: boolean;
    shuffle?: boolean;
    placeholder?: string;
} & Input & Meta;

export type SelectInputType = {
    type: 'SelectInput',
    options?: string[];
    required?: boolean;
    shuffle?: boolean;
    placeholder?: string;
} & Input & Meta;

export type TextInputType = {
    type: 'TextInput',
    required?: boolean;
    placeholder?: string;
} & Input & Meta;

export type TextFieldInputType = {
    type: 'TextFieldInput',
    required?: boolean;
    placeholder?: string;
} & Input & Meta;

export type RangeInputType = {
    type: 'RangeInput',
    required?: boolean;
    placeholder?: string;
    options?: string[];
} & Input & Meta;

export type CompoundType = {
    type: 'Compound',
    elements?: Element[];
    shuffle?: boolean;
} & Meta;

export type TextType = {
    type: 'Text',
} & Meta;

export type Element = RadioInputType | DropDownInputType | SelectInputType | TextInputType | TextFieldInputType | RangeInputType | CompoundType | TextType;


export type Page = {
elements: Element[];
markdown?: string;
} & Meta;

export type Survey = {
pages: Page[]
markdown?: string;
} & Meta;


type StrategyType = {
  title: string;
  strategy: string;
  example: string;
}

function createStrategyCompound(index: number, strategy: StrategyType) : Element {
  const id = 20 + index * 2;
  return {
    type: "Compound",
    elements: [
      {
        title: strategy.strategy,
        subtitle: strategy.example,
        type: "Text",
      },
      {
        id: id,
        title: "Have you tried this strategy before?",
        type: "RadioInput",
        options: ["Yes", "No", "Maybe"],
        required: true,
      },
      {
        id: id+1,
        title: "How effective do you perceive this strategy to be?",
        subtitle: "Rate on scale from 1 (Not effective) to 5 (Very effective).",
        options: ["1", "2", "3", "4", "5"],
        type: "RangeInput",
      },
    ],
    shuffle: false,
  };
}


const strategies: StrategyType[] = [
    {
      "title": "Need Check",
      "strategy": "Ask yourself 'Do I really need this'?",
      "example": "You are ready to checkout and pay for the product, and in this moment you stop up and detach yourself from the feeling of excitement over completing the purchase. Here you question yourself 'Do I really need this?'"
    },
    {
      "title": "Wait Period",
      "strategy": "Enforce a wait-period before completing a purchase.",
      "example": "In the midst of buying the product, you either put the shopping cart aside or add the products to a wishlist and wait a predetermined amount of time (e.g. 48 hours). This will dim the feeling of urgency and excitement and give you sufficient time to rationally contemplate the purchase."
    },
    {
      "title": "Visualize Alternatives",
      "strategy": "Visualize alternatives to spending money on a product.",
      "example": "As you are scrolling through different products, or when you enter checkout, be aware of how buying this particular product at this moment influences your long-term goals. Visualize alternatives you could put your money into, such as saving for your dream house, investing, or donating to charity."
    },
    {
      "title": "Time Reflection",
      "strategy": "Reflect on time spent on online shopping.",
      "example": "When exiting a session of looking at/purchasing on online webshops and apps, you reflect on how much of your time it consumes."
    },
    {
      "title": "Review Research",
      "strategy": "Assess third-party reviews of the item(s).",
      "example": "Before completing a purchase, you look up reviews on Amazon to improve your judgment of the product."
    },
    {
      "title": "Second-Hand Search",
      "strategy": "Find second-hand deals similar to what you are about to purchase.",
      "example": "Before checking out, you search through Facebook Marketplace, Craigslist, Ebay, or your local second-hand dealership to see if an item similar or identical to this is available."
    },
    {
      "title": "Delete Payment Info",
      "strategy": "Delete saved payment information to prolong the purchasing process.",
      "example": "To increase the duration of the checkout process, you delete your saved payment information from the browser or webshop. This requires you to get out your credit card and enter the information, giving you more time to reflect."
    },
    {
      "title": "Use Adblocker",
      "strategy": "Use adblocker to remove advertising temptation.",
      "example": "Install an adblocker to decrease the amount of ads and marketing you see, improving your ability to refrain from impulsive online purchases."
    },
    {
      "title": "Quality Check",
      "strategy": "Ask yourself if this is a quality product with a long lifespan/repairability.",
      "example": "Before purchasing, estimate the quality and lifespan of the product and whether you can repair it if it breaks. Contemplate if you would still be interested in buying it."
    },
    {
      "title": "Usage Time",
      "strategy": "Ask yourself how much time you will use this product.",
      "example": "Before buying, consider how much time you will actually use the product to get a sense of the price per use."
    },
    {
      "title": "Block Apps",
      "strategy": "Block webshop or shop app or disable checkout.",
      "example": "Block specific webshops or apps (e.g., clothing stores like Zara or H&M) to prevent impulsive purchases."
    },
    {
      "title": "Time-Window Limit",
      "strategy": "Only allow buying within a specific time window.",
      "example": "Set a rule that allows purchases only on certain days or times (e.g., only on the 1st and 15th of the month)."
    },
    {
      "title": "Max Purchases",
      "strategy": "Set a maximum number of purchases over time.",
      "example": "Set a limit on how many items you can buy from a specific category (hobbies, clothes, etc.) per week, month, or year."
    },
    {
      "title": "Budget Limit",
      "strategy": "Create a budget and limit spending on specific types of purchases.",
      "example": "Before shopping, set a budget and limit how much you’re willing to spend on specific categories (e.g., electronics, clothes) per time period."
    },
    {
      "title": "Borrow/Rent",
      "strategy": "Find lending or renting alternatives.",
      "example": "Instead of purchasing an item for short-term use, check if you can borrow it from friends or rent it."
    },
    {
      "title": "Work-Time Visual",
      "strategy": "Visualize work hours needed to afford the product.",
      "example": "Translate the price into hours of work based on your salary to understand how long you need to work to pay for the item."
    },
    {
      "title": "Alternative Activities",
      "strategy": "Stop shopping and find other activities.",
      "example": "After browsing a webshop, remind yourself that the feelings from shopping can be achieved through hobbies, learning, or other activities. Exit the webshop and do something else."
    },
    {
      "title": "Similar Items",
      "strategy": "Be aware of purchasing items similar to ones you already own.",
      "example": "Reflect on whether you already own something similar and if you are willing to replace the old one or need the new item."
    },
    {
      "title": "Eco Reflection",
      "strategy": "Reflect on time, space, and environmental costs.",
      "example": "Before purchasing, think about how much of your time it will take, the space it requires, and the environmental cost (CO2 and waste)."
    }
]

//const compound: Element = createStrategyCompound(0, "Ask yourself if this is a quality product with long lifespan/repairability", "Before purchasing the product, you estimate the quality of the product, the lifespan of the product and to which degree you can repair the product in case it breaks. You may also ask yourself whether you would like to use this product excessively, if you had the chance. With this new information, you contemplate whether you still interested in buying this particular product.")


function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const strategiesPage: Page = {
  title: "About you",
  subtitle: "To help us understand more about your shopping habits, we’d like to start with a few brief questions about you. This will include general demographic information, allowing us to analyze trends and patterns in online shopping behaviors across different groups. Your responses are anonymous and will be used solely to improve our research on impulse purchasing habits.",
  elements: shuffleArray(strategies.map((strategy, i) => createStrategyCompound(i, strategy))).map((e,i) => {

    //@ts-expect-error Inject Strategy number
    e.elements[0].title = "Strategy " + (i+1) + ": " + e.elements[0].title;
    return e;
  })
}

const aboutYou: Page = {
  title: "About you",
  subtitle: "To help us understand more about your shopping habits, we’d like to start with a few brief questions about you. This will include general demographic information, allowing us to analyze trends and patterns in online shopping behaviors across different groups. Your responses are anonymous and will be used solely to improve our research on impulse purchasing habits.",
  elements: [
  {
    id: 1,
    title: "Age",
    type: "RadioInput",
    options: [
      "Under 18",
      "18-24",
      "25-34",
      "35-44",
      "45-54",
      "55-64",
      "65+"
    ],
    required: true
  },
  {
    id: 2,
    title: "Gender",
    type: "RadioInput",
    options: [
      "Male",
      "Female",
      "Non-binary / Gender diverse",
      "Other",
      "Prefer not to say"
    ],
    required: true
  },
  {
    id: 3,
    title: "Country",
    type: "DropDownInput",
    placeholder: "Select your country",
    options: countries,
    required: true
  },
  {
    id: 4,
    title: "Current Occupation",
    type: "SelectInput",
    options: [
      "Prefer not to say",
      "Unemployed",
      "Secondary / High School",
      "Undergraduate",
      "Graduate / Postgraduate",
      "Self-employed / Business Owner",
      "Full-time Employee",
      "Part-time Employee",
      "Freelancer / Gig Worker",
      "Seasonal / Contract Worker"
    ],
    required: true
  },
  {
    id: 5,
    title: "Industry?",
    subtitle: "If you're in education, and your education does not target a specific industry, select no industry",
    type: "SelectInput",
    options: [
      "No industry",
      "Healthcare / Medical",
      "Technology / IT",
      "Education / Academic",
      "Finance / Accounting",
      "Retail / Sales",
      "Manufacturing / Construction",
      "Arts / Entertainment",
      "Government / Public Sector",
      "Hospitality / Service Industry",
      "Non-profit / Social Work",
      "Design / Creative Work",
      "Other"
    ],
    required: true
  }],
};

const impulsePurchases: Page = {
  title: "About you",
  subtitle: "To help us understand more about your shopping habits, we’d like to start with a few brief questions about you. This will include general demographic information, allowing us to analyze trends and patterns in online shopping behaviors across different groups. Your responses are anonymous and will be used solely to improve our research on impulse purchasing habits.",
  elements: [
    {
      id: 6,
      title: "How often do you purchase products online on impulse?",
      type: "SelectInput",
      options: [
        "Daily",
        "Multiple times a week",
        "Once a week",
        "2-3 times a month",
        "Once a month",
        "Once every three months",
        "Rarely / Never"
      ],
      required: true
    },
    {
      id: 7,
      title: "I find it hard to resist online impulse purchases",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 8,
      title: "I would like to decrease my online impulse purchasing",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 9,
      title: "I often regret my impulse purchases",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 10,
      title: "What categories of products are you likely to purchase on impulse online?",
      subtitle: "You can choose multiple options. If you do not purchase impulsively online, leave this unanswered.",
      type: "SelectInput",
      options: [
        "Electronics and Gadgets",
        "Clothing and Accessories",
        "Health and Beauty Products",
        "Home and Garden",
        "Food and Beverages",
        "Toys and Games",
        "Books and Media",
        "Sports and Fitness Equipment",
        "Travel and Experiences"
      ],
      shuffle: false,
    },
    {
      id: 11,
      title: "I am interested in trying tools that help reduce online impulse purchases",
      type: "RadioInput",
      options: [
        "Strongly agree",
        "Agree",
        "Neither agree nor disagree",
        "Disagree",
        "Strongly disagree"
      ],
      required: true
    },
    {
      id: 12,
      title: "Can you think of any features that you would find helpful in an anti-impulse shopping tool?",
      subtitle: "Optional",
      type: "TextFieldInput",
      placeholder: "Enter your suggestions here",
      required: false
    }
  ]
};

export const survey: Survey = {
  title: "Online Impulse Purchasing Habits",
  markdown: `
This survey is about finding ways to help people avoid making quick, unplanned purchases when shopping online. We want to learn about the different tools or methods that might help people control these impulse buys. We’re also interested in knowing what kinds of products people most often buy on impulse.

Your answers will help us understand how to make online shopping habits greener and more thoughtful by reducing unnecessary purchases. Your responses are anonymous and will be used solely to improve our research on impulse purchasing habits.


**The survey takes approximately 12 minutes**

The survey is split three ways
- Information about you
- General impulse purchases online
- Concrete strategies to combat impulse purchases online

Thank you for dedicating time to complete this survey! It helps us a lot!
  `,
  pages: [aboutYou, impulsePurchases, strategiesPage],
}





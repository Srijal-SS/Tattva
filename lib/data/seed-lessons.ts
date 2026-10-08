import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  // ==================== CIVIC SENSE ====================
  {
    id: "lesson-1",
    categoryId: "cat-civic",
    title: "Why Should We Stand in a Queue?",
    slug: "why-stand-in-queue",
    description:
      "Learn why standing in a queue is important and how it helps everyone around us.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Have you ever been in a crowded place where everyone is pushing to get ahead? It feels chaotic, right?

**Queues exist for a reason.** When people stand in a line, everyone gets a fair turn. Nobody is left behind, and nobody is pushed around.

### Why Queues Matter

🤝 **Fairness** — The person who arrived first gets served first. That's fair for everyone.

⏱️ **Efficiency** — Lines actually move faster than crowds! When people push, everything slows down.

😊 **Respect** — Standing in a queue shows respect for other people's time and space.

🛡️ **Safety** — Crowded pushing can cause injuries, especially for younger children and elderly people.

### Real-Life Examples

- Waiting for your turn at a water fountain in school
- Standing in line at a ticket counter
- Waiting for the school bus to stop before boarding
- Queuing at a shop counter

**Remember:** Every time you stand in a queue, you're showing respect for the people around you. That's what responsible citizens do!`,
    challenge:
      "Next time you're at school or a shop, notice the queue. Stand patiently and let others know why queues matter.",
    points: 10,
    badgeId: "badge-civic",
    published: true,
    sortOrder: 1,
    questions: [
      {
        id: "q1-1",
        lessonId: "lesson-1",
        questionText:
          "You're at the school canteen and everyone is pushing to get food first. What's the best thing to do?",
        explanation:
          "Starting a queue is a great leadership move! When one person stands in line, others often follow. It makes things fair and faster for everyone.",
        sortOrder: 1,
        options: [
          {
            id: "q1-1-a",
            questionId: "q1-1",
            optionText: "Push harder to get food first",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q1-1-b",
            questionId: "q1-1",
            optionText: "Start a queue and ask others to join",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q1-1-c",
            questionId: "q1-1",
            optionText: "Skip lunch because it's too crowded",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q1-1-d",
            questionId: "q1-1",
            optionText: "Ask a friend to get food for you",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
      {
        id: "q1-2",
        lessonId: "lesson-1",
        questionText: "Why do queues actually help things move faster?",
        explanation:
          "When everyone is organized in a line, each person gets served efficiently without confusion. Pushing and crowding actually slows everything down!",
        sortOrder: 2,
        options: [
          {
            id: "q1-2-a",
            questionId: "q1-2",
            optionText: "They don't — pushing is always faster",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q1-2-b",
            questionId: "q1-2",
            optionText: "Because everyone gets served one at a time without confusion",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q1-2-c",
            questionId: "q1-2",
            optionText: "Queues are only for adults",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q1-2-d",
            questionId: "q1-2",
            optionText: "They only work in some places",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },
  {
    id: "lesson-2",
    categoryId: "cat-civic",
    title: "Keeping Public Places Clean",
    slug: "keeping-public-places-clean",
    description:
      "Understand why it's everyone's responsibility to keep parks, streets, and shared spaces clean.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Imagine you go to a beautiful park. But when you arrive, there's trash everywhere — plastic bottles, wrappers, and food leftovers. Would you want to sit there?

**Public places belong to everyone.** That means keeping them clean is everyone's responsibility too.

### Why It Matters

🌍 **For the environment** — Trash harms animals, pollutes water, and makes our surroundings ugly.

🏘️ **For the community** — Clean spaces make neighborhoods happier and healthier.

🧠 **For you** — Taking responsibility builds your character and makes you a role model.

### What You Can Do

- Always carry your trash to a dustbin
- If you see litter near a bin, pick it up and put it in
- Never throw wrappers or bottles from a car window
- Encourage friends and family to keep spaces clean
- Use reusable water bottles and bags

**One small action by you can inspire a hundred others!**`,
    challenge:
      "Next time you visit a park or public place, notice whether people are using dustbins. Pick up one piece of litter and put it in the bin.",
    points: 10,
    badgeId: "badge-civic",
    published: true,
    sortOrder: 2,
    questions: [
      {
        id: "q2-1",
        lessonId: "lesson-2",
        questionText:
          "You're at a park and notice someone has dropped a plastic bottle. What would be the most responsible thing to do?",
        explanation:
          "Picking it up and putting it in the bin is the responsible choice! Keeping shared spaces clean is everyone's responsibility — not just the person who dropped it.",
        sortOrder: 1,
        options: [
          {
            id: "q2-1-a",
            questionId: "q2-1",
            optionText: "Ignore it — it's not your trash",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q2-1-b",
            questionId: "q2-1",
            optionText: "Pick it up and put it in the correct bin",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q2-1-c",
            questionId: "q2-1",
            optionText: "Kick it away from where you're sitting",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q2-1-d",
            questionId: "q2-1",
            optionText: "Leave the park because it's dirty",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },

  // ==================== ENVIRONMENT ====================
  {
    id: "lesson-3",
    categoryId: "cat-environment",
    title: "Save Water: Every Drop Matters",
    slug: "save-water-every-drop",
    description:
      "Learn why fresh water is precious and simple ways you can save it every day.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Did you know that even though 70% of Earth is covered in water, only about **3% is fresh water**? And most of that is locked in glaciers!

**Water is one of our most precious resources,** and every drop we save matters.

### Where Water Gets Wasted

🚿 **Long showers** — A 10-minute shower uses about 80 liters of water!

🚰 **Leaky taps** — A dripping tap can waste 20+ liters a day.

🪥 **Running taps** — Leaving the tap on while brushing wastes 6 liters per minute.

🌿 **Overwatering plants** — Plants need less water than we think.

### Easy Ways to Save Water

- Turn off the tap while brushing your teeth
- Take shorter showers (5 minutes is great!)
- Fix leaky taps at home — tell an adult
- Reuse water when possible (like using plant watering runoff)
- Use a bucket instead of a hose to wash things
- Drink only what you need — don't waste drinking water

**When you save water, you're protecting the future — your future!**`,
    challenge:
      "For the next 3 days, time your showers and try to keep them under 5 minutes. Ask your family to fix any leaky taps.",
    points: 10,
    badgeId: "badge-eco",
    published: true,
    sortOrder: 1,
    questions: [
      {
        id: "q3-1",
        lessonId: "lesson-3",
        questionText:
          "What is one of the easiest ways to save water at home every day?",
        explanation:
          "Turning off the tap while brushing your teeth is one of the simplest and most effective ways to save water. It saves about 6 liters every time you brush!",
        sortOrder: 1,
        options: [
          {
            id: "q3-1-a",
            questionId: "q3-1",
            optionText: "Never drink water",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q3-1-b",
            questionId: "q3-1",
            optionText: "Turn off the tap while brushing your teeth",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q3-1-c",
            questionId: "q3-1",
            optionText: "Only shower once a month",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q3-1-d",
            questionId: "q3-1",
            optionText: "Use more water so rivers don't overflow",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
      {
        id: "q3-2",
        lessonId: "lesson-3",
        questionText: "About how much of Earth's water is fresh water?",
        explanation:
          "Only about 3% of Earth's water is fresh water, and most of it is frozen in glaciers. That's why saving the fresh water we have is so important!",
        sortOrder: 2,
        options: [
          {
            id: "q3-2-a",
            questionId: "q3-2",
            optionText: "About 70%",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q3-2-b",
            questionId: "q3-2",
            optionText: "About 50%",
            isCorrect: false,
            sortOrder: 2,
          },
          {
            id: "q3-2-c",
            questionId: "q3-2",
            optionText: "About 3%",
            isCorrect: true,
            sortOrder: 3,
          },
          {
            id: "q3-2-d",
            questionId: "q3-2",
            optionText: "About 30%",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },
  {
    id: "lesson-4",
    categoryId: "cat-environment",
    title: "The Right Way to Use a Dustbin",
    slug: "right-way-to-use-dustbin",
    description:
      "Understand waste segregation and why separating dry, wet, and hazardous waste matters.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Most people think using a dustbin is simple — just throw everything in, right? But there's actually a smart way to throw away waste!

**Waste segregation** means separating your waste into different types. This helps with recycling and protects our environment.

### The 3 Main Types of Waste

🟢 **Wet Waste (Green bin)** — Food scraps, fruit peels, leftover food, tea leaves, garden waste

🔵 **Dry Waste (Blue bin)** — Paper, cardboard, plastic bottles, metal cans, glass

🔴 **Hazardous Waste (Red bin)** — Batteries, medicines, broken glass, chemicals

### Why Segregation Matters

♻️ **Recycling** — Dry waste like paper and plastic can be recycled into new products

🌱 **Composting** — Wet waste can become compost for gardens

🛡️ **Safety** — Hazardous waste needs special handling to protect sanitation workers

🌍 **Less landfill** — When we segregate, less waste ends up in landfills

### What You Can Do

- Learn which bin to use for different items
- Help set up separate bins at home
- Teach younger siblings about segregation
- Never mix hazardous waste with regular trash

**A dustbin isn't just a box — it's the first step in protecting our planet!**`,
    challenge:
      "Check how many bins your home has. Help set up at least 2 separate bins — one for wet waste and one for dry waste.",
    points: 10,
    badgeId: "badge-eco",
    published: true,
    sortOrder: 2,
    questions: [
      {
        id: "q4-1",
        lessonId: "lesson-4",
        questionText: "Which bin should a banana peel go into?",
        explanation:
          "A banana peel is wet waste (organic/food waste). It goes in the green bin and can be composted to create fertilizer for plants!",
        sortOrder: 1,
        options: [
          {
            id: "q4-1-a",
            questionId: "q4-1",
            optionText: "Blue (dry waste) bin",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q4-1-b",
            questionId: "q4-1",
            optionText: "Green (wet waste) bin",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q4-1-c",
            questionId: "q4-1",
            optionText: "Red (hazardous waste) bin",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q4-1-d",
            questionId: "q4-1",
            optionText: "Just throw it anywhere",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },

  // ==================== SAFETY ====================
  {
    id: "lesson-5",
    categoryId: "cat-safety",
    title: "What Should You Do If You Get Lost?",
    slug: "what-to-do-if-lost",
    description:
      "Learn the right steps to stay safe and find help if you ever get separated from your family.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Getting separated from your family in a crowded place can be scary. But if you know what to do, you can stay safe and get help quickly.

### Step 1: Stay Calm 😌

Panicking makes it harder to think clearly. Take a deep breath. You will be okay.

### Step 2: Stay Where You Are 📍

Don't wander around looking — that can take you further away. Your family is probably looking for you and will come back to where they last saw you.

### Step 3: Look for Safe People 👮

- Security guards or police officers
- Shopkeepers or staff at a store
- Parents with children
- Teachers or other known adults

### Step 4: Know Your Information 📝

It's really helpful to know:
- Your full name
- A parent's phone number
- Your home address or area

### Step 5: Never Go With a Stranger ⚠️

Even if someone offers to help you find your parents, **never leave the area with a stranger.** Ask them to call your parents instead, or wait for security.

### What Parents Can Do

- Teach children a parent's phone number
- Set a meeting point in crowded places
- Use family tracking apps when appropriate
- Dress children in recognizable clothing in crowds

**Being prepared is the best way to stay safe!**`,
    challenge:
      "Make sure you know at least one parent's phone number by heart. Practice saying it out loud until you remember it.",
    points: 10,
    badgeId: "badge-safety",
    published: true,
    sortOrder: 1,
    questions: [
      {
        id: "q5-1",
        lessonId: "lesson-5",
        questionText:
          "You get separated from your family at a mall. What should you do first?",
        explanation:
          "Staying calm and staying where you are is the smartest first move. Your family will likely come back to where they last saw you. Wandering around can make it harder for them to find you.",
        sortOrder: 1,
        options: [
          {
            id: "q5-1-a",
            questionId: "q5-1",
            optionText: "Run around looking for them everywhere",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q5-1-b",
            questionId: "q5-1",
            optionText: "Stay calm and stay where you are",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q5-1-c",
            questionId: "q5-1",
            optionText: "Go outside the mall to look",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q5-1-d",
            questionId: "q5-1",
            optionText: "Go with the first person who offers help",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
      {
        id: "q5-2",
        lessonId: "lesson-5",
        questionText:
          "A stranger says they'll take you to your parents. What should you do?",
        explanation:
          "Never leave with a stranger, even if they seem kind. Ask them to call your parents or find a security guard instead. Your safety comes first!",
        sortOrder: 2,
        options: [
          {
            id: "q5-2-a",
            questionId: "q5-2",
            optionText: "Go with them right away",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q5-2-b",
            questionId: "q5-2",
            optionText: "Ask them to call your parents or find security instead",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q5-2-c",
            questionId: "q5-2",
            optionText: "Follow them if they look nice",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q5-2-d",
            questionId: "q5-2",
            optionText: "Give them your home address",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },
  {
    id: "lesson-6",
    categoryId: "cat-safety",
    title: "Being Responsible on the Road",
    slug: "responsible-on-the-road",
    description:
      "Learn essential road safety rules every child should know — as a pedestrian, cyclist, or passenger.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Roads can be busy and dangerous if we're not careful. Whether you're walking, cycling, or in a car, knowing road safety rules can save lives.

### As a Pedestrian 🚶

- Always use zebra crossings and footpaths
- Look **left, then right, then left again** before crossing
- Make eye contact with drivers before crossing
- Never run across the road
- Be extra careful near parked vehicles

### As a Cyclist 🚲

- Always wear a helmet
- Ride on the left side of the road
- Use hand signals when turning
- Avoid riding in the dark without lights
- Never use headphones while cycling

### As a Passenger 🚗

- Always wear your seatbelt
- Never distract the driver
- Don't stick hands or heads out of windows
- Exit from the side away from traffic
- Wait for the vehicle to stop completely before getting out

### Important Signs to Know

🔴 **Red light** — Stop completely
🟡 **Yellow light** — Prepare to stop (not speed up!)
🟢 **Green light** — Go, but look carefully first
🦓 **Zebra crossing** — Pedestrians have priority

**Road safety isn't just about rules — it's about protecting yourself and everyone around you.**`,
    challenge:
      "Next time you cross a road, practice the 'look left, right, left' rule. Count how many people around you follow traffic rules.",
    points: 10,
    badgeId: "badge-safety",
    published: true,
    sortOrder: 2,
    questions: [
      {
        id: "q6-1",
        lessonId: "lesson-6",
        questionText: "What should you do before crossing the road?",
        explanation:
          "Looking left, right, and left again helps you see vehicles coming from both directions. This simple habit can prevent accidents!",
        sortOrder: 1,
        options: [
          {
            id: "q6-1-a",
            questionId: "q6-1",
            optionText: "Run quickly so cars don't hit you",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q6-1-b",
            questionId: "q6-1",
            optionText: "Look left, right, and left again",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q6-1-c",
            questionId: "q6-1",
            optionText: "Close your eyes and walk fast",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q6-1-d",
            questionId: "q6-1",
            optionText: "Only look left",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },

  // ==================== DIGITAL CITIZENSHIP ====================
  {
    id: "lesson-7",
    categoryId: "cat-digital",
    title: "Think Before You Share Online",
    slug: "think-before-you-share",
    description:
      "Learn what's safe to share online and what should stay private. Your digital footprint matters!",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `The internet is an amazing place to learn, create, and connect. But everything you post online leaves a **digital footprint** — and it can stay there forever.

### What is a Digital Footprint? 👣

Every photo you share, comment you make, and message you send creates a trail. This trail can be seen by others — sometimes even people you don't know.

### What's Safe to Share ✅

- Your creative work (art, writing, projects)
- Opinions on topics you care about
- Things that make you proud
- Fun memories (with permission from people in the photo)

### What Should Stay Private 🚫

- Your home address
- Your phone number
- Your school name and location
- Your exact daily routine
- Passwords
- Financial information of your family
- Photos you wouldn't want everyone to see

### The THINK Test

Before posting anything online, ask yourself:

**T** — Is it **True**?
**H** — Is it **Helpful**?
**I** — Is it **Inspiring**?
**N** — Is it **Necessary**?
**K** — Is it **Kind**?

If the answer to most of these is YES, it's probably okay to share!

**Your online reputation matters. Build one you're proud of!**`,
    challenge:
      "Check your most recent social media or chat messages. Did you share anything that should have stayed private? Think about what you'd change.",
    points: 10,
    badgeId: "badge-digital",
    published: true,
    sortOrder: 1,
    questions: [
      {
        id: "q7-1",
        lessonId: "lesson-7",
        questionText:
          "A new online friend asks for your school name and home address. What should you do?",
        explanation:
          "Your school name and home address are private information. Sharing them with someone you've only met online could put your safety at risk. You can be friendly without sharing personal details!",
        sortOrder: 1,
        options: [
          {
            id: "q7-1-a",
            questionId: "q7-1",
            optionText: "Share it because they seem nice",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q7-1-b",
            questionId: "q7-1",
            optionText: "Politely decline — that information is private",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q7-1-c",
            questionId: "q7-1",
            optionText: "Share a fake address instead",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q7-1-d",
            questionId: "q7-1",
            optionText: "Ask your friend for their address first",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
      {
        id: "q7-2",
        lessonId: "lesson-7",
        questionText: "What does the 'K' in the THINK test stand for?",
        explanation:
          "K stands for Kind! Before posting anything online, ask yourself if it's kind. If what you're sharing could hurt someone, it's better not to post it.",
        sortOrder: 2,
        options: [
          {
            id: "q7-2-a",
            questionId: "q7-2",
            optionText: "Knowledge",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q7-2-b",
            questionId: "q7-2",
            optionText: "Kind",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q7-2-c",
            questionId: "q7-2",
            optionText: "Key",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q7-2-d",
            questionId: "q7-2",
            optionText: "Keen",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },

  // ==================== FINANCIAL BASICS ====================
  {
    id: "lesson-8",
    categoryId: "cat-money",
    title: "Needs vs Wants",
    slug: "needs-vs-wants",
    description:
      "Learn the difference between what you need and what you want — the first step to smart spending.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Have you ever wanted something really badly — a new game, a cool pair of shoes, or the latest gadget? We all have! But here's an important question:

**Do you need it, or do you want it?**

### What Are Needs? 🏠

Needs are things you **must have** to live safely and healthily:
- Food and clean water
- Clothing (basic, appropriate for weather)
- A safe home
- Education
- Healthcare
- Transportation to school

### What Are Wants? 🎮

Wants are things that are **nice to have** but you can live without:
- The latest smartphone
- Designer clothes
- Video games
- Eating out at restaurants
- Fancy accessories

### The Tricky Part

Sometimes the line between needs and wants isn't clear:

- You **need** shoes → but you **want** expensive branded ones
- You **need** food → but you **want** to eat at a fancy restaurant every day
- You **need** a bag for school → but you **want** the trendiest one

### Why This Matters

Understanding needs vs. wants helps you:
- Make smarter spending decisions
- Save money for important things
- Appreciate what you already have
- Avoid impulse purchases

**Smart spending starts with one question: "Do I really need this?"**`,
    challenge:
      "Make a list of 5 things you spent money on (or asked for) recently. Mark each as a NEED or a WANT. Were there any wants you could have skipped?",
    points: 10,
    badgeId: "badge-money",
    published: true,
    sortOrder: 1,
    questions: [
      {
        id: "q8-1",
        lessonId: "lesson-8",
        questionText:
          "You receive ₹500 as a gift. You want a new video game (₹400) but also need new notebooks for school (₹200). What's the smartest choice?",
        explanation:
          "Buying the notebooks first is the smart choice because education is a need. You can save the remaining ₹300 and add more later for the game. Needs come before wants!",
        sortOrder: 1,
        options: [
          {
            id: "q8-1-a",
            questionId: "q8-1",
            optionText: "Buy the video game — it's more fun",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q8-1-b",
            questionId: "q8-1",
            optionText: "Buy the notebooks first, save the rest",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q8-1-c",
            questionId: "q8-1",
            optionText: "Spend all ₹500 on snacks",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q8-1-d",
            questionId: "q8-1",
            optionText: "Ask for more money to buy both",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },

  // ==================== SOCIAL & EMOTIONAL ====================
  {
    id: "lesson-9",
    categoryId: "cat-social",
    title: "How to Handle a Disagreement",
    slug: "handling-disagreements",
    description:
      "Everyone disagrees sometimes. Learn healthy ways to handle conflicts without hurting feelings.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Disagreements happen — with friends, siblings, classmates, and even parents. That's completely normal! What matters is **how** you handle them.

### Why Disagreements Happen

People disagree because:
- We all have different opinions and experiences
- Sometimes there are misunderstandings
- We might be feeling stressed or tired
- We have different preferences

### Healthy Ways to Handle Disagreements 💚

#### 1. Listen First 👂
Let the other person share their side without interrupting. You might understand their point better.

#### 2. Use "I" Statements 🗣️
Instead of: "You always take my stuff!"
Try: "I feel upset when my things are taken without asking."

#### 3. Stay Calm 😊
Take a deep breath. Yelling or saying mean things makes everything worse.

#### 4. Find Common Ground 🤝
Look for something you both agree on. Start from there.

#### 5. Know When to Walk Away 🚶
If things get too heated, it's okay to say: "Let's talk about this later when we're both calm."

### What NOT to Do ❌

- Don't call people names
- Don't bring up old fights
- Don't involve everyone in a personal disagreement
- Don't use physical force — ever

**Disagreements can actually make friendships stronger — if you handle them with respect.**`,
    challenge:
      "Next time you disagree with someone, try using an 'I feel' statement instead of blaming. Notice how it changes the conversation.",
    points: 10,
    badgeId: "badge-social",
    published: true,
    sortOrder: 1,
    questions: [
      {
        id: "q9-1",
        lessonId: "lesson-9",
        questionText:
          "Your friend says something that hurts your feelings. What's the best way to respond?",
        explanation:
          "Using an 'I' statement like 'I felt hurt when you said that' helps you express your feelings without attacking the other person. It opens a conversation instead of starting a fight.",
        sortOrder: 1,
        options: [
          {
            id: "q9-1-a",
            questionId: "q9-1",
            optionText: "Say something hurtful back",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q9-1-b",
            questionId: "q9-1",
            optionText: "Calmly say 'I felt hurt when you said that'",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q9-1-c",
            questionId: "q9-1",
            optionText: "Stop talking to them forever",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q9-1-d",
            questionId: "q9-1",
            optionText: "Tell everyone what they said",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },
  {
    id: "lesson-10",
    categoryId: "cat-social",
    title: "Helping Someone Who Needs Support",
    slug: "helping-someone-in-need",
    description:
      "Learn how to safely and kindly help people around you — from friends to strangers.",
    ageMin: 8,
    ageMax: 14,
    durationMinutes: 5,
    mediaType: "text",
    content: `Being helpful is one of the most beautiful qualities a person can have. But knowing **how** to help and **when** to help is just as important.

### When Can You Help?

- A classmate doesn't understand a topic → explain it to them
- An elderly person is struggling with bags → offer to carry one
- A friend is feeling sad → sit with them and listen
- Someone drops their things → help them pick up
- A new student joins school → welcome them and show around

### How to Help Safely 🛡️

- **Always stay safe.** Don't put yourself in danger to help someone.
- **Ask first.** "Can I help you?" shows respect.
- **Tell a trusted adult** if someone needs serious help.
- **Don't help alone** in risky situations — get adult support.
- **Respect boundaries.** If someone says "no thanks," respect that.

### Small Acts, Big Impact

You don't need to do something huge to help. Small acts of kindness create a ripple effect:

🌊 You help one person → they feel good → they help someone else → and so on!

### The Golden Rule

Treat others the way you'd want to be treated. If you were struggling, wouldn't you want someone to offer help?

**Kindness isn't a weakness. It's a superpower!**`,
    challenge:
      "This week, find one safe opportunity to help someone — a classmate, a family member, or a neighbor. Notice how it makes you feel.",
    points: 10,
    badgeId: "badge-social",
    published: true,
    sortOrder: 2,
    questions: [
      {
        id: "q10-1",
        lessonId: "lesson-10",
        questionText:
          "You see an elderly person struggling to carry heavy bags. What's the best approach?",
        explanation:
          "Asking before helping shows respect. The person might want help, or they might prefer to manage on their own. Offering politely is always the right approach!",
        sortOrder: 1,
        options: [
          {
            id: "q10-1-a",
            questionId: "q10-1",
            optionText: "Ignore them — it's not your problem",
            isCorrect: false,
            sortOrder: 1,
          },
          {
            id: "q10-1-b",
            questionId: "q10-1",
            optionText: "Politely ask 'Can I help you with those bags?'",
            isCorrect: true,
            sortOrder: 2,
          },
          {
            id: "q10-1-c",
            questionId: "q10-1",
            optionText: "Take the bags without asking",
            isCorrect: false,
            sortOrder: 3,
          },
          {
            id: "q10-1-d",
            questionId: "q10-1",
            optionText: "Laugh and walk away",
            isCorrect: false,
            sortOrder: 4,
          },
        ],
      },
    ],
  },
];

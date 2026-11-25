import { Scenario } from "@/types";

// Decision-first openings for existing lessons, keyed by lesson id.
// Rules (SKILLS.md): no choice is labelled right or wrong; every outcome shows who it touches.
export const scenarios: Record<string, Scenario> = {
  "lesson-1": {
    lessonId: "lesson-1",
    setting: "Lunch break · school canteen, Pune",
    setup: [
      "The canteen has one counter and twenty hungry students. Today there are samosas, and everyone knows they run out by 1:15.",
      "You are third from the front. Then Kabir from your class walks straight past the line and slips in beside his friend, right ahead of you.",
    ],
    prompt: "What do you do?",
    choices: [
      {
        id: "a",
        text: "Say nothing. It's just one person.",
        outcome:
          "Kabir gets his samosa. Two more students see it worked and squeeze in too. By the time you reach the counter, there are only vadas left.",
        ripples: [
          { who: "You", effect: "Lose your place without a word said" },
          { who: "Students at the back", effect: "Wait longer and learn that pushing in works" },
        ],
      },
      {
        id: "b",
        text: "Calmly tell him, \"The line starts back there.\"",
        outcome:
          "Kabir rolls his eyes, but a girl behind you nods along. He walks to the back. The line holds, and it actually moves faster than yesterday's crowd did.",
        ripples: [
          { who: "Kabir", effect: "Feels a bit embarrassed, waits his turn" },
          { who: "Everyone in line", effect: "Gets a fair shot at the samosas" },
        ],
      },
      {
        id: "c",
        text: "Push in ahead of him. Two can play that game.",
        outcome:
          "Now the front is a shoving match. The canteen uncle stops serving until everyone settles down. Lunch break loses five minutes for all twenty of you.",
        ripples: [
          { who: "You", effect: "Get in trouble alongside Kabir" },
          { who: "Younger students", effect: "Get squeezed out of a pushing crowd" },
        ],
      },
    ],
    perspectives: [
      { who: "Kabir", view: "\"My friend was holding a spot for me. I didn't think it counted as cutting.\"" },
      { who: "Meera, Class 4, at the back", view: "\"When the big kids push, I just don't get lunch.\"" },
      { who: "The canteen uncle", view: "\"A line means I can serve faster. A crowd means I make mistakes with change.\"" },
    ],
    principle: {
      title: "A line is a promise everyone makes to everyone else.",
      body: "It only works if people keep it, and if someone speaks up, calmly, when it's broken. Fairness usually isn't about rules from above. It's ordinary people choosing to hold the line.",
    },
    reflection: "Think of a time someone cut ahead of you, in any kind of line. How did it feel, and what would you do now?",
  },

  "lesson-7": {
    lessonId: "lesson-7",
    setting: "Sunday evening · class WhatsApp group",
    setup: [
      "Someone posts a photo of Ananya from the school trip. She's mid-sneeze, eyes shut, face scrunched. It's honestly funny.",
      "The group explodes with laughing emojis. Your friend sends it to you privately: \"Forward this to the other section's group 😂\"",
    ],
    prompt: "What do you do with the photo?",
    choices: [
      {
        id: "a",
        text: "Forward it. Everyone's already seen it anyway.",
        outcome:
          "By Monday morning, it's in four groups and someone has turned it into a sticker. Ananya hears about it before first period.",
        ripples: [
          { who: "Ananya", effect: "Becomes \"the sneeze girl\" in a school she has to attend every day" },
          { who: "You", effect: "Your name is on the forward chain if a teacher asks" },
        ],
      },
      {
        id: "b",
        text: "Don't forward it, but don't say anything either.",
        outcome:
          "The photo stops with you. But it keeps spreading through other people, and in the group nobody has said it's not okay.",
        ripples: [
          { who: "Ananya", effect: "Still hurt, but one less person spread it" },
          { who: "The group", effect: "Learns that silence means it's fine" },
        ],
      },
      {
        id: "c",
        text: "Message the group: \"Guys, maybe delete it? She wouldn't want this out there.\"",
        outcome:
          "A couple of people say you're overreacting. Then two others delete it, and the person who posted it does too. The chat moves on.",
        ripples: [
          { who: "Ananya", effect: "The spread slows down. She may never know you helped" },
          { who: "You", effect: "Feel awkward for a minute, then a little proud" },
        ],
      },
    ],
    perspectives: [
      { who: "Ananya", view: "\"I laughed when I first saw it. Then I saw it in the senior group and wanted to stay home.\"" },
      { who: "The person who posted it", view: "\"It was just a joke. I didn't think it would leave our group.\"" },
      { who: "A cyber-safety officer", view: "\"Once an image is forwarded, you can't pull it back. Deleting later doesn't delete copies.\"" },
    ],
    principle: {
      title: "Online, you're never sharing with just one group.",
      body: "Anything you forward can travel further than you planned and last longer than the joke. Before sharing something about another person, ask: would they be okay with this reaching everyone?",
    },
    reflection: "Is there anything you've posted or forwarded that you'd think twice about now? What made you notice?",
  },

  "lesson-8": {
    lessonId: "lesson-8",
    setting: "Diwali money · a mall in Kochi",
    setup: [
      "You have ₹1,500 from relatives this Diwali. School reopens next week and your geometry box broke last month; a new one costs ₹250.",
      "At the mall, you see wireless earphones on sale: ₹1,299, \"today only\". Your friends all have a pair.",
    ],
    prompt: "How do you spend it?",
    choices: [
      {
        id: "a",
        text: "Buy the earphones. A sale is a sale.",
        outcome:
          "They sound great. But on Monday you borrow a compass in maths, and you're left with ₹201 and nothing for the school fair next month.",
        ripples: [
          { who: "You", effect: "Happy now, short on what you actually need" },
          { who: "Your parents", effect: "Get asked for the geometry box money anyway" },
        ],
      },
      {
        id: "b",
        text: "Buy the geometry box, save the rest for later.",
        outcome:
          "You're sorted for school with ₹1,250 still in hand. No earphones today. You notice the same \"today only\" sign is still up two weeks later.",
        ripples: [
          { who: "You", effect: "Covered now, with choices left for later" },
          { who: "Your friends", effect: "Tease you a little; they forget by Monday" },
        ],
      },
      {
        id: "c",
        text: "Buy the box, then look for cheaper earphones.",
        outcome:
          "You find a decent pair for ₹599 at a local shop. You have both, and ₹651 left. It took an extra hour of looking.",
        ripples: [
          { who: "You", effect: "Spend time to stretch your money further" },
          { who: "The local shopkeeper", effect: "Gets a sale the mall didn't" },
        ],
      },
    ],
    perspectives: [
      { who: "Your older cousin", view: "\"I always bought the first thing I wanted. Now I wait a day, and half the time I don't want it anymore.\"" },
      { who: "A shopkeeper", view: "\"'Today only' is often just a sign. Ask when the last sale was.\"" },
      { who: "Your friend with the earphones", view: "\"Honestly? I use them on the bus. They're nice but not life-changing.\"" },
    ],
    principle: {
      title: "Needs first, then wants, with a pause in between.",
      body: "Wanting things isn't wrong. The skill is noticing the difference, covering what you need, and giving a want one day before buying. Urgency (\"today only!\") is usually someone else's plan for your money.",
    },
    reflection: "What's something you really wanted that you're glad you didn't buy, or glad you did?",
  },

  "lesson-9": {
    lessonId: "lesson-9",
    setting: "Science project · group of four, Jaipur",
    setup: [
      "Your group has to build a model for the science fair. You want to make a water filter. Riya wants a volcano because \"judges love volcanoes.\"",
      "The argument is getting loud. The other two have gone quiet and are scrolling on their phones. Submission is on Friday.",
    ],
    prompt: "How do you handle it?",
    choices: [
      {
        id: "a",
        text: "Insist on the water filter. Your idea is clearly better.",
        outcome:
          "Riya gives in but stops helping. You end up building most of the filter alone on Thursday night. It works, but the group barely speaks at the fair.",
        ripples: [
          { who: "You", effect: "Win the argument, carry most of the work" },
          { who: "Riya", effect: "Feels unheard and checks out" },
        ],
      },
      {
        id: "b",
        text: "Give in to the volcano to stop the fight.",
        outcome:
          "The fighting stops. You're not excited about the volcano and it shows: your part is rushed. The project is fine but forgettable.",
        ripples: [
          { who: "You", effect: "Keep the peace, lose your interest" },
          { who: "The group", effect: "Never finds out what the quiet two wanted" },
        ],
      },
      {
        id: "c",
        text: "Pause and ask everyone, including the quiet two, what they'd like.",
        outcome:
          "Turns out Dev loves chemistry and Sana is good at drawing. Someone suggests a volcano that shows how lava cools into rock layers, with Sana's diagrams. Nobody gets exactly their idea; everybody gets a part.",
        ripples: [
          { who: "Riya and you", effect: "Both give a little, both stay in" },
          { who: "Dev and Sana", effect: "Go from scrolling to building" },
        ],
      },
    ],
    perspectives: [
      { who: "Riya", view: "\"I wasn't trying to be bossy. I was worried we'd make something boring and lose.\"" },
      { who: "Sana, the quiet one", view: "\"When two people are shouting, it doesn't feel like there's space to say anything.\"" },
      { who: "Your science teacher", view: "\"The groups that argue well usually make the best projects. It's the ones that stop talking that struggle.\"" },
    ],
    principle: {
      title: "Disagreement isn't the problem. How you disagree is.",
      body: "A good disagreement makes the idea better. It needs everyone to be heard, including the people who go quiet, and for the goal to shift from winning to finding what works.",
    },
    reflection: "Think about the last argument you had with a friend or sibling. Who stopped talking first, and why?",
  },

  "lesson-2": {
    lessonId: "lesson-2",
    setting: "Saturday morning · Cubbon Park, Bengaluru",
    setup: [
      "Your family has just finished a picnic under the big rain trees. Paper plates, a chips packet, two juice boxes.",
      "The nearest dustbin is near the gate, a five-minute walk away. Your cousin says, \"Leave it under the bench. The sweepers come every morning anyway.\"",
    ],
    prompt: "What happens to the rubbish?",
    choices: [
      {
        id: "a",
        text: "Leave it under the bench. Someone is paid to clean it.",
        outcome:
          "By evening, monkeys have pulled the chips packet across the grass. A family who comes after you spreads their mat somewhere else.",
        ripples: [
          { who: "The park sweeper", effect: "Starts the day picking up after people who could have walked five minutes" },
          { who: "The monkeys", effect: "Learn that picnic spots mean food in plastic" },
        ],
      },
      {
        id: "b",
        text: "Carry it all to the bin by the gate on the way out.",
        outcome:
          "It takes five minutes and one sticky hand. The spot under the tree is clean for the next family, and your cousin grumbles but carries the juice boxes.",
        ripples: [
          { who: "Your cousin", effect: "Carries his share, mostly" },
          { who: "The next family", effect: "Finds the spot the way you found it" },
        ],
      },
      {
        id: "c",
        text: "Pack it into your bag and throw it away at home.",
        outcome:
          "Your bag smells of mango juice the whole drive back, but nothing is left behind. Your mum asks you to wipe the bag yourself.",
        ripples: [
          { who: "You", effect: "Deal with a slightly sticky bag" },
          { who: "The park", effect: "Stays exactly as clean as it was" },
        ],
      },
    ],
    perspectives: [
      { who: "Lakshmi, park sweeper", view: "\"I clean 40 benches before nine. The ones that take longest are where people say we'll do it.\"" },
      { who: "Your cousin", view: "\"Everyone leaves stuff. One family won't change anything.\"" },
      { who: "A walker who comes every day", view: "\"I notice the people who carry their rubbish out. It makes me do it too.\"" },
    ],
    principle: {
      title: "A shared place stays nice only if everyone treats it as a little bit theirs.",
      body: "\"Someone else will clean it\" is true right up until everyone says it. Public places belong to all of us, so keeping them clean is everyone's small job, not just the sweeper's.",
    },
    reflection: "Is there a public place near you that's always dirty? Who do you think could change that, and how?",
  },

  "lesson-3": {
    lessonId: "lesson-3",
    setting: "Summer holidays · a flat in Chennai",
    setup: [
      "It's May and the building's tank has run low. The water tanker comes only on Wednesday, and today is Sunday.",
      "Your mum has asked everyone to be careful. You're brushing your teeth and the tap is running while you scroll through a game on the counter.",
    ],
    prompt: "What do you do?",
    choices: [
      {
        id: "a",
        text: "Keep it running. It's just a couple of minutes.",
        outcome:
          "Two minutes is about 12 litres. Your neighbour on the third floor gets only a trickle that evening when she tries to cook.",
        ripples: [
          { who: "Your neighbours", effect: "Run short a day before the tanker comes" },
          { who: "Your family", effect: "Has to buy extra cans of water" },
        ],
      },
      {
        id: "b",
        text: "Turn the tap off while brushing and use a mug to rinse.",
        outcome:
          "You use about one mug of water instead of a bucket's worth. It feels like nothing, but by Wednesday the whole family has done it, and the tank lasts.",
        ripples: [
          { who: "Your family", effect: "Makes it to Wednesday without buying water" },
          { who: "You", effect: "Have to put the game down for two minutes" },
        ],
      },
      {
        id: "c",
        text: "Turn it off, then tell the building WhatsApp group about the dripping tap on the stairs.",
        outcome:
          "The secretary fixes the leaky stair tap on Monday. It had been dripping all day, every day, for months.",
        ripples: [
          { who: "The whole building", effect: "Saves water nobody even knew was being lost" },
          { who: "You", effect: "Get a thank-you message from an uncle you've never spoken to" },
        ],
      },
    ],
    perspectives: [
      { who: "Mrs Iyer, third floor", view: "\"When the tank is low, the top floors feel it first. We always know who wasn't careful.\"" },
      { who: "Your little brother", view: "\"But there's water in the tap. How is it running out?\"" },
      { who: "The tanker driver", view: "\"In summer I do twelve trips a day and some streets still wait.\"" },
    ],
    principle: {
      title: "Water you waste is water someone else doesn't get.",
      body: "In a shared tank, a shared city or a shared river, every tap is connected. Small habits, like turning off a tap, add up across a family, a building and a city.",
    },
    reflection: "Where does the water in your home come from, and has it ever run out? What would you do differently if it did?",
  },

  "lesson-4": {
    lessonId: "lesson-4",
    setting: "After dinner · a home in Indore",
    setup: [
      "Indore sorts its rubbish into wet and dry, and the garbage van comes at 7 a.m. with separate sections.",
      "You've been asked to take out tonight's waste. There's vegetable peel, a milk packet, a broken pen and a used tea bag, all in one bag.",
    ],
    prompt: "What do you do with it?",
    choices: [
      {
        id: "a",
        text: "Tie it up and put it out as it is. It's all rubbish.",
        outcome:
          "In the morning the van worker has to open your bag and sort it by hand, on the street. The milk packet is too dirty to recycle now.",
        ripples: [
          { who: "The van worker", effect: "Sorts your peels with bare hands" },
          { who: "The milk packet", effect: "Goes to landfill instead of being recycled" },
        ],
      },
      {
        id: "b",
        text: "Split it: peel and tea bag in wet, rinsed milk packet and pen in dry.",
        outcome:
          "It takes two minutes. The wet waste goes to compost, the packet gets recycled, and only the pen ends up as real rubbish.",
        ripples: [
          { who: "The van worker", effect: "Empties your bins in seconds" },
          { who: "The city", effect: "Turns your peels into compost for parks" },
        ],
      },
      {
        id: "c",
        text: "Sort it, and make labels for the two bins so everyone at home does it too.",
        outcome:
          "Your dad puts a pen in the wet bin by mistake on day one, then reads the label and fixes it. By the end of the week it's a habit.",
        ripples: [
          { who: "Your family", effect: "Sorts without having to think about it" },
          { who: "You", effect: "Become the person everyone asks about where things go" },
        ],
      },
    ],
    perspectives: [
      { who: "Ramesh, garbage van worker", view: "\"Sorted bins mean I finish my route on time and don't cut my hands.\"" },
      { who: "Your grandmother", view: "\"In my day, peels went to the cow and paper went to the raddiwala. Nothing was wasted.\"" },
      { who: "A neighbour", view: "\"I don't sort because I'm not sure the van keeps it separate anyway.\"" },
    ],
    principle: {
      title: "Rubbish only becomes useful again if it's separated where it starts.",
      body: "Once wet and dry waste are mixed, most of it can't be saved. Sorting at home takes a minute and decides whether waste becomes compost and recycling or a landfill.",
    },
    reflection: "Look at what your family threw away today. How much of it could have been compost or recycled?",
  },

  "lesson-5": {
    lessonId: "lesson-5",
    setting: "Evening · a crowded fair in Ahmedabad",
    setup: [
      "You went to look at a kite stall for one minute. When you turn around, your family is gone. All you can see are strangers and lights.",
      "Your phone is at home. A friendly man nearby says, \"Lost? Come, I'll take you to the exit and find them.\"",
    ],
    prompt: "What do you do?",
    choices: [
      {
        id: "a",
        text: "Go with him. He seems nice and knows the way.",
        outcome:
          "You walk away from where your family last saw you, and away from the people who could help. This time he does help, but your parents spend twenty frightening minutes searching the wrong spot.",
        ripples: [
          { who: "Your parents", effect: "Search where you were, and you aren't there" },
          { who: "You", effect: "Are alone with someone you don't know" },
        ],
      },
      {
        id: "b",
        text: "Stay near the kite stall and ask the stall owner to help.",
        outcome:
          "The stall owner lets you stand behind the counter and calls out over the crowd. Your mum comes back to the last place she saw you, and finds you within ten minutes.",
        ripples: [
          { who: "Your parents", effect: "Find you where they expected you" },
          { who: "The stall owner", effect: "Loses a few sales, gladly" },
        ],
      },
      {
        id: "c",
        text: "Find a police officer or a mother with children and say your parent's phone number.",
        outcome:
          "A woman with two kids calls the number you know by heart. Your dad picks up on the first ring and walks over.",
        ripples: [
          { who: "Your dad", effect: "Gets a phone call instead of a search" },
          { who: "You", effect: "Are glad you learnt that number" },
        ],
      },
    ],
    perspectives: [
      { who: "Your mum", view: "\"The first thing I did was go back to where I last saw you.\"" },
      { who: "A fair police constable", view: "\"We find lost children every evening. The ones who stay put and know a number are home fastest.\"" },
      { who: "The kite stall owner", view: "\"Children come to me all the time. A shopkeeper in his stall isn't going anywhere.\"" },
    ],
    principle: {
      title: "When you're lost, stay put, choose who you ask, and know one number by heart.",
      body: "Your family will come back to where they last saw you. Safe helpers are people in uniform, shopkeepers at their counters, or parents with children. You choose them; don't go off with someone who chose you.",
    },
    reflection: "Do you know a parent's phone number by heart right now? Where would you go first if you were lost in your town?",
  },

  "lesson-6": {
    lessonId: "lesson-6",
    setting: "After school · a busy road in Lucknow",
    setup: [
      "The zebra crossing is 100 metres away, next to the signal. The bus stop is right across the road from you.",
      "Your friends are already running across through a gap in the traffic. \"Come on, the bus is coming!\" they shout from the other side.",
    ],
    prompt: "How do you cross?",
    choices: [
      {
        id: "a",
        text: "Run across like they did before the gap closes.",
        outcome:
          "A scooter coming from the wrong side swerves and the rider shouts. You make it, heart pounding. The bus was still two minutes away.",
        ripples: [
          { who: "The scooter rider", effect: "Nearly falls trying to miss you" },
          { who: "You", effect: "Saved one minute, risked much more" },
        ],
      },
      {
        id: "b",
        text: "Walk to the zebra crossing and wait for the signal.",
        outcome:
          "You miss that bus by a minute. The next one comes in eight minutes and you get a window seat.",
        ripples: [
          { who: "You", effect: "Get home eight minutes later" },
          { who: "Your friends", effect: "Tease you, then wait with you next time" },
        ],
      },
      {
        id: "c",
        text: "Shout back \"Wait for me at the stop\" and use the crossing.",
        outcome:
          "One friend rolls his eyes, but they hold the bus door for you. The conductor tells them off for running across.",
        ripples: [
          { who: "Your friends", effect: "Hear from the conductor what they risked" },
          { who: "You", effect: "Cross safely and still catch the bus" },
        ],
      },
    ],
    perspectives: [
      { who: "A traffic constable", view: "\"Most accidents near schools happen in the three minutes when everyone is rushing for the bus.\"" },
      { who: "The scooter rider", view: "\"I shouldn't have been on the wrong side either. We were both in a hurry.\"" },
      { who: "Your friend", view: "\"Everyone crosses there. Nothing's ever happened.\"" },
    ],
    principle: {
      title: "On the road, a minute saved is never worth the risk.",
      body: "Roads only work when people do the predictable thing: cross at crossings, follow signals, look right, left and right again. Even when others are careless, your safe choice protects you and them.",
    },
    reflection: "Think of the road you cross most often. Where is the safest place to cross it, and do you always use it?",
  },

  "lesson-10": {
    lessonId: "lesson-10",
    setting: "First week of term · a classroom in Guwahati",
    setup: [
      "A new boy, Tenzin, has joined your class from Sikkim. At lunch he sits alone, eating quickly, looking at his phone without really using it.",
      "Your friends are saving you a seat at your usual table. One of them says, \"He's fine, he probably likes being alone.\"",
    ],
    prompt: "What do you do?",
    choices: [
      {
        id: "a",
        text: "Sit with your friends. Maybe he does want to be alone.",
        outcome:
          "Tenzin eats alone all week. On Friday someone in another section invites him over, and he sits with them from then on.",
        ripples: [
          { who: "Tenzin", effect: "Spends his hardest week on his own" },
          { who: "You", effect: "Wonder for a while what he's like" },
        ],
      },
      {
        id: "b",
        text: "Go over and ask, \"Do you want to sit with us?\"",
        outcome:
          "He hesitates, then says yes. He's quiet at first, but it turns out he plays football better than anyone at the table.",
        ripples: [
          { who: "Tenzin", effect: "Has somewhere to sit tomorrow too" },
          { who: "Your friends", effect: "Get a new goalkeeper" },
        ],
      },
      {
        id: "c",
        text: "Say hello and ask him about his old school, then leave the choice to him.",
        outcome:
          "He says he'd rather finish his lunch today, but thanks you. The next day he comes and sits at the end of your table on his own.",
        ripples: [
          { who: "Tenzin", effect: "Joins in at his own pace" },
          { who: "You", effect: "Learn that help means asking, not deciding for someone" },
        ],
      },
    ],
    perspectives: [
      { who: "Tenzin", view: "\"I didn't want to walk up to a table that was already full. It's easier when someone asks.\"" },
      { who: "Your friend", view: "\"I wasn't being mean. I just didn't think about it.\"" },
      { who: "Your class teacher", view: "\"New students remember who spoke to them in the first week for years.\"" },
    ],
    principle: {
      title: "Helping starts with noticing, and with asking instead of assuming.",
      body: "Most people who need support won't ask for it. You can notice, offer, and then respect their answer. Helping well means doing it with someone, not to them.",
    },
    reflection: "Have you ever been the new person somewhere? What did someone do, or not do, that you still remember?",
  },

  "lesson-11": {
    lessonId: "lesson-11",
    setting: "English period · a school in Delhi",
    setup: [
      "Priya moved from Madurai this term. Tamil is what she speaks at home. Today she's reading her essay aloud in English.",
      "She says \"vegetables\" in a way the class isn't used to. Someone at the back copies it loudly, and a few people giggle.",
    ],
    prompt: "What do you do?",
    choices: [
      {
        id: "a",
        text: "Laugh along a little. It was kind of funny.",
        outcome:
          "Priya finishes in a rush and sits down. For the rest of the week she doesn't put her hand up once, even when she knows the answer.",
        ripples: [
          { who: "Priya", effect: "Decides speaking in class isn't worth it" },
          { who: "The class", effect: "Loses the person who wrote the best essay" },
        ],
      },
      {
        id: "b",
        text: "Don't laugh, and after class tell her you liked her essay.",
        outcome:
          "She looks surprised, then relieved. She tells you the Tamil word for vegetables and laughs at how you say it, kindly.",
        ripples: [
          { who: "Priya", effect: "Knows at least one person was listening to what she said" },
          { who: "You", effect: "Learn your first Tamil word" },
        ],
      },
      {
        id: "c",
        text: "Say to the back of the class, \"Can you say it in Tamil? No? Then she speaks one more language than you.\"",
        outcome:
          "The room goes quiet, then someone laughs at the boy instead. The teacher asks the class how many languages each of them speaks. The answers go from one to four.",
        ripples: [
          { who: "The boy at the back", effect: "Is embarrassed, and stops copying" },
          { who: "Priya", effect: "Hears that her languages count as a strength" },
        ],
      },
    ],
    perspectives: [
      { who: "Priya", view: "\"I think in Tamil and then speak in English. It takes a second. That second isn't me being slow.\"" },
      { who: "The boy at the back", view: "\"I copy everyone. I didn't think she'd mind.\"" },
      { who: "Your grandfather", view: "\"I speak Punjabi, Hindi, Urdu and English. Every one of them sounds funny to someone.\"" },
    ],
    principle: {
      title: "An accent is the sound of someone who speaks more than one language.",
      body: "Laughing at how someone speaks tells them their home language is something to hide. Being curious about it tells them it's something to share. India has always been many languages in one room.",
    },
    claims: [
      { kind: "fact", text: "The Constitution of India lists 22 languages in its Eighth Schedule." },
      { kind: "fact", text: "Tamil is one of them, and is spoken by tens of millions of people in India and other countries." },
      { kind: "interpretation", text: "Accents come from the sounds of the language a person learnt first. They don't show how well someone thinks." },
      { kind: "tradition", text: "Many Indian families switch between two or more languages at home without noticing." },
    ],
    sources: [
      { name: "Constitution of India, Eighth Schedule", url: "https://www.mha.gov.in/sites/default/files/EighthSchedule_19052017.pdf" },
      { name: "Census of India 2011, language data", url: "https://censusindia.gov.in/census.website/data/census-tables" },
    ],
    reflection: "How many languages do people speak in your home and your street? Has anyone ever laughed at the way you said something?",
  },

  "lesson-12": {
    lessonId: "lesson-12",
    setting: "September · a housing society in Mumbai",
    setup: [
      "The Nairs next door have invited your family for Onam lunch. Their daughter, Anjali, is in your class.",
      "You've never been to an Onam sadya. You hear it's eaten with your hand, off a banana leaf, with more dishes than you can count. Part of you wants to say you're busy.",
    ],
    prompt: "What do you do?",
    choices: [
      {
        id: "a",
        text: "Make an excuse and stay home. It's not your festival.",
        outcome:
          "Your parents go without you. Anjali asks where you were, and you notice she doesn't invite you to the pookalam the next day.",
        ripples: [
          { who: "Anjali", effect: "Feels her festival wasn't interesting to you" },
          { who: "You", effect: "Miss the payasam everyone talks about later" },
        ],
      },
      {
        id: "b",
        text: "Go, and quietly copy what everyone else does.",
        outcome:
          "You get the order slightly wrong and start on the payasam too early. Anjali's grandmother laughs and serves you more.",
        ripples: [
          { who: "The Nairs", effect: "Are glad you came" },
          { who: "You", effect: "Eat a twenty-dish lunch with your hands for the first time" },
        ],
      },
      {
        id: "c",
        text: "Go, and ask Anjali beforehand what you should know.",
        outcome:
          "She tells you how to fold the leaf when you're done and about King Mahabali. At lunch you're the one explaining it to your little sister.",
        ripples: [
          { who: "Anjali", effect: "Gets to share the story she grew up with" },
          { who: "Your family", effect: "Learns the right way to fold the leaf from you" },
        ],
      },
    ],
    perspectives: [
      { who: "Anjali", view: "\"I like it when friends come. Then it's not just the thing my family does; it's something I can show people.\"" },
      { who: "Anjali's grandmother", view: "\"Onam is for everyone. The story says the good king's rule made all people equal.\"" },
      { who: "Your mum", view: "\"We were invited to Eid lunch and Christmas dinner when I was small. That's how I learnt about my neighbours.\"" },
    ],
    principle: {
      title: "You don't have to share a festival's beliefs to share its table.",
      body: "Being a good guest means showing up curious: asking, trying, and respecting what matters to your hosts. Knowing which parts are facts, which are traditions and which are beliefs helps you talk about them with care.",
    },
    claims: [
      { kind: "fact", text: "Onam is celebrated in the Malayalam month of Chingam, which usually falls in August or September." },
      { kind: "tradition", text: "Families make a pookalam, a flower carpet, at the entrance, and share a sadya: a vegetarian meal served on a banana leaf." },
      { kind: "belief", text: "Many people believe Onam marks the yearly return of King Mahabali to visit the people of Kerala." },
      { kind: "interpretation", text: "Some see Onam as a harvest festival; others see it mainly as a celebration of a time of equality in the Mahabali story." },
    ],
    sources: [
      { name: "Kerala Tourism: Onam", url: "https://www.keralatourism.org/onam/" },
    ],
    reflection: "Which festival that your family doesn't celebrate would you like to understand better? Who could you ask about it?",
  },
};

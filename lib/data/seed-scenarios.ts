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
};

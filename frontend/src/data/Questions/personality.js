const personalityAssessment = {
  sets: {
    SetA: [
      {
        question: "How do you plan your daily tasks?",
        options: [
          { text: "I create a detailed schedule and stick to it.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I outline a rough plan but remain flexible.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I have a general idea without formal planning.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I do tasks as they arise with little planning.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When faced with an unexpected change, how do you respond?",
        options: [
          { text: "I adapt quickly and re-prioritize tasks.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I consult with colleagues for input.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I feel some stress but eventually adjust.", points: 3, traits: { Neuroticism: 3, Openness: 3 } },
          { text: "I struggle to adapt.", points: 1, traits: { Neuroticism: 5, Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "What role do you usually take in a new team?",
        options: [
          { text: "I naturally assume leadership.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I support the team with ideas.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I contribute quietly when needed.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer to observe and follow.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle errors in your work?",
        options: [
          { text: "I analyze and correct them immediately.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I ask for help to resolve them.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work on them eventually after some frustration.", points: 3, traits: { Neuroticism: 3, Conscientiousness: 3 } },
          { text: "I tend to postpone addressing them.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your reaction to trying a new method for a task?",
        options: [
          { text: "I’m excited and eager to experiment.", points: 5, traits: { Openness: 5 } },
          { text: "I consider it after weighing risks.", points: 4, traits: { Openness: 4, Conscientiousness: 4 } },
          { text: "I am hesitant but willing to try.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer established methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you view workplace rules?",
        options: [
          { text: "They are essential, and I follow them strictly.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I follow them but value some flexibility.", points: 4, traits: { Conscientiousness: 4, Openness: 4 } },
          { text: "I follow them when necessary.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I tend to disregard rules.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you communicate with colleagues?",
        options: [
          { text: "I’m clear, direct, and respectful.", points: 5, traits: { Agreeableness: 5, Extraversion: 5 } },
          { text: "I engage openly and seek compromise.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I share ideas selectively.", points: 3, traits: { Extraversion: 3 } },
          { text: "I keep communication to a minimum.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prepare for an important meeting?",
        options: [
          { text: "I prepare thoroughly and review details.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I review key points and prepare questions.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I skim the material and rely on memory.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I attend with little preparation.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you receive feedback on your work?",
        options: [
          { text: "I analyze it objectively and adjust.", points: 5, traits: { Openness: 5, Agreeableness: 5 } },
          { text: "I appreciate and consider it carefully.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel defensive but eventually reflect on it.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I tend to dismiss feedback.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach problem-solving?",
        options: [
          { text: "I break down the problem methodically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I brainstorm with others.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I rely on intuition and experience.", points: 3, traits: { Openness: 3 } },
          { text: "I wait for problems to resolve themselves.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you balance work and personal life?",
        options: [
          { text: "I schedule time precisely for both.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I try to maintain balance but sometimes overwork.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I occasionally struggle to balance them.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often neglect one for the other.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When managing multiple tasks, how do you prioritize?",
        options: [
          { text: "I assess urgency and importance and plan accordingly.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I manage tasks as they arise with some planning.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I rely on my mood to decide.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I tackle tasks randomly.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When your ideas are challenged in a meeting, how do you react?",
        options: [
          { text: "I explain my points with evidence and remain open.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I listen carefully and adjust my view.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I defend my ideas but feel discouraged.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I withdraw from the discussion.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach learning new skills?",
        options: [
          { text: "I actively seek out training and challenges.", points: 5, traits: { Openness: 5 } },
          { text: "I learn through hands-on experience.", points: 4, traits: { Openness: 4 } },
          { text: "I learn when required by circumstances.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer to stick with familiar methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I plan ahead and complete tasks early.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I work steadily and finish on time.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I often start late but manage under pressure.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle to meet deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to workplace pressure?",
        options: [
          { text: "I remain calm, focused, and prioritize tasks.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I get stressed but seek support.", points: 4, traits: { Agreeableness: 4, Neuroticism: 3 } },
          { text: "I feel anxious but push through.", points: 3, traits: { Neuroticism: 4 } },
          { text: "I feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "In group projects, what role do you typically assume?",
        options: [
          { text: "I naturally lead and guide the team.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I contribute ideas and help organize.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I do my assigned tasks reliably.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I prefer to work independently.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle being assigned unexpected leadership?",
        options: [
          { text: "I embrace it and structure the team effectively.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I accept it cautiously and seek input.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel uncertain but try to adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I prefer not to lead.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you work under strict supervision?",
        options: [
          { text: "I thrive with clear guidance and structure.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I perform well with some autonomy.", points: 4, traits: { Conscientiousness: 4, Openness: 4 } },
          { text: "I manage but feel slightly restricted.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I feel stifled and demotivated.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you perceive risks in your work?",
        options: [
          { text: "I analyze them and prepare contingencies.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I consider risks and take calculated ones.", points: 4, traits: { Openness: 4, Conscientiousness: 4 } },
          { text: "I feel some anxiety about them.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I avoid tasks with uncertainty.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      }
    ],
    SetB: [
      {
        question: "When starting a new assignment, what is your approach?",
        options: [
          { text: "I prepare a detailed plan.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I outline basic steps.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I jump in and adjust later.", points: 3, traits: { Openness: 3 } },
          { text: "I procrastinate until forced.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prefer to receive instructions?",
        options: [
          { text: "Clear, written guidelines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Verbal briefings with discussion.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "General outlines with room for improvisation.", points: 3, traits: { Openness: 3 } },
          { text: "Minimal guidance, figuring it out myself.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "In team projects, how do you usually contribute?",
        options: [
          { text: "I organize tasks and delegate.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I support colleagues and offer ideas.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I contribute when asked.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer working independently.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "When your proposal is critiqued, how do you react?",
        options: [
          { text: "I welcome constructive criticism and refine it.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider the feedback carefully.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel slightly defensive.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I dismiss the feedback.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle unforeseen obstacles?",
        options: [
          { text: "I quickly develop alternative strategies.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I consult with my team for solutions.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I get flustered but eventually manage.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle significantly with disruptions.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your attitude toward continuous learning?",
        options: [
          { text: "I actively pursue new knowledge.", points: 5, traits: { Openness: 5 } },
          { text: "I learn when necessary.", points: 4, traits: { Openness: 4 } },
          { text: "I rely on past experience.", points: 3, traits: { Openness: 3 } },
          { text: "I rarely seek additional learning.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you describe your decision-making process?",
        options: [
          { text: "Analytical and data-driven.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Collaborative and consultative.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Intuitive and spontaneous.", points: 3, traits: { Openness: 3 } },
          { text: "Hesitant and indecisive.", points: 1, traits: { Neuroticism: 3 } }
        ],
        answer: null
      },
      {
        question: "How do you react to a change in project direction?",
        options: [
          { text: "I adapt quickly and reorganize priorities.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I discuss changes with my team.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I need time to adjust.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I resist the change.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your style when managing deadlines?",
        options: [
          { text: "I set interim goals and track progress rigorously.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I work steadily and monitor timelines.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I sometimes struggle but meet deadlines.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I frequently miss deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prefer to solve problems?",
        options: [
          { text: "Through methodical research and analysis.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "By brainstorming with colleagues.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "By trial and error.", points: 3, traits: { Openness: 3 } },
          { text: "By waiting for the problem to resolve itself.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When conflicts arise, what is your preferred approach?",
        options: [
          { text: "Mediate and find a fair resolution.", points: 5, traits: { Agreeableness: 5 } },
          { text: "Listen and empathize with all sides.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Assert my viewpoint to resolve it.", points: 3, traits: { Extraversion: 3 } },
          { text: "Avoid confrontation.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel about structured routines?",
        options: [
          { text: "I thrive on routine and predictability.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I appreciate structure but enjoy some variation.", points: 4, traits: { Conscientiousness: 4, Openness: 4 } },
          { text: "I can adapt but prefer flexibility.", points: 3, traits: { Openness: 3 } },
          { text: "I dislike routine and prefer constant change.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "What best describes your approach to leadership?",
        options: [
          { text: "Leading with clear, firm direction.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "Leading by inspiring and empowering others.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "Leading occasionally when needed.", points: 3, traits: { Extraversion: 3 } },
          { text: "Not seeking leadership roles.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage your workload?",
        options: [
          { text: "I meticulously plan and organize tasks.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I maintain a prioritized to-do list.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work in bursts as needed.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I work reactively without planning.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When colleagues disagree with you, how do you respond?",
        options: [
          { text: "I calmly discuss and find compromise.", points: 5, traits: { Agreeableness: 5 } },
          { text: "I listen and consider alternative views.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I maintain my position but allow debate.", points: 3, traits: { Extraversion: 3 } },
          { text: "I insist on my view without discussion.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach projects with multiple variables?",
        options: [
          { text: "I create a detailed framework to manage all aspects.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I identify key factors and focus on them.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work through details as they emerge.", points: 3, traits: { Openness: 3 } },
          { text: "I feel overwhelmed and uncertain.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you maintain motivation during long projects?",
        options: [
          { text: "I set milestones and reward progress.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I seek encouragement from peers.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work until completion with fluctuating energy.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often lose motivation.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you react when someone offers an innovative idea?",
        options: [
          { text: "I evaluate its potential and consider integration.", points: 5, traits: { Openness: 5 } },
          { text: "I listen and discuss its merits.", points: 4, traits: { Openness: 4 } },
          { text: "I am curious but cautious.", points: 3, traits: { Openness: 3 } },
          { text: "I am skeptical and dismiss it.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your strategy when a project's scope expands unexpectedly?",
        options: [
          { text: "I revise my plan and allocate extra resources.", points: 5, traits: { Conscientiousness: 5, Openness: 5 } },
          { text: "I discuss adjustments with the team.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work overtime to meet the new demands.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I feel stressed and struggle to adapt.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you perceive feedback on your performance?",
        options: [
          { text: "As a valuable tool for growth.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "As constructive advice.", points: 4, traits: { Agreeableness: 4 } },
          { text: "As something to consider.", points: 3, traits: { Agreeableness: 3 } },
          { text: "As a personal criticism.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      }
    ],
    SetC: [
      {
        question: "How do you structure your workday?",
        options: [
          { text: "I create a strict schedule with allocated tasks.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I outline major tasks with some flexibility.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I have a rough plan and improvise.", points: 3, traits: { Openness: 3 } },
          { text: "I work spontaneously without planning.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When faced with a challenging project, what is your first step?",
        options: [
          { text: "I research and develop a comprehensive strategy.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I outline key steps and consult colleagues.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I start working and adjust as needed.", points: 3, traits: { Openness: 3 } },
          { text: "I feel uncertain and delay beginning.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you prefer to communicate professionally?",
        options: [
          { text: "Direct, clear, and concise.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "Friendly and open dialogue.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Informal discussions with some detail.", points: 3, traits: { Extraversion: 3 } },
          { text: "Minimal communication, mostly written.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach deadlines?",
        options: [
          { text: "I complete tasks well ahead of deadlines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I manage my time to finish on time.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work close to the deadline with stress.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often struggle to meet deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your reaction to new ideas at work?",
        options: [
          { text: "I eagerly explore and implement them.", points: 5, traits: { Openness: 5 } },
          { text: "I consider them carefully before deciding.", points: 4, traits: { Openness: 4 } },
          { text: "I take them into account if needed.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer sticking to established methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How important are rules in your work environment?",
        options: [
          { text: "Essential for clarity; I follow them rigorously.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Important but should allow some flexibility.", points: 4, traits: { Conscientiousness: 4, Openness: 4 } },
          { text: "More of a guideline than strict rules.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer minimal rules to foster creativity.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle working in a team?",
        options: [
          { text: "I actively contribute and often lead discussions.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I work cooperatively and share responsibilities.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I participate when necessary.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer to work alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "When making decisions, what is your process?",
        options: [
          { text: "I base decisions on data and analysis.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I incorporate team feedback along with my judgment.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I rely mostly on intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I delay decisions due to uncertainty.", points: 1, traits: { Neuroticism: 3 } }
        ],
        answer: null
      },
      {
        question: "How do you deal with criticism from peers?",
        options: [
          { text: "I welcome it as an opportunity to improve.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I listen carefully and consider adjustments.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel somewhat hurt but learn from it.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I get defensive and dismiss it.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach long-term projects?",
        options: [
          { text: "I set clear goals and track progress meticulously.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I set goals and check progress periodically.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I have goals but often get distracted.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I lack clear goals and struggle to focus.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When creative thinking is required, how do you react?",
        options: [
          { text: "I enthusiastically propose innovative solutions.", points: 5, traits: { Openness: 5 } },
          { text: "I contribute creative ideas alongside practical ones.", points: 4, traits: { Openness: 4 } },
          { text: "I offer ideas when prompted.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer traditional methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize multiple assignments?",
        options: [
          { text: "I organize tasks by urgency and importance.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I list them and tackle them sequentially.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I address tasks as they arise.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I find prioritizing challenging.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When plans change unexpectedly, how do you react?",
        options: [
          { text: "I quickly adapt and adjust my strategy.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I discuss alternative plans with my team.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel discomfort but eventually adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I resist change and feel stressed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your preferred role in group settings?",
        options: [
          { text: "I often take charge and guide the team.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I like to contribute ideas and support decisions.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I participate as needed.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer to follow rather than lead.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your method for solving complex problems?",
        options: [
          { text: "Systematic analysis and planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Collaborative brainstorming.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "Trial-and-error approach.", points: 3, traits: { Openness: 3 } },
          { text: "Waiting for clear instructions.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle stress during peak periods?",
        options: [
          { text: "I remain composed and focus on solutions.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I seek support from colleagues.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I get stressed but manage to cope.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you evaluate your work performance?",
        options: [
          { text: "I set measurable goals and review progress regularly.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I reflect on feedback and adjust accordingly.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I rely on occasional self-reflection.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I seldom assess my performance.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When assigned unfamiliar tasks, how do you proceed?",
        options: [
          { text: "I research extensively to master the task.", points: 5, traits: { Openness: 5 } },
          { text: "I learn as I go with some initial planning.", points: 4, traits: { Openness: 4 } },
          { text: "I ask for guidance while working.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I feel hesitant and uncertain.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What drives you to excel at work?",
        options: [
          { text: "Achieving excellence through hard work and planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Recognition of team achievements.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Personal satisfaction from meeting targets.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "Minimal motivation beyond basic requirements.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel when your suggestions are implemented?",
        options: [
          { text: "I feel validated and motivated to contribute more.", points: 5, traits: { Extraversion: 5 } },
          { text: "I appreciate the trust and continue to improve.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I am content but seek further feedback.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I feel indifferent.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      }
    ],
    SetD: [
      {
        question: "How do you organize your work tasks?",
        options: [
          { text: "I list tasks in detail and follow a strict schedule.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I keep a rough plan and adjust as needed.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I rely on memory and handle tasks as they come.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I work randomly without planning.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel about following company procedures?",
        options: [
          { text: "I strictly adhere to all guidelines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I follow them but allow some flexibility.", points: 4, traits: { Conscientiousness: 4, Openness: 4 } },
          { text: "I view them as suggestions rather than rules.", points: 3, traits: { Openness: 3 } },
          { text: "I find procedures too restrictive.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "When facing a tight deadline, what is your reaction?",
        options: [
          { text: "I plan ahead to avoid any rush.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I work steadily even if it gets hectic.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I tend to work under pressure at the last minute.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I feel overwhelmed and struggle to deliver.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you contribute in group projects?",
        options: [
          { text: "I take initiative and often lead the team.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I offer ideas and collaborate with teammates.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I contribute when asked but prefer a supporting role.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer working alone over group collaboration.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your approach to problem-solving?",
        options: [
          { text: "I analyze issues meticulously and develop clear solutions.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I brainstorm with others for diverse perspectives.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I rely on past experience and intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I wait for guidance to resolve problems.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you react when receiving constructive feedback?",
        options: [
          { text: "I incorporate it immediately and adjust my approach.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider it carefully and make necessary improvements.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel somewhat criticized but eventually adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I tend to become defensive and ignore it.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle unforeseen changes at work?",
        options: [
          { text: "I adapt quickly and reorganize priorities.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I consult with my team to develop new strategies.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I struggle at first but eventually adjust.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I resist change and feel stressed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you view leadership roles?",
        options: [
          { text: "I enjoy taking charge and setting clear direction.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I prefer supporting leadership rather than being the leader.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I contribute when needed but rarely initiate leadership.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid leadership responsibilities altogether.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize when multiple tasks demand attention?",
        options: [
          { text: "I evaluate urgency and impact, then plan accordingly.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I follow a systematic approach to organize tasks.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I handle tasks as they arrive, sometimes with delays.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often feel overwhelmed and disorganized.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your communication style in professional settings?",
        options: [
          { text: "Direct, clear, and assertive.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "Warm, friendly, and collaborative.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Reserved and cautious.", points: 3, traits: { Extraversion: 3 } },
          { text: "Minimal and reticent.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "When starting a new project, what is your initial step?",
        options: [
          { text: "I conduct thorough research and detailed planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I review objectives and outline a broad plan.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I dive in and adjust as I progress.", points: 3, traits: { Openness: 3 } },
          { text: "I wait for explicit instructions before starting.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage stress in a busy work environment?",
        options: [
          { text: "I remain calm, prioritize tasks, and use stress-management techniques.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I seek support and communicate my challenges.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I manage but often feel under pressure.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I feel overwhelmed and struggle to cope.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you approach decision-making in ambiguous situations?",
        options: [
          { text: "I gather all data and decide logically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I consult with colleagues before deciding.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I rely on past experiences and intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I delay decisions because of uncertainty.", points: 1, traits: { Neuroticism: 3 } }
        ],
        answer: null
      },
      {
        question: "What role does creativity play in your work?",
        options: [
          { text: "I integrate creative ideas within a structured framework.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I welcome innovation and balance it with practicality.", points: 4, traits: { Openness: 4 } },
          { text: "I occasionally use creativity when prompted.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer established methods over creative change.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage repetitive tasks?",
        options: [
          { text: "I maintain focus and efficiency through established routines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I look for ways to improve the process.", points: 4, traits: { Openness: 4 } },
          { text: "I perform them adequately though interest may wane.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I quickly lose motivation and attention.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When a colleague disagrees with your idea, how do you respond?",
        options: [
          { text: "I consider their perspective and refine my idea.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I explain my rationale and seek a compromise.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I defend my idea even if I feel challenged.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I withdraw from the discussion.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prepare for unexpected tasks?",
        options: [
          { text: "I always have flexible strategies ready.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I adjust my current plan to accommodate them.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I handle them as they come, with some difficulty.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I feel unprepared and anxious.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What motivates you to excel at work?",
        options: [
          { text: "The drive for excellence and clear goals.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Recognition from my team and supervisors.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Personal satisfaction from meeting targets.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "Minimal external motivation.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure alignment with organizational goals?",
        options: [
          { text: "I consistently review and adjust my work to match objectives.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I discuss priorities with my team regularly.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I follow instructions without deep personal alignment.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely consider broader goals.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle ambiguity in work assignments?",
        options: [
          { text: "I proactively seek clarity and structure.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I collaborate with others to define objectives.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I manage as best as I can with the information given.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I feel uncertain and uncomfortable.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      }
    ],
    SetE: [
      {
        question: "How do you structure your morning routine?",
        options: [
          { text: "I have a fixed routine I follow religiously.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I have a general plan but remain flexible.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I perform basic tasks without a set routine.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely follow any routine.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When assigned a new project, how do you start?",
        options: [
          { text: "I research and plan every detail thoroughly.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I review objectives and outline a rough plan.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I begin work and adjust as I progress.", points: 3, traits: { Openness: 3 } },
          { text: "I wait until I receive detailed instructions.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to unexpected feedback?",
        options: [
          { text: "I welcome it and immediately adjust my work.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider it carefully even if I feel a bit defensive.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I note it but rarely change my approach.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I tend to ignore the feedback.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize your tasks during a busy day?",
        options: [
          { text: "I use a prioritized list and adhere strictly to deadlines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I prioritize by urgency and manage efficiently.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I focus on the tasks that interest me most.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often struggle with prioritization.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your attitude toward structured feedback sessions?",
        options: [
          { text: "They are essential for personal and professional growth.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I appreciate them and act on suggestions.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I participate even if I feel a bit uncomfortable.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I tend to avoid them.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you contribute during brainstorming sessions?",
        options: [
          { text: "I actively share innovative and creative ideas.", points: 5, traits: { Openness: 5, Extraversion: 5 } },
          { text: "I contribute when prompted and support others’ suggestions.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I listen more than I speak.", points: 3, traits: { Extraversion: 3 } },
          { text: "I rarely participate in brainstorming.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "When a project requires detailed analysis, how do you respond?",
        options: [
          { text: "I dive deep into research and analysis.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I examine key components and delegate details when needed.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I rely on my past experience to guide me.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I feel overwhelmed by the details.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you approach conflicts within your team?",
        options: [
          { text: "I address conflicts directly and mediate resolutions.", points: 5, traits: { Agreeableness: 5, Extraversion: 5 } },
          { text: "I encourage open dialogue among team members.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I tend to avoid conflicts if possible.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I let conflicts linger without addressing them.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you balance creativity with structure in your work?",
        options: [
          { text: "I integrate creativity within a well-organized framework.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I allow creative freedom while following core guidelines.", points: 4, traits: { Openness: 4 } },
          { text: "I lean toward structure over creativity.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I generally work spontaneously without much structure.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel when your work is recognized?",
        options: [
          { text: "It motivates me to push for even higher standards.", points: 5, traits: { Extraversion: 5 } },
          { text: "I appreciate it and use it as encouragement.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I am content but remain modest about it.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I feel indifferent about recognition.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach solving complex problems?",
        options: [
          { text: "I break them down into smaller, manageable parts.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I collaborate with colleagues to develop solutions.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I rely mostly on my own intuition and experience.", points: 3, traits: { Openness: 3 } },
          { text: "I tend to avoid tackling complex issues.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle repetitive assignments?",
        options: [
          { text: "I maintain efficiency and focus through routine.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I look for ways to streamline and improve the process.", points: 4, traits: { Openness: 4 } },
          { text: "I complete them but often lose interest.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I find them particularly draining.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you react when a deadline is suddenly moved up?",
        options: [
          { text: "I quickly reorganize my schedule to meet the new deadline.", points: 5, traits: { Conscientiousness: 5, Neuroticism: 1 } },
          { text: "I adjust my tasks and work more intensively.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I feel stressed but eventually adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I become overwhelmed and may miss the deadline.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How important is professional development to you?",
        options: [
          { text: "It is a top priority; I actively seek growth opportunities.", points: 5, traits: { Openness: 5 } },
          { text: "I pursue development when opportunities arise.", points: 4, traits: { Openness: 4 } },
          { text: "I recognize its value but rarely focus on it.", points: 3, traits: { Openness: 3 } },
          { text: "I do not actively prioritize professional development.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage detailed data or reports?",
        options: [
          { text: "I organize and review them meticulously.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I manage them effectively with periodic checks.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I review them, though I sometimes miss finer details.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I struggle to handle detailed information consistently.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When asked to lead a project, what is your response?",
        options: [
          { text: "I readily volunteer to lead and organize the team.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I take on a supportive leadership role.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I agree if necessary but prefer a non-leadership role.", points: 3, traits: { Extraversion: 3 } },
          { text: "I generally avoid leadership responsibilities.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure the quality of your work?",
        options: [
          { text: "I follow strict quality-control measures and regularly review my output.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I self-review and welcome constructive feedback.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I occasionally check my work.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely verify the quality of what I produce.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond when multiple opinions are presented?",
        options: [
          { text: "I evaluate each perspective and synthesize a balanced view.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider different viewpoints and work toward a consensus.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I maintain my own view while acknowledging others.", points: 3, traits: { Extraversion: 3 } },
          { text: "I become confused and avoid engaging in discussion.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you adapt to new technological tools at work?",
        options: [
          { text: "I learn them quickly and integrate them seamlessly.", points: 5, traits: { Openness: 5 } },
          { text: "I adapt with some guidance and practice.", points: 4, traits: { Openness: 4 } },
          { text: "I use them reluctantly, preferring old methods.", points: 3, traits: { Openness: 3 } },
          { text: "I resist adopting new technologies.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you perceive collaboration in your workplace?",
        options: [
          { text: "It is essential; I thrive in collaborative environments.", points: 5, traits: { Agreeableness: 5, Extraversion: 5 } },
          { text: "It is important and I contribute actively.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I participate but sometimes prefer to work alone.", points: 3, traits: { Extraversion: 3 } },
          { text: "I work best in isolation.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      }
    ],
    SetF: [
      {
        question: "How do you plan your work day?",
        options: [
          { text: "I write a detailed agenda.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I create a rough outline.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I rely on memory.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I improvise as I go.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "When faced with unexpected tasks, how do you react?",
        options: [
          { text: "I reorganize my schedule immediately.", points: 5, traits: { Conscientiousness: 5, Neuroticism: 1 } },
          { text: "I adjust my tasks gradually.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I feel stressed but eventually adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle to change my plan.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you approach teamwork?",
        options: [
          { text: "I naturally take a leadership role.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I contribute ideas actively.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I work well in a team but prefer a supporting role.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer working alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I complete tasks well before the deadline.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I meet deadlines with careful planning.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I often work close to deadlines.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle to meet deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle constructive criticism?",
        options: [
          { text: "I welcome it and adjust my work.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider it and make necessary improvements.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel defensive but try to improve.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I ignore criticism.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your approach to problem-solving?",
        options: [
          { text: "I analyze the problem systematically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I brainstorm with colleagues.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I use intuition to find solutions.", points: 3, traits: { Openness: 3 } },
          { text: "I delay solving problems.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle repetitive tasks?",
        options: [
          { text: "With high efficiency and focus.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I try to optimize the process.", points: 4, traits: { Conscientiousness: 4, Openness: 4 } },
          { text: "I complete them as needed.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I find them tedious.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach learning new skills?",
        options: [
          { text: "I actively pursue new training.", points: 5, traits: { Openness: 5 } },
          { text: "I learn as needed.", points: 4, traits: { Openness: 4 } },
          { text: "I learn gradually.", points: 3, traits: { Openness: 3 } },
          { text: "I rarely seek new learning opportunities.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle work-related stress?",
        options: [
          { text: "I remain calm and organized.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I manage with minor stress.", points: 4, traits: { Neuroticism: 2, Conscientiousness: 4 } },
          { text: "I feel stressed but get through it.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I become overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "When assigned a leadership role, how do you react?",
        options: [
          { text: "I lead confidently and decisively.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I lead with team consultation.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "I lead reluctantly.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer not to lead.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure work quality?",
        options: [
          { text: "I rigorously check all details.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I review my work periodically.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I perform basic checks.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely verify my work.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize tasks when busy?",
        options: [
          { text: "I use a detailed priority list.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize by urgency.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I tackle tasks as they come.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I feel disorganized.", points: 1, traits: { Conscientiousness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you react to changes in work processes?",
        options: [
          { text: "I adapt quickly.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I adjust with some effort.", points: 4, traits: { Openness: 4 } },
          { text: "I find it challenging but manage.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I resist change.", points: 1, traits: { Openness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Highly analytical and logical.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Collaborative and consultative.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Mostly intuitive.", points: 3, traits: { Openness: 3 } },
          { text: "Indecisive.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you track your progress?",
        options: [
          { text: "With comprehensive tracking tools.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "With a prioritized checklist.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "Relying on memory.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often lose track.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve constructively.", points: 5, traits: { Agreeableness: 5 } },
          { text: "I listen and seek compromise.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I assert my views strongly.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid conflict.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you integrate creative ideas?",
        options: [
          { text: "I actively incorporate them within a structured plan.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I welcome and evaluate them.", points: 4, traits: { Openness: 4 } },
          { text: "I consider them occasionally.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer traditional methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage multiple responsibilities?",
        options: [
          { text: "I coordinate them with detailed planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize them with clear priorities.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I juggle tasks with moderate success.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you view collaborative work?",
        options: [
          { text: "I thrive in team environments.", points: 5, traits: { Extraversion: 5, Agreeableness: 5 } },
          { text: "I value teamwork and contribute actively.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work well independently and in teams.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer working alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel when your contributions are recognized?",
        options: [
          { text: "Extremely motivated to contribute more.", points: 5, traits: { Extraversion: 5 } },
          { text: "Appreciative and encouraged.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Moderately satisfied.", points: 3, traits: { Agreeableness: 3 } },
          { text: "Indifferent.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you schedule your tasks?",
        options: [
          { text: "With a minute-by-minute plan.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "With a detailed daily agenda.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "With a general outline.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "Without a set plan.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you adjust when priorities change suddenly?",
        options: [
          { text: "I reorganize immediately.", points: 5, traits: { Conscientiousness: 5, Neuroticism: 1 } },
          { text: "I shift focus gradually.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I feel stressed but adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle significantly.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you participate in group discussions?",
        options: [
          { text: "I lead and set agendas.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I contribute actively.", points: 4, traits: { Extraversion: 4 } },
          { text: "I speak when necessary.", points: 3, traits: { Extraversion: 3 } },
          { text: "I remain quiet.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I complete tasks well before deadlines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I finish on time through planning.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I often rush at the last minute.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I frequently miss deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to constructive criticism?",
        options: [
          { text: "I use it to improve immediately.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I reflect and adjust accordingly.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel criticized but eventually improve.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I tend to ignore it.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach solving complex problems?",
        options: [
          { text: "I analyze them systematically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I brainstorm with colleagues.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I rely on intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I delay addressing them.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      }
    ],
    SetH: [
      {
        question: "How do you schedule your tasks?",
        options: [
          { text: "With a minute-by-minute plan.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "With a detailed daily agenda.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "With a general outline.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "Without a set plan.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you adjust when priorities change suddenly?",
        options: [
          { text: "I reorganize immediately.", points: 5, traits: { Conscientiousness: 5, Neuroticism: 1 } },
          { text: "I shift focus gradually.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I feel stressed but adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle significantly.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you participate in group discussions?",
        options: [
          { text: "I lead and set agendas.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I contribute actively.", points: 4, traits: { Extraversion: 4 } },
          { text: "I speak when necessary.", points: 3, traits: { Extraversion: 3 } },
          { text: "I remain quiet.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I complete tasks well before deadlines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I finish on time through planning.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I often rush at the last minute.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I frequently miss deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to constructive criticism?",
        options: [
          { text: "I use it to improve immediately.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I reflect and adjust accordingly.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel criticized but eventually improve.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I tend to ignore it.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach solving complex problems?",
        options: [
          { text: "I analyze them systematically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I brainstorm with colleagues.", points: 4, traits: { Agreeableness: 4, Openness: 4 } },
          { text: "I rely on intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I delay addressing them.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle routine tasks?",
        options: [
          { text: "I perform them efficiently and methodically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I complete them reliably.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I sometimes lose focus.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I find them very tedious.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you learn new tasks or skills?",
        options: [
          { text: "I proactively research and study.", points: 5, traits: { Openness: 5 } },
          { text: "I learn through experience.", points: 4, traits: { Openness: 4 } },
          { text: "I require some guidance.", points: 3, traits: { Openness: 3 } },
          { text: "I avoid new challenges.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you deal with stressful situations?",
        options: [
          { text: "I remain calm and organized.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I manage stress with minor discomfort.", points: 4, traits: { Neuroticism: 2 } },
          { text: "I feel anxious but cope.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I become overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "When given a leadership role, how do you act?",
        options: [
          { text: "I lead confidently and decisively.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I lead collaboratively.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "I lead reluctantly if needed.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer not to lead.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure the quality of your work?",
        options: [
          { text: "I perform thorough self-reviews.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I conduct regular quality checks.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I check my work minimally.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely verify my work.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize your tasks?",
        options: [
          { text: "I use a systematic method to rank tasks.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I arrange tasks by urgency.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work on tasks as they come.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I feel disorganized.", points: 1, traits: { Conscientiousness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you react to changes in work processes?",
        options: [
          { text: "I adapt immediately.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I adjust after a short delay.", points: 4, traits: { Openness: 4 } },
          { text: "I find it challenging but manage.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I resist change.", points: 1, traits: { Openness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Analytical and logical.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Collaborative and consultative.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Mainly intuitive.", points: 3, traits: { Openness: 3 } },
          { text: "I often delay decisions.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you track progress on projects?",
        options: [
          { text: "I use detailed monitoring tools.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I maintain a well-organized checklist.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I rely on memory.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I struggle to track progress.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve conflicts constructively.", points: 5, traits: { Agreeableness: 5 } },
          { text: "I listen and try to find a compromise.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I assert my views strongly.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid confrontation.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you incorporate creative ideas into your work?",
        options: [
          { text: "I integrate them within a structured plan.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I welcome and evaluate new ideas.", points: 4, traits: { Openness: 4 } },
          { text: "I consider creative suggestions occasionally.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer to stick to established methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage multiple projects simultaneously?",
        options: [
          { text: "I coordinate them using detailed planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize with clear priorities.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I juggle tasks with moderate success.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you view collaborative work?",
        options: [
          { text: "I thrive in a team environment.", points: 5, traits: { Extraversion: 5, Agreeableness: 5 } },
          { text: "I value teamwork and actively contribute.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work well both independently and collaboratively.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer working alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel when your suggestions are implemented?",
        options: [
          { text: "Highly motivated to contribute further.", points: 5, traits: { Extraversion: 5 } },
          { text: "Appreciative and encouraged.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Modestly satisfied.", points: 3, traits: { Agreeableness: 3 } },
          { text: "Indifferent.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      }
    ],
    SetI: [
      {
        question: "How do you plan your daily work?",
        options: [
          { text: "I create a comprehensive plan.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I draft a rough outline.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I have a vague idea of tasks.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I do not plan in advance.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle sudden changes in priorities?",
        options: [
          { text: "I adapt quickly and adjust my schedule.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I manage them after a short delay.", points: 4, traits: { Openness: 4 } },
          { text: "I feel stressed but eventually adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle to adapt.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you prefer to work in a team?",
        options: [
          { text: "I take on a leadership role.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I actively contribute.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work in a supportive capacity.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer working alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure you meet deadlines?",
        options: [
          { text: "I finish tasks well before deadlines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I plan to complete tasks on time.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work until the last minute.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often miss deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to constructive criticism?",
        options: [
          { text: "I incorporate it immediately.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I reflect and make adjustments.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel criticized but make some changes.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I disregard criticism.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach solving complex problems?",
        options: [
          { text: "I analyze details systematically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I consult with colleagues.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I rely on intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I postpone solving them.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle routine tasks?",
        options: [
          { text: "I perform them efficiently and methodically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I complete them reliably.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I sometimes lose focus.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I find them tedious.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach learning new technology?",
        options: [
          { text: "I master it quickly.", points: 5, traits: { Openness: 5 } },
          { text: "I learn with some guidance.", points: 4, traits: { Openness: 4 } },
          { text: "I learn gradually.", points: 3, traits: { Openness: 3 } },
          { text: "I resist adopting new technology.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you deal with stressful situations at work?",
        options: [
          { text: "I remain calm and focused.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I manage stress with minor discomfort.", points: 4, traits: { Neuroticism: 2 } },
          { text: "I feel anxious but continue working.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I become overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "When given a leadership role, how do you perform?",
        options: [
          { text: "I lead confidently and decisively.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I lead with team input.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "I lead reluctantly if required.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid leadership roles.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure the quality of your work?",
        options: [
          { text: "I conduct thorough self-reviews.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I review my work periodically.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I do a basic check.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely review my work.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize tasks?",
        options: [
          { text: "I use a detailed priority list.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize tasks by urgency.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work on tasks as they appear.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I feel disorganized.", points: 1, traits: { Conscientiousness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you react to feedback?",
        options: [
          { text: "I adjust my work immediately.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider it and make improvements.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel defensive but try to learn.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I ignore feedback.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Highly analytical and methodical.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Collaborative with input from others.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Primarily intuitive.", points: 3, traits: { Openness: 3 } },
          { text: "I delay making decisions.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you track progress on your projects?",
        options: [
          { text: "With detailed monitoring tools.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "With a prioritized checklist.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "Using my memory.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often lose track.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve conflicts effectively.", points: 5, traits: { Agreeableness: 5 } },
          { text: "I listen and work toward compromise.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I assert my viewpoint strongly.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid conflict.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you incorporate creative ideas?",
        options: [
          { text: "I integrate them within a structured plan.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I welcome and evaluate new ideas.", points: 4, traits: { Openness: 4 } },
          { text: "I consider them occasionally.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer sticking to routine methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage multiple responsibilities?",
        options: [
          { text: "I coordinate them with advanced planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize them effectively.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I juggle tasks with moderate success.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you view collaborative work?",
        options: [
          { text: "I thrive in a collaborative setting.", points: 5, traits: { Extraversion: 5, Agreeableness: 5 } },
          { text: "I value teamwork and contribute actively.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work well both independently and in teams.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer working alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel when your ideas are acknowledged?",
        options: [
          { text: "Highly motivated to contribute further.", points: 5, traits: { Extraversion: 5 } },
          { text: "Appreciative and encouraged.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Moderately satisfied.", points: 3, traits: { Agreeableness: 3 } },
          { text: "Indifferent.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      }
    ],
    SetJ: [
      {
        question: "How do you plan your work day?",
        options: [
          { text: "I write a detailed schedule.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I prepare a general outline.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I have a vague plan.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I do not plan.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle unexpected work tasks?",
        options: [
          { text: "I reorganize my tasks immediately.", points: 5, traits: { Conscientiousness: 5, Neuroticism: 1 } },
          { text: "I adjust with minor delays.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I feel stressed but adapt eventually.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle to adjust.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your role in team projects?",
        options: [
          { text: "I lead the team decisively.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I contribute actively.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I follow instructions carefully.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer to work independently.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure your tasks are completed on time?",
        options: [
          { text: "I complete them well in advance.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I plan to finish on time.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work until the last minute.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often struggle with deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to constructive criticism?",
        options: [
          { text: "I incorporate suggestions immediately.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I reflect and adjust accordingly.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel criticized but make minimal changes.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I disregard it.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach solving a challenging problem?",
        options: [
          { text: "I analyze it systematically.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I discuss it with colleagues.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I rely on intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I delay solving it.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle routine tasks?",
        options: [
          { text: "I execute them with high efficiency.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I maintain consistency.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I complete them adequately.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often lose focus.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you learn new skills?",
        options: [
          { text: "I actively pursue training opportunities.", points: 5, traits: { Openness: 5 } },
          { text: "I learn on the job.", points: 4, traits: { Openness: 4 } },
          { text: "I learn when necessary.", points: 3, traits: { Openness: 3 } },
          { text: "I avoid new challenges.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle stress?",
        options: [
          { text: "I remain calm and focused.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I manage with some stress.", points: 4, traits: { Neuroticism: 2 } },
          { text: "I feel significant stress but manage.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often become overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "When given a leadership role, how do you perform?",
        options: [
          { text: "I lead confidently and delegate tasks.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I lead with guidance from the team.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "I lead reluctantly if necessary.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer not to lead.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure quality in your work?",
        options: [
          { text: "I meticulously review my work.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I perform regular quality checks.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I do a basic check.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely review my work.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize tasks?",
        options: [
          { text: "I use a detailed priority list.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I arrange tasks by urgency.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work on tasks as they come.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel disorganized.", points: 1, traits: { Conscientiousness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you react to changes in your work environment?",
        options: [
          { text: "I adapt immediately and efficiently.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I adjust with some effort.", points: 4, traits: { Openness: 4 } },
          { text: "I find it challenging but manage.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I resist change.", points: 1, traits: { Openness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Highly analytical and methodical.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Collaborative and consultative.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Mostly intuitive.", points: 3, traits: { Openness: 3 } },
          { text: "Indecisive and delayed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you track progress on projects?",
        options: [
          { text: "With comprehensive tracking tools.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "With a prioritized checklist.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "Relying on memory.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often lose track.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve conflicts constructively.", points: 5, traits: { Agreeableness: 5 } },
          { text: "I listen and seek compromise.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I assert my views strongly.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid conflict.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you integrate creative ideas into your work?",
        options: [
          { text: "I actively implement them within a structured plan.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I welcome creative input and evaluate them.", points: 4, traits: { Openness: 4 } },
          { text: "I consider new ideas occasionally.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer to stick to traditional methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage multiple responsibilities?",
        options: [
          { text: "I coordinate them with detailed planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize them clearly.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I juggle tasks with moderate success.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you view teamwork?",
        options: [
          { text: "I thrive in a collaborative setting.", points: 5, traits: { Extraversion: 5, Agreeableness: 5 } },
          { text: "I value teamwork and contribute actively.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work well both independently and in teams.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer to work alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel when your input is recognized?",
        options: [
          { text: "Highly motivated to contribute further.", points: 5, traits: { Extraversion: 5 } },
          { text: "Appreciative and encouraged.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Moderately satisfied.", points: 3, traits: { Agreeableness: 3 } },
          { text: "Indifferent.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      }
    ],
    SetK: [
      {
        question: "How do you structure your daily tasks?",
        options: [
          { text: "With a detailed schedule.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "With a general plan.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "With minimal planning.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely plan.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to unexpected changes?",
        options: [
          { text: "I quickly reorganize my schedule.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I adjust gradually.", points: 4, traits: { Openness: 4 } },
          { text: "I feel stressed but eventually adapt.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I struggle significantly.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your approach to teamwork?",
        options: [
          { text: "I lead and direct.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I contribute actively.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I support as needed.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer to work alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I finish tasks well before deadlines.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I complete tasks on time with planning.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I often work until the last minute.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I frequently miss deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you view feedback?",
        options: [
          { text: "As a valuable tool for growth.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "As useful but sometimes hard to accept.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I accept it reluctantly.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I ignore it.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach problem-solving?",
        options: [
          { text: "Through careful analysis.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Through discussion with peers.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Through intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I postpone solving problems.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle routine work?",
        options: [
          { text: "I execute it with high efficiency.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I complete it with diligence.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I sometimes lose focus.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I find it hard to stay engaged.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you learn new skills?",
        options: [
          { text: "I actively pursue training.", points: 5, traits: { Openness: 5 } },
          { text: "I learn as needed.", points: 4, traits: { Openness: 4 } },
          { text: "I require frequent guidance.", points: 3, traits: { Openness: 3 } },
          { text: "I avoid new learning opportunities.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you deal with work stress?",
        options: [
          { text: "I remain calm and focused.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I manage with minor stress.", points: 4, traits: { Neuroticism: 2 } },
          { text: "I feel anxious but manage to work.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I become overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "When assigned a leadership role, how do you act?",
        options: [
          { text: "I lead decisively and confidently.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I lead with team consultation.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "I lead reluctantly if needed.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid leadership roles.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure work quality?",
        options: [
          { text: "I perform rigorous self-reviews.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I review my work regularly.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I do basic checks.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely verify my work.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize your tasks?",
        options: [
          { text: "I use a detailed priority list.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize tasks by urgency.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work on tasks as they appear.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel disorganized.", points: 1, traits: { Conscientiousness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you react to changes in work processes?",
        options: [
          { text: "I adapt immediately.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I adjust with a short delay.", points: 4, traits: { Openness: 4 } },
          { text: "I find it challenging but manage.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I resist change.", points: 1, traits: { Openness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your decision-making process?",
        options: [
          { text: "Analytical and logical.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "Collaborative and consultative.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Primarily intuitive.", points: 3, traits: { Openness: 3 } },
          { text: "Indecisive.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you track progress on projects?",
        options: [
          { text: "With comprehensive monitoring tools.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "With a prioritized checklist.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "Using memory.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often lose track.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve conflicts constructively.", points: 5, traits: { Agreeableness: 5 } },
          { text: "I listen and seek compromise.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I assert my views strongly.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid conflict.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you incorporate creative ideas at work?",
        options: [
          { text: "I integrate them within a structured framework.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
          { text: "I welcome and evaluate new ideas.", points: 4, traits: { Openness: 4 } },
          { text: "I consider them occasionally.", points: 3, traits: { Openness: 3 } },
          { text: "I prefer to stick to routine methods.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage multiple projects simultaneously?",
        options: [
          { text: "I coordinate them with detailed planning.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize them with clear priorities.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I juggle with moderate success.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you view teamwork?",
        options: [
          { text: "I thrive in a collaborative environment.", points: 5, traits: { Extraversion: 5, Agreeableness: 5 } },
          { text: "I value teamwork and contribute actively.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I work well both independently and in teams.", points: 3, traits: { Extraversion: 3 } },
          { text: "I prefer working alone.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you feel when your ideas are recognized?",
        options: [
          { text: "Highly motivated to contribute further.", points: 5, traits: { Extraversion: 5 } },
          { text: "Appreciative and encouraged.", points: 4, traits: { Agreeableness: 4 } },
          { text: "Modestly satisfied.", points: 3, traits: { Agreeableness: 3 } },
          { text: "Indifferent.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      }
    ],
    SetL: [
      {
        question: "How do you plan your tasks?",
        options: [
          { text: "I create a detailed schedule every day.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I have a general plan with structure.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I rely on a loose plan.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I do not plan in advance.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you respond to sudden changes?",
        options: [
          { text: "I adapt immediately and reorganize.", points: 5, traits: { Openness: 5, Neuroticism: 1 } },
          { text: "I adjust with slight stress.", points: 4, traits: { Openness: 4 } },
          { text: "I struggle but eventually manage.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I find it very difficult to adjust.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "What is your approach in group work?",
        options: [
          { text: "I take the lead confidently.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I actively contribute and sometimes lead.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I participate but rarely lead.", points: 3, traits: { Agreeableness: 3 } },
          { text: "I prefer to work independently.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I always finish ahead of schedule.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I meet deadlines with proper planning.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I often work up to the deadline.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I frequently miss deadlines.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you react to constructive criticism?",
        options: [
          { text: "I embrace it and improve immediately.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider it and adjust accordingly.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel defensive but learn eventually.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I disregard it.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you solve complex problems?",
        options: [
          { text: "I analyze thoroughly and plan solutions.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I discuss with peers to find answers.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I rely on intuition.", points: 3, traits: { Openness: 3 } },
          { text: "I tend to delay addressing them.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you handle repetitive work?",
        options: [
          { text: "I perform it with high efficiency.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I complete it with diligence.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I sometimes lose focus.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I find it very tedious.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you approach learning new skills?",
        options: [
          { text: "I actively seek out training.", points: 5, traits: { Openness: 5 } },
          { text: "I learn through practical experience.", points: 4, traits: { Openness: 4 } },
          { text: "I learn with minimal effort.", points: 3, traits: { Openness: 3 } },
          { text: "I avoid new learning opportunities.", points: 1, traits: { Openness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you deal with work-related stress?",
        options: [
          { text: "I remain calm and methodical.", points: 5, traits: { Neuroticism: 1, Conscientiousness: 5 } },
          { text: "I manage stress effectively most of the time.", points: 4, traits: { Neuroticism: 2 } },
          { text: "I sometimes get anxious.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I often become overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "When given a leadership role, how do you perform?",
        options: [
          { text: "I lead assertively and clearly.", points: 5, traits: { Extraversion: 5, Conscientiousness: 5 } },
          { text: "I lead with collaboration.", points: 4, traits: { Agreeableness: 4, Extraversion: 4 } },
          { text: "I lead only when necessary.", points: 3, traits: { Extraversion: 3 } },
          { text: "I avoid leadership roles.", points: 1, traits: { Extraversion: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you ensure your work is error-free?",
        options: [
          { text: "I perform detailed reviews of my work.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I conduct regular quality checks.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I perform basic checks.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I rarely review my work.", points: 1, traits: { Conscientiousness: 1 } }
        ],
        answer: null
      },
      {
        question: "How do you prioritize your tasks?",
        options: [
          { text: "I use a systematic method to rank tasks.", points: 5, traits: { Conscientiousness: 5 } },
          { text: "I organize tasks by importance.", points: 4, traits: { Conscientiousness: 4 } },
          { text: "I work on tasks as they come.", points: 3, traits: { Conscientiousness: 3 } },
          { text: "I often feel disorganized.", points: 1, traits: { Conscientiousness: 1, Neuroticism: 5 } }
        ],
        answer: null
      },
      {
        question: "How do you react to feedback?",
        options: [
          { text: "I adjust my approach immediately.", points: 5, traits: { Agreeableness: 5, Openness: 5 } },
          { text: "I consider it and make improvements.", points: 4, traits: { Agreeableness: 4 } },
          { text: "I feel defensive but try to learn.", points: 3, traits: { Neuroticism: 3 } },
          { text: "I ignore feedback.", points: 1, traits: { Agreeableness: 1 } }
        ],
        answer: null
      },
        {
          question: "What is your decision-making process?",
          options: [
            { text: "I rely on thorough analysis.", points: 5, traits: { Conscientiousness: 5 } },
            { text: "I seek input from others.", points: 4, traits: { Agreeableness: 4 } },
            { text: "I decide based on past experience.", points: 3, traits: { Openness: 3 } },
            { text: "I often delay decisions.", points: 1, traits: { Neuroticism: 5 } }
          ],
          answer: null
        },
        {
          question: "How do you track progress on projects?",
          options: [
            { text: "Using detailed monitoring tools.", points: 5, traits: { Conscientiousness: 5 } },
            { text: "Keeping a well-organized checklist.", points: 4, traits: { Conscientiousness: 4 } },
            { text: "Relying on memory.", points: 3, traits: { Conscientiousness: 3 } },
            { text: "I often lose track.", points: 1, traits: { Conscientiousness: 1 } }
          ],
          answer: null
        },
        {
          question: "How do you handle disagreements with colleagues?",
          options: [
            { text: "I mediate and resolve conflicts constructively.", points: 5, traits: { Agreeableness: 5 } },
            { text: "I listen and seek compromise.", points: 4, traits: { Agreeableness: 4 } },
            { text: "I assert my views strongly.", points: 3, traits: { Extraversion: 3 } },
            { text: "I avoid confrontation.", points: 1, traits: { Agreeableness: 1 } }
          ],
          answer: null
        },
        {
          question: "How do you incorporate innovative ideas into your work?",
          options: [
            { text: "I actively integrate creative solutions.", points: 5, traits: { Openness: 5, Conscientiousness: 5 } },
            { text: "I welcome and consider new ideas.", points: 4, traits: { Openness: 4 } },
            { text: "I occasionally try new methods.", points: 3, traits: { Openness: 3 } },
            { text: "I stick to traditional methods.", points: 1, traits: { Openness: 1 } }
          ],
          answer: null
        },
        {
          question: "How do you manage multiple responsibilities?",
          options: [
            { text: "I coordinate them seamlessly with planning.", points: 5, traits: { Conscientiousness: 5 } },
            { text: "I organize them well most of the time.", points: 4, traits: { Conscientiousness: 4 } },
            { text: "I juggle tasks with moderate success.", points: 3, traits: { Conscientiousness: 3 } },
            { text: "I often feel overwhelmed.", points: 1, traits: { Neuroticism: 5 } }
          ],
          answer: null
        },
        {
          question: "How do you view teamwork?",
          options: [
            { text: "I thrive in a collaborative environment.", points: 5, traits: { Extraversion: 5, Agreeableness: 5 } },
            { text: "I value teamwork and contribute actively.", points: 4, traits: { Agreeableness: 4 } },
            { text: "I work well both independently and in teams.", points: 3, traits: { Extraversion: 3 } },
            { text: "I prefer working alone.", points: 1, traits: { Extraversion: 1 } }
          ],
          answer: null
        },
        {
          question: "How do you feel when your contributions are acknowledged?",
          options: [
            { text: "I feel highly motivated to continue contributing.", points: 5, traits: { Extraversion: 5 } },
            { text: "I appreciate the recognition and feel encouraged.", points: 4, traits: { Agreeableness: 4 } },
            { text: "I feel content but modest.", points: 3, traits: { Agreeableness: 3 } },
            { text: "I feel indifferent.", points: 1, traits: { Extraversion: 1 } }
          ],
          answer: null
        }
      ]
    }
  };

export default personalityAssessment;

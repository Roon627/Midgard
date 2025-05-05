const personalityAssessment = {
  sets: {
    SetA: [
      {
        question: "How do you plan your daily tasks?",
        options: [
          { text: "I create a detailed schedule and stick to it." },
          { text: "I outline a rough plan but remain flexible." },
          { text: "I have a general idea without formal planning." },
          { text: "I do tasks as they arise with little planning." }
        ]
      },
      {
        question: "When faced with an unexpected change, how do you respond?",
        options: [
          { text: "I adapt quickly and re-prioritize tasks." },
          { text: "I consult with colleagues for input." },
          { text: "I feel some stress but eventually adjust." },
          { text: "I struggle to adapt." }
        ]
      },
      {
        question: "What role do you usually take in a new team?",
        options: [
          { text: "I naturally assume leadership." },
          { text: "I support the team with ideas." },
          { text: "I contribute quietly when needed." },
          { text: "I prefer to observe and follow." }
        ]
      },
      {
        question: "How do you handle errors in your work?",
        options: [
          { text: "I analyze and correct them immediately." },
          { text: "I ask for help to resolve them." },
          { text: "I work on them eventually after some frustration." },
          { text: "I tend to postpone addressing them." }
        ]
      },
      {
        question: "What is your reaction to trying a new method for a task?",
        options: [
          { text: "I’m excited and eager to experiment." },
          { text: "I consider it after weighing risks." },
          { text: "I am hesitant but willing to try." },
          { text: "I prefer established methods." }
        ]
      },
      {
        question: "How do you view workplace rules?",
        options: [
          { text: "They are essential, and I follow them strictly." },
          { text: "I follow them but value some flexibility." },
          { text: "I follow them when necessary." },
          { text: "I tend to disregard rules." }
        ]
      },
      {
        question: "How do you communicate with colleagues?",
        options: [
          { text: "I’m clear, direct, and respectful." },
          { text: "I engage openly and seek compromise." },
          { text: "I share ideas selectively." },
          { text: "I keep communication to a minimum." }
        ]
      },
      {
        question: "How do you prepare for an important meeting?",
        options: [
          { text: "I prepare thoroughly and review details." },
          { text: "I review key points and prepare questions." },
          { text: "I skim the material and rely on memory." },
          { text: "I attend with little preparation." }
        ]
      },
      {
        question: "How do you receive feedback on your work?",
        options: [
          { text: "I analyze it objectively and adjust." },
          { text: "I appreciate and consider it carefully." },
          { text: "I feel defensive but eventually reflect on it." },
          { text: "I tend to dismiss feedback." }
        ]
      },
      {
        question: "How do you approach problem-solving?",
        options: [
          { text: "I break down the problem methodically." },
          { text: "I brainstorm with others." },
          { text: "I rely on intuition and experience." },
          { text: "I wait for problems to resolve themselves." }
        ]
      },
      {
        question: "How do you balance work and personal life?",
        options: [
          { text: "I schedule time precisely for both." },
          { text: "I try to maintain balance but sometimes overwork." },
          { text: "I occasionally struggle to balance them." },
          { text: "I often neglect one for the other." }
        ]
      },
      {
        question: "When managing multiple tasks, how do you prioritize?",
        options: [
          { text: "I assess urgency and importance and plan accordingly." },
          { text: "I manage tasks as they arise with some planning." },
          { text: "I rely on my mood to decide." },
          { text: "I tackle tasks randomly." }
        ]
      },
      {
        question: "When your ideas are challenged in a meeting, how do you react?",
        options: [
          { text: "I explain my points with evidence and remain open." },
          { text: "I listen carefully and adjust my view." },
          { text: "I defend my ideas but feel discouraged." },
          { text: "I withdraw from the discussion." }
        ]
      },
      {
        question: "How do you approach learning new skills?",
        options: [
          { text: "I actively seek out training and challenges." },
          { text: "I learn through hands-on experience." },
          { text: "I learn when required by circumstances." },
          { text: "I prefer to stick with familiar methods." }
        ]
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I plan ahead and complete tasks early." },
          { text: "I work steadily and finish on time." },
          { text: "I often start late but manage under pressure." },
          { text: "I struggle to meet deadlines." }
        ]
      },
      {
        question: "How do you respond to workplace pressure?",
        options: [
          { text: "I remain calm, focused, and prioritize tasks." },
          { text: "I get stressed but seek support." },
          { text: "I feel anxious but push through." },
          { text: "I feel overwhelmed." }
        ]
      },
      {
        question: "In group projects, what role do you typically assume?",
        options: [
          { text: "I naturally lead and guide the team." },
          { text: "I contribute ideas and help organize." },
          { text: "I do my assigned tasks reliably." },
          { text: "I prefer to work independently." }
        ]
      },
      {
        question: "How do you handle being assigned unexpected leadership?",
        options: [
          { text: "I embrace it and structure the team effectively." },
          { text: "I accept it cautiously and seek input." },
          { text: "I feel uncertain but try to adapt." },
          { text: "I prefer not to lead." }
        ]
      },
      {
        question: "How do you work under strict supervision?",
        options: [
          { text: "I thrive with clear guidance and structure." },
          { text: "I perform well with some autonomy." },
          { text: "I manage but feel slightly restricted." },
          { text: "I feel stifled and demotivated." }
        ]
      },
      {
        question: "How do you perceive risks in your work?",
        options: [
          { text: "I analyze them and prepare contingencies." },
          { text: "I consider risks and take calculated ones." },
          { text: "I feel some anxiety about them." },
          { text: "I avoid tasks with uncertainty." }
        ]
      }
    ],
    SetB: [
      {
        question: "When starting a new assignment, what is your approach?",
        options: [
          { text: "I prepare a detailed plan." },
          { text: "I outline basic steps." },
          { text: "I jump in and adjust later." },
          { text: "I procrastinate until forced." }
        ]
      },
      {
        question: "How do you prefer to receive instructions?",
        options: [
          { text: "Clear, written guidelines." },
          { text: "Verbal briefings with discussion." },
          { text: "General outlines with room for improvisation." },
          { text: "Minimal guidance, figuring it out myself." }
        ]
      },
      {
        question: "In team projects, how do you usually contribute?",
        options: [
          { text: "I organize tasks and delegate." },
          { text: "I support colleagues and offer ideas." },
          { text: "I contribute when asked." },
          { text: "I prefer working independently." }
        ]
      },
      {
        question: "When your proposal is critiqued, how do you react?",
        options: [
          { text: "I welcome constructive criticism and refine it." },
          { text: "I consider the feedback carefully." },
          { text: "I feel slightly defensive." },
          { text: "I dismiss the feedback." }
        ]
      },
      {
        question: "How do you handle unforeseen obstacles?",
        options: [
          { text: "I quickly develop alternative strategies." },
          { text: "I consult with my team for solutions." },
          { text: "I get flustered but eventually manage." },
          { text: "I struggle significantly with disruptions." }
        ]
      },
      {
        question: "What is your attitude toward continuous learning?",
        options: [
          { text: "I actively pursue new knowledge." },
          { text: "I learn when necessary." },
          { text: "I rely on past experience." },
          { text: "I rarely seek additional learning." }
        ]
      },
      {
        question: "How do you describe your decision-making process?",
        options: [
          { text: "Analytical and data-driven." },
          { text: "Collaborative and consultative." },
          { text: "Intuitive and spontaneous." },
          { text: "Hesitant and indecisive." }
        ]
      },
      {
        question: "How do you react to a change in project direction?",
        options: [
          { text: "I adapt quickly and reorganize priorities." },
          { text: "I discuss changes with my team." },
          { text: "I need time to adjust." },
          { text: "I resist the change." }
        ]
      },
      {
        question: "What is your style when managing deadlines?",
        options: [
          { text: "I set interim goals and track progress rigorously." },
          { text: "I work steadily and monitor timelines." },
          { text: "I sometimes struggle but meet deadlines." },
          { text: "I frequently miss deadlines." }
        ]
      },
      {
        question: "How do you prefer to solve problems?",
        options: [
          { text: "Through methodical research and analysis." },
          { text: "By brainstorming with colleagues." },
          { text: "By trial and error." },
          { text: "By waiting for the problem to resolve itself." }
        ]
      },
      {
        question: "When conflicts arise, what is your preferred approach?",
        options: [
          { text: "Mediate and find a fair resolution." },
          { text: "Listen and empathize with all sides." },
          { text: "Assert my viewpoint to resolve it." },
          { text: "Avoid confrontation." }
        ]
      },
      {
        question: "How do you feel about structured routines?",
        options: [
          { text: "I thrive on routine and predictability." },
          { text: "I appreciate structure but enjoy some variation." },
          { text: "I can adapt but prefer flexibility." },
          { text: "I dislike routine and prefer constant change." }
        ]
      },
      {
        question: "What best describes your approach to leadership?",
        options: [
          { text: "Leading with clear, firm direction." },
          { text: "Leading by inspiring and empowering others." },
          { text: "Leading occasionally when needed." },
          { text: "Not seeking leadership roles." }
        ]
      },
      {
        question: "How do you manage your workload?",
        options: [
          { text: "I meticulously plan and organize tasks." },
          { text: "I maintain a prioritized to-do list." },
          { text: "I work in bursts as needed." },
          { text: "I work reactively without planning." }
        ]
      },
      {
        question: "When colleagues disagree with you, how do you respond?",
        options: [
          { text: "I calmly discuss and find compromise." },
          { text: "I listen and consider alternative views." },
          { text: "I maintain my position but allow debate." },
          { text: "I insist on my view without discussion." }
        ]
      },
      {
        question: "How do you approach projects with multiple variables?",
        options: [
          { text: "I create a detailed framework to manage all aspects." },
          { text: "I identify key factors and focus on them." },
          { text: "I work through details as they emerge." },
          { text: "I feel overwhelmed and uncertain." }
        ]
      },
      {
        question: "How do you maintain motivation during long projects?",
        options: [
          { text: "I set milestones and reward progress." },
          { text: "I seek encouragement from peers." },
          { text: "I work until completion with fluctuating energy." },
          { text: "I often lose motivation." }
        ]
      },
      {
        question: "How do you react when someone offers an innovative idea?",
        options: [
          { text: "I evaluate its potential and consider integration." },
          { text: "I listen and discuss its merits." },
          { text: "I am curious but cautious." },
          { text: "I am skeptical and dismiss it." }
        ]
      },
      {
        question: "What is your strategy when a project's scope expands unexpectedly?",
        options: [
          { text: "I revise my plan and allocate extra resources." },
          { text: "I discuss adjustments with the team." },
          { text: "I work overtime to meet the new demands." },
          { text: "I feel stressed and struggle to adapt." }
        ]
      },
      {
        question: "How do you perceive feedback on your performance?",
        options: [
          { text: "As a valuable tool for growth." },
          { text: "As constructive advice." },
          { text: "As something to consider." },
          { text: "As a personal criticism." }
        ]
      }
    ],
    SetC: [
      {
        question: "How do you structure your workday?",
        options: [
          { text: "I create a strict schedule with allocated tasks." },
          { text: "I outline major tasks with some flexibility." },
          { text: "I have a rough plan and improvise." },
          { text: "I work spontaneously without planning." }
        ]
      },
      {
        question: "When faced with a challenging project, what is your first step?",
        options: [
          { text: "I research and develop a comprehensive strategy." },
          { text: "I outline key steps and consult colleagues." },
          { text: "I start working and adjust as needed." },
          { text: "I feel uncertain and delay beginning." }
        ]
      },
      {
        question: "How do you prefer to communicate professionally?",
        options: [
          { text: "Direct, clear, and concise." },
          { text: "Friendly and open dialogue." },
          { text: "Informal discussions with some detail." },
          { text: "Minimal communication, mostly written." }
        ]
      },
      {
        question: "How do you approach deadlines?",
        options: [
          { text: "I complete tasks well ahead of deadlines." },
          { text: "I manage my time to finish on time." },
          { text: "I work close to the deadline with stress." },
          { text: "I often struggle to meet deadlines." }
        ]
      },
      {
        question: "What is your reaction to new ideas at work?",
        options: [
          { text: "I eagerly explore and implement them." },
          { text: "I consider them carefully before deciding." },
          { text: "I take them into account if needed." },
          { text: "I prefer sticking to established methods." }
        ]
      },
      {
        question: "How important are rules in your work environment?",
        options: [
          { text: "Essential for clarity; I follow them rigorously." },
          { text: "Important but should allow some flexibility." },
          { text: "More of a guideline than strict rules." },
          { text: "I prefer minimal rules to foster creativity." }
        ]
      },
      {
        question: "How do you handle working in a team?",
        options: [
          { text: "I actively contribute and often lead discussions." },
          { text: "I work cooperatively and share responsibilities." },
          { text: "I participate when necessary." },
          { text: "I prefer to work alone." }
        ]
      },
      {
        question: "When making decisions, what is your process?",
        options: [
          { text: "I base decisions on data and analysis." },
          { text: "I incorporate team feedback along with my judgment." },
          { text: "I rely mostly on intuition." },
          { text: "I delay decisions due to uncertainty." }
        ]
      },
      {
        question: "How do you deal with criticism from peers?",
        options: [
          { text: "I welcome it as an opportunity to improve." },
          { text: "I listen carefully and consider adjustments." },
          { text: "I feel somewhat hurt but learn from it." },
          { text: "I get defensive and dismiss it." }
        ]
      },
      {
        question: "How do you approach long-term projects?",
        options: [
          { text: "I set clear goals and track progress meticulously." },
          { text: "I set goals and check progress periodically." },
          { text: "I have goals but often get distracted." },
          { text: "I lack clear goals and struggle to focus." }
        ]
      },
      {
        question: "When creative thinking is required, how do you react?",
        options: [
          { text: "I enthusiastically propose innovative solutions." },
          { text: "I contribute creative ideas alongside practical ones." },
          { text: "I offer ideas when prompted." },
          { text: "I prefer traditional methods." }
        ]
      },
      {
        question: "How do you prioritize multiple assignments?",
        options: [
          { text: "I organize tasks by urgency and importance." },
          { text: "I list them and tackle them sequentially." },
          { text: "I address tasks as they arise." },
          { text: "I find prioritizing challenging." }
        ]
      },
      {
        question: "When plans change unexpectedly, how do you react?",
        options: [
          { text: "I quickly adapt and adjust my strategy." },
          { text: "I discuss alternative plans with my team." },
          { text: "I feel discomfort but eventually adapt." },
          { text: "I resist change and feel stressed." }
        ]
      },
      {
        question: "What is your preferred role in group settings?",
        options: [
          { text: "I often take charge and guide the team." },
          { text: "I like to contribute ideas and support decisions." },
          { text: "I participate as needed." },
          { text: "I prefer to follow rather than lead." }
        ]
      },
      {
        question: "What is your method for solving complex problems?",
        options: [
          { text: "Systematic analysis and planning." },
          { text: "Collaborative brainstorming." },
          { text: "Trial-and-error approach." },
          { text: "Waiting for clear instructions." }
        ]
      },
      {
        question: "How do you handle stress during peak periods?",
        options: [
          { text: "I remain composed and focus on solutions." },
          { text: "I seek support from colleagues." },
          { text: "I get stressed but manage to cope." },
          { text: "I feel overwhelmed." }
        ]
      },
      {
        question: "How do you evaluate your work performance?",
        options: [
          { text: "I set measurable goals and review progress regularly." },
          { text: "I reflect on feedback and adjust accordingly." },
          { text: "I rely on occasional self-reflection." },
          { text: "I seldom assess my performance." }
        ]
      },
      {
        question: "When assigned unfamiliar tasks, how do you proceed?",
        options: [
          { text: "I research extensively to master the task." },
          { text: "I learn as I go with some initial planning." },
          { text: "I ask for guidance while working." },
          { text: "I feel hesitant and uncertain." }
        ]
      },
      {
        question: "What drives you to excel at work?",
        options: [
          { text: "Achieving excellence through hard work and planning." },
          { text: "Recognition of team achievements." },
          { text: "Personal satisfaction from meeting targets." },
          { text: "Minimal motivation beyond basic requirements." }
        ]
      },
      {
        question: "How do you feel when your suggestions are implemented?",
        options: [
          { text: "I feel validated and motivated to contribute more." },
          { text: "I appreciate the trust and continue to improve." },
          { text: "I am content but seek further feedback." },
          { text: "I feel indifferent." }
        ]
      }
    ],
    SetD: [
      {
        question: "How do you organize your work tasks?",
        options: [
          { text: "I list tasks in detail and follow a strict schedule." },
          { text: "I keep a rough plan and adjust as needed." },
          { text: "I rely on memory and handle tasks as they come." },
          { text: "I work randomly without planning." }
        ]
      },
      {
        question: "How do you feel about following company procedures?",
        options: [
          { text: "I strictly adhere to all guidelines." },
          { text: "I follow them but allow some flexibility." },
          { text: "I view them as suggestions rather than rules." },
          { text: "I find procedures too restrictive." }
        ]
      },
      {
        question: "When facing a tight deadline, what is your reaction?",
        options: [
          { text: "I plan ahead to avoid any rush." },
          { text: "I work steadily even if it gets hectic." },
          { text: "I tend to work under pressure at the last minute." },
          { text: "I feel overwhelmed and struggle to deliver." }
        ]
      },
      {
        question: "How do you contribute in group projects?",
        options: [
          { text: "I take initiative and often lead the team." },
          { text: "I offer ideas and collaborate with teammates." },
          { text: "I contribute when asked but prefer a supporting role." },
          { text: "I prefer working alone over group collaboration." }
        ]
      },
      {
        question: "What is your approach to problem-solving?",
        options: [
          { text: "I analyze issues meticulously and develop clear solutions." },
          { text: "I brainstorm with others for diverse perspectives." },
          { text: "I rely on past experience and intuition." },
          { text: "I wait for guidance to resolve problems." }
        ]
      },
      {
        question: "How do you react when receiving constructive feedback?",
        options: [
          { text: "I incorporate it immediately and adjust my approach." },
          { text: "I consider it carefully and make necessary improvements." },
          { text: "I feel somewhat criticized but eventually adapt." },
          { text: "I tend to become defensive and ignore it." }
        ]
      },
      {
        question: "How do you handle unforeseen changes at work?",
        options: [
          { text: "I adapt quickly and reorganize priorities." },
          { text: "I consult with my team to develop new strategies." },
          { text: "I struggle at first but eventually adjust." },
          { text: "I resist change and feel stressed." }
        ]
      },
      {
        question: "How do you view leadership roles?",
        options: [
          { text: "I enjoy taking charge and setting clear direction." },
          { text: "I prefer supporting leadership rather than being the leader." },
          { text: "I contribute when needed but rarely initiate leadership." },
          { text: "I avoid leadership responsibilities altogether." }
        ]
      },
      {
        question: "How do you prioritize when multiple tasks demand attention?",
        options: [
          { text: "I evaluate urgency and impact, then plan accordingly." },
          { text: "I follow a systematic approach to organize tasks." },
          { text: "I handle tasks as they arrive, sometimes with delays." },
          { text: "I often feel overwhelmed and disorganized." }
        ]
      },
      {
        question: "What is your communication style in professional settings?",
        options: [
          { text: "Direct, clear, and assertive." },
          { text: "Warm, friendly, and collaborative." },
          { text: "Reserved and cautious." },
          { text: "Minimal and reticent." }
        ]
      },
      {
        question: "When starting a new project, what is your initial step?",
        options: [
          { text: "I conduct thorough research and detailed planning." },
          { text: "I review objectives and outline a broad plan." },
          { text: "I dive in and adjust as I progress." },
          { text: "I wait for explicit instructions before starting." }
        ]
      },
      {
        question: "How do you manage stress in a busy work environment?",
        options: [
          { text: "I remain calm, prioritize tasks, and use stress-management techniques." },
          { text: "I seek support and communicate my challenges." },
          { text: "I manage but often feel under pressure." },
          { text: "I feel overwhelmed and struggle to cope." }
        ]
      },
      {
        question: "How do you approach decision-making in ambiguous situations?",
        options: [
          { text: "I gather all data and decide logically." },
          { text: "I consult with colleagues before deciding." },
          { text: "I rely on past experiences and intuition." },
          { text: "I delay decisions because of uncertainty." }
        ]
      },
      {
        question: "What role does creativity play in your work?",
        options: [
          { text: "I integrate creative ideas within a structured framework." },
          { text: "I welcome innovation and balance it with practicality." },
          { text: "I occasionally use creativity when prompted." },
          { text: "I prefer established methods over creative change." }
        ]
      },
      {
        question: "How do you manage repetitive tasks?",
        options: [
          { text: "I maintain focus and efficiency through established routines." },
          { text: "I look for ways to improve the process." },
          { text: "I perform them adequately though interest may wane." },
          { text: "I quickly lose motivation and attention." }
        ]
      },
      {
        question: "When a colleague disagrees with your idea, how do you respond?",
        options: [
          { text: "I consider their perspective and refine my idea." },
          { text: "I explain my rationale and seek a compromise." },
          { text: "I defend my idea even if I feel challenged." },
          { text: "I withdraw from the discussion." }
        ]
      },
      {
        question: "How do you prepare for unexpected tasks?",
        options: [
          { text: "I always have flexible strategies ready." },
          { text: "I adjust my current plan to accommodate them." },
          { text: "I handle them as they come, with some difficulty." },
          { text: "I feel unprepared and anxious." }
        ]
      },
      {
        question: "What motivates you to excel at work?",
        options: [
          { text: "The drive for excellence and clear goals." },
          { text: "Recognition from my team and supervisors." },
          { text: "Personal satisfaction from meeting targets." },
          { text: "Minimal external motivation." }
        ]
      },
      {
        question: "How do you ensure alignment with organizational goals?",
        options: [
          { text: "I consistently review and adjust my work to match objectives." },
          { text: "I discuss priorities with my team regularly." },
          { text: "I follow instructions without deep personal alignment." },
          { text: "I rarely consider broader goals." }
        ]
      },
      {
        question: "How do you handle ambiguity in work assignments?",
        options: [
          { text: "I proactively seek clarity and structure." },
          { text: "I collaborate with others to define objectives." },
          { text: "I manage as best as I can with the information given." },
          { text: "I feel uncertain and uncomfortable." }
        ]
      }
    ],
    SetE: [
      {
        question: "How do you structure your morning routine?",
        options: [
          { text: "I have a fixed routine I follow religiously." },
          { text: "I have a general plan but remain flexible." },
          { text: "I perform basic tasks without a set routine." },
          { text: "I rarely follow any routine." }
        ]
      },
      {
        question: "When assigned a new project, how do you start?",
        options: [
          { text: "I research and plan every detail thoroughly." },
          { text: "I review objectives and outline a rough plan." },
          { text: "I begin work and adjust as I progress." },
          { text: "I wait until I receive detailed instructions." }
        ]
      },
      {
        question: "How do you respond to unexpected feedback?",
        options: [
          { text: "I welcome it and immediately adjust my work." },
          { text: "I consider it carefully even if I feel a bit defensive." },
          { text: "I note it but rarely change my approach." },
          { text: "I tend to ignore the feedback." }
        ]
      },
      {
        question: "How do you prioritize your tasks during a busy day?",
        options: [
          { text: "I use a prioritized list and adhere strictly to deadlines." },
          { text: "I prioritize by urgency and manage efficiently." },
          { text: "I focus on the tasks that interest me most." },
          { text: "I often struggle with prioritization." }
        ]
      },
      {
        question: "What is your attitude toward structured feedback sessions?",
        options: [
          { text: "They are essential for personal and professional growth." },
          { text: "I appreciate them and act on suggestions." },
          { text: "I participate even if I feel a bit uncomfortable." },
          { text: "I tend to avoid them." }
        ]
      },
      {
        question: "How do you contribute during brainstorming sessions?",
        options: [
          { text: "I actively share innovative and creative ideas." },
          { text: "I contribute when prompted and support others’ suggestions." },
          { text: "I listen more than I speak." },
          { text: "I rarely participate in brainstorming." }
        ]
      },
      {
        question: "When a project requires detailed analysis, how do you respond?",
        options: [
          { text: "I dive deep into research and analysis." },
          { text: "I examine key components and delegate details when needed." },
          { text: "I rely on my past experience to guide me." },
          { text: "I feel overwhelmed by the details." }
        ]
      },
      {
        question: "How do you approach conflicts within your team?",
        options: [
          { text: "I address conflicts directly and mediate resolutions." },
          { text: "I encourage open dialogue among team members." },
          { text: "I tend to avoid conflicts if possible." },
          { text: "I let conflicts linger without addressing them." }
        ]
      },
      {
        question: "How do you balance creativity with structure in your work?",
        options: [
          { text: "I integrate creativity within a well-organized framework." },
          { text: "I allow creative freedom while following core guidelines." },
          { text: "I lean toward structure over creativity." },
          { text: "I generally work spontaneously without much structure." }
        ]
      },
      {
        question: "How do you feel when your work is recognized?",
        options: [
          { text: "It motivates me to push for even higher standards." },
          { text: "I appreciate it and use it as encouragement." },
          { text: "I am content but remain modest about it." },
          { text: "I feel indifferent about recognition." }
        ]
      },
      {
        question: "How do you approach solving complex problems?",
        options: [
          { text: "I break them down into smaller, manageable parts." },
          { text: "I collaborate with colleagues to develop solutions." },
          { text: "I rely mostly on my own intuition and experience." },
          { text: "I tend to avoid tackling complex issues." }
        ]
      },
      {
        question: "How do you handle repetitive assignments?",
        options: [
          { text: "I maintain efficiency and focus through routine." },
          { text: "I look for ways to streamline and improve the process." },
          { text: "I complete them but often lose interest." },
          { text: "I find them particularly draining." }
        ]
      },
      {
        question: "How do you react when a deadline is suddenly moved up?",
        options: [
          { text: "I quickly reorganize my schedule to meet the new deadline." },
          { text: "I adjust my tasks and work more intensively." },
          { text: "I feel stressed but eventually adapt." },
          { text: "I become overwhelmed and may miss the deadline." }
        ]
      },
      {
        question: "How important is professional development to you?",
        options: [
          { text: "It is a top priority; I actively seek growth opportunities." },
          { text: "I pursue development when opportunities arise." },
          { text: "I recognize its value but rarely focus on it." },
          { text: "I do not actively prioritize professional development." }
        ]
      },
      {
        question: "How do you manage detailed data or reports?",
        options: [
          { text: "I organize and review them meticulously." },
          { text: "I manage them effectively with periodic checks." },
          { text: "I review them, though I sometimes miss finer details." },
          { text: "I struggle to handle detailed information consistently." }
        ]
      },
      {
        question: "When asked to lead a project, what is your response?",
        options: [
          { text: "I readily volunteer to lead and organize the team." },
          { text: "I take on a supportive leadership role." },
          { text: "I agree if necessary but prefer a non-leadership role." },
          { text: "I generally avoid leadership responsibilities." }
        ]
      },
      {
        question: "How do you ensure the quality of your work?",
        options: [
          { text: "I follow strict quality-control measures and regularly review my output." },
          { text: "I self-review and welcome constructive feedback." },
          { text: "I occasionally check my work." },
          { text: "I rarely verify the quality of what I produce." }
        ]
      },
      {
        question: "How do you respond when multiple opinions are presented?",
        options: [
          { text: "I evaluate each perspective and synthesize a balanced view." },
          { text: "I consider different viewpoints and work toward a consensus." },
          { text: "I maintain my own view while acknowledging others." },
          { text: "I become confused and avoid engaging in discussion." }
        ]
      },
      {
        question: "How do you adapt to new technological tools at work?",
        options: [
          { text: "I learn them quickly and integrate them seamlessly." },
          { text: "I adapt with some guidance and practice." },
          { text: "I use them reluctantly, preferring old methods." },
          { text: "I resist adopting new technologies." }
        ]
      },
      {
        question: "How do you perceive collaboration in your workplace?",
        options: [
          { text: "It is essential; I thrive in collaborative environments." },
          { text: "It is important and I contribute actively." },
          { text: "I participate but sometimes prefer to work alone." },
          { text: "I work best in isolation." }
        ]
      }
    ],
    SetF: [
      {
        question: "How do you plan your work day?",
        options: [
          { text: "I write a detailed agenda." },
          { text: "I create a rough outline." },
          { text: "I rely on memory." },
          { text: "I improvise as I go." }
        ]
      },
      {
        question: "When faced with unexpected tasks, how do you react?",
        options: [
          { text: "I reorganize my schedule immediately." },
          { text: "I adjust my tasks gradually." },
          { text: "I feel stressed but eventually adapt." },
          { text: "I struggle to change my plan." }
        ]
      },
      {
        question: "How do you approach teamwork?",
        options: [
          { text: "I naturally take a leadership role." },
          { text: "I contribute ideas actively." },
          { text: "I work well in a team but prefer a supporting role." },
          { text: "I prefer working alone." }
        ]
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I complete tasks well before the deadline." },
          { text: "I meet deadlines with careful planning." },
          { text: "I often work close to deadlines." },
          { text: "I struggle to meet deadlines." }
        ]
      },
      {
        question: "How do you handle constructive criticism?",
        options: [
          { text: "I welcome it and adjust my work." },
          { text: "I consider it and make necessary improvements." },
          { text: "I feel defensive but try to improve." },
          { text: "I ignore criticism." }
        ]
      },
      {
        question: "What is your approach to problem-solving?",
        options: [
          { text: "I analyze the problem systematically." },
          { text: "I brainstorm with colleagues." },
          { text: "I use intuition to find solutions." },
          { text: "I delay solving problems." }
        ]
      },
      {
        question: "How do you handle repetitive tasks?",
        options: [
          { text: "I maintain focus and efficiency." },
          { text: "I try to find ways to improve the process." },
          { text: "I complete them but lose interest." },
          { text: "I struggle with routine tasks." }
        ]
      },
      {
        question: "How do you approach learning new skills?",
        options: [
          { text: "I proactively seek training." },
          { text: "I learn when necessary." },
          { text: "I learn through occasional practice." },
          { text: "I rarely seek new learning opportunities." }
        ]
      },
      {
        question: "How do you handle workplace conflict?",
        options: [
          { text: "I address it directly and mediate solutions." },
          { text: "I discuss issues calmly." },
          { text: "I avoid confrontation when possible." },
          { text: "I let conflicts persist." }
        ]
      },
      {
        question: "How do you respond to feedback on your performance?",
        options: [
          { text: "I actively seek and implement it." },
          { text: "I listen and reflect on it." },
          { text: "I accept it passively." },
          { text: "I disregard it." }
        ]
      },
      {
        question: "When working in groups, what role do you typically assume?",
        options: [
          { text: "I lead discussions and coordinate efforts." },
          { text: "I offer ideas and support decisions." },
          { text: "I complete assigned tasks diligently." },
          { text: "I prefer to work independently." }
        ]
      },
      {
        question: "How do you manage stress in a busy environment?",
        options: [
          { text: "I remain calm and organized." },
          { text: "I seek support when needed." },
          { text: "I feel stressed but get through it." },
          { text: "I become overwhelmed." }
        ]
      },
      {
        question: "How do you react to new technology?",
        options: [
          { text: "I embrace it and learn quickly." },
          { text: "I adapt with some guidance." },
          { text: "I adopt it reluctantly." },
          { text: "I resist change." }
        ]
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Analytical and data-driven." },
          { text: "Collaborative and consultative." },
          { text: "Largely intuitive." },
          { text: "I delay decisions." }
        ]
      },
      {
        question: "How do you track progress on multiple projects?",
        options: [
          { text: "I use detailed tracking tools." },
          { text: "I maintain a prioritized to-do list." },
          { text: "I rely on memory." },
          { text: "I often lose track of tasks." }
        ]
      },
      {
        question: "How do you respond to criticism in a team meeting?",
        options: [
          { text: "I listen carefully and adjust." },
          { text: "I acknowledge it and reflect on it." },
          { text: "I feel slightly defensive." },
          { text: "I dismiss it." }
        ]
      },
      {
        question: "How do you integrate creative ideas into your work?",
        options: [
          { text: "I combine creativity with a structured plan." },
          { text: "I welcome innovative ideas and evaluate them." },
          { text: "I consider them when prompted." },
          { text: "I prefer sticking to traditional methods." }
        ]
      },
      {
        question: "How do you manage multiple responsibilities?",
        options: [
          { text: "I coordinate them with advanced planning." },
          { text: "I organize them with clear priorities." },
          { text: "I juggle tasks with moderate success." },
          { text: "I often feel overwhelmed." }
        ]
      },
      {
        question: "How do you view collaborative work?",
        options: [
          { text: "I thrive in a team setting." },
          { text: "I value teamwork and contribute actively." },
          { text: "I work well both independently and in teams." },
          { text: "I prefer working alone." }
        ]
      },
      {
        question: "How do you feel when your contributions are recognized?",
        options: [
          { text: "Highly motivated to contribute more." },
          { text: "Appreciative and encouraged." },
          { text: "Modestly satisfied." },
          { text: "Indifferent." }
        ]
      }
    ],
    SetG: [
      {
        question: "How do you begin your workday?",
        options: [
          { text: "With a detailed plan and schedule." },
          { text: "With a rough outline." },
          { text: "With a general idea." },
          { text: "Without any plan." }
        ]
      },
      {
        question: "When unexpected issues arise, how do you manage them?",
        options: [
          { text: "I reorganize my priorities immediately." },
          { text: "I adjust my focus gradually." },
          { text: "I feel stressed but adapt eventually." },
          { text: "I struggle to adapt." }
        ]
      },
      {
        question: "In team projects, what role do you take?",
        options: [
          { text: "I lead and coordinate effectively." },
          { text: "I contribute ideas actively." },
          { text: "I complete my assigned tasks." },
          { text: "I prefer to work alone." }
        ]
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I finish tasks well ahead of schedule." },
          { text: "I plan to meet deadlines." },
          { text: "I work up to the deadline." },
          { text: "I struggle to complete on time." }
        ]
      },
      {
        question: "What is your approach to feedback?",
        options: [
          { text: "I actively seek and implement it." },
          { text: "I consider it and make improvements." },
          { text: "I accept it passively." },
          { text: "I tend to ignore it." }
        ]
      },
      {
        question: "How do you solve complex problems?",
        options: [
          { text: "With systematic analysis." },
          { text: "By brainstorming with peers." },
          { text: "Through intuition." },
          { text: "By delaying decisions." }
        ]
      },
      {
        question: "How do you handle repetitive tasks?",
        options: [
          { text: "With high efficiency and focus." },
          { text: "I try to optimize the process." },
          { text: "I complete them as needed." },
          { text: "I find them tedious." }
        ]
      },
      {
        question: "How do you approach learning new skills?",
        options: [
          { text: "I actively pursue new training." },
          { text: "I learn as needed." },
          { text: "I learn gradually." },
          { text: "I rarely seek new learning opportunities." }
        ]
      },
      {
        question: "How do you handle work-related stress?",
        options: [
          { text: "I remain calm and organized." },
          { text: "I manage with minor stress." },
          { text: "I feel stressed but get through it." },
          { text: "I become overwhelmed." }
        ]
      },
      {
        question: "When assigned a leadership role, how do you react?",
        options: [
          { text: "I lead confidently and decisively." },
          { text: "I lead with team consultation." },
          { text: "I lead reluctantly." },
          { text: "I prefer not to lead." }
        ]
      },
      {
        question: "How do you ensure work quality?",
        options: [
          { text: "I rigorously check all details." },
          { text: "I review my work periodically." },
          { text: "I perform basic checks." },
          { text: "I rarely verify my work." }
        ]
      },
      {
        question: "How do you prioritize tasks when busy?",
        options: [
          { text: "I use a detailed priority list." },
          { text: "I organize by urgency." },
          { text: "I tackle tasks as they come." },
          { text: "I feel disorganized." }
        ]
      },
      {
        question: "How do you react to changes in work processes?",
        options: [
          { text: "I adapt quickly." },
          { text: "I adjust with some effort." },
          { text: "I find it challenging but manage." },
          { text: "I resist change." }
        ]
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Highly analytical and logical." },
          { text: "Collaborative and consultative." },
          { text: "Mostly intuitive." },
          { text: "Indecisive." }
        ]
      },
      {
        question: "How do you track your progress?",
        options: [
          { text: "With comprehensive tracking tools." },
          { text: "With a prioritized checklist." },
          { text: "Relying on memory." },
          { text: "I often lose track." }
        ]
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve constructively." },
          { text: "I listen and seek compromise." },
          { text: "I assert my views strongly." },
          { text: "I avoid conflict." }
        ]
      },
      {
        question: "How do you integrate creative ideas?",
        options: [
          { text: "I actively incorporate them within a structured plan." },
          { text: "I welcome and evaluate them." },
          { text: "I consider them occasionally." },
          { text: "I prefer traditional methods." }
        ]
      },
      {
        question: "How do you manage multiple responsibilities?",
        options: [
          { text: "I coordinate them with detailed planning." },
          { text: "I organize them with clear priorities." },
          { text: "I juggle tasks with moderate success." },
          { text: "I often feel overwhelmed." }
        ]
      },
      {
        question: "How do you view collaborative work?",
        options: [
          { text: "I thrive in team environments." },
          { text: "I value teamwork and contribute actively." },
          { text: "I work well independently and in teams." },
          { text: "I prefer working alone." }
        ]
      },
      {
        question: "How do you feel when your contributions are recognized?",
        options: [
          { text: "Extremely motivated to contribute more." },
          { text: "Appreciative and encouraged." },
          { text: "Moderately satisfied." },
          { text: "Indifferent." }
        ]
      }
    ],
    SetH: [
      {
        question: "How do you schedule your tasks?",
        options: [
          { text: "With a minute-by-minute plan." },
          { text: "With a detailed daily agenda." },
          { text: "With a general outline." },
          { text: "Without a set plan." }
        ]
      },
      {
        question: "How do you adjust when priorities change suddenly?",
        options: [
          { text: "I reorganize immediately." },
          { text: "I shift focus gradually." },
          { text: "I feel stressed but adapt." },
          { text: "I struggle significantly." }
        ]
      },
      {
        question: "How do you participate in group discussions?",
        options: [
          { text: "I lead and set agendas." },
          { text: "I contribute actively." },
          { text: "I speak when necessary." },
          { text: "I remain quiet." }
        ]
      },
      {
        question: "How do you manage deadlines?",
        options: [
          { text: "I complete tasks well before deadlines." },
          { text: "I finish on time through planning." },
          { text: "I often rush at the last minute." },
          { text: "I frequently miss deadlines." }
        ]
      },
      {
        question: "How do you respond to constructive criticism?",
        options: [
          { text: "I use it to improve immediately." },
          { text: "I reflect and adjust accordingly." },
          { text: "I feel criticized but eventually improve." },
          { text: "I tend to ignore it." }
        ]
      },
      {
        question: "How do you approach solving complex problems?",
        options: [
          { text: "I analyze them systematically." },
          { text: "I brainstorm with colleagues." },
          { text: "I rely on intuition." },
          { text: "I delay addressing them." }
        ]
      },
      {
        question: "How do you handle routine tasks?",
        options: [
          { text: "I perform them efficiently and methodically." },
          { text: "I complete them reliably." },
          { text: "I sometimes lose focus." },
          { text: "I find them very tedious." }
        ]
      },
      {
        question: "How do you learn new tasks or skills?",
        options: [
          { text: "I proactively research and study." },
          { text: "I learn through experience." },
          { text: "I require some guidance." },
          { text: "I avoid new challenges." }
        ]
      },
      {
        question: "How do you deal with stressful situations?",
        options: [
          { text: "I remain calm and organized." },
          { text: "I manage stress with minor discomfort." },
          { text: "I feel anxious but cope." },
          { text: "I become overwhelmed." }
        ]
      },
      {
        question: "When given a leadership role, how do you act?",
        options: [
          { text: "I lead confidently and decisively." },
          { text: "I lead collaboratively." },
          { text: "I lead reluctantly if needed." },
          { text: "I prefer not to lead." }
        ]
      },
      {
        question: "How do you ensure the quality of your work?",
        options: [
          { text: "I perform thorough self-reviews." },
          { text: "I conduct regular quality checks." },
          { text: "I check my work minimally." },
          { text: "I rarely verify my work." }
        ]
      },
      {
        question: "How do you prioritize your tasks?",
        options: [
          { text: "I use a systematic method to rank tasks." },
          { text: "I arrange tasks by urgency." },
          { text: "I work on tasks as they come." },
          { text: "I feel disorganized." }
        ]
      },
      {
        question: "How do you react to changes in work processes?",
        options: [
          { text: "I adapt immediately." },
          { text: "I adjust after a short delay." },
          { text: "I find it challenging but manage." },
          { text: "I resist change." }
        ]
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Analytical and logical." },
          { text: "Collaborative and consultative." },
          { text: "Mainly intuitive." },
          { text: "I often delay decisions." }
        ]
      },
      {
        question: "How do you track progress on projects?",
        options: [
          { text: "I use detailed monitoring tools." },
          { text: "I maintain a well-organized checklist." },
          { text: "I rely on memory." },
          { text: "I struggle to track progress." }
        ]
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve conflicts constructively." },
          { text: "I listen and try to find a compromise." },
          { text: "I assert my views strongly." },
          { text: "I avoid confrontation." }
        ]
      },
      {
        question: "How do you incorporate creative ideas into your work?",
        options: [
          { text: "I integrate them within a structured plan." },
          { text: "I welcome and evaluate new ideas." },
          { text: "I consider creative suggestions occasionally." },
          { text: "I prefer to stick to established methods." }
        ]
      },
      {
        question: "How do you manage multiple projects simultaneously?",
        options: [
          { text: "I coordinate them using detailed planning." },
          { text: "I organize with clear priorities." },
          { text: "I juggle tasks with moderate success." },
          { text: "I often feel overwhelmed." }
        ]
      },
      {
        question: "How do you view collaborative work?",
        options: [
          { text: "I thrive in a team environment." },
          { text: "I value teamwork and actively contribute." },
          { text: "I work well both independently and collaboratively." },
          { text: "I prefer working alone." }
        ]
      },
      {
        question: "How do you feel when your suggestions are implemented?",
        options: [
          { text: "Highly motivated to contribute further." },
          { text: "Appreciative and encouraged." },
          { text: "Modestly satisfied." },
          { text: "Indifferent." }
        ]
      }
    ],
    SetI: [
      {
        question: "How do you plan your daily work?",
        options: [
          { text: "I create a comprehensive plan." },
          { text: "I draft a rough outline." },
          { text: "I have a vague idea of tasks." },
          { text: "I do not plan in advance." }
        ]
      },
      {
        question: "How do you handle sudden changes in priorities?",
        options: [
          { text: "I adapt quickly and adjust my schedule." },
          { text: "I manage them after a short delay." },
          { text: "I feel stressed but eventually adapt." },
          { text: "I struggle to adapt." }
        ]
      },
      {
        question: "How do you prefer to work in a team?",
        options: [
          { text: "I take on a leadership role." },
          { text: "I actively contribute." },
          { text: "I work in a supportive capacity." },
          { text: "I prefer working alone." }
        ]
      },
      {
        question: "How do you ensure you meet deadlines?",
        options: [
          { text: "I finish tasks well before deadlines." },
          { text: "I plan to complete tasks on time." },
          { text: "I work until the last minute." },
          { text: "I often miss deadlines." }
        ]
      },
      {
        question: "How do you respond to constructive criticism?",
        options: [
          { text: "I incorporate it immediately." },
          { text: "I reflect and make adjustments." },
          { text: "I feel criticized but make some changes." },
          { text: "I disregard criticism." }
        ]
      },
      {
        question: "How do you approach solving complex problems?",
        options: [
          { text: "I analyze details systematically." },
          { text: "I consult with colleagues." },
          { text: "I rely on intuition." },
          { text: "I postpone solving them." }
        ]
      },
      {
        question: "How do you handle routine tasks?",
        options: [
          { text: "I perform them efficiently and methodically." },
          { text: "I complete them reliably." },
          { text: "I sometimes lose focus." },
          { text: "I find them tedious." }
        ]
      },
      {
        question: "How do you approach learning new technology?",
        options: [
          { text: "I master it quickly." },
          { text: "I learn with some guidance." },
          { text: "I learn gradually." },
          { text: "I resist adopting new technology." }
        ]
      },
      {
        question: "How do you deal with stressful situations at work?",
        options: [
          { text: "I remain calm and focused." },
          { text: "I manage stress with minor discomfort." },
          { text: "I feel anxious but continue working." },
          { text: "I become overwhelmed." }
        ]
      },
      {
        question: "When given a leadership role, how do you perform?",
        options: [
          { text: "I lead confidently and decisively." },
          { text: "I lead with team input." },
          { text: "I lead reluctantly if required." },
          { text: "I avoid leadership roles." }
        ]
      },
      {
        question: "How do you ensure the quality of your work?",
        options: [
          { text: "I conduct thorough self-reviews." },
          { text: "I review my work periodically." },
          { text: "I do a basic check." },
          { text: "I rarely review my work." }
        ]
      },
      {
        question: "How do you prioritize tasks?",
        options: [
          { text: "I use a detailed priority list." },
          { text: "I organize tasks by urgency." },
          { text: "I work on tasks as they appear." },
          { text: "I feel disorganized." }
        ]
      },
      {
        question: "How do you react to feedback?",
        options: [
          { text: "I adjust my work immediately." },
          { text: "I consider it and make improvements." },
          { text: "I feel defensive but try to learn." },
          { text: "I ignore feedback." }
        ]
      },
      {
        question: "What is your decision-making style?",
        options: [
          { text: "Highly analytical and methodical." },
          { text: "Collaborative with input from others." },
          { text: "Primarily intuitive." },
          { text: "I delay making decisions." }
        ]
      },
      {
        question: "How do you track progress on your projects?",
        options: [
          { text: "With detailed monitoring tools." },
          { text: "With a prioritized checklist." },
          { text: "Using my memory." },
          { text: "I often lose track." }
        ]
      },
      {
        question: "How do you handle disagreements with colleagues?",
        options: [
          { text: "I mediate and resolve conflicts effectively." },
          { text: "I listen and work toward compromise." },
          { text: "I assert my viewpoint strongly." },
          { text: "I avoid conflict." }
        ]
      },
      {
        question: "How do you incorporate creative ideas?",
        options: [
          { text: "I integrate them within a structured plan." },
          { text: "I welcome and evaluate new ideas." },
          { text: "I consider them occasionally." },
          { text: "I prefer sticking to routine methods." }
        ]
      },
      {
        question: "How do you manage multiple responsibilities?",
        options: [
          { text: "I coordinate them with advanced planning." },
          { text: "I organize them effectively." },
          { text: "I juggle tasks with moderate success." },
          { text: "I often feel overwhelmed." }
        ]
      },
      {
        question: "How do you view collaborative work?",
        options: [
          { text: "I thrive in a collaborative setting." },
          { text: "I value teamwork and contribute actively." },
          { text: "I work well both independently and in teams." },
          { text: "I prefer working alone." }
        ]
      }
    ]
  }
};

export default personalityAssessment;
// src/data/skills.js
// Edit these skill entries to match your actual proficiency.
// Levels: "Expert" | "Advanced" | "Intermediate" | "Beginner"

export const skillGroups = [
  {
    id: 'engines',
    label: 'Game Engines',
    icon: 'FaGamepad',
    color: 'cyan',
    skills: [
      { name: 'Unity', level: 'Advanced', icon: 'SiUnity', yearsExp: '3+' },
      { name: 'Unreal Engine 5', level: 'Intermediate', icon: 'SiUnrealengine', yearsExp: '1+' },
      { name: 'Godot 4', level: 'Intermediate', icon: 'SiGodotengine', yearsExp: '1+' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: 'FaCode',
    color: 'purple',
    skills: [
      { name: 'C#', level: 'Advanced', icon: 'SiCsharp', yearsExp: '3+' },
      { name: 'C++', level: 'Intermediate', icon: 'SiCplusplus', yearsExp: '1+' },
      { name: 'GDScript', level: 'Intermediate', icon: 'SiGodotengine', yearsExp: '1+' },
      { name: 'JavaScript', level: 'Intermediate', icon: 'SiJavascript', yearsExp: '2+' },
      { name: 'Python', level: 'Beginner', icon: 'SiPython', yearsExp: '<1' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Software',
    icon: 'FaTools',
    color: 'cyan',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', icon: 'SiGit', yearsExp: '3+' },
      { name: 'Visual Studio', level: 'Advanced', icon: 'SiVisualstudio', yearsExp: '3+' },
      { name: 'Blender', level: 'Intermediate', icon: 'SiBlender', yearsExp: '1+' },
      { name: 'Aseprite', level: 'Intermediate', icon: 'SiAseprite', yearsExp: '1+' },
      { name: 'Figma', level: 'Beginner', icon: 'SiFigma', yearsExp: '1+' },
    ],
  },
  {
    id: 'design',
    label: 'Game Design',
    icon: 'FaDiceD20',
    color: 'purple',
    skills: [
      { name: 'Level Design', level: 'Advanced', icon: null, yearsExp: '2+' },
      { name: 'Game Loop Design', level: 'Advanced', icon: null, yearsExp: '2+' },
      { name: 'Game Balancing', level: 'Intermediate', icon: null, yearsExp: '2+' },
      { name: 'Gameplay UX', level: 'Intermediate', icon: null, yearsExp: '1+' },
      { name: 'Prototyping', level: 'Advanced', icon: null, yearsExp: '3+' },
    ],
  },
];

// Level → visual width for progress-style bars
export const levelToWidth = {
  Expert: '95%',
  Advanced: '78%',
  Intermediate: '55%',
  Beginner: '30%',
};

const projects = [
  {
    title: "Spotify Discord Bot",
    description:
      "A custom Discord bot designed to bring collaborative music playback to voice channels. The bot integrates the Spotify API to fetch playlist details and the YouTube API to stream songs, overcoming Spotify's playback limitations. Users can contribute to a shared Spotify playlist directly from their phones, and the bot automatically syncs the updates, playing tracks by fetching them from YouTube. Built using Node.js, discord.js, and ffmpeg, the bot supports commands like !play, !skip, and !queue, providing users with full control over the music experience. This project demonstrates advanced API integration, real-time updates, and seamless user interaction within Discord.",
    link: "#",
    image: "/img/spotify.png",
  },
  {
    title: "React Website (v2)",
    description:
      "This very website is version 2 of my portfolio, designed to showcase my projects, skills, and creativity. Built with React and Material-UI for a modern, responsive user interface, it also integrates Three.js for interactive 3D elements (this site's background). This iteration incorporates cool tools and techniques to enhance user experience, such as smooth animations, modular component design, and advanced styling. It's a demonstration of my ability to build engaging and functional web applications while continuously improving on past work.",
    link: "#",
    image: "/img/react.png",
  },
  {
    title: "Buildertrend Automation Tool",
    description:
      "An automation script built in Python to tackle repetitive data-entry tasks on Buildertrend. Using Selenium and other Python libraries, this tool navigates the platform’s interface and programmatically marks tasks as complete across multiple years, months, and sales representatives—eliminating the need for manual, item-by-item clicks. The script leverages browser automation techniques like dynamically locating elements, handling dropdowns, and implementing robust error handling to ensure reliable performance. This project highlights my ability to identify and resolve real-world inefficiencies by creating a custom automation solution. By removing the limitation of no multi-select feature on Buildertrend, it saved significant time and reduced manual effort, showcasing both my problem-solving skills and my proficiency in Python-based web automation.",
    link: "#",
    image: "/img/python.png",
  },
  {
    title: "Discord Random Fact Bot",
    description:
      "A Discord bot built to entertain users by fetching and displaying random facts. Using the Fact API, this bot responds to user commands like !fact to provide a fun and interesting fact on demand. It also includes a scheduled mode, where it posts random facts to a designated channel at regular intervals. Developed with Node.js and discord.js, the bot features robust error handling and utilizes asynchronous API calls for seamless interactions. This project demonstrates my ability to integrate external APIs, handle real-time interactions, and create engaging experiences for Discord communities.",
    link: "#",
    image: "/img/discord.png",
  },
  {
    title: "CSIS 420 - Parser",
    description:
      "Developed as the final project for my Structures of Programming Languages class, this generic parser was implemented in Go to validate and process custom programming languages. The parser accepts three inputs: a token definition file, a grammar definition file, and a source code file. It validates the lexical and syntactic correctness of the source code based on the provided language definitions. Utilizing a stack-based recursive-descent parsing approach, the tool dynamically constructs a parse tree and performs a pre-order traversal for valid syntax. In case of errors, it provides detailed feedback for lexical, syntactic, or malformed input files. This project demonstrates advanced algorithm design, recursive data structures, and robust handling of context-free grammars, showcasing my ability to apply theoretical concepts to practical problems.",
    link: "#",
    image: "/img/gomascot.png",
  },
];

export default projects;

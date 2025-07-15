const output = document.getElementById("output");
const input = document.getElementById("commandInput");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    output.innerHTML += `\n> ${cmd}`;
    input.value = "";
    handleCommand(cmd.toLowerCase());
    output.scrollTop = output.scrollHeight;
  }
});

function handleCommand(cmd) {
  switch (cmd) {
    case "help":
      output.innerHTML += `
Available commands:
- resume : View my resume
- email : Contact me
- whoami : Identity reveal
- cls / clear : Clear terminal
`;
      break;

    case "resume":
      output.innerHTML += `\nOpening resume...\nResume Link: https://your-resume-link.com`;
      break;

    case "email":
      output.innerHTML += `\nEmail: nidhiiyer@example.com`;
      break;

    case "whoami":
      output.innerHTML += `
You are interacting with Nidhi Iyer's GitHub terminal.
A technologist exploring Rust, Python, C++, and meaningful tech.
`;
      break;

    case "cls":
    case "clear":
      output.innerHTML = "";
      break;

    default:
      output.innerHTML += `\nUnrecognized command: ${cmd}`;
  }
}

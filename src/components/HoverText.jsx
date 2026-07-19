export default function HoverText({ text }) {
  return (
    <>
      {text.split('').map((char, index) => (
        <span
          key={char + '-' + index}
          className="inline-block transition-colors duration-150 hover:text-[#00A889] cursor-default font-anton"
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </>
  );
}


export const Table = ({ tab }: { tab: string[][] }) => {
  return (
    <pre>
      {tab.reverse().map((line, index) => (
        <p key={index}>{line.join("")}</p>
      ))}
    </pre>
  );
};

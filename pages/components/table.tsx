export const Table = ({ tab }: { tab: string[][] }) => {
  const reverseTab = [...tab].reverse();
  return (
    <pre>
      {reverseTab.map((line, index) => (
        <p key={index}>{line.join("")}</p>
      ))}
    </pre>
  );
};

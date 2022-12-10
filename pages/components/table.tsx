export const Table = ({ tab }: { tab: string[][] }) => {
  const reverseTab = [...tab].reverse();
  return (
    <pre>
      {reverseTab.map((line, index) => (
        <p style={{ fontSize: 4 }} key={index}>
          {line.join("")}
        </p>
      ))}
    </pre>
  );
};

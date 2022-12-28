export const Table = ({ tab }: { tab: string[][] }) => {
  return (
    <pre>
      {tab.map((line, index) => (
        <p style={{ fontSize: 12 }} key={index}>
          {line.join("")}
        </p>
      ))}
    </pre>
  );
};

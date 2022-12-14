export const Table = ({ tab }: { tab: string[][] }) => {
  return (
    <pre>
      {tab.map((line, index) => (
        <p style={{ fontSize: 6 }} key={index}>
          {line.join("")}
        </p>
      ))}
    </pre>
  );
};

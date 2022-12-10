export const List = ({ list }: { list: string[] }) => {
  return (
    <pre>
      {list.map((line, index) => (
        <div key={index}>
          {line}
          <br />
        </div>
      ))}
    </pre>
  );
};

export default function DOMComponent({ name }: { name: string }) {
  return (
    <div style={{backgroundColor: 'red'}}>
      <h1>Hello, {name}</h1>
    </div>
  );
}

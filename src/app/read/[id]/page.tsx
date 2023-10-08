export default function Read(props: { params: { id: string } }) {
  return (
    <>
      <h2>Read</h2>
      {props.params.id}
    </>
  );
}

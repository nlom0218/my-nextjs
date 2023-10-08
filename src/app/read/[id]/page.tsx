export default async function Read(props: { params: { id: string } }) {
  const response = await fetch(
    `http://localhost:9999/topics/${props.params.id}`
  );
  const topic: { id: number; title: string; body: string } =
    await response.json();

  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}

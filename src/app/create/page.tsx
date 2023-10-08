'use client';

import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();

  return (
    <>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const target = event.target as typeof event.target & {
            title: { value: string };
            body: { value: string };
          };

          const title = target.title.value;
          const body = target.body.value;

          fetch('http://localhost:9999/topics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
          })
            .then((res) => res.json())
            .then((data: { id: number }) => {
              const lastId = data.id;

              router.push(`/read/${lastId}`);
            });
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <button type="submit">create</button>
        </p>
      </form>
    </>
  );
}

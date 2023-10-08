'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Update() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [title, setTitle] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9999/topics/${params.id}`)
      .then((res) => res.json())
      .then((data: { id: string; title: string; body: string }) => {
        setTitle(data.title);
        setBody(data.body);
      });
  }, [params.id]);

  return (
    <>
      <h2>update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          fetch(`http://localhost:9999/topics/${params.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
          })
            .then((res) => res.json())
            .then((data: { id: string }) => {
              const lastId = data.id;

              router.refresh();
              router.push(`/read/${lastId}`);
            });
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title || ''}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body || ''}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <button type="submit">update</button>
        </p>
      </form>
    </>
  );
}

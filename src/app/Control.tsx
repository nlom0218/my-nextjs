'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export function Control() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {params.id ? (
        <>
          <li>
            <Link href={`/update/${params.id}`}>Update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={() => {
                fetch(`http://localhost:9999/topics/${params.id}`, {
                  method: 'DELETE',
                })
                  .then((res) => res.json())
                  .then(() => {
                    router.refresh();
                    router.push('/');
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}

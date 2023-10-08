import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Control } from './Control';

export const metadata: Metadata = {
  title: 'My First NextJS',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch('http://localhost:9999/topics', {
    cache: 'no-store',
  });
  const topics: { id: number; title: string; body: string }[] =
    await response.json();

  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}

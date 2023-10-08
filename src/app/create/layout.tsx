import { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <form>
      <h2>Create</h2>
      {props.children}
    </form>
  );
}

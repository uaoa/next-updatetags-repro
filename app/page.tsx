import { revalidateBoth } from './actions';

export default function Page() {
  return (
    <form action={revalidateBoth}>
      <button type="submit">Revalidate a and b</button>
    </form>
  );
}

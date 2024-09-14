import FlightHistoryChecker from './flight-history/page';

export default function Home() {
  return (
    <section>
      <FlightHistoryChecker searchParams={{
        flightCode: undefined
      }} />
    </section>
  );
}

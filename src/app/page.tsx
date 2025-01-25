import { Metadata } from 'next';
import FlightHistoryChecker from './flight-history/page';

export const metadata: Metadata = {
  title: 'Flight Tracker',
  description: 'Track your flight data!',
};

export default function Home() {
  return (
    <section>
      <FlightHistoryChecker searchParams={{
        flightCode: undefined
      }} />
    </section>
  );
}

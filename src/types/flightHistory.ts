export interface FlightHistoryData {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    iata: string;
    delay: number;
    scheduled: string;
    actual: string;
    estimated: string;
    terminal: string;
    gate: string;
  };
  arrival: {
    airport: string;
    iata: string;
    delay: number;
    scheduled: string;
    actual: string;
    estimated: string;
    terminal: string;
    gate: string;
  };
  airline: {
    name: string;
  };
  flight: {
    iata: string;
  };
  aircraft: {
    iata: string;
  };
}

export interface AviationStackResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: FlightData[];
}

export interface FlightData {
  flight_date: string; // Date of the flight in YYYY-MM-DD format
  flight_status: string; // Status of the flight (e.g., "active", "landed")

  departure: {
    airport: string; // Name of the departure airport
    timezone: string; // Timezone of the departure airport
    iata: string; // IATA code of the departure airport
    icao: string; // ICAO code of the departure airport
    terminal: string; // Departure terminal
    gate: string; // Departure gate
    delay: number | null; // Delay in minutes, null if no delay
    scheduled: string; // Scheduled departure time (ISO 8601 format)
    estimated: string | null; // Estimated departure time (ISO 8601 format)
    actual: string | null; // Actual departure time (ISO 8601 format)
    estimated_runway: string | null; // Estimated time on the runway (ISO 8601 format)
    actual_runway: string | null; // Actual time on the runway (ISO 8601 format)
  };

  arrival: {
    airport: string; // Name of the arrival airport
    timezone: string; // Timezone of the arrival airport
    iata: string; // IATA code of the arrival airport
    icao: string; // ICAO code of the arrival airport
    terminal: string; // Arrival terminal
    gate: string; // Arrival gate
    baggage: string | null; // Baggage claim information
    delay: number | null; // Delay in minutes, null if no delay
    scheduled: string; // Scheduled arrival time (ISO 8601 format)
    estimated: string | null; // Estimated arrival time (ISO 8601 format)
    actual: string | null; // Actual arrival time (ISO 8601 format)
    estimated_runway: string | null; // Estimated time on the runway (ISO 8601 format)
    actual_runway: string | null; // Actual time on the runway (ISO 8601 format)
  };

  airline: {
    name: string; // Name of the airline
    iata: string; // IATA code of the airline
    icao: string; // ICAO code of the airline
  };

  flight: {
    number: string; // Flight number
    iata: string; // IATA flight number
    icao: string; // ICAO flight number
    codeshared?: {
      airline_name: string; // Name of the codesharing airline
      airline_iata: string; // IATA code of the codesharing airline
      airline_icao: string; // ICAO code of the codesharing airline
      flight_number: string; // Codeshared flight number
      flight_iata: string; // Codeshared IATA flight number
      flight_icao: string; // Codeshared ICAO flight number
    };
  };

  aircraft?: {
    registration: string; // Aircraft registration number
    iata: string; // IATA aircraft code
    icao: string; // ICAO aircraft code
    icao24: string; // 24-bit aircraft code
  };

  live?: {
    updated: string; // Last updated timestamp (ISO 8601 format)
    latitude: number; // Current latitude of the aircraft
    longitude: number; // Current longitude of the aircraft
    altitude: number; // Current altitude of the aircraft (in feet)
    direction: number; // Aircraft direction (in degrees)
    speed_horizontal: number; // Horizontal speed (in km/h)
    speed_vertical: number; // Vertical speed (in feet/min)
    is_ground: boolean; // Whether the aircraft is on the ground
  };
}

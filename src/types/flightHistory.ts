export interface FlightHistoryData {
  date: string;
  delay: number;
  status: 'Delayed' | 'On Time';
}

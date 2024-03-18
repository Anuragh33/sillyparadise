import { useQuery } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';

export function useRecentBooking() {
  const [searchparams] = useSearchParams();

  const numDays = !searchparams.get('last')
    ? 7
    : Number(searchparams.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    data: recentBookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  });

  return { isLoading, recentBookings };
}

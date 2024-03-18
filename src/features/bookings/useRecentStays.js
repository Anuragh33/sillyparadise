import { useQuery } from '@tanstack/react-query';
import { getStaysAfterDate } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';

export function useRecentStays() {
  const [searchparams] = useSearchParams();

  const numDays = !searchparams.get('last')
    ? 7
    : Number(searchparams.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    data: recentStays,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return { isLoading, recentStays, confirmedStays, numDays };
}

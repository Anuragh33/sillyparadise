import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

function useBooking() {
  const [searchParams] = useParams();

  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, error, bookings };
}

export default useBooking;

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';

function useBooking() {
  const [searchParams] = useSearchParams();

  //1. Filter   //////////////////////////////////////
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  //2. Sort  /////////////////////////////////////////

  const sortRaw = searchParams.get('SortBy') || 'startDate-desc';

  const [field, direction] = sortRaw.split('-');

  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, error, bookings };
}

export default useBooking;

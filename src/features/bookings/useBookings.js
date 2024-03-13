import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

function useBooking() {
  const queryClient = useQueryClient();
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

  // 3. Pagination ///////////////////////////////////

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //Pre-Fetch data to react query client
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page - 1,
        }),
    });

  return { isLoading, error, bookings, count };
}

export default useBooking;

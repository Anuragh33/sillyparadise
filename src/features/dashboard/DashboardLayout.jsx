import styled from 'styled-components';

import Spinner from '../../ui/Spinner';

import { useRecentBooking } from '../bookings/useRecentBooking';
import { useRecentStays } from '../bookings/useRecentStays';

import { useCabins } from '../cabins/useCabins';
import Stats from './Stats';
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, recentBookings } = useRecentBooking();

  const {
    recentStays,
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { cabins, isLoading: isLoadingcabins } = useCabins();

  if (isLoading || isLoadingStays || isLoadingcabins) return <Spinner />;

  //console.log(recentBookings);
  //console.log(recentStays);

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

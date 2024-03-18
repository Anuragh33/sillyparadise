import styled from 'styled-components';

import Spinner from '../../ui/Spinner';

import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

import { useRecentBooking } from '../bookings/useRecentBooking';
import { useRecentStays } from '../bookings/useRecentStays';
import { useCabins } from '../cabins/useCabins';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, recentBookings } = useRecentBooking();

  const {
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
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart recentBookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

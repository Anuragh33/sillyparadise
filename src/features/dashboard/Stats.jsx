import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

function Stats({ recentBookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = recentBookings.length;

  const sales = recentBookings.reduce((acc, item) => acc + item.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Bookings'
        value={numBookings}
        x
        color='blue'
        icon={<HiOutlineBriefcase />}
      />

      <Stat
        title='Sales'
        value={formatCurrency(sales)}
        color='green'
        icon={<HiOutlineBanknotes />}
      />

      <Stat
        title='Check-Ins'
        value={checkins}
        color='indigo'
        icon={<HiOutlineCalendarDays />}
      />

      <Stat
        title='Occupancy Rate'
        value={Math.round(occupancyRate * 100) + '%'}
        color='yellow'
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;

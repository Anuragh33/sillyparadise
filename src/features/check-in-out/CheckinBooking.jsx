import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { isPast } from 'date-fns';
import { useChecking } from './useChecking';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);

  const moveBack = useMoveBack();

  const { isLoading, booking } = useBooking();

  const { checkin, isCheckingIn } = useChecking();

  useEffect(() => {
    setConfirmPayment(booking?.isPaid || false);
  }, [booking]);

  if (isLoading) return <Spinner />;

  console.log(booking);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPayment) return;
    checkin(bookingId);
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          disabled={confirmPayment || isCheckingIn}
          checked={confirmPayment}
          onChange={() => setConfirmPayment((confirm) => !confirm)}
          id={'confirm'}
        >
          {!confirmPayment
            ? `I confirm that ${guests.fullName} paid total of
          ${formatCurrency(totalPrice)}for their ${numNights}
          nights stay.`
            : ` ${guests.fullName} has already paid 
           ${formatCurrency(totalPrice)} for their ${numNights}
          nights stay.`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!confirmPayment || isCheckingIn}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

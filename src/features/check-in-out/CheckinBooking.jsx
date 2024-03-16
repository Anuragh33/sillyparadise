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
import { useChecking } from './useCheckIn';
import { useUpdateSettings } from '../settings/useUpdateSettings';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);

  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();

  const { isLoading, booking } = useBooking();

  const { checkin, isCheckingIn } = useChecking();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPayment(booking?.isPaid || false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  const checkInPrice = addBreakfast
    ? optionalBreakfastPrice + totalPrice
    : totalPrice;

  const dividend = addBreakfast
    ? ` (${formatCurrency(totalPrice)} + ${formatCurrency(
        optionalBreakfastPrice
      )} )`
    : '';

  function handleBreakfast() {
    setAddBreakfast((add) => !add);
    setConfirmPayment(false);
  }

  function handleCheckin() {
    if (!confirmPayment) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={handleBreakfast}
            id='breakfast'
          >
            Is {guests.fullName} wants to opt-in breakfast for{' '}
            {formatCurrency(optionalBreakfastPrice)} ??
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          disabled={confirmPayment || isCheckingIn}
          checked={confirmPayment}
          onChange={() => setConfirmPayment((confirm) => !confirm)}
          id={'confirm'}
        >
          {!confirmPayment
            ? `I confirm that ${guests.fullName} paid total of
          ${formatCurrency(checkInPrice)} ${dividend} for their ${numNights}
          nights stay.`
            : ` ${guests.fullName} has already paid 
           ${formatCurrency(checkInPrice)} ${dividend} for their ${numNights}
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

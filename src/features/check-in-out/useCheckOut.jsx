import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateBooking } from '../../services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully Checked-out.`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error('There was an error while checking Out!!');
    },
  });

  return { checkout, isCheckingOut };
}
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully CheckedOut.`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: (data) => {
      toast.error('There was an error while checking Out!!');
    },
  });

  return { checkout, isCheckingOut };
}

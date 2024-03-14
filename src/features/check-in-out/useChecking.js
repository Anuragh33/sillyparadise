import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully CheckedIn.`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: (data) => {
      toast.error('There was an error while checking in!!');
    },
  });

  return { checkin, isCheckingIn };
}
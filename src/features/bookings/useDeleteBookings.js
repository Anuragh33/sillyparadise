import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useDeleteBookings({ bookingId }) {
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const { mutate: deletebooking, isLoading: isDeleting } = useMutation({
    mutationKey: ['bookings'],
    mutationFn: (bookingId) => {
      deleteBooking(bookingId);
    },
    onSuccess: () => {
      toast.success('Booking deleted successfuly');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      navigation('/bookings');
    },

    onError: () => {
      toast.error('Booking cannot be deleted.');
    },
  });

  return { deleteBooking, isDeleting };
}

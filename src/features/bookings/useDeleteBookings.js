import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';

export function useDeleteBookings() {
  const queryClient = useQueryClient();
  const { mutate: deletebooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingAPI,

    onSuccess: () => {
      toast.success('Booking deleted successfuly');

      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deletebooking, isDeleting };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: CreateEditCabin,
    onSuccess: () => {
      toast.success('New cabin added successfully!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateEditCabin } from '../../services/apiCabins';

import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success('User updated successfully!');

      queryClient.setQueryData(['user'], user);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}

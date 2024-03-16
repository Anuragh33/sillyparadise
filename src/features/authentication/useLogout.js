import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Logout as LogoutAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: LogoutAPI,

    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('Logged out successfuly.');
      navigate('/login', { replace: true });
    },

    onError: () => {
      toast.error('Unable to logout right now.');
    },
  });

  return { logout, isLoading };
}

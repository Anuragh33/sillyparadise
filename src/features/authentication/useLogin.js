import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Login as LoginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginAPI({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueriesData(['user'], user.user);
      navigate('/dashboard');
    },

    onError: () => {
      toast.error('Provided credentials are incorect.');
    },
  });

  return { login, isLoading };
}

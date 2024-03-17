import { useMutation } from '@tanstack/react-query';
import { signUp as signUpAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpAPI,

    onSuccess: (user) => {
      toast.success(
        ' Account created successfully. Please verify the email address.'
      );
    },
  });

  return { signup, isSigningUp };
}

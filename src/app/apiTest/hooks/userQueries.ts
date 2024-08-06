import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { createUser, deleteUser, emailValidation, getUserIdByEmail, loginValidation } from '@/app/apiTest/calls/userCalls';

export const useCreateUser = (): UseMutationResult<string, Error, { email: string; password: string; nickname: string }> =>
  useMutation({
    mutationFn: ({ email, password, nickname }) => createUser(email, password, nickname),
  });

export const useGetUserId = (email: string): UseQueryResult<string, Error> =>
  useQuery({
    queryKey: ['userId', email],
    queryFn: () => getUserIdByEmail(email),
    enabled: !!email,
  });
export const useEmailValidation = (email: string): UseQueryResult<boolean, Error> =>
  useQuery({
    queryKey: ['emailValidation', email],
    queryFn: () => emailValidation(email),
    enabled: !!email,
  });

export const useLoginValidation = (email: string, password: string): UseQueryResult<boolean, Error> =>
  useQuery({
    queryKey: ['loginValidation', email, password],
    queryFn: () => loginValidation(email, password),
    enabled: !!email && !!password,
  });

export const useDeleteUser = (): UseMutationResult<string, Error, string> =>
  useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
  });

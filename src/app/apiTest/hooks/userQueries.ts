import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { emailValidation, getUserIdByEmail, loginValidation } from '@/app/apiTest/calls/userCalls';

export const useUserId = (email: string): UseQueryResult<string, Error> =>
  useQuery({
    queryKey: ['userId', email],
    queryFn: () => getUserIdByEmail(email),
  });
export const useEmailValidation = (email: string): UseQueryResult<boolean, Error> =>
  useQuery({
    queryKey: ['emailValidation', email],
    queryFn: () => emailValidation(email),
  });

export const useLoginValidation = (email: string, password: string): UseQueryResult<boolean, Error> =>
  useQuery({
    queryKey: ['loginValidation', email, password],
    queryFn: () => loginValidation(email, password),
  });

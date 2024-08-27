import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  createUser,
  deleteUser,
  checkEmailDuplicated,
  getUserIdByEmail,
  login,
  UpdateUserNickname,
} from '@/api/queryFn/userQueryFn';
// import { useSession } from 'next-auth/react';

interface User {
  userId: number;
  email: string;
  nickname: string;
}

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

export const useCheckEmailDuplicated = (email: string): UseQueryResult<boolean, Error> =>
  useQuery({
    queryKey: ['checkEmailDuplicated', email],
    queryFn: () => checkEmailDuplicated(email),
    enabled: !!email,
  });

export const useLogin = (email: string, password: string): UseQueryResult<User, Error> =>
  useQuery({
    queryKey: ['login', email, password],
    queryFn: () => login(email, password),
    enabled: !!email && !!password,
  });

export const useDeleteUser = (): UseMutationResult<string, Error, number> =>
  useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
  });

interface UpdateUserNicknameParams {
  nickname: string;
}

export const useUpdateUserNickname = (): UseMutationResult<
  UpdateUserNicknameParams,
  Error,
  { userId: number; nickname: string }
  //
> => {
  // const { data: session, update } = useSession();

  return useMutation({
    mutationFn: ({ userId, nickname }) => UpdateUserNickname(userId, { nickname }),
    onSuccess: (data) => {
      console.log('Nickname updated:', data.nickname);
      // update({ ...session, user: { ...session?.user, name: data.nickname } });

      // update({
      //   ...session,
      //   user: {
      //     ...session?.user,
      //     name: data.nickname,
      //   },
      // });

      // if (update) {
      //   update({
      //     ...session,
      //     user: {
      //       ...session?.user,
      //       name: data.nickname,
      //     },
      //   });
      // }
    },
  });
};

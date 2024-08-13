'use client';

import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import { useRouter } from 'next/navigation';
import { emailValidation } from '@/api/queryFn/userQueryFn';
import { EMAIL_REG_EXP, NICKNAME_REG_EXP } from '@/constants/regExp'; // 이메일 정규식 상수
import { useCreateUser } from '@/api/hooks/userHooks';
import * as S from './Signup.styled';

function SignupSection() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isEmailDisabled, setIsEmailDisabled] = useState<boolean | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createUser } = useCreateUser();

  const router = useRouter();

  const handleEmailValidation = () => {
    const email = emailInputRef.current?.value || '';
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      return false;
    }
    if (!EMAIL_REG_EXP.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleConfirmPasswordValidation = () => {
    const password = passwordInputRef.current?.value || '';
    const confirmPassword = confirmPasswordInputRef.current?.value || '';
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setConfirmPasswordError(null);
    return true;
  };

  const handlePasswordValidation = () => {
    const password = passwordInputRef.current?.value || '';
    if (password.length < 8 || password.length > 15) {
      setPasswordError('비밀번호는 8자 이상 15자 이하여야 합니다');

      return false;
    }
    setPasswordError(null);
    handleConfirmPasswordValidation(); // 비밀번호 확인 검증 호출

    return true;
  };

  const handleNicknameValidation = () => {
    const nickname = nicknameInputRef.current?.value || '';
    if (!nickname) {
      setNicknameError('닉네임을 입력해주세요');
      return false;
    }
    if (!NICKNAME_REG_EXP.test(nickname)) {
      setNicknameError('닉네임은 1~20자의 한글, 알파벳, 숫자만 사용 가능합니다.');
      return false;
    }
    setNicknameError(null);
    return true;
  };

  const checkEmailDuplication = async () => {
    if (!emailError) {
      const email = emailInputRef.current?.value || '';
      try {
        const isEmailAvailable = await emailValidation(email);
        if (isEmailAvailable) {
          setIsEmailDisabled(true);
          return true;
        }
        setIsEmailDisabled(false);
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      alert('잘못된 이메일 형식입니다. ');
      return false;
    }
  };

  const getEmailValidationMessage = () => {
    if (isEmailDisabled === null) return <S.SignupValidationSpan>email 중복 여부를 확인해주세요</S.SignupValidationSpan>;
    if (isEmailDisabled) return <S.SignupValidationSpan>사용 가능한 이메일입니다.</S.SignupValidationSpan>;
    return <S.SignupValidationSpan $color="red">이미 가입된 이메일 입니다.</S.SignupValidationSpan>;
  };

  const handleDuplicateValidation = () => {
    if (isEmailDisabled) {
      return true;
    }
    return false;
  };

  const registerUserHandler = () => {
    const isEmailValid = handleEmailValidation();
    const isPasswordValid = handlePasswordValidation();
    const isNicknameValid = handleNicknameValidation();
    const isConfirmPasswordValid = handleConfirmPasswordValidation();
    const isDuplicationValid = handleDuplicateValidation();

    if (isEmailValid && isPasswordValid && isNicknameValid && isConfirmPasswordValid && isDuplicationValid) {
      const email = emailInputRef.current?.value || '';
      const password = passwordInputRef.current?.value || '';
      const nickname = nicknameInputRef.current?.value || '';

      try {
        createUser(
          {
            email,
            password,
            nickname,
          },
          {
            onSuccess: () => {
              alert(`환영합니다, ${nickname}님!`);
              router.push('/login');
            },
            onError: () => {
              alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
            },
          },
        );
      } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <S.SignupSection>
      <S.SignupLogo src={logo.src} alt="logo" />

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="email"
          variant="standard"
          type="email"
          inputRef={emailInputRef}
          error={!!emailError}
          helperText={emailError}
          onBlur={handleEmailValidation}
          disabled={isEmailDisabled === true}
        />
        <S.SignupValidationDiv $align="center" $justify="space-between">
          {getEmailValidationMessage()}
          {isEmailDisabled !== true && (
            <Button size="small" onClick={checkEmailDuplication}>
              중복검사
            </Button>
          )}
        </S.SignupValidationDiv>
      </S.SignupInputDiv>

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호"
          variant="standard"
          type="password"
          inputRef={passwordInputRef}
          error={!!passwordError}
          helperText={passwordError}
          onBlur={handlePasswordValidation}
        />
      </S.SignupInputDiv>

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호 확인"
          variant="standard"
          type="password"
          inputRef={confirmPasswordInputRef}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          onBlur={handleConfirmPasswordValidation}
        />
      </S.SignupInputDiv>

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="닉네임"
          variant="standard"
          type="text"
          inputRef={nicknameInputRef}
          error={!!nicknameError}
          helperText={nicknameError}
          onBlur={handleNicknameValidation}
        />
      </S.SignupInputDiv>

      <Button variant="outlined" onClick={registerUserHandler}>
        회원가입
      </Button>
    </S.SignupSection>
  );
}

export default SignupSection;

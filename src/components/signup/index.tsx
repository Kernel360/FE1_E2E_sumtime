'use client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import * as S from './Signup.styled';

function SignupSection() {
  // const [validation, setValidation] = useState(true);

  return (
    <S.SignupSection>
      <S.SignupLogo src={logo.src} alt="logo" />

      <S.SignupInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="email"
          // helperText={validation ? '' : '올바른 형식의 이메일을 입력해주세요'}
          variant="standard"
          type="email"
        />
      </S.SignupInputDiv>
      <S.SignupInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호"
          // helperText={validation ? '' : '올바른 형식의 비밀번호를 입력해주세요'}
          variant="standard"
          type="password"
        />
      </S.SignupInputDiv>
      <S.SignupInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호 확인"
          // helperText={validation ? '' : '비밀번호가 일치하지 않습니다'}
          variant="standard"
          type="password"
        />
      </S.SignupInputDiv>
      <S.SignupInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="닉네임"
          // helperText={validation ? '' : '0자 이내만 입력 가능합니다'}
          variant="standard"
          type="text"
        />
      </S.SignupInputDiv>

      <Button variant="outlined">회원가입</Button>
    </S.SignupSection>
  );
}

export default SignupSection;

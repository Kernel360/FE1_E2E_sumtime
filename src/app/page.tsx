'use client';

import Link from 'next/link';
import Button from '@mui/material/Button';
import logo from '@/assets/images/sumtimeLogo.png';
import { Flex } from '@/components/common';
import SignInButton from '@/components/SignIn/SignInButton';
import * as S from './HomePage.styled';

export default function Home() {
  return (
    <S.HomePage>
      <Flex $direction="column" $gap="30px" $justify="center" $align="center">
        <S.HomeLogo src={logo.src} alt="logo" />
        <div>
          <p>당신의 하루를 더하세요</p>
        </div>
        <Flex>
          <SignInButton />
          <Link href="/signup">
            <Button variant="text">회원가입하기</Button>
          </Link>
        </Flex>
      </Flex>
    </S.HomePage>
  );
}

// 'use client';

// import Timetable from '@/timetable/components/Timetable';
// import { startTime, endTime, slotTime, taskList, height } from '@/timetable/mocks/timetableMockData';

// export default function Home() {
//   return (
//     <Timetable
//       startTime={startTime}
//       endTime={endTime}
//       slotTime={slotTime}
//       taskList={taskList}
//       height={height}
//       displayCurrentTime={false}
//       timetableType="COLUMN"
//     />
//   );
// }

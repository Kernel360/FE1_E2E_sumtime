import { describe, expect, test } from '@jest/globals';
import { parseHeightFormat, parseHeightValue } from '.';
import { formatList } from '../constants';

describe('Timetable의 height 값 나누기', () => {
  describe('height 값에서 format 가져오기', () => {
    const height = 1000;

    formatList.forEach((format) => {
      test(`height으로 ${height}${format} 이 주어졌을 때 ${format}을 분리할 수 있다.`, () => {
        // given
        const heightString = `${height}${format}`;

        // when
        const result = parseHeightFormat(heightString);

        // then
        expect(result).toEqual(format);
      });
    });
  });

  describe('height 값에서 value 가져오기', () => {
    const heightValueList = [100, 95, 0.5, 48.33333, 3];

    heightValueList.forEach((heightValue) => {
      formatList.forEach((format) => {
        const height = `${heightValue}${format}`;
        test(`height으로 ${height}이 주어졌을 때 값 ${heightValue}을 분리할 수 있다.`, () => {
          // when
          const result = parseHeightValue(height);
          // then
          expect(result).toEqual(heightValue);
        });
      });
    });
  });
});

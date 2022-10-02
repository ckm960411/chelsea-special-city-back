import { ApiProperty } from '@nestjs/swagger';

export class SuccessResult<T> {
  @ApiProperty({
    description: '성공',
    example: 'success',
  })
  success: boolean;

  @ApiProperty({
    description: '성공 시 응답 데이터',
  })
  data: T;
}

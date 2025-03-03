import { describe, expect, test } from '@jest/globals';
import payloadUtil from '../../../utils/payload.util';

describe('dataFormated function', () => {
  test('Mengubah format response dengan benar', () => {
    const mockResponse = [
      {
        date: '2025-02-01',
        total_duration: 480,
        data: [
          {
            id: 1,
            task_id: 'T1001',
            task_title: 'Develop Feature A',
            start_time: '09:00',
            end_time: '12:00',
            activity_duration: 180,
            activity: 'Coding',
          },
          {
            id: 2,
            task_id: 'T1002',
            task_title: 'Meeting',
            start_time: '13:00',
            end_time: '15:00',
            activity_duration: 120,
            activity: 'Discussion',
          },
        ],
      },
    ];

    const expectedOutput = [
      {
        date: '2025-02-01',
        total_duration: 480,
        data: [
          {
            id: 1,
            task_id: 'T1001',
            task_title: 'Develop Feature A',
            start_time: '09:00',
            end_time: '12:00',
            duration: 180,
            activity: 'Coding',
          },
          {
            id: 2,
            task_id: 'T1002',
            task_title: 'Meeting',
            start_time: '13:00',
            end_time: '15:00',
            duration: 120,
            activity: 'Discussion',
          },
        ],
      },
    ];

    expect(payloadUtil.dataFormated(mockResponse as any)).toEqual(
      expectedOutput
    );
  });

  test('Mengembalikan array kosong jika input kosong', () => {
    expect(payloadUtil.dataFormated([])).toEqual([]);
  });

  test("Menangani kasus tanpa 'data' di dalam response", () => {
    const mockResponse = [
      {
        date: '2025-02-02',
        total_duration: 0,
        data: [],
      },
    ];

    const expectedOutput = [
      {
        date: '2025-02-02',
        total_duration: 0,
        data: [],
      },
    ];

    expect(payloadUtil.dataFormated(mockResponse)).toEqual(expectedOutput);
  });
});

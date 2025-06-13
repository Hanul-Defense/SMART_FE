import { instance } from './instance';

import dayjs from 'dayjs';

const TrainingService = {
  postPushupResult: async ({
    count,
    summary,
    evaluation_type,
    evaluation_date,
  }) => {
    try {
      return await instance.post('/api/v1/pushups', {
        record: count,
        summary,
        evaluation_type,
        evaluation_date,
      });
    } catch (error) {
      const res = error?.response;

      if (res?.data?.code === 40004) {
        return await instance.patch('/api/v1/pushups', {
          record: count,
          summary,
          evaluation_type,
          evaluation_date,
        });
      } else {
        throw error;
      }
    }
  },

  postSitupResult: async ({
    count,
    summary,
    evaluation_type,
    evaluation_date,
  }) => {
    try {
      return await instance.post('/api/v1/situps', {
        record: count,
        summary,
        evaluation_type,
        evaluation_date,
      });
    } catch (error) {
      const res = error?.response;

      if (res?.data?.code === 40004) {
        return await instance.patch('/api/v1/situps', {
          record: count,
          summary,
          evaluation_type,
          evaluation_date,
        });
      } else {
        throw error;
      }
    }
  },

  postRunningResult: async ({
    count,
    summary,
    evaluation_type,
    evaluation_date,
  }) => {
    try {
      return await instance.post('/api/v1/runnings', {
        record: count,
        summary,
        evaluation_type,
        evaluation_date,
      });
    } catch (error) {
      const res = error?.response;

      if (res?.data?.code === 40004) {
        return await instance.patch('/api/v1/runnings', {
          record: count,
          summary,
          evaluation_type,
          evaluation_date,
        });
      } else {
        throw error;
      }
    }
  },

  getFeedback: async (page = 1, size = 10) => {
    const [pushupRes, situpRes, runningRes] = await Promise.all([
      instance.get('/api/v1/pushups'),
      instance.get('/api/v1/situps'),
      instance.get('/api/v1/runnings'),
    ]);

    const pushupData = pushupRes.data.data;
    const situpData = situpRes.data.data;
    const runningData = runningRes.data.data;

    const mockData = [
      {
        date: '2025.05.12',
        shooting: 19,
      },
      {
        date: '2025.05.10',
        shooting: 17,
      },
      {
        date: '2025.05.09',
        shooting: 15,
      },
      {
        date: '2025.05.08',
        shooting: 18,
      },
      {
        date: '2025.05.07',
        shooting: 16,
      },
      {
        date: '2025.05.06',
        shooting: 12,
      },
      {
        date: '2025.05.05',
        shooting: 14,
      },
      {
        date: '2025.05.04',
        shooting: 19,
      },
      {
        date: '2025.05.03',
        shooting: 20,
      },
      {
        date: '2025.05.02',
        shooting: 18,
      },
      {
        date: '2025.05.01',
        shooting: 15,
      },
    ];

    const situpMap = {};
    situpData.forEach((item) => {
      const date = dayjs(item.evaluation_date).format('YYYY.MM.DD');
      situpMap[date] = item;
    });

    const runningMap = {};
    runningData.forEach((item) => {
      const date = dayjs(item.evaluation_date).format('YYYY.MM.DD');
      runningMap[date] = item;
    });

    const fullData = pushupData
      .map((item) => {
        if (!item) return null;
        const date = dayjs(item.evaluation_date).format('YYYY.MM.DD');
        const mock = mockData.find((d) => d.date === date) || {};
        const situp = situpMap[date];
        const running = runningMap[date];

        const pushupSummary = `[팔굽혀펴기] ${item.summary}`;
        const situpSummary = situp ? `\n[윗몸일으키기] ${situp.summary}` : '';
        const runningSummary = running
          ? `\n[3KM 뜀걸음] ${running.summary}`
          : '';

        return {
          date,
          comment: pushupSummary + situpSummary + runningSummary,
          pushup: item.record,
          situp: situp ? situp.record : null,
          running: running ? running.record : null,
          shooting: mock.shooting ?? null,
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const start = (page - 1) * size;
    const end = start + size;
    console.log(fullData);
    return fullData.slice(start, end);
  },

  getPushupHistory: async () => {
    const res = await instance.get('/api/v1/pushups');
    const data = res.data.data;

    const grouped = {};

    data.forEach((item) => {
      const date = dayjs(item.evaluation_date);
      const year = date.year();
      const month = date.month() + 1;
      const key = `${year}-${month}`;

      if (!grouped[key]) {
        grouped[key] = {
          year,
          month,
          value: null,
          mockValue: null,
        };
      }

      if (item.evaluation_type === 'TRAINING') {
        grouped[key].mockValue = item.record;
      } else if (item.evaluation_type === 'TEST') {
        grouped[key].value = item.record;
      }
    });

    console.log(grouped);

    return Object.values(grouped).sort(
      (a, b) => a.year - b.year || a.month - b.month
    );
  },

  getSitupHistory: async () => {
    const res = await instance.get('/api/v1/situps');
    const data = res.data.data;

    const grouped = {};

    data.forEach((item) => {
      const date = dayjs(item.evaluation_date);
      const year = date.year();
      const month = date.month() + 1;
      const key = `${year}-${month}`;

      if (!grouped[key]) {
        grouped[key] = {
          year,
          month,
          value: null,
          mockValue: null,
        };
      }

      if (item.evaluation_type === 'TRAINING') {
        grouped[key].mockValue = item.record;
      } else if (item.evaluation_type === 'TEST') {
        grouped[key].value = item.record;
      }
    });

    return Object.values(grouped).sort(
      (a, b) => a.year - b.year || a.month - b.month
    );
  },

  getRunningHistory: async () => {
    const res = await instance.get('/api/v1/runnings');
    const data = res.data.data;

    console.log('체크체크 runningData:\n' + JSON.stringify(data, null, 2));

    const grouped = {};

    data.forEach((item) => {
      const date = dayjs(item.evaluation_date);
      const year = date.year();
      const month = date.month() + 1;
      const key = `${year}-${month}`;

      const minutes = item.record / 60;
      const decimalMinutes = parseFloat(minutes.toFixed(2));

      if (!grouped[key]) {
        grouped[key] = {
          year,
          month,
          value: null,
          mockValue: null,
        };
      }

      if (item.evaluation_type === 'TRAINING') {
        grouped[key].mockValue = decimalMinutes;
      } else if (item.evaluation_type === 'TEST') {
        grouped[key].value = decimalMinutes;
      }
    });

    return Object.values(grouped).sort(
      (a, b) => a.year - b.year || a.month - b.month
    );
  },

  getShootingHistory: async () => {
    return [
      { year: 2025, month: 1, value: 18 }, // 특급
      { year: 2025, month: 2, value: 16 }, // 1급
      { year: 2025, month: 3, value: 14 }, // 2급
      { year: 2025, month: 4, value: 10 }, // 불합격
      { year: 2025, month: 5, value: 12 }, // 3급
    ];
  },
};

export default TrainingService;

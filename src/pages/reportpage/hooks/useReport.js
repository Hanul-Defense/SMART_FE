import { useEffect, useState } from 'react';

import { REPORT_CONSTANTS } from '../constants/ReportConstants';
import TrainingService from '@services/TrainingService';

export const useReport = () => {
  const [report, setReport] = useState({
    totalGrade: '기록 없음',
    totalImage: null,
    pushup: { value: null, grade: '기록 없음', image: null },
    situp: { value: null, grade: '기록 없음', image: null },
    running: { value: null, grade: '기록 없음', image: null },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [pushup, situp, running] = await Promise.all([
        TrainingService.getPushupHistory(),
        TrainingService.getSitupHistory(),
        TrainingService.getRunningHistory(),
      ]);

      const latestPushup = pushup[pushup.length - 1];
      const latestSitup = situp[situp.length - 1];
      const latestRunning = running[running.length - 1];

      const pushupValue = latestPushup?.mockValue ?? null;
      const situpValue = latestSitup?.mockValue ?? null;
      const runningValue = latestRunning?.mockValue ?? null;

      const pushupGrade =
        pushupValue !== null ? gradeForPushup(pushupValue) : '없음';
      const situpGrade =
        situpValue !== null ? gradeForSitup(situpValue) : '없음';
      const runningGrade =
        runningValue !== null ? gradeForRunning(runningValue) : '없음';

      const totalGrade = getTotalGrade(pushupGrade, situpGrade, runningGrade);

      setReport({
        totalGrade,
        totalImage: gradeToImage[totalGrade] ?? null,
        pushup: {
          value: pushupValue ?? '기록 없음',
          grade: pushupGrade,
          image: gradeToImage[pushupGrade] ?? null,
        },
        situp: {
          value: situpValue ?? '기록 없음',
          grade: situpGrade,
          image: gradeToImage[situpGrade] ?? null,
        },
        running: {
          value: formatDecimalToTime(runningValue) ?? '기록 없음',
          grade: runningGrade,
          image: gradeToImage[runningGrade] ?? null,
        },
      });
    };
    console.log(report);
    fetchData();
  }, []);
  return report;
};

const formatDecimalToTime = (decimal) => {
  const min = Math.floor(decimal);
  const sec = Math.round((decimal - min) * 60);
  return `${min}분 ${sec < 10 ? '0' + sec : sec}초`;
};

const gradeToImage = {
  특급: REPORT_CONSTANTS.Images.memalstar,
  '1급': REPORT_CONSTANTS.Images.medal1,
  '2급': REPORT_CONSTANTS.Images.medal2,
  '3급': REPORT_CONSTANTS.Images.medal3,
  불합격: REPORT_CONSTANTS.Images.medalboss,
  없음: null,
};

const gradeForPushup = (count) => {
  if (count >= 72) return '특급';
  if (count >= 64) return '1급';
  if (count >= 56) return '2급';
  if (count >= 48) return '3급';
  return '불합격';
};

const gradeForSitup = (count) => {
  if (count >= 86) return '특급';
  if (count >= 78) return '1급';
  if (count >= 70) return '2급';
  if (count >= 62) return '3급';
  return '불합격';
};

const gradeForRunning = (count) => {
  if (count <= 12.5) return '특급';
  if (count <= 13.53) return '1급';
  if (count <= 14.57) return '2급';
  if (count <= 15.6) return '3급';
  return '불합격';
};

const getTotalGrade = (pushupGrade, situpGrade, runningGrade) => {
  const isMissing = [pushupGrade, situpGrade, runningGrade].includes('없음');
  const isFail = [pushupGrade, situpGrade, runningGrade].includes('불합격');

  if (isMissing) return '없음';
  if (isFail) return '불합격';

  const gradePointMap = {
    특급: 5,
    '1급': 4,
    '2급': 3,
    '3급': 2,
    불합격: 0,
  };

  const runningGradePointMap = {
    특급: 10,
    '1급': 8,
    '2급': 6,
    '3급': 4,
    불합격: 0,
  };

  const total =
    gradePointMap[pushupGrade] +
    gradePointMap[situpGrade] +
    runningGradePointMap[runningGrade];

  if (total >= 20) return '특급';
  if (total >= 16) return '1급';
  if (total >= 14) return '2급';
  if (total >= 12) return '3급';
  return '불합격';
};

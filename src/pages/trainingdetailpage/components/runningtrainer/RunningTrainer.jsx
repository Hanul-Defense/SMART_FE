import * as S from './RunningTrainer.styled';

import TrainingService from '@services/TrainingService';

import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from '@constants/routeConstants';
import useTrainingStore from '@stores/trainingStore';
import dayjs from 'dayjs';

const getFeedbackMessage = (seconds) => {
  if (seconds <= 780) return '✅ 특급 체력입니다! 훌륭해요.';
  if (seconds <= 840) return '👍 1급 체력이에요. 꾸준히 유지하세요.';
  if (seconds <= 900) return '⚠️ 평균 수준이에요. 조금 더 훈련해요.';
  if (seconds <= 960) return '❗ 체력 향상이 필요해요.';
  return '🚨 기준 미달입니다. 더 많은 훈련이 필요해요.';
};

const RunningTrainer = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { addFeedback, setCount } = useTrainingStore();
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const handleShowExitModal = () => setShowExitModal(true);
  const handleCloseExitModal = () => setShowExitModal(false);

  const handleTimerButtonClick = () => {
    if (!started) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const startTimer = () => {
    setStarted(true);
    const start = Date.now();
    timerRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setStarted(false);

    const feedbackText = getFeedbackMessage(time);
    addFeedback(feedbackText);
    setCount(time);
  };

  const formatTimeToString = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}분 ${seconds}초`;
  };

  const handleConfirmExit = async () => {
    const evaluationType = mode === 'training' ? 'TRAINING' : 'TEST';
    const evaluationDate = dayjs().toISOString();
    const summary = `${formatTimeToString(time)} 달리기`;

    try {
      await TrainingService.postRunningResult({
        count: time,
        summary,
        evaluation_type: evaluationType,
        evaluation_date: evaluationDate,
      });
      console.log('✅ 러닝 결과 전송 성공');
    } catch (err) {
      console.error('❌ 러닝 결과 전송 실패:', err);
    }

    setShowExitModal(false);
    navigate(ROUTE_PATHS.TRAINING_FINISH, { state: { from: 'run' } });
  };

  return (
    <S.Wrapper>
      <S.HeaderBox>
        <S.BackImage
          src="/icons/arrow.svg"
          onClick={() => navigate(ROUTE_PATHS.TRAINING)}
        />
        <S.HeaderTitle>3KM 뛸걸음</S.HeaderTitle>
        <S.HeaderSemiTitle onClick={handleShowExitModal}>
          종료
        </S.HeaderSemiTitle>
      </S.HeaderBox>
      <S.Container>
        <S.FeedbackBox>
          <S.Image src="/images/train2.svg" />
          <S.Title>3KM 뛸걸음</S.Title>
          <S.SubTitle>
            {started
              ? '훈련을 시작했어요.'
              : '3KM 뛸걸음를 측정하기 위한 훈련이에요.'}
          </S.SubTitle>
          <S.Line />
          <S.ImageList>
            <S.Images src="/images/rmedal1.svg" />
            <S.Images src="/images/rmedal2.svg" />
            <S.Images src="/images/rmedal3.svg" />
            <S.Images src="/images/rmedal4.svg" />
          </S.ImageList>
        </S.FeedbackBox>

        <S.Text>SMART한 시간 측정</S.Text>

        <S.StatusText>
          {!started ? `측정 완료: ${time}초` : `${time}초`}
        </S.StatusText>

        <S.StartButton onClick={handleTimerButtonClick}>
          {started ? '측정 종료' : '훈련을 시작할게요.'}
        </S.StartButton>
      </S.Container>

      {showExitModal && (
        <S.ModalBackdrop>
          <S.ModalBox>
            <S.ModalText>정말 훈련을 종료하시겠습니까?</S.ModalText>
            <S.ModalButtons>
              <S.ModalButton onClick={handleCloseExitModal}>
                아니요
              </S.ModalButton>
              <S.ModalButton onClick={handleConfirmExit}>예</S.ModalButton>
            </S.ModalButtons>
          </S.ModalBox>
        </S.ModalBackdrop>
      )}
    </S.Wrapper>
  );
};

export default RunningTrainer;

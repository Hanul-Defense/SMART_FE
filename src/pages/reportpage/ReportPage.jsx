import * as S from './ReportPage.styled';

import { useReport } from './hooks/useReport';

import { Footer } from '@components/footer/Footer';

export const ReportPage = () => {
  const { totalGrade, totalImage, pushup, situp, running } = useReport();
  return (
    <S.Wrapper>
      <S.Contatiner>
        <S.HeaderBox>
          <S.Title>나의 SMART한 훈련 리포트</S.Title>
        </S.HeaderBox>
        <S.Line />

        <S.RankBox>
          <S.IMAGESSETS>
            <S.IMAGESS src="/images/Mimage.svg" />
            <S.IMAGESS src="/images/Simage.svg" />
          </S.IMAGESSETS>
          <S.ColSBet>
            <S.RankBoxTitle>총 등급</S.RankBoxTitle>
            <S.IconSet>
              {totalImage && <S.RankImage src={totalImage} />}
              <S.RankName>{totalGrade}</S.RankName>
            </S.IconSet>
          </S.ColSBet>
        </S.RankBox>

        <S.RankContainer>
          <S.RankConBox>
            <S.ColSBet>
              <S.RankConBoxTitle>
                팔굽혀펴기 등급 : {pushup.grade}
              </S.RankConBoxTitle>
              <S.IconSet>
                {pushup.image && <S.RankImage2 src={pushup.image} />}
                {pushup.value && (
                  <S.RankConName>{pushup.value}회</S.RankConName>
                )}
              </S.IconSet>
            </S.ColSBet>
          </S.RankConBox>

          <S.RankConBox>
            <S.ColSBet>
              <S.RankConBoxTitle>
                윗몸일으키기 등급 : {situp.grade}
              </S.RankConBoxTitle>
              <S.IconSet>
                {situp.image && <S.RankImage2 src={situp.image} />}
                {situp.value && <S.RankConName>{situp.value}회</S.RankConName>}
              </S.IconSet>
            </S.ColSBet>
          </S.RankConBox>

          <S.RankConBox>
            <S.ColSBet>
              <S.RankConBoxTitle>
                3KM 달리기 등급 : {running.grade}
              </S.RankConBoxTitle>
              <S.IconSet>
                {running.image && <S.RankImage2 src={running.image} />}
                {running.value && (
                  <S.RankConName>{running.value}</S.RankConName>
                )}
              </S.IconSet>
            </S.ColSBet>
          </S.RankConBox>
        </S.RankContainer>
      </S.Contatiner>

      <Footer />
    </S.Wrapper>
  );
};

export default ReportPage;

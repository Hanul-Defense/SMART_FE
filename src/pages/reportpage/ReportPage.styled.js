import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(var(--vh) * 100);
  width: 100%;
`;

export const Contatiner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  ${({ theme }) => theme.fonts.Title_ExtraBold_20};
  color: ${({ theme }) => theme.colors.font_green};
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 22px 0;
  background: rgba(187, 191, 154, 0.5);
`;

export const RankBox = styled.div`
  position: relative;
  width: 100%;
  height: 122px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.green01};
  border-radius: 10px;
`;

export const ColSBet = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RankBoxTitle = styled.div`
  ${({ theme }) => theme.fonts.Body_Medium_14};
  color: ${({ theme }) => theme.colors.beige01};
`;

export const IconSet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const RankImage = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.beige01};

  -webkit-mask-image: url(${(props) => props.src});
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;

  mask-image: url(${(props) => props.src});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
`;

export const RankImage2 = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.green01};

  -webkit-mask-image: url(${(props) => props.src});
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;

  mask-image: url(${(props) => props.src});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
`;

export const RankName = styled.div`
  ${({ theme }) => theme.fonts.Title_Bold_22};
  color: ${({ theme }) => theme.colors.beige01};
`;

export const RankContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

export const RankConBox = styled.div`
  flex: 1 1 45%;
  height: 122px;
  padding: 1.5rem;
  background-color: rgba(240, 236, 222, 0.7);
  border-radius: 10px;
`;

export const RankConBoxTitle = styled.div`
  ${({ theme }) => theme.fonts.Body_Bold_14};
  color: ${({ theme }) => theme.colors.black};
`;

export const RankConName = styled.div`
  ${({ theme }) => theme.fonts.Subtitle_ExtraBold_16};
  color: ${({ theme }) => theme.colors.black};
`;

export const IMAGESSETS = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 1.5rem;
  top: -19px;
`;

export const IMAGESS = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgba(240, 236, 222, 0.8);

  -webkit-mask-image: url(${(props) => props.src});
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;

  mask-image: url(${(props) => props.src});
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;

  z-index: 100;
`;

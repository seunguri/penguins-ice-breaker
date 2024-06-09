import { useForce } from '@/store/forceStore';
import styled from '@emotion/styled';

export default function ForceController() {
  const [force, setForce] = useForce((state) => [state.force, state.setForce]);

  const handleForceChange = (event: any) => {
    setForce(event.target.value);
  };

  return (
    <Wrapper>
      <Label>내 힘: {force}</Label>
      <SliderContainer>
        <StyledInput
          type="range"
          min={1000}
          max={100000}
          value={force}
          onChange={handleForceChange}
        />
      </SliderContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px;
  background: #f7f7f7;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Label = styled.div`
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
`;

const SliderContainer = styled.div`
  width: 80%;
`;

const StyledInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #ddd;
  outline: none;
  opacity: 0.9;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #4caf50;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4caf50;
    cursor: pointer;
    border-radius: 50%;
  }
`;

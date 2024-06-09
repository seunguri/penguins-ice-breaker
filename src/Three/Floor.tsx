import Block from './Block';

const radius = 5;
const x = radius * Math.sqrt(3) + 0.000004; // 간격을 넓히기 위해 약간의 오프셋 추가
const y = radius * 2;
const z = -10; // 다른 물체들과 겹치지 않게 z축으로 이동

const blockPositions: [number, number, number][] = [
  [-x / 2, z, -(9 * y) / 4],
  [x / 2, z, -(9 * y) / 4],
  [-2 * x, z, (-y * 3) / 2],
  [-x, z, (-y * 3) / 2],
  [0, z, -(y * 3) / 2],
  [x, z, (-y * 3) / 2],
  [2 * x, z, (-y * 3) / 2],
  [-(x * 5) / 2, z, -(y / 4) * 3],
  [-(x * 3) / 2, z, -(y / 4) * 3],
  [-x / 2, z, -(y / 4) * 3],
  [x / 2, z, -(y / 4) * 3],
  [(x * 3) / 2, z, -(y / 4) * 3],
  [(x * 5) / 2, z, -(y / 4) * 3],
  [-2 * x, z, 0],
  [-x, z, 0],
  [0, z, 0],
  [x, z, 0],
  [2 * x, z, 0],
  [-(x * 5) / 2, z, (y / 4) * 3],
  [-(x * 3) / 2, z, (y / 4) * 3],
  [-x / 2, z, (y / 4) * 3],
  [x / 2, z, (y / 4) * 3],
  [(x * 3) / 2, z, (y / 4) * 3],
  [(x * 5) / 2, z, (y / 4) * 3],
  [-2 * x, z, y / 2 + y],
  [-x, z, y / 2 + y],
  [0, z, (y * 3) / 2],
  [x, z, y / 2 + y],
  [2 * x, z, y / 2 + y],
  [-x / 2, z, (9 * y) / 4],
  [x / 2, z, (9 * y) / 4],
];

const framePositions: [number, number, number][] = [
  [-x, z, -y * 3],
  [0, z, -(y * 3)],
  [x, z, -y * 3],
  [-(3 * x) / 2, z, -(9 * y) / 4],
  [-(5 * x) / 2, z, -(9 * y) / 4],
  [(5 * x) / 2, z, -(9 * y) / 4],
  [(3 * x) / 2, z, -(9 * y) / 4],
  [-3 * x, z, (-y * 3) / 2],
  [3 * x, z, (-y * 3) / 2],
  [-(x * 7) / 2, z, -(y / 4) * 3],
  [(x * 7) / 2, z, -(y / 4) * 3],
  [-3 * x, z, 0],
  [3 * x, z, 0],
  [(x * 7) / 2, z, (y / 4) * 3],
  [-(x * 7) / 2, z, (y / 4) * 3],
  [3 * x, z, (y * 3) / 2],
  [-3 * x, z, (y * 3) / 2],
  [(3 * x) / 2, z, (9 * y) / 4],
  [(5 * x) / 2, z, (9 * y) / 4],
  [-(5 * x) / 2, z, (9 * y) / 4],
  [-(3 * x) / 2, z, (9 * y) / 4],
  [-x, z, y * 3],
  [0, z, y * 3],
  [x, z, y * 3],
];

/**
 * 바닥을 생성하는 컴포넌트
 */
export default function Floor() {
  /**
   * 역할에 따라 블록을 생성하는 함수
   */
  const createObjects = (
    positions: [number, number, number][],
    color: string,
    type: 'dynamic' | 'fixed'
  ) =>
    positions.map((position, index) => (
      <Block
        key={`${type}-${index}`}
        position={position}
        args={[radius, radius, radius * 2, 6]}
        color={type === 'dynamic' ? randomColor() : color}
        type={type}
      />
    ));

    const randomColor = () => {
      const colors = ['ice', 'aqua']
      return colors[Math.floor(Math.random() * colors.length)];
    }

  return (
    <group>
      {createObjects(framePositions, 'gray', 'fixed')}
      {createObjects(blockPositions, randomColor(), 'dynamic')}
    </group>
  );
}

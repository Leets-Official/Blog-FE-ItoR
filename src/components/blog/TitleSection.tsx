import Textarea from '../common/Textarea/Textarea';

const TitleSection: React.FC = () => {
  return (
    <div>
      <Textarea
        placeholder="제목"
        inputSize="xl"
        inputWeight="medium"
        placeholderColor="gray56"
        placeholderSize="md"
        placeholderWeight="medium"
        hasBorder={false}
      />
    </div>
  );
};

export default TitleSection;

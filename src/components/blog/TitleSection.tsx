import Textarea from '../common/Textarea/Textarea';

const TitleSection: React.FC = () => {
  return (
    <Textarea
      placeholder="제목"
      rows={1}
      inputSize="xl"
      inputWeight="medium"
      placeholderColor="gray56"
      placeholderSize="md"
      placeholderWeight="medium"
      hasBorder={false}
    />
  );
};

export default TitleSection;

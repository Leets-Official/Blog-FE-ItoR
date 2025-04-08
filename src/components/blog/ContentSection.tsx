import Textarea from '../common/Textarea/Textarea';

const ContentSection: React.FC = () => {
  return (
    <Textarea
      placeholder="어떠한 것을 깨달았나요?"
      inputSize="sm"
      inputWeight="light"
      placeholderColor="gray56"
      placeholderSize="sm"
      placeholderWeight="regular"
      hasBorder={false}
      rows={6}
    />
  );
};

export default ContentSection;

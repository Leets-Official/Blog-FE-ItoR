import { Input } from '@/components/index';

const TitleSection: React.FC = () => {
  return (
    <div>
      <Input as="textarea" rows={5} placeholder="제목" />
    </div>
  );
};

export default TitleSection;

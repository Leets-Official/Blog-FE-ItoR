import { useState } from 'react';
import styled from 'styled-components';
import ContentEditor from '@/components/editor/ContentEditor';
import EditorHeader from '@/components/editor/EditorHeader';
import Header from '@/components/layout/header/Header';
import TitleField from '@/components/editor/TitleField';

const BlogEditorContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;
`;

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageToInsert, setImageToInsert] = useState<string | null>(null);

  const handleAddImage = (imageUrl: string) => {
    setImageToInsert(imageUrl);
    setTimeout(() => setImageToInsert(null), 0);
  };

  return (
    <BlogEditorContainer>
      <Header type='DelandCreate' title={title} content={content} />
      <EditorHeader onAddImage={handleAddImage} />
      <TitleField value={title} onChange={(e) => setTitle(e.target.value)} />
      <ContentEditor onChange={(value) => setContent(value)} />
    </BlogEditorContainer>
  );
};

export default BlogEditor;

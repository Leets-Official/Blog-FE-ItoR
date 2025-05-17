import { useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ContentEditor from '@/components/editor/ContentEditor';
import ImageUpload from '@/components/editor/ImageUpload';
import Header from '@/components/layout/header/Header';
import TitleField from '@/components/editor/TitleField';
import { getPresignedUrl, uploadImage } from '@/api/image/ImageAPI';
import { Block } from '@/types/blogPost';

const BlogEditorContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;
`;

interface LocationState {
  postId?: string;
  title?: string;
  contents?: {
    contentOrder: number;
    content: string;
    contentType: 'TEXT' | 'IMAGE';
  }[];
}

const convertContentsToBlocks = (contents: LocationState['contents']): Block[] => {
  if (!contents) return [];
  return contents
    .sort((a, b) => a.contentOrder - b.contentOrder)
    .map((item) => ({
      content: item.content,
      type: item.contentType,
    }));
};

const BlogEditor = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [postId] = useState(state?.postId || null);
  const [title, setTitle] = useState(state?.title || '');
  const [blocks, setBlocks] = useState<Block[]>(convertContentsToBlocks(state?.contents));

  const [imageToInsert, setImageToInsert] = useState<string | null>(null);

  // 최초 한 번만 초기 블록을 ContentEditor에 전달
  const initialBlocksRef = useRef<Block[]>(convertContentsToBlocks(state?.contents));

  const handleAddImage = async (file: File) => {
    console.log('이미지 업로드 시작:', file);
    try {
      const presignedUrl = await getPresignedUrl(file.name);
      const uploadedImageUrl = await uploadImage(presignedUrl, file);
      setImageToInsert(uploadedImageUrl);
      console.log('업로드된 URL:', uploadedImageUrl);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
    }
  };

  // content는 blocks에서 추출
  const plainTextContent = useMemo(() => {
    return blocks
      .filter((block) => block.type === 'TEXT')
      .map((block) => block.content)
      .join('\n\n');
  }, [blocks]);

  return (
    <BlogEditorContainer>
      <Header
        type='DelandCreate'
        title={title}
        content={plainTextContent}
        blocks={blocks}
        postId={postId ?? undefined}
      />
      <ImageUpload onAddImage={handleAddImage} />
      <TitleField value={title} onChange={(e) => setTitle(e.target.value)} />
      <ContentEditor
        onChange={(value, updatedBlocks) => setBlocks(updatedBlocks)}
        imageToInsert={imageToInsert}
        onImageInsertHandled={() => setImageToInsert(null)}
        initialBlocks={initialBlocksRef.current}
      />
    </BlogEditorContainer>
  );
};

export default BlogEditor;

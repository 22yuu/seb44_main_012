import useModal from '@/hooks/useModal';
import Button from '../atom/Button';
import Paragraph from '../atom/Paragraph';
import { ReactComponent as PlusIcon } from '@/assets/icons/plus-circle.svg';
import WriteModal from '../common/modals/WriteModal';
import { useParams } from 'react-router-dom';

const NoRecord = () => {
  const [openModal] = useModal();
  const { id } = useParams();

  const onClickHandler = () => {
    openModal(({ isOpen, close }) => (
      <WriteModal id={Number(id)} type={'default'} isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Paragraph>작성된 일지가 없어요😥</Paragraph>
      <Paragraph>일지를 작성하러 가시겠습니까?</Paragraph>
      <Button variant={'default'} hovercolor={'default'} onClick={onClickHandler}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default NoRecord;

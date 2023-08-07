import useModal from '@/hooks/useModal';
import Button from '../../atom/Button';
import Paragraph from '../../atom/Paragraph';
import { ReactComponent as PlusIcon } from '@/assets/icons/plus-circle.svg';
import WriteModal from '../../common/modals/WriteModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { ScheduledPlaceBase } from '@/types/api/schedules-types';

type Props = {
  selectedPlace: ScheduledPlaceBase;
  refetch: () => void;
};

const NoRecord = ({ selectedPlace, refetch }: Props) => {
  // const { selectedPlace } = useSelector((state: RootState) => state.place);

  const { schedulePlaceId, name } = selectedPlace!; // null이 될 경우?

  const [openModal] = useModal();

  const onClickHandler = () => {
    openModal(({ isOpen, close }) => (
      <WriteModal
        id={Number(schedulePlaceId)}
        type={'default'}
        isOpen={isOpen}
        onClose={close}
        recordRefetch={refetch}
      />
    ));
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <Paragraph className="lg:text-md text-center text-sm xl:text-lg">
        현재 <span className=" font-semibold text-[#3458DC]">{name}</span>에 작성된 일지가 없어요😥
      </Paragraph>
      <Button variant={'default'} hovercolor={'default'} onClick={onClickHandler}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default NoRecord;

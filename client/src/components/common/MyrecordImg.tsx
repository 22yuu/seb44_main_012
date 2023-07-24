import Image from '../atom/Image';
import { Record } from '@/types/api/records-types';

interface MyrecordImgProps {
  record: Record;
}

const MyrecordImg = ({ record }: MyrecordImgProps) => {
  return (
    <div
      className=" relative"
      onClick={() => alert('죄송합니다. 일지 상세 페이지는 아직 준비중입니다😢')}
    >
      <Image size={'lg'} rounded="active" hoveropacity={'active'} />
      <div className=" absolute bottom-0 left-0 mb-6 ml-6">
        <p className=" text-lg font-semibold text-white">{record.placeName}</p>
        <p className=" text-xs font-thin text-white">{record.content}</p>
      </div>
    </div>
  );
};

export default MyrecordImg;

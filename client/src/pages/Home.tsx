import { useSelector } from 'react-redux';

import { Button, Paragraph } from '@/components';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const navigate = useNavigate();

  return (
    <>
      <div className="landing relative h-full w-full bg-[url('../assets/imgs/gyeonggi.webp')] bg-cover bg-center bg-no-repeat">
        <div className="absolute bottom-[5%] left-0 right-0 z-50 flex flex-col items-center px-10 sm:bottom-[80px] sm:left-0 sm:block sm:px-16">
          <Paragraph
            size={'md'}
            variant={'white'}
            weight={'extrabold'}
            className="text-center sm:text-justify md:text-[44px] xl:text-[52px]"
          >
            이번 국내 여행,
          </Paragraph>
          <Paragraph
            size={'md'}
            variant={'white'}
            weight={'extrabold'}
            className="text-center sm:text-justify md:text-[44px] xl:text-[52px]"
          >
            보다 알찬 여행으로 만들고 싶다면?
          </Paragraph>
          <Paragraph
            size={'md'}
            variant={'white'}
            weight={'extrabold'}
            className="mb-4 text-center sm:text-justify md:text-[44px] xl:text-[52px]"
          >
            <span className="gradient-text">PliP</span>으로 여행 계획을 디자인해보세요!
          </Paragraph>
          <Button
            variant={'primary'}
            onClick={() => (isLogin ? navigate('/plan') : navigate('/login'))}
            className="w-full sm:w-fit"
          >
            여행 시작하기
          </Button>
        </div>
        <div className="fixed h-full w-full bg-black bg-opacity-50 "></div>
      </div>
    </>
  );
};

export default Home;

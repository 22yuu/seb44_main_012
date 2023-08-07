import { Schedule, ScheduledPlaceBase } from '@/types/api/schedules-types';
import { ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

type Props = {
  children: ReactNode;
};

type ContextProps = {
  scheduleInfo: Schedule;
  setScheduleInfo: React.Dispatch<React.SetStateAction<Schedule>>;
  selectedPlace: ScheduledPlaceBase | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<ScheduledPlaceBase | null>>;
};

const initScheduleInfo = {} as Schedule;
const initSelectedPlace = {} as ScheduledPlaceBase;

const MapDetailContext = createContext<ContextProps>({
  scheduleInfo: initScheduleInfo,
  setScheduleInfo: () => {},
  selectedPlace: null,
  setSelectedPlace: () => {},
});

export const useMapDetailContext = () => {
  return useContext(MapDetailContext);
};

const MapDetailProvider = ({ children }: Props) => {
  // 현재 일정의 정보
  const [scheduleInfo, setScheduleInfo] = useState<Schedule>(initScheduleInfo);
  const [selectedPlace, setSelectedPlace] = useState<ScheduledPlaceBase | null>(null);

  return (
    <MapDetailContext.Provider
      value={{
        scheduleInfo,
        setScheduleInfo,
        selectedPlace,
        setSelectedPlace,
      }}
    >
      {children}
    </MapDetailContext.Provider>
  );
};

export default MapDetailProvider;

import { Schedule, ScheduledPlaceBase } from '@/types/api/schedules-types';
import { ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

type Props = {
  children: ReactNode;
};

type ContextProps = {
  scheduleInfo: Schedule | null;
  setScheduleInfo: React.Dispatch<React.SetStateAction<Schedule | null>>;
  selectedPlace: ScheduledPlaceBase | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<ScheduledPlaceBase | null>>;
};

const MapScheduleContext = createContext<ContextProps>({
  scheduleInfo: null,
  setScheduleInfo: () => {},
  selectedPlace: null,
  setSelectedPlace: () => {},
});

export const useMapScheduleContext = () => {
  return useContext(MapScheduleContext);
};

const MapScheduleProvider = ({ children }: Props) => {
  // 현재 일정의 정보
  const [scheduleInfo, setScheduleInfo] = useState<Schedule | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<ScheduledPlaceBase | null>(null);

  return (
    <MapScheduleContext.Provider
      value={{
        scheduleInfo,
        setScheduleInfo,
        selectedPlace,
        setSelectedPlace,
      }}
    >
      {children}
    </MapScheduleContext.Provider>
  );
};

export default MapScheduleProvider;

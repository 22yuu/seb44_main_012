import { Button } from '@/components';
import { useEffect, useState } from 'react';
import { Map, MapMarker, MarkerClusterer, Polyline } from 'react-kakao-maps-sdk';
import { PositionType } from '@/datas/regions';
import { regionInfos } from '@/datas/regions';
import { useParams } from 'react-router-dom';

interface PlanMapPageProps {}

const PlanMapPage = ({}: PlanMapPageProps) => {
  const { region } = useParams();

  const [mapLevel, setMapLevel] = useState(8);
  const [isMarkerVisble, setIsMarkerVisible] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(regionInfos[region]); // 타입 해결해주세요 길종늼

  // console.log(regionInfos[region]);

  const [currentPosition, setCurrentPosition] = useState<PositionType>({
    isLoad: false,
    lat: 0,
    lng: 0,
  });

  const [markers, setMarkers] = useState<PositionType[]>([]);

  useEffect(() => {
    const { lat, lng } = selectedRegion.coords;

    setCurrentPosition({
      isLoad: true,
      lat: lat,
      lng: lng,
    });
  }, []);

  useEffect(() => {
    if (mapLevel >= 10) setIsMarkerVisible(false);
    else setIsMarkerVisible(true);
  }, [mapLevel]);

  return (
    <div className="relative h-full w-full">
      {currentPosition.isLoad && (
        <Map
          center={currentPosition}
          className="h-full w-full"
          level={mapLevel}
          onClick={(_t, mouseEvent) =>
            setMarkers([
              ...markers,
              {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
            ])
          }
          onZoomChanged={(map) => setMapLevel(map.getLevel())}
        >
          {isMarkerVisble && markers.map((marker) => <MapMarker position={marker}></MapMarker>)}
          <Polyline
            path={[[...markers]]}
            strokeWeight={5} // 선의 두께 입니다
            strokeColor={'#FFAE00'} // 선의 색깔입니다
            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
          />

          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={10} // 클러스터 할 최소 지도 레벨
          >
            {markers.map((pos) => (
              <MapMarker
                key={`${pos.lat}-${pos.lng}`}
                position={{
                  lat: pos.lat,
                  lng: pos.lng,
                }}
              />
            ))}
          </MarkerClusterer>
        </Map>
      )}
      <Button variant={'primary'} className="absolute right-10 top-5 z-50">
        저장하기
      </Button>
    </div>
  );
};

export default PlanMapPage;

import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface MapMarkersExampleProps {}

const MapMarkersExample = ({}: MapMarkersExampleProps) => {
  const [currentPos, setCurrentPos] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPos((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setCurrentPos((prev: any) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCurrentPos((prev: any) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, [currentPos]);

  const [markers, setMarkers] = useState([
    {
      position: currentPos.center,
    },
  ]);

  const onDeleteMarker = (target: any) => {
    // alert('삭제');
    target.setMap(null);
  };

  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <Map // 지도를 표시할 Container
        center={currentPos.center}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_target, mouseEvent) => {
          setMarkers([
            ...markers,
            {
              position: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
            },
          ]);
        }}
      >
        {isVisible &&
          markers.map((marker, index) => (
            <MapMarker
              key={`${marker.position}-${index}`}
              position={marker.position} // 마커를 표시할 위치
              clickable={true}
              onClick={(marker) => onDeleteMarker(marker)}
            />
          ))}
      </Map>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <button onClick={() => setIsVisible(false)}>마커 감추기</button>
        <button onClick={() => setIsVisible(true)}>마커 보이기</button>
      </div>
    </>
  );
};

export default MapMarkersExample;

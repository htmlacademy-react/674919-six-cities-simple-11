import {useEffect, useState, useRef, MutableRefObject} from 'react';
import {Map, TileLayer} from 'leaflet';

type UseMapProps = {
  activeCity: string;
  city: {
    Title: string;
    Lat: number;
    Lng: number;
    Zoom: number;
  };
  mapRef: MutableRefObject<HTMLElement | null>;
}

const useMap = (activeCity: UseMapProps['activeCity'], mapRef: UseMapProps['mapRef'], city:UseMapProps['city']) => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.Lat,
          lng: city.Lng,
        },
        zoom: city.Zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
};

export default useMap;

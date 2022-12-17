import React, {useRef, useEffect, memo} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer, Offers} from '../../types/offers';
import useMap from '../../hooks/useMap';
import {Markers} from '../../const';
import {useAppSelector} from '../../hooks';
import {getCurrentCity} from '../../store/data/selector';

type MapProps = {
  offers: Offers;
  city: {
    Title: string;
    Lat: number;
    Lng: number;
    Zoom: number;
  };
  activeOffer: Offer | undefined;
  elementClassName: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: Markers.Default,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: Markers.Active,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const Map = ({offers, city, activeOffer, elementClassName}: MapProps): JSX.Element => {
  const activeCity = useAppSelector(getCurrentCity);
  const mapRef = useRef(null);
  const map = useMap(activeCity, mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];
    const markerCoordinateList: [number, number][] = [];

    if (map && offers) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        markerCoordinateList.push([offer.location.latitude, offer.location.longitude]);

        marker
          .setIcon(
            activeOffer !== undefined && offer.id === activeOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);

        markers.push(marker);
      });

      if (markerCoordinateList.length > 0) {
        map.fitBounds(markerCoordinateList, {padding: [20, 20]});
      }
    }

    return () => {
      if (map) {
        markers.forEach((marker) => marker.removeFrom(map));
      }
    };
  }, [map, offers, activeOffer]);

  return (
    <section className={`${elementClassName} map`} ref={mapRef}></section>
  );
};

export default memo(Map);

import React from 'react';
import { Map, Placemark, YMaps, ZoomControl } from 'react-yandex-maps';

type Props = {
  className?: string;
  lat: number;
  lng: number;
};

export const Ymap: React.FC<Props> = ({ lng, lat, className }) => (
  <YMaps>
    <Map className={className} defaultState={{ center: [lat, lng], zoom: 15 }}>
      <Placemark geometry={[lat, lng]} />
      <ZoomControl options={{ float: 'right' }} />
    </Map>
  </YMaps>
);

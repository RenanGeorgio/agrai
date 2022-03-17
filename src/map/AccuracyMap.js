import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import circle from '@turf/circle';

import { map } from './Map';

const AccuracyMap = () => {
  const id = 'accuracy';

  useEffect(() => {
    map.addSource(id, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    });
    map.addLayer({
      source: id,
      id,
      type: 'fill',
      filter: [
        'all',
        ['==', '$type', 'Polygon'],
      ],
      paint: {
        'fill-color': '#3bb2d0',
        'fill-outline-color': '#3bb2d0',
        'fill-opacity': 0.25,
      },
    });

    return () => {
      map.removeLayer(id);
      map.removeSource(id);
    };
  }, []);

  return null;
};

export default AccuracyMap;

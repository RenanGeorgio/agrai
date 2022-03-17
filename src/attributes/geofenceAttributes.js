import t from '../common/localization';

function init() {}

function log(error) {
  console.error(error);
}

const geofenceAttributes = {
  speedLimit: {
    name: t('attributeSpeedLimit'),
    type: 'string',
  },
};

export default geofenceAttributes;

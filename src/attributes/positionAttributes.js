import t from '../common/localization';

function init() {}

function log(error) {
  console.error(error);
}

const positionAttributes = {
  raw: {
    name: t('positionRaw'),
    type: 'string',
  },
  index: {
    name: t('positionIndex'),
    type: 'number',
  },
  ignition: {
    name: t('positionIgnition'),
    type: 'boolean',
  },
  odometer: {
    name: t('positionOdometer'),
    type: 'number',
    dataType: 'distance',
  },
};

export default positionAttributes;

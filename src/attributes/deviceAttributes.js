import t from '../common/localization';

function init() {}

function log(error) {
  console.error(error);
}

const deviceAttributes = {
  speedLimit: {
    name: t('attributeSpeedLimit'),
    type: 'string',
  },
  'report.ignoreOdometer': {
    name: t('attributeReportIgnoreOdometer'),
    type: 'boolean',
  },
};

export default deviceAttributes;

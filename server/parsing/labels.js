const EGO_FLAGS = [
    'braking',
    'turningLeft',
    'turningRight',
    'IonAutomation',
    'steeringAutomation',
    'constructionSiteDisc',
    'sendingRequestToMerge',
    'performingMerge',
    'openingGap',
    'intersectingVehicleDisc',
    'placementIncomingVehicle',
    'egoDecision',
    'EVIncoming',
    'yieldingDirection',
    'inYieldingPosition'
];

const VEHICLE_FLAGS = [
    'isSeenByRadar',
    'isMIO',
    'isFMIO',
    'isForwardPair',
    'isBackwardPair'
];

const EGO_LABELS = [
    'flags',
    'ID',
    'speed',
    'acceleration',
    'heading',
    'x',
    'y',
    'width',
    'length',
    'distanceToLaneC',
    'roadWidth',
    'competitionDist'
];

const VEHICLE_LABELS = [
    'flags',
    'ID',
    'speed',
    'acceleration',
    'heading',
    'x',
    'y',
    'width',
    'length'
];

module.exports = {
  getEgoLabels: function() {
    return EGO_LABELS;
  },
  getEgoFlags: function() {
    return EGO_LABELS;
  },
  getVehicleLabels: function() {
    return VEHICLE_LABELS;
  },
  getVehicleFlags: function() {
    return VEHICLE_FLAGS;
  }
};
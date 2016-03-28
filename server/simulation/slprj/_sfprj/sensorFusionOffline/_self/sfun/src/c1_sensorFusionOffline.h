#ifndef __c1_sensorFusionOffline_h__
#define __c1_sensorFusionOffline_h__

/* Include files */
#include "sf_runtime/sfc_sf.h"
#include "sf_runtime/sfc_mex.h"
#include "rtwtypes.h"
#include "multiword_types.h"

/* Type Definitions */
#ifndef struct_GPSBUS_tag
#define struct_GPSBUS_tag

struct GPSBUS_tag
{
  real_T GPRMCTime;
  real_T GPRMCStatus;
  real_T GPRMCLatitude;
  real_T GPRMCLongitude;
  real_T GPRMCSpeed;
  real_T GPRMCDirection;
  real_T GPRMCDeviation;
  real_T GPRMCDate;
  real_T GPRMCChecksumOK;
  real_T GPRMCNewDataIndication;
  real_T GPGSTTime;
  real_T GPGSTRMSResidual;
  real_T GPGSTMajorEllipse;
  real_T GPGSTMinorEllipse;
  real_T GPGSTOrientationError;
  real_T GPGSTLatitudeDeviation;
  real_T GPGSTLongitudeDeviation;
  real_T GPGSTHeightDeviation;
  real_T GPGSTChecksumOK;
  real_T GPGSTNewDataIndication;
};

#endif                                 /*struct_GPSBUS_tag*/

#ifndef typedef_c1_GPSBUS
#define typedef_c1_GPSBUS

typedef struct GPSBUS_tag c1_GPSBUS;

#endif                                 /*typedef_c1_GPSBUS*/

#ifndef struct_EGOSFBUS_tag
#define struct_EGOSFBUS_tag

struct EGOSFBUS_tag
{
  real_T UTMNorthing;
  real_T UTMEasting;
  real_T Latitude;
  real_T Longitude;
  real_T SemiMajorConfidence;
  real_T SemiMinorConfidence;
  real_T SemiMajorOrientation;
  real_T Altitude;
  real_T Heading;
  real_T HeadingConfidence;
  real_T Speed;
  real_T SpeedConfidence;
  real_T LongAcc;
  real_T LongAccConfidence;
  real_T YawRate;
  real_T YawRateConfidence;
  real_T LatAcc;
  real_T LatVel;
};

#endif                                 /*struct_EGOSFBUS_tag*/

#ifndef typedef_c1_EGOSFBUS
#define typedef_c1_EGOSFBUS

typedef struct EGOSFBUS_tag c1_EGOSFBUS;

#endif                                 /*typedef_c1_EGOSFBUS*/

#ifndef struct_S60OUTBUS_tag
#define struct_S60OUTBUS_tag

struct S60OUTBUS_tag
{
  real_T CIPid;
  real_T CIPlongAcceleration;
  real_T CIPlateralVelocity;
  real_T CIPrange;
  real_T CIPlatOffset;
  real_T CIPrangeRate;
  real_T CIPtype;
  real_T CIPtimeToImpact;
  real_T CIPtargetChange;
  real_T CIPlaneChange;
  real_T CIPlane;
  real_T CIPpresent;
  real_T sensorError;
  real_T CCoverride;
  real_T driverBelted;
  real_T driverBreaking;
  real_T turnIndicator;
  real_T vehicleVelocity;
  real_T vehicleAcceleration;
  real_T lateralAcceleration;
  real_T yawRateActual;
  real_T steeringAngle;
  real_T throttlePedalPosition;
  real_T gearStatus;
  real_T SetSpeed;
  real_T CCButtons;
  real_T ccActive;
  real_T s60Tick;
};

#endif                                 /*struct_S60OUTBUS_tag*/

#ifndef typedef_c1_S60OUTBUS
#define typedef_c1_S60OUTBUS

typedef struct S60OUTBUS_tag c1_S60OUTBUS;

#endif                                 /*typedef_c1_S60OUTBUS*/

#ifndef struct_COMPASSBUS_tag
#define struct_COMPASSBUS_tag

struct COMPASSBUS_tag
{
  real_T heading;
  real_T rawHeading;
  real_T heartbeat;
};

#endif                                 /*struct_COMPASSBUS_tag*/

#ifndef typedef_c1_COMPASSBUS
#define typedef_c1_COMPASSBUS

typedef struct COMPASSBUS_tag c1_COMPASSBUS;

#endif                                 /*typedef_c1_COMPASSBUS*/

#ifndef struct_EGOSFSETTINGS_tag
#define struct_EGOSFSETTINGS_tag

struct EGOSFSETTINGS_tag
{
  real_T UTMZone;
  real_T ProcCov[81];
  real_T LonSpeedCov;
  real_T LonAccCov;
  real_T LatAccCov;
  real_T YawRateCov;
  real_T CompassHeadingCov;
  real_T PhiCov;
  real_T PhiScale;
  real_T SteeringRatio;
  real_T HeadingVelocityLimit;
  real_T OutlierDetection;
  real_T DetectionNorthMax;
  real_T DetectionNorthMin;
  real_T GPSHeadingCov;
  real_T LatVelInitCov;
};

#endif                                 /*struct_EGOSFSETTINGS_tag*/

#ifndef typedef_c1_EGOSFSETTINGS
#define typedef_c1_EGOSFSETTINGS

typedef struct EGOSFSETTINGS_tag c1_EGOSFSETTINGS;

#endif                                 /*typedef_c1_EGOSFSETTINGS*/

#ifndef typedef_SFc1_sensorFusionOfflineInstanceStruct
#define typedef_SFc1_sensorFusionOfflineInstanceStruct

typedef struct {
  SimStruct *S;
  ChartInfoStruct chartInfo;
  uint32_T chartNumber;
  uint32_T instanceNumber;
  int32_T c1_sfEvent;
  boolean_T c1_isStable;
  boolean_T c1_doneDoubleBufferReInit;
  uint8_T c1_is_active_c1_sensorFusionOffline;
  real_T c1_X[9];
  boolean_T c1_X_not_empty;
  real_T c1_P[81];
  boolean_T c1_P_not_empty;
  real_T c1_timeAtPreviousGPSreading;
  boolean_T c1_timeAtPreviousGPSreading_not_empty;
  real_T c1_tickAtPreviousS60Reading;
  boolean_T c1_tickAtPreviousS60Reading_not_empty;
  real_T c1_tickAtPreviousCompassReading;
  boolean_T c1_tickAtPreviousCompassReading_not_empty;
  real_T c1_positionIsInitialized;
  boolean_T c1_positionIsInitialized_not_empty;
  real_T c1_statesAreInitialized;
  boolean_T c1_statesAreInitialized_not_empty;
  boolean_T *c1_reset;
  c1_EGOSFSETTINGS *c1_EGOSFParameters;
  c1_GPSBUS *c1_GPSBUSIN;
  c1_EGOSFBUS *c1_b_EGOSFBUS;
  c1_S60OUTBUS *c1_S60BUSIN;
  c1_COMPASSBUS *c1_COMPASSBUSIN;
} SFc1_sensorFusionOfflineInstanceStruct;

#endif                                 /*typedef_SFc1_sensorFusionOfflineInstanceStruct*/

/* Named Constants */

/* Variable Declarations */
extern struct SfDebugInstanceStruct *sfGlobalDebugInstanceStruct;

/* Variable Definitions */

/* Function Declarations */
extern const mxArray *sf_c1_sensorFusionOffline_get_eml_resolved_functions_info
  (void);

/* Function Definitions */
extern void sf_c1_sensorFusionOffline_get_check_sum(mxArray *plhs[]);
extern void c1_sensorFusionOffline_method_dispatcher(SimStruct *S, int_T method,
  void *data);

#endif

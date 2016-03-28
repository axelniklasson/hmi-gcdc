% File for the initialization of the parameters for SensorFusionOffline

UTMZone = 33;
nStates       = 9;

% Process covariance: (x,y,vlon,alon,vlat,alat,yaw,yawrate,phi)  phi=wheelA
EGOSF_Pproc = diag([0.01, 0.01, 0.001, 0.001, 0.01, 0.01, 0.005, 0.05, 0.05]);  % vector [nStates,1] 

% Measurment covariances
EGOSF_LonSpeedCov         = 0.001;
EGOSF_LonAccCov           = 0.5;
EGOSF_LatAccCov           = 0.5;         
EGOSF_YawRateCov          = 0.1;
EGOSF_GPSHeadingCov       = 0.1;                                            % for now we are using the heading from the GPS 
EGOSF_CompassHeadingCov   = (10/180*pi)^2;                                  % for now we are using the heading from the GPS 
EGOSF_PhiCov              = 0.01;
EGOSF_LatVelInitCov       = 5;
%other parameters
EGOSF_PhiScale            = 1;
EGOSF_SteeringRatio       = 15;                                             % Data from the data scheet of the Volvo S60 2011.   
EGOSF_HeadingVelocityLimit= 0.5;                                            % Check if the vehicle is stopped
EGOSF_OutlierDetection    = 3.5;                                            % [m] for the detection of the Outlier of the GPS
EGOSF_DetectionNorthMax   = 1.5*pi;                                         % For the riduction of the noise near the North  
EGOSF_DetectionNorthMin   = 0.5*pi;                                         % These value have to stay in [ 0 , 2*pi]

EGOSFSETTINGS.Elements(2).Dimensions = size(EGOSF_Pproc);

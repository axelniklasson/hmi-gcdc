%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%           INIT SCRIPT FOR SENSOR FUSION OFFLINE VERSION
% The simulink file contains a complete mockup of how the system looks in
% the vehicle model. The inputs are the same. In this way, the block should
% be able to just copy paste from the offline to the online version
%
% I have tried to make suggestions based on experience on different places,
% mainly so that you avoid doing the misstakes I did.  For instance, if you
% need derivatives: do them symbolically!
%
% If you reuse functions on different places: Place them in a separate .m
% file!
%
% If you have tuning parameters, do not set them inside a matlab block. Not
% only is this bad practice (all parameters should be set on the same place
% to be easily modifiable), it will also cause simulink to recompile that
% matlab function every time you do a parameter change. Hence, tuning will
% be very time consuming. 
%
% Note that not all sensors give SI-values. Investigate this thoroughly.
%
% Note that the definition of the heading is a bit unertain. It is not
% super clear from where it is counted (north?), and in which direction. It
% furthermore seems to be different in the GPS and compass. 
%
% Note that you might need to make special accomodation to the estimate of
% angles that can wrap around 2pi. It might lead to unexpected behavious
% otherwise.
%
% THIS IS HOW YOU USE THE OFFLINE SETUP:
% - Select which file (number) you want to run (assuming that the name and
%   structure is as assumped in the parsing script
% - Set how long you'd like the simulation to run.
% - Press play
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
addpath Auxillary/
addpath Data/
load('buses')
showPlots = 1;
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% READ DATA
fileNo = '003';
parsingScript
endTime = 150;
resetStepTime = 500;
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%% FILTER PARAMETERS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Note that as you add additional parameters you need to also change the
% the 'EGOSFSETTINGS' bus (add filed) AND add a constant block in the
% simulink model. If the parameter you add is a matrix, and you want to
% govern it's size from the script, you change its dimension using the line
% below. Note that every time you change a bus in the bus editor you need
% to export it and write over the old 'buses.mat' file, AND you need to
% copy that to the sam folder of the online version when you want to run
% the filter in the vehicle.

%load parameters
sensorFusionInit
























%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%% RUN SIMULATION %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
sim('sensorFusionOffline')


%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%% PLOTTING %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if showPlots
S60Index = find(vehicleVelocity.time >= endTime,1,'first');
CompassIndex = find(heading.time >= endTime,1,'first');
GPSIndex     = find(GPRMCLatitude.time >= endTime,1,'first');


figure(1)
clf
title('Position')
hold on
grid on
title('UTM Position')
xlabel('x (Easting)')
ylabel('y (Northing)')
axis equal

normX = min(GPSEasting.signals.values(GPSEasting.signals.values>0));
normY = min(GPSNorthing.signals.values(GPSNorthing.signals.values>0));
plot(GPSEasting.signals.values-normX,GPSNorthing.signals.values-normY,'.')
plot(SFOut_UTMEasting.signals.values-normX,SFOut_UTMNorthing.signals.values-normY,'r')
legend({'Acquired ','Filtred'},'FontWeight','bold');



figure(2)
clf
h(1) = subplot(2,3,1);
hold on
grid on

title('Lon Velocity')
ylabel('m/s')

plot(vehicleVelocity.time(1:S60Index),vehicleVelocity.signals.values(1:S60Index))
plot(SFOut_Speed.time,SFOut_Speed.signals.values,'r')
legend({'Acquired ','Filtred'},'FontWeight','bold');
plot(SFOut_Speed.time,SFOut_Speed.signals.values + SFOut_SpeedConfidence.signals.values,'r:')
plot(SFOut_Speed.time,SFOut_Speed.signals.values - SFOut_SpeedConfidence.signals.values,'r:')


h(2) = subplot(2,3,2);
hold on
grid on

title('Heading')
ylabel('deg')

plot(GPRMCDirection.time(1:GPSIndex),360-GPRMCDirection.signals.values(1:GPSIndex),'m')
plot(SFOut_Heading.time,mod(SFOut_Heading.signals.values*180/pi,360),'r')

%plot(heading.time(1:CompassIndex),-heading.signals.values(1:CompassIndex)*180/pi+360)

legend({'Acquired GPS ','Filtred GPS'},'FontWeight','bold');

h(3) = subplot(2,3,4);
hold on
grid on

title('Lon Acc')
ylabel('m/s^2')
plot(vehicleAcceleration.time(1:S60Index),vehicleAcceleration.signals.values(1:S60Index))
plot(SFOut_LonAcc.time,SFOut_LonAcc.signals.values,'r')
legend({'Acquired ','Filtred'},'FontWeight','bold');
plot(SFOut_LonAcc.time,SFOut_LonAcc.signals.values + SFOut_LonAccConfidence.signals.values,'r:')
plot(SFOut_LonAcc.time,SFOut_LonAcc.signals.values - SFOut_LonAccConfidence.signals.values,'r:')

h(4) = subplot(2,3,5);
hold on
grid on

title('Yaw Rate')
ylabel('deg/s')
plot(yawRateActual.time(1:S60Index),yawRateActual.signals.values(1:S60Index))
plot(SFOut_YawRate.time,SFOut_YawRate.signals.values*180/pi,'r')
%plot(steeringAngle.time(1:S60Index),steeringAngle.signals.values(1:S60Index)/5,'m')
legend({'Acquired ','Filtred'},'FontWeight','bold');

h(5) = subplot(2,3,3);
hold on
grid on
plot(SFOut_LatVel.time,SFOut_LatVel.signals.values,'r')
legend({'Estimated'},'FontWeight','bold');

title('Lat Velocity')
ylabel('m/s')

h(6) = subplot(2,3,6);
hold on
grid on

title('Lat Acc')
ylabel('m/s')
plot(lateralAcceleration.time(1:S60Index),lateralAcceleration.signals.values(1:S60Index))
plot(SFOut_LatAcc.time,SFOut_LatAcc.signals.values,'r')
legend({'Acquired ','Filtred'},'FontWeight','bold');


linkaxes(h,'x')
end



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
endTime = 300;
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
HMIupdateRate = 0.1; % <---- S?tt va ni k?nner f?r h?r!

% Notera: Grundfrekvensen i den h?r modellen ?r 0.005. Ni beh?ver ha det i
% eran ocks? antagligen. Ni ?ndrar detta i:
% Simulation -> model config.. -> Solver.
% H?r ska det vara Fixed step, discrete och Fixed steps size = 0.005.

%sim('sensorFusionOfflineHMI')






















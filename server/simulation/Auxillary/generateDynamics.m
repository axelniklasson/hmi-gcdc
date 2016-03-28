% Generate Dynamics

syms x y vlon alon vlat alat yaw yawRate phi real
% phi - wheel angle

T = 0.025;
Cf = 1.106483729760818e+05;
Cr = 9.239312183631687e+04;
m  = 1823;
If = 1.1040;
Ir = 1.6660;
Iz = 3500; 

phiScale = 1;

% Heading angle to north, positive clockwise 

f = [-sin(yaw)*vlon-cos(yaw)*vlat;                                                      % Position x
     cos(yaw)*vlon-sin(yaw)*vlat;                                                       % Position y
     alon;                                                                              % Lon velocity
     0;                                                                                 % Lon acceleration (Constant acceleartion model)
     alat                                                                               % Lat velocity
     -(Cf+Cr)/(m*vlon)*vlat-(vlon +(Cf*If-Cr*Ir)/m/vlon)*yawRate+Cf/m*phi;              % Lateral accelearion
     yawRate;                                                                           % Heding angle
     -(Cf*If-Cr*Ir)/(Iz*vlon)*vlat-(Cf*If^2 + Cr*Ir^2)/(Iz*vlon)*yawRate+Cf*If/Iz*phi;  % Yaw rate
     0];                                                                                % Wheel angle; 

X = [x;y;vlon;alon;vlat;alat;yaw;yawRate;phi];

F = X + T*f;

dF = jacobian(F,X);

matlabFunction(F,'File','Auxillary/dynamicsFun','vars',{X})
matlabFunction(dF,'File','Auxillary/jacobianFun','vars',{X})
 
tmp = eye(9);
I = [(1:4),(6:9)];
H = tmp(I,:);
H(8,9) = phiScale;


% 
% f = [sin(yaw)*vlon + cos(yaw)*vlat;                                                     % Position x
%      cos(yaw)*vlon + sin(yaw)*vlat;                                                     % Position y
%      alon;                                                                              % Lon velocity
%      0;                                                                                 % Lon acceleration (Constant acceleartion model)
%      alat                                                                               % Lat velocity
%      -(Cf+Cr)/(m*vlon)*vlat-(vlon + (Cf*If-Cr*Ir)/m/vlon)*yawRate+Cf/m*phi;             % Lateral accelearion
%      yawRate;                                                                           % Heding angle
%      -(Cf*If-Cr*Ir)/(Iz*vlon)*vlat-(Cf*If^2 + Cr*Ir^2)/(Iz*vlon)*yawRate+Cf*If/Iz*phi;  % Yaw rate
%      0];                                                                                % Wheel angle; 


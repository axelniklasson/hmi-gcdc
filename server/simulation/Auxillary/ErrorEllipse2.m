function [ semiMajor,semiMinor,theta ] = ErrorEllipse2( P )
%#codegen
% REVISIT: GUARANTEE THAT EIGENVALUES AND EIGENVECTORS ARE REAL, ELSE
% SOMETHING WENT WRONG.
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here
% 95% conf. error ellipse, orientation from nort, counter clockwise. 

[vec, val] = eig(P);


[majorEig, majorIndex] = max([val(1,1), val(2,2)]);
minorEig = min([val(1,1), val(2,2)]);

%  http://www.visiondummy.com/2014/04/draw-error-ellipse-representing-covariance-matrix/
%
semiMajor = real(2*sqrt(5.991464547107981*majorEig));
semiMinor = real(2*sqrt(5.991464547107981*minorEig));


majorVec = vec(:,majorIndex);



theta = atan2(-real(majorVec(1)),real(majorVec(2)));
if theta < 0
    theta = theta + 2*pi;
end
theta = theta*180/pi;


end


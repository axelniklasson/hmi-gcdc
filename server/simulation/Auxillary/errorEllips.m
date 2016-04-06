function [ SemiMajor, SemiMinor, theta ] = errorEllips( C )
% calculates major axis, minor axis and the angle(counterclockwise from true north in deg) that identify the error
% ellips by the covariance matrix
%   Detailed explanation goes here

s11 = C(1,1);
s22 = C(2,2);
s12 = C(1,2);

theta = 0.5*atan(2*s12/(s22-s11))*180/pi;

SemiMinor_SQ = 0.5*( s11 + s22 -sqrt( (s22-s11)^2 + 4*s12^2));
SemiMajor_SQ = 0.5*( s11 + s22 +sqrt( (s22-s11)^2 + 4*s12^2));

SemiMinor = sqrt( SemiMinor_SQ);
SemiMajor = sqrt( SemiMajor_SQ);

end


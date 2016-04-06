function [Latdec,Londec]= dm2deg(lat,lon)
%#codegen


% ALTERNATIVE 1: From samuel
% lat_deg=floor((lat/100));
% lat_mm=lat-lat_deg*100;
% 
% lon_deg=floor((lon/100));
% lon_mm=lon-lon_deg*100;
% 
% dm=[lat_deg, lat_mm;lon_deg, lon_mm];
% 
% sgn = 1 - 2*any(dm < 0, 2);
% 
% pos= sgn .* (abs(dm(:,1)) + abs(dm(:,2))/60);
% Lat=pos(1);
% Lon=pos(2);

% ALTERNATIVE 2: From 2011
gpsPosition =   [lat, lon];
degmin      =   floor(gpsPosition);
degrs       =   floor(degmin/100);
minutes     =   gpsPosition-degrs*100;
Latlondec   =   degrs+(minutes/60);

Latdec = Latlondec(1);
Londec = Latlondec(2);

end
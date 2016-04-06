function [x, y] = wgs2utm(Lat,Lon,Zone)
%#codegen


% From Samuel

a=6378137.0;        % major semi-axis (m)
finv=298.257223563; % inverse of flattening
f=0;
b=0;                % minor semi-axis (m)
e2=0;               % eccentricity squared

ko=0.9996;          % Scale factor

f=1/finv;
b=a*(1-f);      % minor semi-axis (m)
e2=1-(1-f)^2;   % eccentricity squared

lat=Lat.*pi./180;
lon=Lon.*pi./180;

lcm=(Zone*6-183).*pi./180;            % central meridian(s) used in conversion (rad)

No=zeros(size(lat)); % False northing (north)
No(lat<0)=1e7;       % False northing (south)
Eo=500000;           % False easting

lam=lon-lcm;
lam=lam-(lam>=pi)*(2*pi);

RN=a./(1-e2*sin(lat).^2).^0.5;
RM=a*(1-e2)./(1-e2*sin(lat).^2).^1.5;
h2=e2*cos(lat).^2/(1-e2);
t=tan(lat);
n=f/(2-f);

%----- Helmert (1880) expansion & simplification of Bessel series (faster)
A0=1+n^2/4+n^4/64;
A2=3/2*(n-n^3/8);
A4=15/16*(n^2-n^4/4);
A6=35/48*n^3;
A8=315/512*n^4;
S=a/(1+n)*(A0*lat-A2*sin(2*lat)+A4*sin(4*lat)-A6*sin(6*lat)+A8*sin(8*lat));

E1=lam.*cos(lat);
E2=lam.^3.*cos(lat).^3/6*(1-t.^2+h2);
E3=lam.^5.*cos(lat).^5/120.*(5-18*t.^2+t.^4+14*h2-58*t.^2.*h2+ ...
    13*h2.^2+4*h2.^3-64*t.^2.*h2.^2-24*t.^2.*h2.^3);
E4=lam.^7.*cos(lat).^7/5040.*(61-479*t.^2+179*t.^4-t.^6);
E=Eo+ko*RN.*(E1+E2+E3+E4);

N1=S./RN;
N2=lam.^2/2.*sin(lat).*cos(lat);
N3=lam.^4/24.*sin(lat).*cos(lat).^3.*(5-t.^2+9*h2+4*h2.^2);
N4=lam.^6/720.*sin(lat).*cos(lat).^5.*(61-58*t.^2+t.^4+ ...
    270*h2-330*t.^2.*h2+445*h2.^2+324*h2.^3-680*t.^2.*h2.^2+ ...
    88*h2.^4-600*t.^2.*h2.^3-192*t.^2.*h2.^4);
N5=lam.^8/40320.*sin(lat).*cos(lat).^7.*(1385-311*t.^2+543*t.^4-t.^6);
N=No+ko*RN.*(N1+N2+N3+N4+N5);

y=N;
x=E;

end

% ALTERNATIVE 
% function  [x,y] = wgs2utm(Lat,Lon)
% % This function converts the vectors of Lat/Lon coordinates to those of UTM.
% % Inputs:
% %    Lat (WGS84 Latitude vector)  in decimal degrees
% %    Lon (WGS84 Longitude vector) in decimal degrees
% % Outputs:
% %    x       - UTM easting in meters
% %    y       - UTM northing in meters
% %    utmzone - UTM longitudinal zone
% %
% % Example:
% %    Lat=[48.866667; 34.05;   -36.85];
% %    Lon=[2.333056;  -118.25; 174.783333];
% %    [x,y,utmzone]=wgs2utm(Lat,Lon)
% %       returns
% % x =
% %   1.0e+005 *
% %     4.5109
% %     3.8463
% %     3.0237
% % y =
% %   1.0e+006 *
% %     5.4128
% %     3.7684
% %     5.9195
% % utmzone =
% % 31U
% % 11S
% % 60H
% %
% % Source: DMA Technical Manual 8358.2, Fairfax, VA
% 
% %% Converting coordinates to radians
% lat = Lat*pi/180;
% lon = Lon*pi/180;
% 
% %% WGS84 parameters
% a = 6378137;            % semi-major axis of the Earth ellipsoid
% b = 6356752.314245;     % semi-minor axis of the Earth ellipsoid
% e = sqrt(1-(b/a)^2);    % first eccentricity
% 
% %% UTM parameters
% Lon0 = floor(Lon/6)*6+3;    % reference longitude in degrees
% lon0 = Lon0.*pi/180;        % reference longitude in radians
% k0 = 0.9996;                % scale on central meridian
% 
% FE = 500000;                % false easting
% FN = (Lat < 0).*10000000;   % false northing
% 
% %% Equations parameters
% eps = e^2/(1-e^2);          % squared second eccentricity
% % N is the radius of curvature of the earth perpendicular to meridian plane
% % Also, distance from a point to polar axis
% N = a./sqrt(1-e^2*sin(lat).^2);
% T = tan(lat).^2;
% C = eps*(cos(lat)).^2;
% A = (lon-lon0).*cos(lat);
% % M: true distance along the central meridian from the equator to lat
% M = a*(  (1 - e^2/4 - 3*e^4/64 - 5*e^6/256)* lat         ...
%     -(3*e^2/8 + 3*e^4/32 + 45*e^6/1024)* sin(2*lat) ...
%     +(15*e^4/256 + 45*e^6/1024)        * sin(4*lat) ...
%     -(35*e^6/3072 )                    * sin(6*lat));
% 
% %% Computing easting
% x = FE + k0*N.*(                             A      ...
%     +(1-T+C)                   .* A.^3/6 ...
%     +(5-18*T+T.^2+72*C-58*eps) .* A.^5/120);
% 
% %% Computing northing
% y = FN + k0*M + k0*N.*tan(lat).*(                                 A.^2/2  ...
%     +(5-T+9*C+4*C.^2)             .* A.^4/24 ...
%     +(61-58*T+T.^2+600*C-330*eps) .* A.^6/720);
% 
% %% Determining the UTM zone
% % lonzone = floor(Lon0./6)+31;
% % latband = floor((Lat+80)./8)+1;
% % LB='CDEFGHJKLMNPQRSTUVWX';
% % latband=LB(latband)';
% % utmzone = [num2str(lonzone,'%02g') latband];
% 
% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% 
% end

function [Lat,Lon]=utm2wgs(xx,yy,zone)
%#codegen
% NOTE THAT THERE IS AN ITERATIVE FUNCTION AS WELL



% This function converts the vectors of UTM coordinates into Lat/Lon vectors.

% Inputs:
%    x       - UTM easting in meters
%    y       - UTM northing in meters
%    utmzone - UTM longitudinal zone
% Outputs:
%    Lat (WGS84 Latitude vector)  in decimal degrees:  ddd.dddddddd
%    Lon (WGS84 Longitude vector) in decimal degrees:  ddd.dddddddd
%
% Example:
%     x=[ 458731;  407653;  239027;  362850];
%     y=[4462881; 3171843; 4302285; 2772478];
%     utmzone=['30T'; '32T'; '01S'; '51R'];
%    [Lat,Lon]=utm2wgs(x,y,utmzone);
%       returns
% Lat =
%    40.3154
%    28.6705
%    38.8307
%    25.0618
% Lon =
%    -3.4857
%     8.0549
%  -180.0064
%   121.6403
%
% Source: DMA Technical Manual 8358.2, Fairfax, VA

%% Computing Lat/Lon coordinates for each input
i=1;

x=xx(i);
y=yy(i);

sa = 6378137.000000;                % semi-major axis of the Earth ellipsoid
sb = 6356752.314245;                % semi-minor axis of the Earth ellipsoid
e=(((sa^2)-(sb^2))^0.5)/sb;         % squared second eccentricity
e2= e^2;
c=sa^2/sb;
X = x - 500000;
Y=y;

S=((zone*6)-183);
lat=Y/(6366197.724*0.9996);
v=(c/((1+(e2*(cos(lat))^2)))^0.5)*0.9996;
a=X/v;
a1=sin(2*lat);
a2=a1*(cos(lat))^2;
j2=lat+(a1/2);
j4=((3*j2)+a2)/4;
j6=((5*j4)+(a2*(cos(lat))^2))/3;
alpha=(3/4)*e2;
beta=(5/3)*alpha^2;
gamma=(35/27)*alpha^3;
Bm=0.9996*c*(lat-alpha*j2+beta*j4-gamma*j6);
b=(Y-Bm)/v;
Epsi=((e2*a^2)/2)*(cos(lat))^2;
Eps=a*(1-(Epsi/3));
nab=(b*(1-Epsi))+lat;
senoheps=(exp(Eps)-exp(-Eps))/2;
Delta=atan(senoheps/(cos(nab)));
TaO=atan(cos(Delta)*tan(nab));
longitude=(Delta*(180/pi))+S;
latitude=(lat+(1+e2*(cos(lat)^2)-(3/2)*e2*sin(lat)*...
    cos(lat)*(TaO-lat))*(TaO-lat))*(180/pi);
Lat=latitude;
Lon=longitude;

end
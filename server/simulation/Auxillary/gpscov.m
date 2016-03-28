function R_gps = gpscov(a,b,alpha)
%#codegen

% From Samuel

%{
v=-alpha*pi/180;
C_inv=zeros(2,2);
C_inv(1,1)=(cos(v).^2./a.^2+sin(v).^2/b.^2);
C_inv(2,2)=(sin(v).^2./a.^2+cos(v).^2/b.^2);
C_inv(1,2)=(sin(v).*cos(v).*(1./a.^2-1/b.^2));
C_inv(2,1)=C_inv(1,2);

R_gps=inv(C_inv);

%}

rxSq = a * a;
rySq = b * b;

az=alpha*pi/180;

sin_az = sin(az);
cos_az = cos(az);
sinSq = sin_az * sin_az;
cosSq = cos_az * cos_az;

sigmaXSq = (rxSq * cosSq) + (rySq * sinSq);
sigmaYSq = (rxSq * sinSq) + (rySq * cosSq);
sigmaXY = (rxSq - rySq) * sin_az * cos_az;

R_gps=[sigmaXSq,sigmaXY;sigmaXY,sigmaYSq];
end
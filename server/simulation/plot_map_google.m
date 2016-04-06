function [] = plot_map_google(axHandle,Lon,Lat,Ext,Zone)
% function [] = plot_map(Lon,Lat,Ext,Zone)
%persistent apiKey
%if isnumeric(apiKey)
% first run, check if API key file exists
%if exist('api_key.mat','file')
%    load api_key
%else
apiKey = '';
%end
%end
% axHandle = gca;

height = 640;
width = 640;
maptype = 'satellite';
% maptype = 'hybrid';



zoomlevel=19;
scale=1;

%Lat=57.69501802;
%Lat=57.69581802;
%Lon=11.9521436433065;
%Lon=11.9531436433065;

%Ext=100;
%Lon=11.9541436433065;
%Zone=33;

if height > 640
    height = 640;
end
if width > 640
    width = 640;
end


%ud = get(axHandle, 'UserData');
%ud.gmap_params = varargin;
%set(axHandle, 'UserData', ud);


% [x,y]=wgs2utm(Lat,Lon,Zone);
[x,y]=wgs2utm(Lat,Lon,Zone);
%centerPixelY = round(height/2);
%centerPixelX = round(width/2);
%[centerX,centerY] = wgs2utm(Lat,Lon,Zone ); % center coordinates in EPSG:900913

tileSize = 256;
initialResolution = 2 * pi * 6378137 / tileSize;
curResolution = initialResolution / 2^zoomlevel/scale; % meters/pixel (EPSG:900913)

tileSize_meter=floor(tileSize*curResolution);
x_c=floor(x/tileSize_meter);
y_c=floor(y/tileSize_meter);


map_names=cell(9,1);
map_tile=zeros(9,2);
p=1;
for m=-1:1
    for n=-1:1
        
        map_names{p}=[maptype,'_',int2str(x_c+m),'x',int2str(y_c+n)];
        map_tile(p,:)=[x_c+m,y_c+n];
        %plotTile(axHandle,x_c+m,y_c+n,map_names{p},Zone,zoomlevel,scale,width,height,maptype,apiKey);
        p=p+1;
    end
end


curChildren = get(axHandle,'children');
map_objs = findobj(curChildren,'Type','image','-and','-not','tag',map_names{1},'-and','-not','tag',map_names{2},'-and','-not','tag',map_names{3},'-and','-not','tag',map_names{4},'-and','-not','tag',map_names{5},'-and','-not','tag',map_names{6},'-and','-not','tag',map_names{7},'-and','-not','tag',map_names{8},'-and','-not','tag',map_names{9});

delete(map_objs);

for p=1:size(map_names,1)
    map_objs = findobj(curChildren,'tag',map_names{p});
    
    if(isempty(map_objs))
        plotTile(axHandle,map_tile(p,1),map_tile(p,2),map_names{p},Zone,zoomlevel,scale,width,height,maptype,apiKey);
    end
    
    
end






%drawnow
org_units = get(axHandle,'Units');
set(axHandle,'Units','Pixels')
ax_position = get(axHandle,'position');
set(axHandle,'Units',org_units)
aspect_ratio = ax_position(4) / ax_position(3);

%ar=pbaspect(axHandle);
%aspect_ratio=ar(2)/ar(1);


[centerX,centerY]=latLonToMeters(Lat,Lon);

if aspect_ratio<1
    spanY=[centerY-Ext centerY+Ext];
    spanX=[centerX-Ext/aspect_ratio centerX+Ext/aspect_ratio];
else
    spanX=[centerX-Ext centerX+Ext];
    spanY=[centerY-Ext*aspect_ratio centerY+Ext*aspect_ratio];
end

[lat_span,lon_span]=metersToLatLon(spanX,spanY);

new_axis=[lat_span, lon_span];
axis(axHandle, new_axis); % update axis as quickly as possible, before downloading new image
%drawnow

%centerXExt=centerX+Ext
%centerYExt=centerY+Ext

end

function [lon,lat] = metersToLatLon(x,y)
% Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum
originShift = 2 * pi * 6378137 / 2.0; % 20037508.342789244
lon = (x ./ originShift) * 180;
lat = (y ./ originShift) * 180;
lat = 180 / pi * (2 * atan( exp( lat * pi / 180)) - pi / 2);
end

function [x,y] = latLonToMeters(lat, lon )
% Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913"
originShift = 2 * pi * 6378137 / 2.0; % 20037508.342789244
x = lon * originShift / 180;
y = log(tan((90 + lat) * pi / 360 )) / (pi / 180);
y = y * originShift / 180;
end

function plotTile(axHandle,x,y,map_name,Zone,zoomlevel,scale,width,height,maptype,apiKey)



filename=['map_data/', map_name,'.jpg'];
tileSize = 256;
initialResolution = 2 * pi * 6378137 / tileSize;
curResolution = initialResolution / 2^zoomlevel/scale; % meters/pixel (EPSG:900913)

tileSize_meter=floor(tileSize*curResolution);
center_x=x*tileSize_meter+tileSize_meter/2;
center_y=y*tileSize_meter+tileSize_meter/2;

[Lat_c,Lon_c]=utm2wgs(center_x,center_y,Zone);

if ~exist(filename,'file')
    getMap(filename,Lat_c,Lon_c,zoomlevel,scale,width,height,maptype,apiKey);
end

M = imread(filename);
M = cast(M,'double');

imag=M(26:615,26:615,:)./255;

width = size(imag,2);
height = size(imag,1);

centerPixelY = round(height/2);
centerPixelX = round(width/2);

[centerX,centerY] = latLonToMeters(Lat_c, Lon_c);

xVec = centerX + ((1:width)-centerPixelX) * curResolution; % x vector
yVec = centerY + ((height:-1:1)-centerPixelY) * curResolution; % y vector
[xMesh,yMesh] = meshgrid(xVec,yVec);

% convert meshgrid to WGS1984
[lonMesh,latMesh] = metersToLatLon(xMesh,yMesh);


% Next, project the data into a uniform WGS1984 grid
sizeFactor = 1; % factoring of new image
uniHeight = round(height*sizeFactor);
uniWidth = round(width*sizeFactor);
latVect = linspace(latMesh(1,1),latMesh(end,1),uniHeight);
lonVect = linspace(lonMesh(1,1),lonMesh(1,end),uniWidth);
[uniLonMesh,uniLatMesh] = meshgrid(lonVect,latVect);


uniImag =  myTurboInterp2(lonMesh,latMesh,imag,uniLonMesh,uniLatMesh);
hold(axHandle, 'on');
h = image(lonVect,latVect,uniImag, 'Parent', axHandle);
set(axHandle,'YDir','Normal');
set(h,'tag',map_name);
%set(h,'AlphaData',alphaData)

% add a dummy image to allow pan/zoom out to x2 of the image extent
%h_tmp = image(lonVect([1 end]),latVect([1 end]),zeros(2),'Visible','off', 'Parent', axHandle);
%set(h_tmp,'tag','gmap')


uistack(h,'bottom') % move map to bottom (so it doesn't hide previously drawn annotations)



end

function getMap(filename,lat,lon,zoomlevel,scale,width,height,maptype,apiKey)

preamble = 'http://maps.googleapis.com/maps/api/staticmap';
location = ['?center=' num2str(lat,10) ',' num2str(lon,10)];
zoomStr = ['&zoom=' num2str(zoomlevel)];
sizeStr = ['&scale=' num2str(scale) '&size=' num2str(width) 'x' num2str(height)];
maptypeStr = ['&maptype=' maptype ];
if ~isempty(apiKey)
    keyStr = ['&key=' apiKey];
else
    keyStr = '';
end


labelsStr = '&style=feature:all|element:labels|visibility:off&style=feature:road|element:geometry|visibility:on|color:0xc280e9|weight:2';
format = '&format=jpg';


url = [preamble location zoomStr sizeStr maptypeStr format labelsStr keyStr];

url

% Get the image
try
    urlwrite(url,filename);
catch % error downloading map
    warning(sprintf(['Unable to download map form Google Servers.\n' ...
        'Possible reasons: no network connection, quota exceeded, or some other error.\n' ...
        'Consider using an API key if quota problems persist.\n\n' ...
        'To debug, try pasting the following URL in your browser, which may result in a more informative error:\n%s'], url));
    return
end

end


function ZI = myTurboInterp2(X,Y,Z,XI,YI)
% An extremely fast nearest neighbour 2D interpolation, assuming both input
% and output grids consist only of squares, meaning:
% - uniform X for each column
% - uniform Y for each row
XI = XI(1,:);
X = X(1,:);
YI = YI(:,1);
Y = Y(:,1);

xiPos = nan*ones(size(XI));
xLen = length(X);
yiPos = nan*ones(size(YI));
yLen = length(Y);
% find x conversion
xPos = 1;
for idx = 1:length(xiPos)
    if XI(idx) >= X(1) && XI(idx) <= X(end)
        while xPos < xLen && X(xPos+1)<XI(idx)
            xPos = xPos + 1;
        end
        diffs = abs(X(xPos:xPos+1)-XI(idx));
        if diffs(1) < diffs(2)
            xiPos(idx) = xPos;
        else
            xiPos(idx) = xPos + 1;
        end
    end
end
% find y conversion
yPos = 1;
for idx = 1:length(yiPos)
    if YI(idx) <= Y(1) && YI(idx) >= Y(end)
        while yPos < yLen && Y(yPos+1)>YI(idx)
            yPos = yPos + 1;
        end
        diffs = abs(Y(yPos:yPos+1)-YI(idx));
        if diffs(1) < diffs(2)
            yiPos(idx) = yPos;
        else
            yiPos(idx) = yPos + 1;
        end
    end
end
ZI = Z(yiPos,xiPos,:);
end



% ASSUMING THAT ALL NAMES ARE DELIMITED WITH  {}
clc
str = strcat('gcdc2016recording',fileNo);

load(strcat(str,'.mat'))
eval(strcat('data = ',str,';'))




for i = 1:length(data.X)
   
    data.X(i).Data = data.X(i).Data';
end


for i = 1:length(data.Y)
    %disp([num2str(i) ,':', data.Y(i).Name, ' Raster : ' , data.Y(i).Raster])
    
    I1 = find(data.Y(i).Name=='{')+1;
    I2 = find(data.Y(i).Name=='}')-1;
    name = data.Y(i).Name(I1:I2);
    data.Y(i).Data = data.Y(i).Data';
    eval(strcat(name,'.signals.values = data.Y(i).Data;'))
    eval(strcat(name,'.signals.dimensions = 1;'))
    eval(strcat(name,'.signals.label = name;'))
    
    for rasterID = 1:length(data.X)
        if strcmp(data.Y(i).Raster,data.X(rasterID).Raster)
            break
        else
            if rasterID == length(data.X)
                error('Y raster not in X')
            end
        end
    end
    
    eval(strcat(name,'.time = data.X(rasterID).Data;'))
    
end
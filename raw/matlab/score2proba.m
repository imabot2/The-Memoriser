close all;
clear all;
clc;



z=[  0.8 ; 0.85 ; 0.95 ; 0.99 ; 0.87 ; 0.67 ];

z=1-(z-min(z))
x=[1:size(z)]';



beta = 1;
if (beta>=0) 
    beta = (1+beta)^3.5;
else
    beta = (1+beta)
end
Sigma = sum(exp(beta*z));
for i=1:size(z)
    sigma(i) = exp(beta*z(i))/Sigma;
end;


% z2=1-z;
% Somme= sum(z2.^beta);
% for i=1:size(z)
%     sigma(i) = (z2(i)^beta)/Somme;
% end


sigma = sigma'


nil = zeros(size(x));
bar(x, [z nil], 'grouped')
ylabel('Data');
yyaxis right
bar(x, [nil sigma], 'grouped')
ylabel('Proba');

figure;
pie (sigma)

sum (sigma)
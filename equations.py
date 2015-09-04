#!/usr/bin/env python
#Author: Nripun Sredar
#Date: 2105-09-03
#MCW


# Suffix number denotes surface
# Surface 1 is the eye
# Surface 4 is the lenslet array
# Sample values at end of line


zk = float(input('Enter displacement from retina [+ve for inner retina, -ve for outer retina] ')) #0
yk1 = float(input('Enter chief ray height at Eye: ')) #4
fk1 = float(input('Enter focal length of Eye: ')) #17
dk1 = float(input('Enter distance between Eye and Lens 1: ')) #100
fk2 = float(input('Enter focal length of Lens 1: ')) #120
fk3 = float(input('Enter focal length of Lens 2: ')) #120
dk3 = float(input('Enter distance between Lens 2 and lenslet array: ')) #100
fk4 = float(input('Enter focal length of lenslet array: ')) #10


#Ideal ray from retinal plane
alpha_ideal1 = yk1/(fk1)-yk1/fk1
y_ideal2 = (yk1/(fk1)-yk1/fk1)*dk1 + yk1
alpha_ideal2 = (yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2
y_ideal3 = ((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1)
alpha_ideal3 = ((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)-(((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))/fk3
y_ideal4 = (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)-(((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))/fk3)*dk3 + (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))
y_ideal5 = (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)-(((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))/fk3)*(dk3+fk4) + (((yk1/(fk1)-yk1/fk1) - ((yk1/(fk1)-yk1/fk1)*dk1 + yk1)/fk2)*(fk2+fk3)+((yk1/(fk1)-yk1/fk1)*dk1 + yk1))


alpha1 = yk1/(fk1-zk)-yk1/fk1
y2 = alpha1*dk1 + yk1
alpha2 = alpha1 - y2/fk2
y3 = alpha2*(fk2+fk3)+y2
alpha3 = alpha2-y3/fk3
y4 = alpha3*dk3 + y3
y5 = alpha3*(dk3+fk4) + y3

x0 = zk;
y0 = 0
x1 = fk1
y1 = yk1;
x2 = x1+dk1
x3 = x2+fk2+fk3;
x4 = x3+dk3+fk4

delta_at_sensor = abs(y5-y_ideal5)
print('Delta at Sensor: '+str(delta_at_sensor))
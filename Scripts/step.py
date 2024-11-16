import math

t = 500
p = 10
step = math.ceil(t / p)

for i in range(0,p):
  _min = i*step
  # _max = min((i+1)*step, t) - 1
  _max = min(_min+step, t) - 1
  print(_min, _max)
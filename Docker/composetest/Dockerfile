FROM python:3.7-alpine

# Create workspace
WORKDIR /code

# env vars of flask
ENV FLASK_APP=app.py 
ENV FLASK_RUN_HOST=0.0.0.0

# exec
RUN apk add --no-cache gcc musl-dev linux-headers

# dependencies
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

# Expose port
EXPOSE 5000

# copiar codigo
COPY . .

# ejecucion
CMD ["flask", "run"]
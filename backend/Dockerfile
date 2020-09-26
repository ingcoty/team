FROM python:3.6.9

COPY . /team/backend

WORKDIR /team

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list

RUN exit
ENV ACCEPT_EULA=Y
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils && apt-get install -y gcc unixodbc-dev && apt-get install -y msodbcsql17

RUN pip install -r ./backend/requirements.txt

CMD [ "python", "-m", "backend.app" ]

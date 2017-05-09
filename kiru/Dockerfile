FROM tomcat
MAINTAINER nexusapp
RUN cd /usr/local/tomcat/webapps/
RUN mkdir nexus
RUN cd nexus
ADD . /usr/local/tomcat/webapps/nexus
EXPOSE 8080
CMD ["catalina.sh", "run"]

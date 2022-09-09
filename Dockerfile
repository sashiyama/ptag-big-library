FROM ruby:3.1.2-alpine
ENV LANG C.UTF-8
RUN apk add --update build-base tzdata postgresql-dev postgresql-client git && \
    rm -rf /var/cache/apk/*

ENV APP_ROOT /ptag-library
WORKDIR $APP_ROOT

COPY . $APP_ROOT
RUN bundle config --global jobs 4 && \
    bundle config --global build.nokogiri --use-system-libraries && \
    bundle install && \
    rm -rf ~/.gem

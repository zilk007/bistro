# Be sure to restart your server when you modify this file.

Rails.application.config.session_store :active_record_store, key: '_bistro_session'
HerokuAddonRailsTest::Application.config.session_store :active_record_store, key: '_heroku-addon-rails-test_session'

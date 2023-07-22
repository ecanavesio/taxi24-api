CREATE TYPE drivers_driver_status_enum AS ENUM (
	'available',
	'on_trip',
	'disabled',
	'offwork');

CREATE TABLE drivers (
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	driver_id bigserial NOT NULL,
	driver_name varchar(80) NOT NULL,
	car_description varchar(300) NOT NULL,
	price_per_km_in_usd numeric(10, 4) NOT NULL,
	geolocation geography(point, 4326) NULL,
	driver_status drivers_driver_status_enum NOT NULL DEFAULT 'available'::drivers_driver_status_enum,
	CONSTRAINT "pk_driver_id" PRIMARY KEY (driver_id)
);

CREATE TYPE trips_trip_status_enum AS ENUM (
	'active',
	'cancelled',
	'finished');

CREATE TABLE passengers (
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	passenger_id bigserial NOT NULL,
	passenger_name varchar(80) NOT NULL,
	geolocation geography(point, 4326) NOT NULL,
	CONSTRAINT "pk_passenger_id" PRIMARY KEY (passenger_id)
);

CREATE TABLE trips (
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	trip_id serial4 NOT NULL,
	from_geolocation geography(point, 4326) NOT NULL,
	to_geolocation geography(point, 4326) NOT NULL,
	passenger_id int8 NOT NULL,
	driver_id int8 NOT NULL,
	trip_status trips_trip_status_enum NOT NULL DEFAULT 'active'::trips_trip_status_enum,
	CONSTRAINT "pk_trip_id" null
);

ALTER TABLE trips ADD CONSTRAINT "fk_trip_passenger_id" FOREIGN KEY (passenger_id) REFERENCES passengers(passenger_id);
ALTER TABLE trips ADD CONSTRAINT "fk_trip_driver_id" FOREIGN KEY (driver_id) REFERENCES drivers(driver_id);